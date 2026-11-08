import type { UIMessage } from 'ai';

/**
 * Apps that are not public (taken off the site, or not announced). A visitor can
 * still type one of these names, and a model told "don't mention it" repeats the
 * name anyway while declining. So the name never reaches the model: it is swapped
 * for a neutral word in the visitor's messages before the request is sent.
 */
const UNLISTED = /ストックレーダー|stock\s?radar|\brein\b|つもふ|tsumofu/gi;

export function withoutUnlistedNames(messages: UIMessage[], language: 'Japanese' | 'English'): UIMessage[] {
	const placeholder = language === 'Japanese' ? '公開していないアプリ' : 'an app that is not public';
	return messages.map((m) =>
		m.role !== 'user'
			? m
			: {
					...m,
					parts: m.parts.map((p) => (p.type === 'text' ? { ...p, text: p.text.replace(UNLISTED, placeholder) } : p))
				}
	);
}
