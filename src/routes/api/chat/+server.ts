import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from 'ai';
import { createWorkersAI } from 'workers-ai-provider';
import { error } from '@sveltejs/kit';
import { tools } from '$lib/server/tools';
import type { RequestHandler } from './$types';

// Llama 4 Scout returns *structured* tool calls and follows the JP persona well.
// (Tested alternatives on Workers AI: llama-3.3-70b-fp8-fast emits tool calls as
// plain-text JSON — never parsed; mistral-small-3.1 double-streams tool args and
// errors. Scout is the reliable free option here.)
const MODEL = '@cf/meta/llama-4-scout-17b-16e-instruct';

const SYSTEM = `You are the AI assistant on Kyoichi Taniguchi's portfolio, answering visitors' questions (Japanese or English) about him.

Treat every message as a valid question about Kyoichi — never reply that the input is incomplete or ask the visitor to clarify.

When to use tools (they fetch facts AND render a card in the UI):
- Call a tool when the visitor wants to SEE items, or for facts not already in this conversation.
- For the first or ambiguous question, call getProfile.
- For follow-up questions you can already answer from earlier tool results (e.g. "why did he build it?", "tell me more"), reply in TEXT only. Do NOT re-call the same tool or repeat a card already shown — that's redundant.

Keep text VERY short:
- When a tool renders cards (products / articles / videos / OSS), the UI ALREADY shows every item. Your text must be ONE short sentence that does NOT mention any specific title or detail, and must NOT contain a list, bullets (-, *), or numbers (1. 2.). Good examples: "最新の記事はこちらです。" / "Here are his latest articles." Then STOP.
- For text-only answers (no card), at most 2-3 short sentences.

- Never invent facts; if the data isn't there, say so plainly.
- Refer to him in third person — "谷口さん" (Japanese) / "Kyoichi" (English).
- Match the visitor's language. Friendly, concise, no filler preamble.`;

export const POST: RequestHandler = async ({ request, platform }) => {
	const ai = platform?.env?.AI;
	if (!ai) {
		throw error(503, 'AI binding is not available in this environment.');
	}

	const { messages }: { messages: UIMessage[] } = await request.json();

	const workersai = createWorkersAI({ binding: ai });

	const result = streamText({
		model: workersai(MODEL),
		system: SYSTEM,
		messages: await convertToModelMessages(messages),
		tools,
		// 3 steps covers tool-call → (optional 2nd tool) → synthesize, while
		// keeping neuron usage down (Workers AI free tier is 10k neurons/day).
		stopWhen: stepCountIs(3),
		// Safety net so a reply never cuts off mid-sentence; the prompt keeps
		// answers short, so normal responses finish well under this.
		maxOutputTokens: 800
	});

	// `identity` avoids the workerd gzip-buffering issue where SSE chunks don't flush.
	return result.toUIMessageStreamResponse({
		headers: { 'Content-Encoding': 'identity' },
		onError: (error) => {
			const message = error instanceof Error ? error.message : String(error);
			// Workers AI daily free quota / capacity / rate errors → friendly copy.
			if (/neuron|4006|capacity|429|rate.?limit|too many/i.test(message)) {
				return 'AI が一時的に混み合っています。少し時間をおいてお試しください。';
			}
			return 'エラーが発生しました。もう一度お試しください。';
		}
	});
};
