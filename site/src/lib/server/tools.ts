import { tool } from 'ai';
import { z } from 'zod';
import { profile, about, contact } from '$lib/data/profile';
import { products } from '$lib/data/products';
import { ossProjects } from '$lib/data/oss';
import { getWritings, getVideos } from '$lib/server/external';
import type { Product } from '$lib/types';

/**
 * Tools the AI agent calls to answer questions about Kyoichi.
 *
 * Each returns only what its card and the answer need. What a tool does not
 * return, the model cannot say — so the products' tech stack, privacy/terms
 * text and hidden products are kept out here rather than forbidden in the prompt.
 * The client (`MessageParts.svelte`) maps each `tool-<name>` part to a card.
 */

const SITE = 'https://taniguchi-kyoichi.com';

/** Where an answer should send a visitor: the official site if there is one, else the App Store. */
function primaryLink(p: Product): { label: string; url: string } {
	if (p.links.web) return { label: '公式サイト', url: p.links.web };
	if (p.links.appStore) return { label: 'App Store', url: p.links.appStore };
	return { label: '紹介ページ', url: `${SITE}/products/${p.id}` };
}

/** The language the reply is written in. Japanese replies get only the Japanese app name. */
export type ReplyLanguage = 'Japanese' | 'English';

function summary(p: Product, language: ReplyLanguage) {
	return {
		id: p.id,
		name: p.name,
		...(language === 'English' && p.en?.name ? { nameEn: p.en.name } : {}),
		description: p.description,
		status: p.status,
		thumbnail: p.thumbnail,
		price: p.price,
		rating: p.rating,
		ratingCount: p.ratingCount,
		link: primaryLink(p),
		appStore: p.links.appStore,
		page: `${SITE}/products/${p.id}`
	};
}
export type ProductSummary = ReturnType<typeof summary>;

function detail(p: Product, language: ReplyLanguage) {
	const s = p.subscription;
	return {
		...summary(p, language),
		category: p.category,
		features: p.features ?? [],
		audience: p.audience,
		why: p.why,
		plan: s && {
			name: s.planName,
			prices: s.prices,
			free: s.free,
			paid: s.paid,
			trial: s.trial && `${s.trial.period}に${s.trial.length}${s.trial.unit === 'day' ? '日' : 'か月'}の無料お試し`
		}
	};
}

const publicProducts = () => products.filter((p) => !p.hidden);

export function toolsFor(language: ReplyLanguage) {
	return {
	getProfile: tool({
		description: 'Who Kyoichi is: short bio, background, interests, location, social links.',
		inputSchema: z.object({}),
		execute: async () => ({
			name: profile.name,
			nameEn: profile.nameEn,
			title: profile.title,
			bio: about.bio,
			background: about.background,
			interests: about.interests,
			avatar: profile.avatar,
			location: profile.location,
			socialLinks: profile.socialLinks
		})
	}),

	listProducts: tool({
		description: 'His public apps, with a one-line description, status, price, rating and the link to send visitors to.',
		inputSchema: z.object({}),
		execute: async () => publicProducts().map((p) => summary(p, language))
	}),

	getProductDetail: tool({
		description:
			'One app in detail: features, who it is for (audience), why he built it (why), paid plan and prices, links. ids: reading-memory (読書メモリー), gohobi-shukan (ごほうび習慣 / Reward Habits), jibun-bgm (じぶんBGM).',
		inputSchema: z.object({ id: z.string().describe('product id') }),
		execute: async ({ id }) => {
			const p = publicProducts().find((p) => p.id === id);
			return p ? detail(p, language) : null;
		}
	}),

	listOSS: tool({
		description: 'His open-source libraries and tools.',
		inputSchema: z.object({}),
		execute: async () =>
			[...ossProjects]
				.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
				.map(({ id, name, description, category, language, repository }) => ({
					id,
					name,
					description,
					category,
					language,
					repository
				}))
	}),

	getContact: tool({
		description: 'How to contact him and how he takes work requests: email, social links.',
		inputSchema: z.object({}),
		execute: async () => ({
			email: contact.email,
			message: contact.message,
			work: about.work,
			socialLinks: [...profile.socialLinks, ...(profile.secondaryLinks ?? [])]
		})
	}),

	listWritings: tool({
		description: 'His latest blog posts on Zenn and note (live).',
		inputSchema: z.object({
			source: z.enum(['zenn', 'note', 'all']).optional().describe('default all')
		}),
		execute: async ({ source }) =>
			(await getWritings(source ?? 'all')).map(({ title, url, publishedAt, source, thumbnail }) => ({
				title,
				url,
				publishedAt,
				source,
				thumbnail
			}))
	}),

	listVideos: tool({
		description: 'His latest YouTube videos (live).',
		inputSchema: z.object({}),
		execute: async () => getVideos()
	})
	};
}
