<script module lang="ts">
	// 浮き上がりはサイトを開いた最初の1回だけ。製品のページから戻るたびに繰り返すと、
	// アイコンが戻ってくる動き（View Transition）と重なってうるさくなる。
	let introPlayed = false;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { Product } from '$lib/types';
	import { devicesOf, purposeOf, themeStyle } from '$lib/productShowcase';

	interface Props {
		product: Product;
		/** 並びの何番目か。浮き上がりの時間差に使う */
		index?: number;
	}

	let { product, index = 0 }: Props = $props();

	const intro = !introPlayed;
	onMount(() => {
		introPlayed = true;
	});

	const devices = $derived(devicesOf(product));
</script>

<a
	href="/products/{product.id}"
	class="product-card group relative flex items-center gap-4 rounded-2xl p-4 sm:p-5 lg:flex-col lg:items-start lg:gap-3"
	class:intro
	style="{themeStyle(product)};--i:{index}"
	aria-label="{product.name}（{purposeOf(product)}）{devices ? `・${devices}` : ''}"
>
	{#if product.thumbnail}
		<img
			src={product.thumbnail}
			alt=""
			width="320"
			height="320"
			loading="lazy"
			class="h-16 w-16 shrink-0 rounded-[22%] sm:h-[72px] sm:w-[72px]"
			style="view-transition-name: product-icon-{product.id}"
		/>
	{/if}
	<div class="min-w-0 flex-1">
		<h3 class="product-name text-lg font-bold leading-snug">{product.name}</h3>
		<p class="product-purpose mt-0.5 text-sm leading-relaxed">{purposeOf(product)}</p>
		{#if devices}
			<p class="product-muted mt-1 text-xs">{devices}</p>
		{/if}
	</div>
	<svg
		class="product-chevron h-5 w-5 shrink-0 lg:absolute lg:right-5 lg:top-5"
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

<style>
	.product-card {
		background: var(--pw-bg);
		color: var(--pw-fg);
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--pw-fg) 10%, transparent),
			0 1px 2px rgb(0 0 0 / 0.06);
		transition:
			transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 200ms ease;
	}
	/* 製品名は語の途中で折り返さない。*/
	.product-name {
		font-family: 'Zen Kaku Gothic New', var(--font-sans);
		word-break: keep-all;
		overflow-wrap: anywhere;
	}
	/* キャッチは読点のあとでだけ折り返す（「ごほう／び」のように語の途中で切らない） */
	.product-purpose {
		word-break: keep-all;
		overflow-wrap: anywhere;
	}
	.product-muted {
		color: var(--pw-muted);
	}
	.product-chevron {
		color: var(--pw-accent);
		transition: transform 200ms ease;
	}
	.product-card:focus-visible {
		outline: 3px solid var(--color-primary-500);
		outline-offset: 3px;
	}

	@media (hover: hover) {
		.product-card:hover {
			transform: translateY(-2px);
			box-shadow:
				0 0 0 1px color-mix(in srgb, var(--pw-fg) 14%, transparent),
				0 10px 24px -8px rgb(0 0 0 / 0.25);
		}
		.product-card:hover .product-chevron {
			transform: translateX(3px);
		}
	}
	.product-card:active {
		transform: scale(0.985);
		transition-duration: 80ms;
	}

	/* 最初の1回だけ、上から順に少しずつ浮き上がる。終わったら普段の見た目に戻す（backwards）ので、ホバーの動きを邪魔しない */
	.intro {
		animation: card-rise 520ms cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
		animation-delay: calc(var(--i) * 70ms + 120ms);
	}
	@keyframes card-rise {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro {
			animation: none;
		}
		.product-card,
		.product-chevron {
			transition: none;
		}
		.product-card:hover,
		.product-card:active,
		.product-card:hover .product-chevron {
			transform: none;
		}
	}
</style>
