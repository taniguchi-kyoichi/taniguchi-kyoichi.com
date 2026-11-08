/**
 * /api/chat に1問送り、UI message stream（SSE）を読んで1つの結果にまとめる。
 */

export interface ToolCall {
	name: string;
	input?: unknown;
	output?: unknown;
	error?: string;
}

export interface Usage {
	inputTokens?: number;
	outputTokens?: number;
	cachedInputTokens?: number;
	inputTokenDetails?: { noCacheTokens?: number; cacheReadTokens?: number; cacheWriteTokens?: number };
	reasoningTokens?: number;
}

export interface ChatResult {
	text: string;
	tools: ToolCall[];
	finishReason?: string;
	errors: string[];
	model?: string;
	usage?: Usage;
	ms: number;
	httpStatus: number;
}

export interface Turn {
	role: 'user' | 'assistant';
	text: string;
}

function uiMessages(turns: Turn[]) {
	return turns.map((t, i) => ({ id: `m${i}`, role: t.role, parts: [{ type: 'text', text: t.text }] }));
}

export async function ask(endpoint: string, turns: Turn[], timeoutMs = 60_000): Promise<ChatResult> {
	const started = Date.now();
	const res = await fetch(endpoint, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ messages: uiMessages(turns) }),
		signal: AbortSignal.timeout(timeoutMs)
	});
	const body = await res.text();
	const result: ChatResult = { text: '', tools: [], errors: [], ms: 0, httpStatus: res.status };
	const byId = new Map<string, ToolCall>();

	for (const line of body.split('\n')) {
		if (!line.startsWith('data:')) continue;
		const payload = line.slice(5).trim();
		if (!payload || payload === '[DONE]') continue;
		let chunk: Record<string, any>;
		try {
			chunk = JSON.parse(payload);
		} catch {
			continue;
		}
		switch (chunk.type) {
			case 'text-delta':
				result.text += chunk.delta ?? '';
				break;
			case 'tool-input-start':
			case 'tool-input-available': {
				const call = byId.get(chunk.toolCallId) ?? { name: chunk.toolName };
				if (chunk.input !== undefined) call.input = chunk.input;
				if (!byId.has(chunk.toolCallId)) {
					byId.set(chunk.toolCallId, call);
					result.tools.push(call);
				}
				break;
			}
			case 'tool-output-available': {
				const call = byId.get(chunk.toolCallId);
				if (call) call.output = chunk.output;
				break;
			}
			case 'tool-output-error':
			case 'tool-input-error': {
				const call = byId.get(chunk.toolCallId);
				if (call) call.error = chunk.errorText ?? 'error';
				break;
			}
			case 'error':
				result.errors.push(chunk.errorText ?? 'error');
				break;
			case 'finish':
				result.finishReason = chunk.finishReason;
				if (chunk.messageMetadata) applyMetadata(result, chunk.messageMetadata);
				break;
			case 'message-metadata':
				applyMetadata(result, chunk.messageMetadata);
				break;
		}
	}
	if (!res.ok && result.errors.length === 0) result.errors.push(`HTTP ${res.status}: ${body.slice(0, 200)}`);
	result.ms = Date.now() - started;
	return result;
}

function applyMetadata(result: ChatResult, meta: Record<string, any> | undefined) {
	if (!meta) return;
	if (meta.model) result.model = meta.model;
	if (meta.usage) result.usage = meta.usage;
}
