import type { PageServerLoad } from './$types';
import { fetchArticlesFromRSS } from '$lib/utils/rss';
import { absoluteUrl, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

const REIN_RSS = 'https://reinself.com/rss.xml';
const REIN_URL = 'https://reinself.com';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=3600, stale-while-revalidate=86400'
	});

	const articles = (await fetchArticlesFromRSS(REIN_RSS, fetch)).sort(
		(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	);

	const seo: SEO = {
		title: `Rein — 意志じゃなくて、仕組み。 | ${SITE_NAME}`,
		description:
			'認知科学で日常のつまずきを言語化し、試せる選択肢を静かに並べるメディア Rein の記事一覧。Rein iOS アプリと並走しています。',
		canonical: `${SITE_URL}/rein`,
		ogType: 'website',
		ogImage: absoluteUrl('/rein-icon.png'),
		ogImageAlt: 'Rein',
		ogImageWidth: 1024,
		ogImageHeight: 1024,
		twitterCard: 'summary',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: 'Rein',
			description:
				'意志じゃなくて、仕組み。身近なつまずきを認知科学で説明し、試せる選択肢を静かに並べる記事を集めています。',
			url: `${SITE_URL}/rein`,
			isPartOf: { '@type': 'WebSite', name: 'Rein', url: REIN_URL }
		}
	};

	return { articles, reinUrl: REIN_URL, seo };
};
