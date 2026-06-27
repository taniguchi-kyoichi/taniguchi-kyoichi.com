import { tool } from 'ai';
import { z } from 'zod';
import { profile, contact } from '$lib/data/profile';
import { products } from '$lib/data/products';
import { ossProjects } from '$lib/data/oss';
import { getWritings, getReinArticles, getVideos } from '$lib/server/external';

/**
 * Tools the AI agent calls to answer questions about Kyoichi.
 *
 * Each returns typed, structured data; the client (`MessageParts.svelte`) maps
 * each `tool-<name>` part to a Svelte component, reusing the site's own cards.
 * Static tools read `$lib/data/*`; the `list*` content tools fetch live from
 * external services (Zenn/note/Rein RSS, YouTube API) via `$lib/server/external`.
 *
 * Tool descriptions are intentionally terse English for cheap, accurate routing.
 * Avoid boolean/number args: Workers AI models mis-stream them (first call errors,
 * then retries). Enum and string args are fine.
 */
export const tools = {
	getProfile: tool({
		description: "Kyoichi's profile: name, role, bio, location, socials. For 'who is he / about / background'.",
		inputSchema: z.object({}),
		execute: async () => ({
			name: profile.name,
			nameEn: profile.nameEn,
			title: profile.title,
			bio: profile.bio,
			avatar: profile.avatar,
			location: profile.location,
			socialLinks: profile.socialLinks
		})
	}),

	listProducts: tool({
		description: "Kyoichi's products (iOS apps etc). For 'what apps / products'. Optional status filter.",
		inputSchema: z.object({
			status: z.enum(['production', 'development', 'archived']).optional().describe('filter by status')
		}),
		execute: async ({ status }) => products.filter((p) => !status || p.status === status)
	}),

	getProductDetail: tool({
		description: 'Full detail of one product by id (features, tech, rating, privacy). Call listProducts first for the id.',
		inputSchema: z.object({
			id: z.string().describe('product id from listProducts, e.g. reading-memory')
		}),
		execute: async ({ id }) => products.find((p) => p.id === id) ?? null
	}),

	listOSS: tool({
		description: "Kyoichi's open-source projects. For 'OSS / libraries / GitHub'.",
		inputSchema: z.object({}),
		execute: async () =>
			[...ossProjects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
	}),

	getContact: tool({
		description: "How to reach Kyoichi (email, socials). For 'contact / hire / get in touch'.",
		inputSchema: z.object({}),
		execute: async () => ({
			email: contact.email,
			message: contact.message,
			socialLinks: profile.socialLinks
		})
	}),

	listWritings: tool({
		description: "Kyoichi's latest tech blog posts from Zenn and note, live. For 'articles / blog / writing'. Optional source filter.",
		inputSchema: z.object({
			source: z.enum(['zenn', 'note', 'all']).optional().describe('which platform; default all')
		}),
		execute: async ({ source }) => getWritings(source ?? 'all')
	}),

	listReinArticles: tool({
		description: "Latest articles from Rein, Kyoichi's cognitive-science media, live. For 'Rein / media articles'.",
		inputSchema: z.object({}),
		execute: async () => getReinArticles()
	}),

	listVideos: tool({
		description: "Kyoichi's latest YouTube videos, live. For 'videos / YouTube'.",
		inputSchema: z.object({}),
		execute: async () => getVideos()
	})
};
