import { tool } from 'ai';
import { z } from 'zod';
import { profile, contact } from '$lib/data/profile';
import { products } from '$lib/data/products';
import { ossProjects } from '$lib/data/oss';

/**
 * Tools the AI agent can call to answer questions about Kyoichi.
 *
 * Each tool returns typed, structured data sourced from the same `$lib/data/*`
 * the site itself renders from. The tool output flows back to the model AND to
 * the client, where `MessageParts.svelte` maps each `tool-<name>` part to a
 * Svelte component (generative UI). Returning full objects lets the chat reuse
 * the site's existing `ProductCard` / `OSSCard` components verbatim.
 */
export const tools = {
	getProfile: tool({
		description:
			'谷口恭一の基本プロフィール（名前・肩書き・自己紹介・拠点・SNS）を取得する。「どんな人？」「自己紹介して」「経歴は？」などの質問に使う。',
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
		description:
			'谷口が開発したプロダクト（iOS アプリ等）の一覧を取得する。「どんなアプリを作ってる？」「プロダクトを見せて」「開発中のものは？」などに使う。',
		inputSchema: z.object({
			status: z
				.enum(['production', 'development', 'archived'])
				.optional()
				.describe('公開状況で絞り込む（production=公開中, development=開発中）')
		}),
		execute: async ({ status }) =>
			products.filter((p) => !status || p.status === status)
	}),

	getProductDetail: tool({
		description:
			'特定のプロダクトの詳細（機能・使用技術・レーティング・プライバシー方針）を ID で取得する。まず listProducts で ID を確認してから使う。',
		inputSchema: z.object({
			id: z.string().describe('listProducts で得たプロダクト ID（例: reading-memory）')
		}),
		execute: async ({ id }) => products.find((p) => p.id === id) ?? null
	}),

	listOSS: tool({
		// No input args on purpose: Workers AI models mis-stream boolean tool args
		// (first call errors, then retries), so we keep the schema empty and order
		// featured projects first instead of exposing a filter flag.
		description:
			'谷口が公開している OSS プロジェクトの一覧を取得する。「OSS は？」「ライブラリを作ってる？」「GitHub で何を公開してる？」などに使う。',
		inputSchema: z.object({}),
		execute: async () =>
			[...ossProjects].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
	}),

	getContact: tool({
		description:
			'谷口への連絡方法（メール・SNS）を取得する。「連絡したい」「仕事を依頼したい」「コンタクトは？」などに使う。',
		inputSchema: z.object({}),
		execute: async () => ({
			email: contact.email,
			message: contact.message,
			socialLinks: profile.socialLinks
		})
	})
};
