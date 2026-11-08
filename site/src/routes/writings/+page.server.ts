import type { PageServerLoad } from './$types';
import { fetchArticlesFromRSS } from '$lib/utils/rss';
import { cachedFetch } from '$lib/server/external';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

const RSS_FEEDS = ['https://zenn.dev/kyoichi/feed', 'https://note.com/note_kyoichi/rss'];

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders({
		// HTML はエッジに置かない。adapter-cloudflare は public の応答を caches.default に入れ、
		// それはデプロイでも消えない。置くと、消えた古い JS を指す HTML が最大1時間配られ、画面が動かなくなる
		// （2026-11-08 に実測）。外部の RSS・YouTube は取得側（cachedFetch）でエッジに置いている。
		'cache-control': 'no-cache'
	});

	const articlesArrays = await Promise.all(RSS_FEEDS.map((url) => fetchArticlesFromRSS(url, cachedFetch)));

	const articles = articlesArrays
		.flat()
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

	const seo: SEO = {
		title: `技術記事・ブログ | ${SITE_NAME}`,
		description: `${SITE_NAME}が Zenn・note に書いた iOS / Swift / AI の技術記事一覧（${articles.length}件）。`,
		canonical: `${SITE_URL}/writings`,
		ogType: 'website',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: SITE_NAME,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary'
	};

	return { articles, seo };
};
