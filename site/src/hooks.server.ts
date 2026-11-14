import type { Handle, RequestEvent } from '@sveltejs/kit';

// Security headers on every server-rendered response (documents + /api).
// `script-src 'unsafe-inline'` is kept because the theme bootstrap script and
// JSON-LD blocks are inline; everything else is locked down (no external JS,
// no framing, no plugins). The chat only connects same-origin (/api/chat); the only
// third party is Cloudflare Web Analytics, which the zone injects into every page.
const CSP = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"font-src 'self' https://fonts.gstatic.com",
	"img-src 'self' https: data:",
	"connect-src 'self' https://cloudflareinsights.com",
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"object-src 'none'"
].join('; ');

// www も custom domain として 200 を返しており、canonical タグ頼みで正規化されていた。
// http→https はゾーンの Always Use HTTPS がエッジで畳むので、ここでは扱わない。
const CANONICAL_HOST = 'taniguchi-kyoichi.com';

/**
 * www を apex へ寄せる。不要なら null。
 *
 * URL オブジェクトのホスト分解は使わない。workerd では `url.hostname` にポートが
 * 入り（`127.0.0.1:8788`）、`url.host` への代入も効かないことがある。Host ヘッダを
 * 既知の 1 値と直接比べれば、ローカルを巻き込む余地もループする余地も無い。
 */
function canonicalRedirect(event: RequestEvent): string | null {
	const host = event.request.headers.get('host')?.toLowerCase();
	if (host !== `www.${CANONICAL_HOST}`) return null;
	return `https://${CANONICAL_HOST}${event.url.pathname}${event.url.search}`;
}

/**
 * 廃止して戻さないページ。404 でなく 410 を返すと、検索エンジンは早く索引から外す。
 * Rein（アプリとメディア）は 2026-11-08 に廃止した。
 */
const GONE = /^\/(rein|products\/rein)(\/|\.md$|$)/;

/**
 * ごほうび習慣の法務・サポートの面は gohobishukan.com に移した（2026-11-14）。3.2.3 までのアプリとストアの掲載が
 * この URL を持っているので、ずっと 301 で新しい面へ送る。/en/ は英語の面へ。
 */
const GOHOBI_LEGAL = /^(\/en)?\/products\/gohobi-shukan\/(terms|privacy|support)\/?$/;

function gohobiLegalRedirect(pathname: string): string | null {
	const m = GOHOBI_LEGAL.exec(pathname);
	return m ? `https://gohobishukan.com${m[1] ?? ''}/${m[2]}/` : null;
}

/** `<html lang>`。英語のページは /en/ の下にだけ置く（今は法務・サポートの面だけ）。 */
function pageLanguage(pathname: string): 'ja' | 'en' {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ja';
}

export const handle: Handle = async ({ event, resolve }) => {
	// 308（301 ではなく）にするのは、メソッドを保つため。/api/* が www に来ても壊れない。
	const redirect = canonicalRedirect(event);
	if (redirect) return new Response(null, { status: 308, headers: { location: redirect } });

	const moved = gohobiLegalRedirect(event.url.pathname);
	if (moved) return new Response(null, { status: 301, headers: { location: moved } });

	if (GONE.test(event.url.pathname)) {
		return new Response('Gone', { status: 410, headers: { 'content-type': 'text/plain; charset=utf-8' } });
	}

	const lang = pageLanguage(event.url.pathname);
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
	response.headers.set('Content-Security-Policy', CSP);
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	return response;
};
