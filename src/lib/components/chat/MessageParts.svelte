<script lang="ts">
	import type { ChatMessage } from '$lib/chat';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import OSSCard from '$lib/components/OSSCard.svelte';
	import ProfileCard from './ProfileCard.svelte';
	import ContactCard from './ContactCard.svelte';
	import ToolSkeleton from './ToolSkeleton.svelte';

	interface Props {
		message: ChatMessage;
	}

	let { message }: Props = $props();
</script>

{#each message.parts as part, i (i)}
	{#if part.type === 'text'}
		{#if part.text.trim()}
			<p class="whitespace-pre-wrap text-sm leading-relaxed">{part.text}</p>
		{/if}

		<!-- getProfile -> ProfileCard -->
	{:else if part.type === 'tool-getProfile'}
		{#if part.state === 'output-available'}
			<ProfileCard profile={part.output} />
		{:else if part.state === 'output-error'}
			<ToolSkeleton error={part.errorText} />
		{:else}
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
		{:else if part.state === 'output-error'}
			<ToolSkeleton error={part.errorText} />
		{:else}
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
		{:else if part.state === 'output-error'}
			<ToolSkeleton error={part.errorText} />
		{:else}
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
		{:else if part.state === 'output-error'}
			<ToolSkeleton error={part.errorText} />
		{:else}
			<ToolSkeleton label="OSS を探しています…" />
		{/if}

		<!-- getContact -> ContactCard -->
	{:else if part.type === 'tool-getContact'}
		{#if part.state === 'output-available'}
			<ContactCard contact={part.output} />
		{:else if part.state === 'output-error'}
			<ToolSkeleton error={part.errorText} />
		{:else}
			<ToolSkeleton label="連絡先を読み込み中…" />
		{/if}
	{/if}
{/each}
