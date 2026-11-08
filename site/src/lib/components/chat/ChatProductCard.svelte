<script lang="ts">
	import type { ProductSummary } from '$lib/server/tools';

	interface Props {
		product: ProductSummary;
	}

	let { product }: Props = $props();

	const statusLabel: Record<string, string> = {
		production: '公開中',
		development: '開発中',
		archived: 'アーカイブ'
	};
	const statusColor: Record<string, string> = {
		production: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
		development: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
		archived: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
	};
</script>

<div
	class="flex gap-3 rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
>
	{#if product.thumbnail}
		<img
			src={product.thumbnail}
			alt={product.name}
			width="320"
			height="320"
			loading="lazy"
			class="h-14 w-14 shrink-0 rounded-xl object-cover shadow-sm"
		/>
	{/if}
	<div class="flex min-w-0 flex-1 flex-col">
		<div class="flex items-center gap-1.5">
			<p class="truncate text-sm font-semibold text-gray-900 dark:text-white">{product.name}</p>
			<span
				class="shrink-0 rounded-full px-1.5 py-px text-[10px] font-medium {statusColor[product.status]}"
			>
				{statusLabel[product.status] ?? product.status}
			</span>
		</div>
		{#if product.description}
			<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
				{product.description}
			</p>
		{/if}
		<div class="mt-auto flex items-center gap-3 pt-1.5 text-xs font-medium">
			<a
				href={product.link.url}
				target="_blank"
				rel="noopener noreferrer"
				class="text-primary-600 hover:underline dark:text-primary-400"
			>
				{product.link.label}
			</a>
			<a
				href="/products/{product.id}"
				class="text-gray-500 hover:underline dark:text-gray-400"
			>
				詳細
			</a>
		</div>
	</div>
</div>
