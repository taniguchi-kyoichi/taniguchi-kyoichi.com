<script lang="ts">
	import type { ChatMessage } from '$lib/chat';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import OSSCard from '$lib/components/OSSCard.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import ProfileCard from './ProfileCard.svelte';
	import ContactCard from './ContactCard.svelte';
	import VideoCard from './VideoCard.svelte';
	import Markdown from './Markdown.svelte';
	import ToolSkeleton from './ToolSkeleton.svelte';

	interface Props {
		message: ChatMessage;
	}

	let { message }: Props = $props();

	// In-progress states show a skeleton; `output-error` renders nothing because
	// Workers AI models occasionally fail the first tool attempt and the AI SDK
	// retries — the successful retry renders the real card.
	function loading(state: string): boolean {
		return state === 'input-streaming' || state === 'input-available';
	}
</script>

{#each message.parts as part, i (i)}
	{#if part.type === 'text'}
		{#if part.text.trim()}
			<Markdown text={part.text} />
		{/if}

		<!-- getProfile -> ProfileCard -->
	{:else if part.type === 'tool-getProfile'}
		{#if part.state === 'output-available'}
			<ProfileCard profile={part.output} />
		{:else if loading(part.state)}
			<ToolSkeleton label="プロフィールを読み込み中…" />
		{/if}

		<!-- listProducts -> grid of ProductCard -->
	{:else if part.type === 'tool-listProducts'}
		{#if part.state === 'output-available'}
			{#if part.output.length > 0}
				<div class="grid gap-3 sm:grid-cols-2">
					{#each part.output as product (product.id)}
						<ProductCard {product} />
					{/each}
				</div>
			{:else}
				<p class="text-sm text-gray-500 dark:text-gray-400">該当するプロダクトはありません。</p>
			{/if}
		{:else if loading(part.state)}
			<ToolSkeleton label="プロダクトを探しています…" />
		{/if}

		<!-- getProductDetail -> single ProductCard -->
	{:else if part.type === 'tool-getProductDetail'}
		{#if part.state === 'output-available'}
			{#if part.output}
				<ProductCard product={part.output} />
			{:else}
				<p class="text-sm text-gray-500 dark:text-gray-400">そのプロダクトは見つかりませんでした。</p>
			{/if}
		{:else if loading(part.state)}
			<ToolSkeleton label="プロダクトの詳細を読み込み中…" />
		{/if}

		<!-- listOSS -> grid of OSSCard -->
	{:else if part.type === 'tool-listOSS'}
		{#if part.state === 'output-available'}
			<div class="grid gap-3 sm:grid-cols-2">
				{#each part.output as project (project.id)}
					<OSSCard {project} />
				{/each}
			</div>
		{:else if loading(part.state)}
			<ToolSkeleton label="OSS を探しています…" />
		{/if}

		<!-- getContact -> ContactCard -->
	{:else if part.type === 'tool-getContact'}
		{#if part.state === 'output-available'}
			<ContactCard contact={part.output} />
		{:else if loading(part.state)}
			<ToolSkeleton label="連絡先を読み込み中…" />
		{/if}

		<!-- listWritings / listReinArticles -> grid of ArticleCard -->
	{:else if part.type === 'tool-listWritings' || part.type === 'tool-listReinArticles'}
		{#if part.state === 'output-available'}
			{#if part.output.length > 0}
				<div class="grid gap-3 sm:grid-cols-2">
					{#each part.output as article (article.url)}
						<ArticleCard {article} />
					{/each}
				</div>
			{:else}
				<p class="text-sm text-gray-500 dark:text-gray-400">記事を取得できませんでした。</p>
			{/if}
		{:else if loading(part.state)}
			<ToolSkeleton label="記事を取得中…" />
		{/if}

		<!-- listVideos -> grid of VideoCard -->
	{:else if part.type === 'tool-listVideos'}
		{#if part.state === 'output-available'}
			{#if part.output.length > 0}
				<div class="grid gap-3 sm:grid-cols-2">
					{#each part.output as video (video.videoId)}
						<VideoCard {video} />
					{/each}
				</div>
			{:else}
				<p class="text-sm text-gray-500 dark:text-gray-400">動画を取得できませんでした。</p>
			{/if}
		{:else if loading(part.state)}
			<ToolSkeleton label="動画を取得中…" />
		{/if}
	{/if}
{/each}
