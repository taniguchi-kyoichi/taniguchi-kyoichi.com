<script lang="ts">
	import { profile, contact } from '$lib/data/profile';
	import { visibleProducts, buildingInPublic } from '$lib/data/products';
	import { featuredOSS, ossProjects } from '$lib/data/oss';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import OSSCard from '$lib/components/OSSCard.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import { formatDate } from '$lib/utils/rss';
	import { onMount } from 'svelte';
	import { startAsk } from '$lib/askSession';
	import { isDebug } from '$lib/debug';

	let { data } = $props();


	let askInput = $state('');

	// Short, tidy chips. They stay light-weight, while the answers they trigger
	// pull live content (latest articles/videos) — so "freshness" lives in the
	// response, not in cramped chip text. The video chip depends on real data.
	const askSuggestions = $derived.by(() => {
		const chips: { label: string; q: string }[] = [
			{ label: '📱 作ったアプリ', q: 'どんなアプリを作ってる？' },
			{ label: '📝 最近の記事', q: '最近書いた記事を教えて' }
		];
		if (data.youtubePlaylist?.videos?.length) {
			chips.push({ label: '▶ 最新の動画', q: '最新の YouTube 動画について教えて' });
		}
		chips.push({ label: '🧩 OSS は？', q: 'OSS 活動について教えて' });
		return chips;
	});

	function askAI(event: SubmitEvent) {
		event.preventDefault();
		startAsk(askInput); // always a fresh conversation from the top
	}

	function askChip(q: string) {
		startAsk(q);
	}

	// --- Typewriter placeholder for the AI ask box ---
	// Short examples (no long prefix) so the typing stays fully visible on mobile.
	const askExamples = [
		'どんなアプリを作ってる？',
		'最近書いた記事は？',
		'OSS活動について',
		'作ったアプリは？',
		'連絡を取りたい'
	];

	const STATIC_PLACEHOLDER = 'AI に質問する…';
	let typed = $state('');
	let askFocused = $state(false);
	let animate = $state(false);

	const placeholder = $derived(
		animate && !askFocused && !askInput ? `${typed}▌` : STATIC_PLACEHOLDER
	);

	onMount(() => {
		if (isDebug()) return; // debug: keep the static placeholder, no typing
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		animate = true;

		let cancelled = false;
		let ex = 0;
		let ch = 0;
		let deleting = false;

		function tick() {
			if (cancelled) return;
			// Pause the animation while the visitor is interacting with the field.
			if (askFocused || askInput) {
				setTimeout(tick, 400);
				return;
			}
			const word = askExamples[ex];
			if (!deleting) {
				ch++;
				typed = word.slice(0, ch);
				if (ch === word.length) {
					deleting = true;
					setTimeout(tick, 1600);
					return;
				}
				setTimeout(tick, 65);
			} else {
				ch--;
				typed = word.slice(0, ch);
				if (ch === 0) {
					deleting = false;
					ex = (ex + 1) % askExamples.length;
					setTimeout(tick, 350);
					return;
				}
				setTimeout(tick, 30);
			}
		}

		setTimeout(tick, 700);
		return () => {
			cancelled = true;
		};
	});

	// カードの製品名だけ、製品のページと同じ見出しの書体にする。使う文字だけを取り寄せるので小さい
	const productNameFontUrl = `https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@700&display=swap&text=${encodeURIComponent(
		[...new Set([...visibleProducts, ...buildingInPublic].map((p) => p.name).join(''))].join('')
	)}`;
</script>

