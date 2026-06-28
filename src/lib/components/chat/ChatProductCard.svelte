<script lang="ts">
	import type { Product } from '$lib/types';

	interface Props {
		product: Product;
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

<a
	href="/products/{product.id}"
	class="group flex gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-colors hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
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
		<span
			class="mt-auto inline-flex items-center gap-0.5 pt-1.5 text-xs font-medium text-primary-600 dark:text-primary-400"
		>
			詳細
			<svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</span>
	</div>
</a>
