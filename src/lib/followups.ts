import type { ChatMessage } from '$lib/chat';

// Deterministic follow-up suggestions keyed by which tools the assistant used.
// Cheap and reliable (no extra model call), and keeps the conversation flowing.
const BY_TOOL: Record<string, string[]> = {
	'tool-getProfile': ['どんなアプリを作ってる？', 'AIをどう開発に活かしてる？', '仕事の依頼はできる？'],
	'tool-listProducts': ['一番こだわったアプリは？', 'なぜそれを作ったの？', 'どんな技術で作ってる？'],
	'tool-getProductDetail': ['なぜこのアプリを作ったの？', '開発で工夫した点は？', '他のアプリも見たい'],
	'tool-listOSS': ['一番使われてるOSSは？', 'なぜOSSを公開してる？', 'どんなアプリを作ってる？'],
	'tool-listWritings': ['最近の関心テーマは？', 'AIについてどう考えてる？', 'Reinって何？'],
	'tool-listReinArticles': ['Reinってどんなメディア？', '作ったアプリは？'],
	'tool-listVideos': ['どんな発信をしてる？', '作ったアプリは？'],
	'tool-getContact': ['得意な技術領域は？', 'どんなアプリを作ってる？']
};

const FALLBACK = ['どんなアプリを作ってる？', 'AIをどう開発に活かしてる？', '最近の関心テーマは？'];

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
