import type { ChatMessage } from '$lib/chat';

// Deterministic follow-up suggestions keyed by which tools the assistant used.
// Cheap and reliable (no extra model call), and keeps the conversation flowing.
const BY_TOOL: Record<string, string[]> = {
	'tool-getProfile': ['どんなアプリを作ってる？', '最近の記事は？', '仕事の依頼はできる？'],
	'tool-listProducts': ['なぜそれを作ったの？', '誰のためのアプリ？', '料金は？'],
	'tool-getProductDetail': ['なぜこのアプリを作ったの？', '誰のためのアプリ？', '他のアプリも見たい'],
	'tool-listOSS': ['どんなアプリを作ってる？', '最近の記事は？'],
	'tool-listWritings': ['YouTubeの動画はある？', '作ったアプリは？'],
	'tool-listVideos': ['最近の記事は？', '作ったアプリは？'],
	'tool-getContact': ['どんなアプリを作ってる？', '谷口さんってどんな人？']
};

const FALLBACK = ['どんなアプリを作ってる？', '谷口さんってどんな人？', '仕事の依頼はできる？'];

/** Up to 3 contextual next-questions based on the assistant message's tool calls. */
export function followupsFor(message: ChatMessage): string[] {
	if (message.role !== 'assistant') return [];
	const seen = new Set<string>();
	const out: string[] = [];
	for (const part of message.parts) {
		for (const q of BY_TOOL[part.type] ?? []) {
			if (!seen.has(q)) {
				seen.add(q);
				out.push(q);
			}
		}
	}
	return (out.length > 0 ? out : FALLBACK).slice(0, 3);
}
