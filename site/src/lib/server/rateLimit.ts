import type { KVNamespace } from '@cloudflare/workers-types';

/**
 * Lightweight abuse protection for the public /api/chat endpoint, backed by KV.
 *
 * Three counters guard against a bot draining the Workers AI quota (free) or
 * running up cost (paid):
 *   - per-IP / minute  → blocks rapid hammering
 *   - per-IP / day     → one visitor can't monopolize the global budget
 *   - global / day     → hard ceiling on total daily inference
 *
 * Counts are only incremented for ALLOWED requests, and KV errors fail OPEN
 * (availability over strict blocking — the 10k-neuron/day quota is the backstop).
 * Counters are eventually consistent, so the caps are approximate by design.
 */

const PER_IP_PER_MIN = 6;
const PER_IP_PER_DAY = 25;
const GLOBAL_PER_DAY = 300;

const DAY_TTL = 90_000; // ~25h, so the day key always outlives the UTC day
const MIN_TTL = 120;

export type LimitResult = { ok: true } | { ok: false; reason: 'rate' | 'global' };

function num(v: string | null): number {
	const n = v ? parseInt(v, 10) : 0;
	return Number.isFinite(n) ? n : 0;
}

export async function checkRateLimit(
	kv: KVNamespace | undefined,
	ip: string,
	nowIso: string
): Promise<LimitResult> {
	if (!kv) return { ok: true }; // e.g. local dev without the binding → don't block

	const day = nowIso.slice(0, 10); // YYYY-MM-DD
	const minute = nowIso.slice(0, 16); // YYYY-MM-DDTHH:MM
	const ipMinKey = `ipm:${ip}:${minute}`;
	const ipDayKey = `ipd:${ip}:${day}`;
	const globalKey = `g:${day}`;

	try {
		const [ipMin, ipDay, global] = (
			await Promise.all([kv.get(ipMinKey), kv.get(ipDayKey), kv.get(globalKey)])
		).map(num);

		if (global >= GLOBAL_PER_DAY) return { ok: false, reason: 'global' };
		if (ipMin >= PER_IP_PER_MIN || ipDay >= PER_IP_PER_DAY) return { ok: false, reason: 'rate' };

		await Promise.all([
			kv.put(ipMinKey, String(ipMin + 1), { expirationTtl: MIN_TTL }),
			kv.put(ipDayKey, String(ipDay + 1), { expirationTtl: DAY_TTL }),
			kv.put(globalKey, String(global + 1), { expirationTtl: DAY_TTL })
		]);
		return { ok: true };
	} catch {
		return { ok: true }; // KV unavailable → fail open
	}
}
