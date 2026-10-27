import type { Product } from '$lib/types';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

/** アプリの審査とアプリ内のリンクのために置いている、製品ごとの法務・サポートの面 */
export type LegalPage = 'terms' | 'privacy' | 'support';
export type LegalLanguage = 'ja' | 'en';

/**
 * 日本語は /products/<id>/<page>、英語は /en/products/<id>/<page>。
 * アプリ（ごほうび習慣の LegalLinks）がこの形の URL を組み立てているので、変えるときは両方を直す。
 */
export function legalPath(productId: string, page: LegalPage, lang: LegalLanguage): string {
	const base = `/products/${productId}/${page}`;
	return lang === 'en' ? `/en${base}` : base;
}

/** 英語のページがある製品だけ、日本語と英語を hreflang で結ぶ。日本語以外の人には英語を出す。 */
export function legalAlternates(product: Product, page: LegalPage): SEO['alternates'] {
	if (!product.en) return undefined;
	const ja = `${SITE_URL}${legalPath(product.id, page, 'ja')}`;
	const en = `${SITE_URL}${legalPath(product.id, page, 'en')}`;
	return [
		{ hreflang: 'ja', href: ja },
		{ hreflang: 'en', href: en },
		{ hreflang: 'x-default', href: en }
	];
}

const LEGAL_TITLE: Record<LegalPage, string> = {
	terms: 'Terms of Use',
	privacy: 'Privacy Policy',
	support: 'Support'
};

/** 英語のページの SEO。日本語のページと同じく、審査とアプリのための面なので検索には出さない。 */
export function englishLegalSeo(product: Product & { en: NonNullable<Product['en']> }, page: LegalPage): SEO {
	const title = LEGAL_TITLE[page];
	return {
		title: `${title} - ${product.en.name}`,
		description: `${title} for ${product.en.name}`,
		canonical: `${SITE_URL}${legalPath(product.id, page, 'en')}`,
		alternates: legalAlternates(product, page),
		locale: 'en_US',
		ogType: 'website',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: product.en.name,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary',
		noindex: true
	};
}
