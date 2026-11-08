/**
 * AskAI の評価を回す。
 *
 *   with-secrets --profile ai bun eval/run.ts --label haiku            # ローカルの dev（全ケース）
 *   with-secrets --profile ai bun eval/run.ts --target https://taniguchi-kyoichi.com \
 *     --subset baseline --pace 11000 --label prod                         # 本番（6問/分・25問/日の制限）
 *
 * 引数: --target URL（既定 http://localhost:5173）/ --label 名前 / --subset all|baseline /
 *       --ids a,b / --pace ミリ秒 / --concurrency N / --no-judge
 * 出力: eval/results/<label>.json と <label>.md
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { cases, type EvalCase } from './cases.ts';
import { ask, type ChatResult } from './stream.ts';
import { deterministic, type Check } from './checks.ts';
import { judge, JUDGE_MODEL, type Verdict } from './judge.ts';

const args = new Map<string, string>();
for (let i = 2; i < process.argv.length; i++) {
	const key = process.argv[i].replace(/^--/, '');
	const next = process.argv[i + 1];
	if (next && !next.startsWith('--')) {
		args.set(key, next);
		i++;
	} else args.set(key, 'true');
}

const target = (args.get('target') ?? 'http://localhost:5173').replace(/\/$/, '');
const label = args.get('label') ?? 'run';
const pace = Number(args.get('pace') ?? 0);
const concurrency = Number(args.get('concurrency') ?? (pace ? 1 : 4));
const useJudge = !args.has('no-judge');
const ids = args.get('ids')?.split(',');

let selected: EvalCase[] = cases;
if (args.get('subset') === 'baseline') selected = cases.filter((c) => c.baseline);
if (ids) selected = cases.filter((c) => ids.includes(c.id));

/** $ / 100万トークン（入力・出力） */
const PRICE: Record<string, [number, number]> = {
	'claude-haiku-5-5': [0.1, 0.5],
	'claude-sonnet-5-5': [2, 10]
};

interface Row {
	id: string;
	intent: string;
	lang: string;
	q: string;
	result?: ChatResult;
	checks: Check[];
	deterministicPass: boolean;
	verdict?: Verdict | null;
	judgeScore?: number;
	costUsd?: number;
	skipped?: string;
}

const RATE_LIMITED = /短時間に質問が多すぎます|混み合っています/;
const rows: Row[] = [];
let stopped = '';

async function runOne(c: EvalCase): Promise<Row> {
	const row: Row = { id: c.id, intent: c.intent, lang: c.lang, q: c.q, checks: [], deterministicPass: false };
	if (stopped) return { ...row, skipped: stopped };
	let result: ChatResult;
	try {
		result = await ask(`${target}/api/chat`, [...(c.history ?? []), { role: 'user', text: c.q }]);
	} catch (e) {
		result = { text: '', tools: [], errors: [String(e)], ms: 0, httpStatus: 0 };
	}
	if (result.errors.some((e) => RATE_LIMITED.test(e))) {
		stopped = 'rate-limited';
		return { ...row, skipped: stopped };
	}
	row.result = result;
	row.checks = deterministic(c, result);
	row.deterministicPass = row.checks.every((k) => k.pass);
	const price = result.model ? PRICE[result.model] : undefined;
	if (price && result.usage) {
		// cache reads bill at 0.1x the input price, cache writes at 1.25x
		const u = result.usage;
		const read = u.inputTokenDetails?.cacheReadTokens ?? 0;
		const write = u.inputTokenDetails?.cacheWriteTokens ?? 0;
		const fresh = (u.inputTokens ?? 0) - read - write;
		row.costUsd = (fresh * price[0] + read * price[0] * 0.1 + write * price[0] * 1.25 + (u.outputTokens ?? 0) * price[1]) / 1e6;
	}
	if (useJudge) {
		try {
			row.verdict = (await judge(c, result)).verdict;
			if (row.verdict) {
				const v = row.verdict;
				row.judgeScore = (Number(v.grounded) + Number(v.answers) + Number(v.nextStep)) / 3;
			}
		} catch (e) {
			row.verdict = null;
			console.error(`judge failed on ${c.id}: ${e}`);
		}
	}
	const mark = row.deterministicPass ? 'PASS' : 'FAIL';
	const failed = row.checks.filter((k) => !k.pass).map((k) => `${k.name}${k.detail ? `(${k.detail})` : ''}`);
	console.log(`${mark} ${c.id.padEnd(18)} ${String(result.ms).padStart(6)}ms judge=${row.judgeScore?.toFixed(2) ?? '-'} ${failed.join(' ')}`);
	return row;
}

const queue = [...selected];
async function worker() {
	while (queue.length) {
		const c = queue.shift()!;
		const startedAt = Date.now();
		rows.push(await runOne(c));
		if (pace && queue.length && !stopped) await Bun.sleep(Math.max(0, pace - (Date.now() - startedAt)));
	}
}
await Promise.all(Array.from({ length: concurrency }, worker));
rows.sort((a, b) => selected.findIndex((c) => c.id === a.id) - selected.findIndex((c) => c.id === b.id));

