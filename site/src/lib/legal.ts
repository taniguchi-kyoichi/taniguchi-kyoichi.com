import type { Product, SubscriptionTrial } from '$lib/types';
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

/** 日本語の無料期間。「はじめの◯◯を無料で試せます」に入る形（7日間 / 1か月） */
export function trialLengthJa(trial: SubscriptionTrial): string {
	return trial.unit === 'day' ? `${trial.length}日間` : `${trial.length}か月`;
}

/** 英語の無料期間。「for the first ◯◯」に入る形（7 days / month / 3 months） */
export function trialSpanEn(trial: SubscriptionTrial): string {
	if (trial.length === 1) return trial.unit;
	return `${trial.length} ${trial.unit}s`;
}

/** 英語の無料期間。「a ◯◯ free trial」に入る形（7-day / 1-month） */
export function trialAdjectiveEn(trial: SubscriptionTrial): string {
	return `${trial.length}-${trial.unit}`;
}

/**
 * 法務ページに渡す製品のデータ。ページが使う項目（名前・アイコン・プライバシー・サポート・課金）だけにする。
 * 紹介文や技術の一覧は、画面に出さなくてもページのソースに載るので渡さない。
 */
export function legalProduct(product: Product): Product {
	const { en } = product;
	return {
		id: product.id,
		name: product.name,
		description: '',
		type: product.type,
		status: product.status,
		platforms: [],
		links: {},
		technologies: [],
		thumbnail: product.thumbnail,
		privacy: product.privacy,
		support: product.support,
		subscription: product.subscription,
		en: en && ({ name: en.name, privacy: en.privacy, support: en.support, subscription: en.subscription } as Product['en'])
	} as Product;
}

/** 法務ページの道か（/products/<id>/<page> と /en/products/<id>/<page>）。 */
export function isLegalPath(pathname: string): boolean {
	return /^(\/en)?\/products\/[^/]+\/(terms|privacy|support)\/?$/.test(pathname);
}
