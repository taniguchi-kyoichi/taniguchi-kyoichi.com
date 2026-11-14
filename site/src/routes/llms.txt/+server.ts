import { products } from '$lib/data/products';
import { featuredOSS } from '$lib/data/oss';
import { profile, contact } from '$lib/data/profile';
import { SITE_URL } from '$lib/seo';

/**
 * AI のクローラー向けの案内。製品・OSS・プロフィールのデータから作るので、
 * 掲載を変えても手で直す所が無い（手書きの頃は外した製品と「開発中」が残っていた）。
 * 製品の作り方（技術）は載せない。
 */
function body(): string {
	const listed = products.filter((p) => !p.hidden && !p.buildInPublic);
	const lines = [
		`# ${profile.nameEn} - ${profile.title} Portfolio`,
		'',
		`> ${profile.name}（${profile.nameEn}）のポートフォリオ。個人で作って App Store と Google Play で公開しているアプリ、OSS、記事を載せています。`,
		'',
		'## About',
		`- Name: ${profile.name} (${profile.nameEn})`,
		`- Role: ${profile.title}`,
		...(profile.location ? [`- Location: ${profile.location}`] : []),
		`- Contact: ${contact.email}`,
		'',
		'## Apps',
		...listed.flatMap((p) => [
			`- **${p.name}**${p.en?.name ? ` (${p.en.name})` : ''}: ${p.description}`,
			`  - ページ: ${SITE_URL}/products/${p.id}`,
			...(p.links.web ? [`  - 公式サイト: ${p.links.web}`] : []),
			...(p.links.appStore ? [`  - App Store: ${p.links.appStore}`] : []),
			...(p.links.googlePlay ? [`  - Google Play: ${p.links.googlePlay}`] : [])
		]),
		'',
		'## Sections',
		`- [Home](${SITE_URL}/)`,
		`- [Writings](${SITE_URL}/writings): Zenn・note の記事`,
		`- [Open Source](${SITE_URL}/oss): OSS の一覧`,
		'',
		'## Featured OSS',
		...featuredOSS.map((o) => `- ${o.name}: ${SITE_URL}/oss/${o.id}`),
		'',
		'## Machine-Readable Endpoints',
		'各製品・OSS のページは `.md` を付けるとマークダウンでも取れます。',
		`- ${SITE_URL}/products/{id}.md`,
		`- ${SITE_URL}/oss/{id}.md`,
		'',
		'## Links',
		...profile.socialLinks.map((l) => `- ${l.label}: ${l.url}`),
		`- Email: ${contact.email}`
	];
	return lines.join('\n') + '\n';
}

export function GET() {
	return new Response(body(), {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
}
