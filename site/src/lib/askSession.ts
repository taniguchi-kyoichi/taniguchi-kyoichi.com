import { goto } from '$app/navigation';

// Per-tab storage for the /ask conversation (restored on back-nav from a card
// detail) and the nonce of the last "fresh start" /ask has already handled.
export const ASK_STORAGE_KEY = 'ask-chat';
export const ASK_NONCE_KEY = 'ask-handled-nonce';

/**
 * Start a brand-new /ask conversation from the homepage ask box, a suggestion
 * chip, the ⌘K palette, or the mobile menu.
 *
 * The unique `n` nonce in the URL lets /ask reset itself even when it's already
 * mounted (same-route navigation doesn't remount the page). Back-navigation
 * from a card detail keeps the same nonce, so the conversation is restored
 * instead of reset.
 */
export function startAsk(q?: string): void {
	const params = new URLSearchParams();
	const text = q?.trim();
	if (text) params.set('q', text);
	params.set('n', Date.now().toString(36));
	goto(`/ask?${params.toString()}`);
}
