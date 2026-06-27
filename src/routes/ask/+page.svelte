<script lang="ts">
	import { Chat } from '@ai-sdk/svelte';
	import type { ChatMessage } from '$lib/chat';
	import MessageParts from '$lib/components/chat/MessageParts.svelte';

	const chat = new Chat<ChatMessage>({});

	let input = $state('');
	let scroller: HTMLDivElement | null = $state(null);

	const suggestions = [
		'谷口さんってどんな人？',
		'どんなアプリを作ってる？',
		'OSS 活動について教えて',
		'連絡を取りたい'
	];

	const busy = $derived(chat.status === 'submitted' || chat.status === 'streaming');
	const isEmpty = $derived(chat.messages.length === 0);

	function send(text: string) {
		const t = text.trim();
		if (!t || busy) return;
		chat.sendMessage({ text: t });
		input = '';
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		send(input);
	}

	// Auto-scroll to the latest message as the stream grows.
	$effect(() => {
		// touch reactive deps
		chat.messages.length;
		chat.status;
		if (scroller) scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
	});
</script>

<section class="mx-auto flex h-[calc(100vh-8rem)] max-w-3xl flex-col px-4 py-6 md:py-8">
	<header class="mb-4 shrink-0">
		<h1 class="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
			Ask AI <span class="text-primary-600 dark:text-primary-400">— 谷口恭一について聞く</span>
		</h1>
		<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
			サイトをめぐらなくても、ここで聞けば AI
			エージェントがプロダクト・OSS・経歴を構造化された UI で答えます。
		</p>
	</header>

	<!-- Messages -->
	<div bind:this={scroller} class="flex-1 space-y-4 overflow-y-auto pb-4">
		{#if isEmpty}
			<div class="flex flex-col items-start gap-3 rounded-xl bg-white p-4 dark:bg-gray-800">
				<p class="text-sm text-gray-700 dark:text-gray-300">
					こんにちは。谷口恭一の AI アシスタントです。下のボタンか、自由な質問からどうぞ。
				</p>
				<div class="flex flex-wrap gap-2">
					{#each suggestions as s (s)}
						<button
							type="button"
							onclick={() => send(s)}
							class="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:border-primary-700 dark:hover:bg-gray-700"
						>
							{s}
						</button>
					{/each}
				</div>
			</div>
		{/if}

		{#each chat.messages as message (message.id)}
			{#if message.role === 'user'}
				<div class="flex justify-end">
					<div
						class="max-w-[85%] rounded-2xl rounded-br-sm bg-primary-600 px-4 py-2 text-sm text-white"
					>
						{#each message.parts as part, i (i)}
							{#if part.type === 'text'}{part.text}{/if}
						{/each}
					</div>
				</div>
			{:else}
				<div class="flex justify-start">
					<div
						class="max-w-full space-y-3 text-gray-800 dark:text-gray-100"
					>
						<MessageParts {message} />
					</div>
				</div>
			{/if}
		{/each}

		{#if chat.status === 'submitted'}
			<div class="flex items-center gap-2 text-sm text-gray-400">
				<span
					class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600"
				></span>
				考えています…
			</div>
		{/if}

		{#if chat.error}
			<div
				class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
			>
				エラーが発生しました。もう一度お試しください。
				<button type="button" class="ml-1 underline" onclick={() => chat.clearError()}>閉じる</button>
			</div>
		{/if}
	</div>

	<!-- Input -->
	<form onsubmit={onSubmit} class="shrink-0 border-t border-gray-200 pt-3 dark:border-gray-800">
		<div class="flex items-end gap-2">
			<input
				bind:value={input}
				placeholder="谷口恭一について質問する…"
				class="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
			/>
			{#if busy}
				<button
					type="button"
					onclick={() => chat.stop()}
					class="rounded-xl bg-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
				>
					停止
				</button>
			{:else}
				<button
					type="submit"
					disabled={!input.trim()}
					class="rounded-xl bg-primary-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
				>
					送信
				</button>
			{/if}
		</div>
		<p class="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
			AI が生成した回答です。内容は谷口のプロフィール・プロダクト・OSS データに基づきます。
		</p>
	</form>
</section>
