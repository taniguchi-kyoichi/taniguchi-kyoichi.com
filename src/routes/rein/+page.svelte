<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import type { Article } from '$lib/types';

	interface Props {
		data: {
			articles: Article[];
			reinUrl: string;
		};
	}

	let { data }: Props = $props();
</script>

<section class="bg-white py-12 md:py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			ホームに戻る
		</a>

		<!-- Header -->
		<header class="mb-8 sm:mb-12">
			<div class="mb-4 flex items-center gap-3">
				<img src="/rein-icon.png" alt="Rein" class="h-14 w-14 rounded-xl shadow-sm sm:h-16 sm:w-16" />
				<div>
					<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">Rein</h1>
					<p class="text-sm text-gray-600 dark:text-gray-400">意志じゃなくて、仕組み。</p>
				</div>
			</div>

			<p class="text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-300">
				Rein は、認知科学で日常のつまずきを言語化し、試せる選択肢を静かに並べるメディアです。<br />
				意志の力で頑張るのではなく、自分の状態を観察して、付き合い方を少しずつ変えていく。<br />
				姉妹となる iOS アプリ Rein と並走しています。
			</p>

			<div class="mt-6 flex flex-wrap gap-3">
				<a
					href={data.reinUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-amber-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500"
				>
					reinself.com を訪れる
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
				<a
					href="{data.reinUrl}/rss.xml"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-amber-300 hover:bg-amber-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-amber-700 dark:hover:bg-gray-700"
				>
					RSS
				</a>
			</div>
		</header>

		<!-- Articles -->
		{#if data.articles.length > 0}
			<div class="mb-6">
				<h2 class="mb-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">記事一覧</h2>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					全{data.articles.length}件（reinself.com から取得、新しい順）
				</p>
			</div>

			<div class="grid gap-4 sm:gap-6 md:grid-cols-2">
				{#each data.articles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		{:else}
			<p class="text-gray-600 dark:text-gray-400">記事を読み込めませんでした。</p>
		{/if}
	</div>
</section>
