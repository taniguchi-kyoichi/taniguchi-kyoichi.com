export type TwitterCard = 'summary' | 'summary_large_image';
export type OGType = 'website' | 'article' | 'profile';

export interface SEO {
	title: string;
	description: string;
	canonical: string;
	ogType?: OGType;
	ogImage?: string;
	ogImageAlt?: string;
	ogImageWidth?: number;
	ogImageHeight?: number;
	twitterCard?: TwitterCard;
	jsonLd?: unknown;
	/** Set for thin/JS-only routes (e.g. /ask) to keep them out of the index. */
	noindex?: boolean;
}

export const SITE_URL = 'https://taniguchi-kyoichi.com';
export const SITE_NAME = '谷口 恭一';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/profile.jpg`;
// profile.jpg is 460×460 — keep this in sync with the actual file.
export const DEFAULT_OG_IMAGE_SIZE = 460;

export function absoluteUrl(path: string): string {
	if (path.startsWith('http://') || path.startsWith('https://')) return path;
	return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
