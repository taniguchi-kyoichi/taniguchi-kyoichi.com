<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { browser } from '$app/environment';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	// LLM output is markdown. Parse with marked, then sanitize with DOMPurify
	// (defense against prompt-injected HTML). DOMPurify needs the DOM, so it runs
	// only in the browser; on the server we fall back to auto-escaped plain text
	// (assistant messages only ever render client-side anyway).
	const html = $derived(
		browser ? DOMPurify.sanitize(marked.parse(text, { async: false, gfm: true, breaks: true })) : ''
	);
</script>

<div
	class="prose prose-sm max-w-none dark:prose-invert prose-p:my-1.5 prose-headings:mt-3 prose-headings:mb-1.5 prose-ul:my-1.5 prose-li:my-0 prose-a:text-primary-600 dark:prose-a:text-primary-400"
>
	{#if browser}
		{@html html}
	{:else}
		{text}
	{/if}
</div>
