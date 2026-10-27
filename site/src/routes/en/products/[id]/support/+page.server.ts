import type { PageServerLoad } from './$types';
import { products } from '$lib/data/products';
import { error } from '@sveltejs/kit';
import { englishLegalSeo } from '$lib/legal';

export const load: PageServerLoad = async ({ params }) => {
	const product = products.find((p) => p.id === params.id);
	const en = product?.en;

	if (!product || !en || !product.support || !en.support) {
		throw error(404, 'Not found');
	}

	return { product, en, seo: englishLegalSeo({ ...product, en }, 'support') };
};
