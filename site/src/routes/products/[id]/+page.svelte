<script lang="ts">
	import StoreBadges from '$lib/components/StoreBadges.svelte';
	import { themeStyle } from '$lib/productShowcase';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const product = $derived(data.product);
	const showcase = $derived(product.showcase);

	// 世界観を持たない製品（一覧から外した物など）は飾りのない色で出す
	const worldStyle = $derived(themeStyle(product));
</script>

<svelte:head>
	{#if data.appStoreId}
		<!-- iPhone の Safari の上に出る App Store の帯（Smart App Banner） -->
		<meta name="apple-itunes-app" content="app-id={data.appStoreId}" />
	{/if}
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@700&family=Zen+Old+Mincho:wght@600&display=swap"
	/>
</svelte:head>

<article class="world" style={worldStyle}>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<a href="/#products" class="back-link">
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			アプリの一覧へ
		</a>

		<!-- 最初の画面: アイコン・名前・キャッチ・説明1文・入手・価格 -->
		<header class="hero">
			<div class="flex items-center gap-4">
				{#if product.thumbnail}
					<img
						src={product.thumbnail}
						alt=""
						width="320"
						height="320"
						fetchpriority="high"
						class="hero-icon"
						style="view-transition-name: product-icon-{product.id}"
					/>
				{/if}
				<h1 class="name">{product.name}</h1>
			</div>

			{#if showcase}
				<p class="catch">{showcase.catch}</p>
			{/if}
			<p class="lead">{showcase?.lead ?? product.description}</p>

			<div class="mt-7">
				<StoreBadges appStore={product.links.appStore} googlePlay={product.links.googlePlay} />
			</div>
			{#if data.priceLine}
				<p class="price">{data.priceLine}</p>
			{/if}
		</header>
	</div>

	<!-- アプリの画面の写真。横にスクロール（次の1枚が少し見えている） -->
	{#if showcase?.screenshots.length}
		<section aria-label="アプリの画面" class="shots-wrap">
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul class="shots" tabindex="0" aria-label="アプリの画面の写真（横にスクロールできます）">
				{#each showcase.screenshots as shot, i}
					<li class="shot">
						<img
							src={shot.src}
							alt={shot.alt}
							width="460"
							height="999"
							loading={i < 2 ? 'eager' : 'lazy'}
							decoding="async"
						/>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		{#if showcase}
			<!-- 場面3つ -->
			<section class="scenes" aria-label="使う場面">
				{#each showcase.scenes as scene, i}
					<div class="scene">
						<p class="scene-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
						<h2 class="scene-title">{scene.title}</h2>
						<p class="scene-body">{scene.body}</p>
					</div>
				{/each}
			</section>

			<!-- 締めの一言ともう一度入手 -->
			<section class="closing" aria-label="入手">
				<p class="closing-line">{showcase.closing}</p>
				<StoreBadges
					appStore={product.links.appStore}
					googlePlay={product.links.googlePlay}
					align="center"
				/>
			</section>
		{/if}

		{#if product.links.web}
			<p class="official">
				くわしくは
				<a href={product.links.web} target="_blank" rel="noopener noreferrer">公式サイト ↗</a>
			</p>
		{/if}

		<!-- 規約類はページの一番下に細い1行で -->
		{#if data.legalLinks.length}
			<nav class="legal" aria-label="サポートと規約">
				<ul>
					{#each data.legalLinks as link}
						<li>
							<a href={link.href} lang={link.lang} hreflang={link.lang}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
</article>

<style>
	/* 製品の世界観。サイトのテーマ（明るい／暗い）に関係なく固定 */
	.world {
		background: var(--pw-bg);
		color: var(--pw-fg);
		min-height: 100vh;
		padding-bottom: 1.5rem;
		color-scheme: light;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		margin-top: 1.25rem;
		padding: 0.5rem 0;
		font-size: 0.875rem;
		color: var(--pw-muted);
	}
	.back-link:hover {
		color: var(--pw-fg);
	}

	.hero {
		padding: 1rem 0 2.5rem;
		max-width: 40rem;
	}
	.hero-icon {
		width: 80px;
		height: 80px;
		flex-shrink: 0;
		border-radius: 22%;
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--pw-fg) 10%, transparent),
			0 8px 24px -10px rgb(0 0 0 / 0.35);
	}
	@media (min-width: 640px) {
		.hero-icon {
			width: 96px;
			height: 96px;
		}
	}
	.name {
		font-family: 'Zen Kaku Gothic New', var(--font-sans);
		font-weight: 700;
		font-size: 1.5rem;
		line-height: 1.3;
	}
	.catch {
		margin-top: 1.5rem;
		font-family: 'Zen Old Mincho', serif;
		font-weight: 600;
		font-size: clamp(1.625rem, 6.4vw, 2.75rem);
		line-height: 1.35;
		letter-spacing: 0.02em;
		/* 読点のあとで折り返す（語の途中で切らない） */
		word-break: keep-all;
		overflow-wrap: anywhere;
	}
	/* 対応するブラウザでは文節で折り返す（「1／冊」のように数と助数詞が離れない） */
	.lead,
	.scene-body {
		word-break: auto-phrase;
	}
	.lead {
		margin-top: 0.875rem;
		font-size: 1rem;
		line-height: 1.85;
	}
	.price {
		margin-top: 1rem;
		font-size: 0.8125rem;
		color: var(--pw-muted);
	}

	.shots-wrap {
		padding-bottom: 1rem;
	}
	.shots {
		--gutter: max(1rem, calc((100vw - 64rem) / 2 + 2rem));
		display: flex;
		gap: 0.875rem;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: var(--gutter);
		padding: 0.5rem var(--gutter) 1rem;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--pw-fg) 25%, transparent) transparent;
	}
	@media (prefers-reduced-motion: no-preference) {
		.shots {
			scroll-behavior: smooth;
		}
	}
	.shots:focus-visible {
		outline: 3px solid var(--pw-accent);
		outline-offset: -3px;
	}
	.shot {
		/* スマホでは1枚半が見える幅にして、横に続いていることが分かるようにする */
		flex: 0 0 62%;
		max-width: 15rem;
		scroll-snap-align: start;
	}
	@media (min-width: 640px) {
		.shot {
			flex-basis: 14rem;
		}
	}
	.shot img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 1.25rem;
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--pw-fg) 10%, transparent),
			0 12px 28px -14px rgb(0 0 0 / 0.4);
	}

	.scenes {
		display: grid;
		gap: 2rem;
		padding: 2.5rem 0 1rem;
	}
	@media (min-width: 768px) {
		.scenes {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 2.5rem;
		}
	}
	.scene-no {
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--pw-accent);
	}
	.scene-title {
		margin-top: 0.375rem;
		font-family: 'Zen Old Mincho', serif;
		font-weight: 600;
		font-size: 1.25rem;
		line-height: 1.55;
		word-break: keep-all;
		overflow-wrap: anywhere;
	}
	.scene-body {
		margin-top: 0.625rem;
		font-size: 0.9375rem;
		line-height: 1.9;
	}

	.closing {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding: 3.5rem 0 3rem;
		text-align: center;
	}
	.closing-line {
		font-family: 'Zen Old Mincho', serif;
		font-weight: 600;
		font-size: clamp(1.25rem, 5vw, 1.75rem);
		line-height: 1.5;
		word-break: keep-all;
		overflow-wrap: anywhere;
	}

	.official {
		text-align: center;
		font-size: 0.875rem;
		color: var(--pw-muted);
		padding-bottom: 2rem;
	}
	.official a {
		color: var(--pw-fg);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.legal {
		border-top: 1px solid color-mix(in srgb, var(--pw-fg) 15%, transparent);
		padding-top: 1rem;
	}
	.legal ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		row-gap: 0.25rem;
		font-size: 0.75rem;
		color: var(--pw-muted);
	}
	.legal li {
		white-space: nowrap;
	}
	.legal li + li::before {
		content: '・';
		padding: 0 0.25rem;
	}
	.legal a {
		color: var(--pw-muted);
		padding: 0.25rem 0;
	}
	.legal a:hover {
		color: var(--pw-fg);
		text-decoration: underline;
	}

	.world a:focus-visible {
		outline: 2px solid var(--pw-accent);
		outline-offset: 2px;
		border-radius: 2px;
	}
</style>
