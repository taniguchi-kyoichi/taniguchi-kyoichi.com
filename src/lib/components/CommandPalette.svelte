<script lang="ts">
	import { palette } from '$lib/stores/commandPalette.svelte';
	import { goto } from '$app/navigation';
	import { fade, scale } from 'svelte/transition';

	let input = $state('');
	let inputEl: HTMLInputElement | null = $state(null);

	const suggestions = ['どんなアプリを作ってる？', '最近書いた記事は？', 'OSS活動について', '連絡を取りたい'];

	function close() {
		palette.open = false;
		input = '';
	}

	function submit(q?: string) {
		const text = (q ?? input).trim();
		close();
		goto(text ? `/ask?q=${encodeURIComponent(text)}` : '/ask');
	}

	function onKeydown(event: KeyboardEvent) {
		if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			palette.open = !palette.open;
		} else if (event.key === 'Escape' && palette.open) {
			event.preventDefault();
			close();
		}
	}

	// Focus the field as soon as the palette opens.
	$effect(() => {
		if (palette.open && inputEl) inputEl.focus();
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if palette.open}
	<div class="fixed inset-0 z-[60] px-4" role="dialog" aria-modal="true" aria-label="AI に質問">
		<!-- backdrop -->
		<button
			type="button"
			class="absolute inset-0 cursor-default bg-gray-900/40 backdrop-blur-sm dark:bg-black/50"
			aria-label="閉じる"
			onclick={close}
			transition:fade={{ duration: 150 }}
		></button>

		<!-- panel -->
		<div
			class="relative mx-auto mt-[14vh] w-full max-w-xl"
			transition:scale={{ duration: 160, start: 0.97, opacity: 0 }}
		>
			<form onsubmit={(e) => { e.preventDefault(); submit(); }} class="ai-field relative">
				<input
					bind:this={inputEl}
					bind:value={input}
					placeholder="谷口について AI に聞く…"
					aria-label="谷口について AI に質問する"
					class="w-full rounded-full border border-transparent bg-white py-4 pl-5 pr-28 text-sm text-gray-900 shadow-2xl outline-none dark:bg-gray-800 dark:text-white"
				/>
				<button
					type="submit"
					class="ai-button absolute right-1.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-full px-4 py-2.5 text-sm font-medium text-white"
				>
					<span class="ai-sparkle" aria-hidden="true">✦</span> 聞く
				</button>
			</form>

			<div class="mt-3 flex flex-wrap justify-center gap-2">
				{#each suggestions as s (s)}
					<button
						type="button"
						onclick={() => submit(s)}
						class="rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-xs text-gray-600 shadow-sm transition-colors hover:border-primary-300 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-primary-600 dark:hover:text-primary-400"
					>
						{s}
					</button>
				{/each}
			</div>

			<p class="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
				<kbd class="rounded border border-gray-300 px-1 dark:border-gray-600">Enter</kbd> で送信 ·
				<kbd class="rounded border border-gray-300 px-1 dark:border-gray-600">Esc</kbd> で閉じる
			</p>
		</div>
	</div>
{/if}
