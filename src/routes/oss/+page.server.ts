import type { PageServerLoad } from './$types';
import { ossProjects } from '$lib/data/oss';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

export const load: PageServerLoad = () => {
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

	return { seo };
};
