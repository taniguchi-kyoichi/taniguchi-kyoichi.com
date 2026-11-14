<script lang="ts">
	import type { ProductSummary } from '$lib/server/tools';

	interface Props {
		product: ProductSummary;
	}

	let { product }: Props = $props();

	// トップのカードと同じく、カード全体が製品のページへの1つのリンク。入手のボタンは製品のページだけに出す
	const devices = $derived(
		[product.appStore && 'iPhone', product.googlePlay && 'Android'].filter(Boolean).join('・')
	);
</script>

<a
	href="/products/{product.id}"
	class="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-colors hover:border-primary-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
>
	{#if product.thumbnail}
		<img
			src={product.thumbnail}
			alt=""
			width="320"
			height="320"
			loading="lazy"
			class="h-14 w-14 shrink-0 rounded-xl object-cover shadow-sm"
		/>
	{/if}
	<div class="min-w-0 flex-1">
		<p class="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</p>
		{#if product.description}
			<p class="mt-0.5 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
				{product.description}
			</p>
		{/if}
		{#if devices}
			<p class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{devices}</p>
		{/if}
	</div>
	<svg
		class="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
	>
		<path
			fill-rule="evenodd"
			d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
			clip-rule="evenodd"
		/>
	</svg>
</a>
