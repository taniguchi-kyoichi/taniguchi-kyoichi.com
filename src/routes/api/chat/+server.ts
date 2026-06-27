import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from 'ai';
import { createWorkersAI } from 'workers-ai-provider';
import { error } from '@sveltejs/kit';
import { tools } from '$lib/server/tools';
import type { RequestHandler } from './$types';

// Llama 3.3 70B (fp8, fast) supports function calling — needed for the tool loop.
const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

const SYSTEM = `あなたは谷口恭一（Kyoichi Taniguchi）のポートフォリオサイトに常駐する AI アシスタントです。
サイトを訪れた人の「谷口さんってどんな人？」「どんなアプリを作ってる？」といった質問に、ツールを使って答えます。

ルール:
- 事実は必ずツールから取得する。推測やでっち上げをしない。データに無いことは正直に「分かりません」と答える。
- まず質問に合うツールを呼び、その結果に基づいて簡潔な日本語で回答する。
- プロダクト・OSS・プロフィール・連絡先を紹介する時は対応するツールを呼ぶ（UI に専用カードが描画される）。
- カードに表示される詳細を本文で長々と繰り返さない。要点・おすすめポイント・次に聞くと良い質問を一言添える。
- 谷口さんは三人称で紹介する（例:「谷口さんは横浜在住の iOS エンジニアです」）。
- 丁寧だがフレンドリーに。冗長な前置きは省く。`;

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