<svelte:head>
	<link rel="stylesheet" href={productNameFontUrl} />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-white dark:bg-gray-900">
	<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-20 lg:px-8">
		<div class="hero-stagger flex flex-col items-center text-center">
			{#if profile.avatar}
				<img
					src={profile.avatar}
					alt={profile.name}
					width="460"
					height="460"
					fetchpriority="high"
					class="mb-3 h-20 w-20 rounded-full object-cover shadow-lg ring-4 ring-white sm:mb-6 sm:h-28 sm:w-28 md:h-32 md:w-32 dark:ring-gray-800"
				/>
			{:else}
				<div
					class="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-3xl font-bold text-white shadow-lg sm:mb-6 sm:h-28 sm:w-28 sm:text-4xl md:h-32 md:w-32"
				>
					{profile.name.charAt(0)}
				</div>
			{/if}

			<h1 class="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
				{profile.name}
			</h1>
			<p
				class="mb-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm sm:mb-4 sm:text-base"
			>
				<span class="text-primary-600 dark:text-primary-400">{profile.title}</span>
				{#if profile.location}
					<span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						{profile.location}
					</span>
				{/if}
			</p>

			<p class="mb-5 max-w-2xl text-sm text-gray-600 sm:mb-8 sm:text-base dark:text-gray-300">
				{profile.bio}
			</p>

			<!-- Social Links -->
			<div class="flex flex-wrap justify-center gap-2 sm:gap-3">
				{#each profile.socialLinks as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-600 dark:hover:bg-gray-700 dark:hover:text-primary-400"
						aria-label={link.label}
					>
						<SocialIcon platform={link.platform} class="h-5 w-5" />
						<span class="hidden xs:inline sm:inline">{link.label}</span>
					</a>
				{/each}
			</div>

			{#if profile.secondaryLinks?.length}
				<div class="group mt-3 flex flex-col items-center">
					<button
						type="button"
						class="inline-flex min-h-[32px] items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:focus:bg-gray-800 dark:focus:text-gray-200"
						aria-label="Show more links"
					>
						<span>More</span>
						<svg class="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					<div class="secondary-link-menu flex flex-wrap justify-center gap-1.5">
						{#each profile.secondaryLinks as link}
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex min-h-[32px] items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus:border-primary-300 focus:bg-primary-50 focus:text-primary-700 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-600 dark:hover:bg-gray-700 dark:hover:text-primary-400 dark:focus:border-primary-600 dark:focus:bg-gray-700 dark:focus:text-primary-400"
								aria-label={link.label}
							>
								<SocialIcon platform={link.platform} class="h-3.5 w-3.5" />
								<span>{link.label}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<!-- AI ask box: primary way to explore this site -->
			<div class="mt-6 w-full max-w-xl sm:mt-10">
				<form onsubmit={askAI} class="ai-field relative">
					<input
						bind:value={askInput}
						{placeholder}
						onfocus={() => (askFocused = true)}
						onblur={() => (askFocused = false)}
						aria-label="谷口について AI に質問する"
						class="w-full rounded-full border border-transparent bg-white py-3.5 pl-5 pr-28 text-sm text-gray-900 outline-none dark:bg-gray-800 dark:text-white"
					/>
					<button
						type="submit"
						class="ai-button absolute right-1.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white"
					>
						<span class="ai-sparkle" aria-hidden="true">✦</span> AIに聞く
					</button>
				</form>
				<div class="mt-3 flex flex-wrap justify-center gap-2">
					{#each askSuggestions as s (s.label)}
						<button
							type="button"
							onclick={() => askChip(s.q)}
							class="rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400 dark:hover:border-primary-600 dark:hover:text-primary-400"
						>
							{s.label}
						</button>
					{/each}
				</div>

				<!-- ⌘K discoverability hint (desktop only — needs a keyboard) -->
				<p class="mt-3 hidden items-center justify-center gap-1.5 text-xs text-gray-400 sm:flex dark:text-gray-500">
					どのページでも
					<kbd
						class="rounded border border-gray-300 bg-gray-50 px-1.5 py-0.5 font-sans text-[11px] font-medium text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
						>⌘K</kbd
					>
					で AI を呼び出せます
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.secondary-link-menu {
		max-height: 0;
		overflow: hidden;
		padding-top: 0;
		opacity: 0;
		pointer-events: none;
		transform: translateY(-4px);
		transition:
			max-height 180ms ease,
			padding-top 180ms ease,
			opacity 150ms ease,
			transform 150ms ease;
	}

	.group:hover .secondary-link-menu,
	.group:focus-within .secondary-link-menu {
		max-height: 6rem;
		padding-top: 0.5rem;
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.secondary-link-menu {
			transition: none;
		}
	}
</style>

<!-- Products Section -->
{#if visibleProducts.length > 0}
	<section id="products" class="bg-gray-50 py-8 sm:py-12 md:py-20 dark:bg-gray-800/50">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="mb-1 text-center text-xl font-bold text-gray-900 sm:mb-2 sm:text-2xl dark:text-white">
				Products
			</h2>
			<p class="mb-5 text-center text-sm text-gray-600 sm:mb-10 sm:text-base dark:text-gray-400">
				公開しているアプリ
			</p>

			<div class="grid gap-3 sm:gap-4 lg:grid-cols-3">
				{#each visibleProducts as product, i (product.id)}
					<ProductCard {product} index={i} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Building in Public Section -->
{#if buildingInPublic.length > 0}
	<section id="building" class="bg-white py-12 md:py-20 dark:bg-gray-900">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="mb-2 text-center text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
				Building in Public
			</h2>
			<p class="mb-8 text-center text-sm text-gray-600 sm:mb-12 sm:text-base dark:text-gray-400">
				いま開発中のプロダクト。つくっている過程を公開しています
			</p>

			<div class="grid gap-4 sm:gap-6 md:grid-cols-2">
				{#each buildingInPublic as product, i (product.id)}
					<ProductCard {product} index={i} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- OSS Section -->
{#if ossProjects.length > 0}
	<section id="oss" class="bg-white py-12 md:py-20 dark:bg-gray-900">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="mb-2 text-center text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
				Open Source
			</h2>
			<p class="mb-8 text-center text-sm text-gray-600 sm:mb-12 sm:text-base dark:text-gray-400">
				SwiftUI・LLM エージェント・通信基盤まで、再利用可能な Swift パッケージを軸に OSS を公開しています
			</p>

			<div class="grid gap-4 sm:gap-6 md:grid-cols-2">
				{#each featuredOSS as project}
					<OSSCard {project} doccUrl={data.ossDocc[project.id]} />
				{/each}
			</div>

			{#if ossProjects.length > featuredOSS.length}
				<div class="mt-8 text-center sm:mt-12">
					<a
						href="/oss"
						class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-600 dark:hover:bg-gray-700 dark:hover:text-primary-400"
					>
						すべてのOSSを見る
						<span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700">
							{ossProjects.length}
						</span>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			{/if}
		</div>
	</section>
{/if}

<!-- Writings Section -->
{#if data.articles.length > 0}
	<section id="writings" class="bg-gray-50 py-12 md:py-20 dark:bg-gray-800/50">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="mb-2 text-center text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
				Writings
			</h2>
			<p class="mb-8 text-center text-sm text-gray-600 sm:mb-12 sm:text-base dark:text-gray-400">
				技術記事・ブログ
			</p>

			<div class="grid gap-4 sm:gap-6">
				{#each data.articles as article}
					<ArticleCard {article} />
				{/each}
			</div>

			<div class="mt-8 text-center sm:mt-12">
				<a
					href="/writings"
					class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-600 dark:hover:bg-gray-700 dark:hover:text-primary-400"
				>
					すべての記事を見る
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- YouTube Section -->
{#if data.youtubePlaylist && data.youtubePlaylist.videos.length > 0}
	<section id="youtube" class="bg-white py-12 md:py-20 dark:bg-gray-900">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<h2 class="mb-2 text-center text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
				YouTube
			</h2>
			<p class="mb-8 text-center text-sm text-gray-600 sm:mb-12 sm:text-base dark:text-gray-400">
				{data.youtubePlaylist.title}
			</p>

			<div class="grid gap-4 sm:gap-6 md:grid-cols-2">
				{#each data.youtubePlaylist.videos as video}
					<a
						href={video.url}
						target="_blank"
						rel="noopener noreferrer"
						class="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-primary-300 hover:shadow-md sm:rounded-2xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
					>
						<div class="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
							<img
								src={video.thumbnail}
								alt={video.title}
								loading="lazy"
								width="480"
								height="360"
								class="h-full w-full object-cover transition-transform group-hover:scale-105"
							/>
							<div class="absolute inset-0 flex items-center justify-center">
								<div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
									<svg class="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</div>
						</div>
						<div class="p-4">
							<p class="mb-1 text-xs text-gray-500 dark:text-gray-400">
								{formatDate(video.publishedAt)}
							</p>
							<h3 class="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-primary-600 sm:text-base dark:text-white dark:group-hover:text-primary-400">
								{video.title}
							</h3>
						</div>
					</a>
				{/each}
			</div>

			<div class="mt-8 text-center sm:mt-12">
				<a
					href={data.youtubePlaylist.channelUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400"
				>
					<SocialIcon platform="youtube" class="h-5 w-5" />
					チャンネルを見る
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
			</div>
		</div>
	</section>
{/if}


<!-- Contact Section -->
<section id="contact" class="bg-gray-50 py-12 md:py-20 dark:bg-gray-800/50">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<h2 class="mb-2 text-center text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
			Contact
		</h2>
		<p class="mb-8 text-center text-sm text-gray-600 sm:mb-12 sm:text-base dark:text-gray-400">
			お問い合わせ
		</p>

		<div
			class="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-700 dark:bg-gray-800"
		>
			{#if contact.message}
				<p class="mb-4 text-center text-sm text-gray-600 sm:mb-6 sm:text-base dark:text-gray-300">
					{contact.message}
				</p>
			{/if}

			<div class="flex flex-col items-center gap-3 sm:gap-4">
				{#if contact.email}
					<a
						href="mailto:{contact.email}"
						class="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-800 sm:w-auto dark:bg-primary-500 dark:hover:bg-primary-600"
					>
						<SocialIcon platform="email" class="h-5 w-5" />
						メールで問い合わせる
					</a>
				{/if}

				{#if contact.formUrl}
					<a
						href={contact.formUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
					>
						フォームで問い合わせる
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>
