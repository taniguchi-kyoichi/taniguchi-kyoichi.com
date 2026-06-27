import type { PageServerLoad } from './$types';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

export const load: PageServerLoad = () => {
	const seo: SEO = {
		title: `Ask AI | ${SITE_NAME}`,
		description: `${SITE_NAME}について AI エージェントに質問できるページ。プロダクト・OSS・経歴などをチャットで尋ねると、構造化された UI で答えます。`,
		canonical: `${SITE_URL}/ask`,
		ogType: 'website',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: SITE_NAME,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary'
	};

	return { seo };
};
