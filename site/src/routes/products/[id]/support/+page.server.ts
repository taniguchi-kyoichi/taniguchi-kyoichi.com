import type { PageServerLoad } from './$types';
import { products } from '$lib/data/products';
import { error } from '@sveltejs/kit';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';
import { legalAlternates, legalProduct } from '$lib/legal';

export const load: PageServerLoad = async ({ params }) => {
	const product = products.find((p) => p.id === params.id);

	if (!product || !product.support) {
		throw error(404, 'Support page not found');
	}

	const seo: SEO = {
		title: `サポート - ${product.name}`,
		description: `${product.name} のサポート情報・FAQ`,
		canonical: `${SITE_URL}/products/${product.id}/support`,
		alternates: legalAlternates(product, 'support'),
		ogType: 'website',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: product.name,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary',
		// アプリ審査のために URL を生かしているだけの法務ページ。検索には出さない。
		noindex: true
	};

	return { product: legalProduct(product), seo };
};
