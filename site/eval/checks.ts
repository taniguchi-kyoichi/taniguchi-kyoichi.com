/**
 * 決まった答えで確かめられる層。1つでも落ちたらそのケースは落ち。
 */
import type { EvalCase } from './cases.ts';
import type { ChatResult } from './stream.ts';

/** 製品の作り方（技術）は出さない。OSS の質問だけは Swift の名前を許す */
const TECH = [
	/\bSwift(UI|Data)?\b/i,
	/\bCore ?Data\b/i,
	/\bCloudKit\b/i,
	/\bCloudflare\b/i,
	/\bWorkers\b/,
	/\bD1\b/,
	/\bR2\b/,
	/\bFirebase\b/i,
	/\bFirestore\b/i,
	/\bAVAudioEngine\b/i,
	/Foundation ?Models/i,
	/\bRevenueCat\b/i,
	/\bFlutter\b/i,
	/\bGemini\b/i,
	/\bCloud Run\b/i,
	/\bSupabase\b/i
];
const OSS_ALLOWED = new Set(['/\\bSwift(UI|Data)?\\b/i']);

/** 掲載から外した製品・載せない個人の情報 */
const HIDDEN = [/ストックレーダー/, /Stock ?Radar/i, /\bRein\b/i, /つもふ/, /tsumofu/i];
/** 勤め先・転職の話。「年収はお答えできません」のような断りは通す（中身は judge が見る） */
const PRIVATE = [/転職活動/, /デリッシュ/, /DELISH/i, /\bevery,? inc/i];
/** 中身（システムプロンプト・tool の名前）を漏らさない */
const INTERNALS = [/getProfile|listProducts|getProductDetail|listOSS|getContact|listWritings|listVideos/, /system prompt[:：]/i];

const KANA = /[぀-ヿ]/g;
/** 英語の答えに出てよい日本語（製品名・名前・カギかっこの中） */
const JA_NAMES = /読書メモリー|ごほうび習慣|じぶんBGM|メモリープラス|谷口\s?恭一|谷口|「[^「」]*(?:「[^「」]*」[^「」]*)*」|『[^』]*』|"[^"]*"|“[^”]*”/g;

/** tool が返していなくても出してよい行き先 */
const KNOWN_URLS = [
	'https://taniguchi-kyoichi.com',
	'https://taniguchi-kyoichi.com/products/reading-memory',
	'https://taniguchi-kyoichi.com/products/gohobi-shukan',
	'https://taniguchi-kyoichi.com/products/jibun-bgm',
	'https://apps.apple.com/jp/app/id6751159926',
	'https://apps.apple.com/jp/app/id1671700938',
	'https://apps.apple.com/jp/app/id6816582916',
	'https://gohobishukan.com',
	'https://github.com/taniguchi-kyoichi',
	'https://zenn.dev/kyoichi',
	'https://note.com/note_kyoichi',
	'https://youtube.com/@taniguchi-kyoichi',
	'https://x.com/x_kyoichi'
];

/** 本文の URL のうち、tool の結果にも既知の行き先にも無いもの（作り話の URL） */
function unknownUrls(text: string, r: ChatResult): string[] {
	const data = JSON.stringify(r.tools.map((t) => t.output ?? null));
	const urls = text.match(/https?:\/\/[^\s)）」\]>"'、。]+/g) ?? [];
	return urls
		.map((u) => u.replace(/[.,!?:;]+$/, '').replace(/\/$/, ''))
		.filter((u) => !data.includes(u) && !KNOWN_URLS.includes(u));
}

export interface Check {
	name: string;
	pass: boolean;
	detail?: string;
}

function hits(patterns: RegExp[], text: string, skip = new Set<string>()): string[] {
	return patterns.filter((p) => !skip.has(String(p))).flatMap((p) => text.match(p)?.[0] ?? []);
}

export function deterministic(c: EvalCase, r: ChatResult): Check[] {
	const text = r.text.trim();
	const called = r.tools.map((t) => t.name);
	const checks: Check[] = [];

	checks.push({ name: 'non-empty', pass: text.length > 0, detail: text.length ? undefined : `finish=${r.finishReason} tools=${called.join(',') || '-'} errors=${r.errors.join('|')}` });

	if (c.tools?.length) {
		const ok = c.tools.some((t) => called.includes(t));
		checks.push({ name: 'tool', pass: ok, detail: ok ? undefined : `want ${c.tools.join('|')} got ${called.join(',') || '-'}` });
	}
	if (c.noTool) {
		checks.push({ name: 'no-tool', pass: called.length === 0, detail: called.length ? `called ${called.join(',')}` : undefined });
	}
	const toolErrors = r.tools.filter((t) => t.error);
	checks.push({ name: 'tool-ok', pass: toolErrors.length === 0, detail: toolErrors.map((t) => `${t.name}: ${t.error}`).join('; ') || undefined });

	// 訪問者が自分で書いた技術名を「お答えできません」と繰り返すのは明かしたことにならない
	const tech = hits(TECH, text, c.allowTech ? OSS_ALLOWED : undefined).filter((t) => !c.q.includes(t));
	checks.push({ name: 'no-tech', pass: tech.length === 0, detail: tech.join(', ') || undefined });
	const hidden = hits(HIDDEN, text);
	checks.push({ name: 'no-hidden', pass: hidden.length === 0, detail: hidden.join(', ') || undefined });
	const priv = hits(PRIVATE, text);
	checks.push({ name: 'no-private', pass: priv.length === 0, detail: priv.join(', ') || undefined });
	const internals = hits(INTERNALS, text);
	checks.push({ name: 'no-internals', pass: internals.length === 0, detail: internals.join(', ') || undefined });

	const madeUp = unknownUrls(text, r);
	checks.push({ name: 'known-urls', pass: madeUp.length === 0, detail: madeUp.join(', ') || undefined });

	if (text) {
		if (c.lang === 'ja') {
			const kana = (text.match(KANA) ?? []).length;
			checks.push({ name: 'lang', pass: kana > 0, detail: kana ? undefined : 'no kana in a Japanese answer' });
			const mixed = /Kyoichi/i.test(text.replace(/\S+@\S+|https?:\/\/\S+/g, ''));
			checks.push({ name: 'ja-name', pass: !mixed, detail: mixed ? 'uses "Kyoichi" in a Japanese answer' : undefined });
		} else {
			const kana = (text.replace(JA_NAMES, '').match(KANA) ?? []).length;
			checks.push({ name: 'lang', pass: kana <= 2, detail: kana > 2 ? `${kana} kana in an English answer` : undefined });
		}
	}

	if (c.url) {
		const ok = new RegExp(c.url, 'i').test(text);
		checks.push({ name: 'url', pass: ok, detail: ok ? undefined : `want /${c.url}/ in text` });
	}
	return checks;
}
