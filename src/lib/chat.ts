import type { InferUITools, UIMessage } from 'ai';
import type { tools } from '$lib/server/tools';

// `import type` is erased at build time, so pulling the tool *types* (not the
// runtime, server-only module) into client code is safe. This makes each
// `tool-<name>` message part fully typed on the client, so `part.output`
// carries the exact shape the tool returned — the basis for typed generative UI.
export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, never, ChatTools>;
