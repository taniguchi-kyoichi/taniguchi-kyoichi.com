import type { PageServerLoad } from './$types';
import { fetchArticlesFromRSS } from '$lib/utils/rss';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

const RSS_FEEDS = ['https://zenn.dev/kyoichi/feed', 'https://note.com/note_kyoichi/rss'];

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=3600, stale-while-revalidate=86400'
	});

	const articlesArrays = await Promise.all(RSS_FEEDS.map((url) => fetchArticlesFromRSS(url, fetch)));

	const articles = articlesArrays
		.flat()
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

	const seo: SEO = {
		title: `Writings | ${SITE_NAME}`,
		description: `${SITE_NAME}が Zenn・note で執筆した技術記事一覧（${articles.length}件）`,
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
