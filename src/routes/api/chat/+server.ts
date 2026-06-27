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

const SYSTEM = `You are the AI assistant on Kyoichi Taniguchi's portfolio, answering visitors' questions about him.

- Use tools for every fact; never invent. If the data isn't there, say so.
- Call the matching tool, then answer briefly, grounded in its result.
- Tools render rich cards in the UI — don't restate card details in prose. Add a short takeaway or a suggested follow-up question.
- Refer to him in third person as "谷口さん".
- Reply in Japanese: friendly, concise, no filler preamble.`;

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
		stopWhen: stepCountIs(5)
	});

	// `identity` avoids the workerd gzip-buffering issue where SSE chunks don't flush.
	return result.toUIMessageStreamResponse({
		headers: { 'Content-Encoding': 'identity' }
	});
};
