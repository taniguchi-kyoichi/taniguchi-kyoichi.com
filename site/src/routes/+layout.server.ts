import { profile } from '$lib/data/profile';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';
import { isLegalPath } from '$lib/legal';

export function load({ url }) {
	// 法務ページは自分の SEO を持つ。サイトの紹介（運営者の名前・経歴）をページのソースに載せない。
	if (isLegalPath(url.pathname)) return { url: url.pathname };

	const canonical = `${SITE_URL}${url.pathname}`;

	const seo: SEO = {
		title: `${SITE_NAME} | ${profile.title}`,
		description: profile.bio,
		canonical,
		ogType: 'website',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: SITE_NAME,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary'
	};

	return { url: url.pathname, seo };
}