// ── 集計 ───────────────────────────────────────────────
const ran = rows.filter((r) => !r.skipped);
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 1000) / 10 : 0);
const judged = ran.filter((r) => r.judgeScore !== undefined);
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const usageRows = ran.filter((r) => r.result?.usage);
const summary = {
	label,
	target,
	model: ran.find((r) => r.result?.model)?.result?.model ?? 'unknown',
	judgeModel: useJudge ? JUDGE_MODEL : null,
	at: new Date().toISOString(),
	cases: selected.length,
	ran: ran.length,
	skipped: rows.length - ran.length,
	stoppedBecause: stopped || null,
	empty: ran.filter((r) => !r.result?.text.trim()).length,
	deterministicPassPct: pct(ran.filter((r) => r.deterministicPass).length, ran.length),
	judgePct: judged.length ? Math.round((sum(judged.map((r) => r.judgeScore!)) / judged.length) * 1000) / 10 : null,
	judgeBy: useJudge
		? {
				grounded: pct(judged.filter((r) => r.verdict?.grounded).length, judged.length),
				answers: pct(judged.filter((r) => r.verdict?.answers).length, judged.length),
				nextStep: pct(judged.filter((r) => r.verdict?.nextStep).length, judged.length)
			}
		: null,
	checkFailures: Object.fromEntries(
		[...new Set(ran.flatMap((r) => r.checks.filter((k) => !k.pass).map((k) => k.name)))].map((n) => [
			n,
			ran.filter((r) => r.checks.some((k) => k.name === n && !k.pass)).map((r) => r.id)
		])
	),
	latencyMs: {
		median: median(ran.map((r) => r.result!.ms)),
		max: Math.max(0, ...ran.map((r) => r.result!.ms))
	},
	perQuestion: usageRows.length
		? {
				inputTokens: Math.round(sum(usageRows.map((r) => r.result!.usage!.inputTokens ?? 0)) / usageRows.length),
				outputTokens: Math.round(sum(usageRows.map((r) => r.result!.usage!.outputTokens ?? 0)) / usageRows.length),
				costUsd: sum(usageRows.map((r) => r.costUsd ?? 0)) / usageRows.length
			}
		: null
};

function median(xs: number[]): number {
	if (!xs.length) return 0;
	const s = [...xs].sort((a, b) => a - b);
	return s[Math.floor(s.length / 2)];
}

mkdirSync(new URL('./results/', import.meta.url), { recursive: true });
writeFileSync(new URL(`./results/${label}.json`, import.meta.url), JSON.stringify({ summary, rows }, null, '\t'));

const md = [
	`# AskAI eval — ${label}`,
	'',
	`- target: ${target} / model: ${summary.model} / judge: ${summary.judgeModel ?? 'off'} / ${summary.at}`,
	`- ran ${summary.ran} of ${summary.cases} cases${summary.skipped ? ` (skipped ${summary.skipped}: ${summary.stoppedBecause})` : ''}`,
	`- deterministic: **${summary.deterministicPassPct}%** pass / empty answers: **${summary.empty}**`,
	summary.judgePct !== null
		? `- judge: **${summary.judgePct}%** (grounded ${summary.judgeBy!.grounded}% / answers ${summary.judgeBy!.answers}% / next step ${summary.judgeBy!.nextStep}%)`
		: '- judge: off',
	`- latency: median ${summary.latencyMs.median}ms / max ${summary.latencyMs.max}ms`,
	summary.perQuestion
		? `- per question: ${summary.perQuestion.inputTokens} in / ${summary.perQuestion.outputTokens} out tokens, $${summary.perQuestion.costUsd.toFixed(5)}`
		: '- per question: usage not reported by the server',
	'',
	'| case | det | judge | failed checks / judge note | answer |',
	'|---|---|---|---|---|',
	...rows.map((r) => {
		if (r.skipped) return `| ${r.id} | – | – | skipped (${r.skipped}) | |`;
		const failed = r.checks.filter((k) => !k.pass).map((k) => k.name).join(', ');
		const note = [failed, r.verdict && r.verdict.note !== 'ok' ? r.verdict.note : ''].filter(Boolean).join(' / ');
		const answer = (r.result?.text ?? '').replace(/\s+/g, ' ').replace(/\|/g, '\\|').slice(0, 120);
		return `| ${r.id} | ${r.deterministicPass ? '✓' : '✗'} | ${r.judgeScore?.toFixed(2) ?? '-'} | ${note.replace(/\|/g, '\\|')} | ${answer || '(empty)'} |`;
	})
].join('\n');
writeFileSync(new URL(`./results/${label}.md`, import.meta.url), md + '\n');

console.log('\n' + md.split('\n').slice(0, 9).join('\n'));
