import type { PageServerLoad } from './$types';
import { ossProjects } from '$lib/data/oss';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';
import { resolveDoccUrls } from '$lib/server/docc';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		// HTML はエッジに置かない。adapter-cloudflare は public の応答を caches.default に入れ、
		// それはデプロイでも消えない。置くと、消えた古い JS を指す HTML が最大1時間配られ、画面が動かなくなる
		// （2026-11-08 に実測）。外部の RSS・YouTube は取得側（cachedFetch）でエッジに置いている。
		'cache-control': 'no-cache'
	});

	const docc = await resolveDoccUrls(ossProjects);

	const seo: SEO = {
		title: `Open Source | ${SITE_NAME}`,
		description: `${SITE_NAME}が公開している OSS プロジェクト一覧（${ossProjects.length}件）`,
		canonical: `${SITE_URL}/oss`,
		ogType: 'website',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: SITE_NAME,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary'
	};

	return { docc, seo };
};
