import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import { fetchArticlesFromRSS, fetchYouTubeChannel } from '$lib/utils/rss';
import { cachedFetch } from '$lib/server/external';
import { resolveDoccUrls } from '$lib/server/docc';
import { featuredOSS } from '$lib/data/oss';
import { profile } from '$lib/data/profile';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

const RSS_FEEDS = ['https://zenn.dev/kyoichi/feed', 'https://note.com/note_kyoichi/rss'];
const YOUTUBE_CHANNEL_ID = 'UCmMnuEXRsrNNcW4bVeeTI8A';
const MAX_ARTICLES_ON_HOME = 4;
const MAX_VIDEOS_ON_HOME = 4;

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders({
		// HTML はエッジに置かない。adapter-cloudflare は public の応答を caches.default に入れ、
		// それはデプロイでも消えない。置くと、消えた古い JS を指す HTML が最大1時間配られ、画面が動かなくなる
		// （2026-11-08 に実測）。外部の RSS・YouTube は取得側（cachedFetch）でエッジに置いている。
		'cache-control': 'no-cache'
	});

	const youtubePromise = env.YOUTUBE_API_KEY
		? fetchYouTubeChannel(YOUTUBE_CHANNEL_ID, env.YOUTUBE_API_KEY, MAX_VIDEOS_ON_HOME)
		: Promise.resolve(null);

	const [articlesArrays, youtubePlaylist, ossDocc] = await Promise.all([
		Promise.all(RSS_FEEDS.map((url) => fetchArticlesFromRSS(url, cachedFetch))),
		youtubePromise,
		resolveDoccUrls(featuredOSS)
	]);

	const articles = articlesArrays
		.flat()
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
		.slice(0, MAX_ARTICLES_ON_HOME);


	const seo: SEO = {
		title: `${SITE_NAME} | ${profile.title}`,
		description: profile.bio,
		canonical: SITE_URL,
		ogType: 'profile',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: SITE_NAME,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: profile.name,
			alternateName: profile.nameEn,
			jobTitle: profile.title,
			description: profile.bio,
			url: SITE_URL,
			image: DEFAULT_OG_IMAGE,
			address: profile.location
				? { '@type': 'PostalAddress', addressLocality: profile.location }
				: undefined,
			sameAs: [...profile.socialLinks, ...(profile.secondaryLinks ?? [])].map((l) => l.url),
			knowsAbout: ['Swift', 'SwiftUI', 'iOS Development', 'AI Integration']
		}
	};

	return { articles, youtubePlaylist, ossDocc, seo };
};
