import type { PageServerLoad } from './$types';
import { products } from '$lib/data/products';
import { error } from '@sveltejs/kit';
import { profile } from '$lib/data/profile';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

export const load: PageServerLoad = async ({ params }) => {
	const product = products.find((p) => p.id === params.id);

	if (!product) {
		throw error(404, 'Product not found');
	}

	const ogImage = product.thumbnail ? absoluteUrl(product.thumbnail) : DEFAULT_OG_IMAGE;

	const seo: SEO = {
		title: `${product.name} | ${SITE_NAME}`,
		description: product.description,
		canonical: `${SITE_URL}/products/${product.id}`,
		ogType: 'website',
		ogImage,
		ogImageAlt: product.name,
		ogImageWidth: product.thumbnail ? 1024 : 800,
		ogImageHeight: product.thumbnail ? 1024 : 800,
		twitterCard: 'summary',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': product.type === 'app' ? 'SoftwareApplication' : 'WebSite',
			name: product.name,
			description: product.description,
			url: `${SITE_URL}/products/${product.id}`,
			image: ogImage,
			applicationCategory: product.category ?? 'MobileApplication',
			operatingSystem: product.platforms.includes('ios')
				? 'iOS'
				: product.platforms.includes('macos')
					? 'macOS'
					: undefined,
			offers:
				product.price !== undefined
					? {
							'@type': 'Offer',
							price: product.price === '無料' ? '0' : product.price,
							priceCurrency: 'JPY'
						}
					: undefined,
			...(product.rating !== undefined
				? {
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: product.rating,
							ratingCount: product.ratingCount ?? 1,
							bestRating: 5
						}
					}
				: {}),
			author: { '@type': 'Person', name: profile.name, url: SITE_URL }
		}
	};

	return { product, seo };
};
