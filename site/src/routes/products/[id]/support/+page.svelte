<script lang="ts">
	import { legalPath } from '$lib/legal';
	import type { Product } from '$lib/types';
	import SubscriptionHelp from '$lib/components/SubscriptionHelp.svelte';

	interface Props {
		data: {
			product: Product;
		};
	}

	let { data }: Props = $props();
	const product = data.product;
	const support = product.support!;

	let openFaqIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}
</script>

<svelte:head>
	{#if support.faq && support.faq.length > 0}
		{@html `<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: support.faq.map(item => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: { '@type': 'Answer', text: item.answer }
			}))
		})}</script>`}
	{/if}
</svelte:head>

<article class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		{#if product.en}
			<a
				href={legalPath(product.id, 'support', 'en')}
				hreflang="en"
				lang="en"
				class="float-right mb-6 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
			>
				English
			</a>
		{/if}
		<!-- Back link -->
		<a
			href="/products/{product.id}"
			class="mb-6 inline-flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			{product.name}に戻る
		</a>

		<div class="rounded-xl bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800">
			<!-- App info -->
			<div class="mb-8 flex items-center gap-4">
				{#if product.thumbnail}
					<img
						src={product.thumbnail}
						alt={product.name}
						width="320"
						height="320"
						loading="lazy"
						class="h-16 w-16 rounded-2xl shadow-sm"
					/>
				{/if}
				<div>
					<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
						{product.name} サポート
					</h1>
					{#if support.systemRequirements}
						<p class="text-sm text-gray-500 dark:text-gray-400">
							動作環境: {support.systemRequirements}
						</p>
					{/if}
				</div>
			</div>

			<div class="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
				<!-- FAQ -->
				{#if support.faq && support.faq.length > 0}
					<section>
						<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
							よくある質問
						</h2>
						<div class="space-y-2">
							{#each support.faq as item, i}
								<div class="rounded-lg border border-gray-200 dark:border-gray-700">
									<button
										onclick={() => toggleFaq(i)}
										class="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-900 dark:text-white"
									>
										<span>{item.question}</span>
										<svg
											class="h-5 w-5 shrink-0 transition-transform {openFaqIndex === i
												? 'rotate-180'
												: ''}"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>
									{#if openFaqIndex === i}
										<div class="border-t border-gray-200 px-4 py-3 dark:border-gray-700">
											<p>{item.answer}</p>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/if}

				{#if product.subscription}
					<SubscriptionHelp subscription={product.subscription} appName={product.name} lang="ja" />
				{/if}

				<!-- Contact -->
				<section>
					<h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
						お問い合わせ
					</h2>
					<p>
						上記のFAQで解決しない場合や、バグの報告、ご要望がありましたら、以下のメールアドレスまでお気軽にご連絡ください。
					</p>
					<p class="mt-2">
						<a
							href="mailto:{support.contactEmail}"
							class="text-primary-600 hover:underline dark:text-primary-400"
						>
							{support.contactEmail}
						</a>
					</p>
				</section>

				<!-- Privacy and terms -->
				{#if product.privacy || product.subscription}
					<section>
						<h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
							プライバシーポリシーと利用規約
						</h2>
						<ul class="list-inside list-disc space-y-1">
							{#if product.privacy}
								<li>
									<a
										href="/products/{product.id}/privacy"
										class="text-primary-600 hover:underline dark:text-primary-400"
									>
										プライバシーポリシー
									</a>
								</li>
							{/if}
							{#if product.subscription}
								<li>
									<a
										href="/products/{product.id}/terms"
										class="text-primary-600 hover:underline dark:text-primary-400"
									>
										利用規約とサブスクリプションの条件
									</a>
								</li>
							{/if}
						</ul>
					</section>
				{/if}

				<!-- English -->
				<section lang="en" class="space-y-4 border-t border-gray-200 pt-8 dark:border-gray-700">
					<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Support (English)</h2>
					<p>
						For bugs, questions, or requests, email
						<a
							href="mailto:{support.contactEmail}"
							class="text-primary-600 hover:underline dark:text-primary-400">{support.contactEmail}</a
						>. For a bug, please include your iPhone model, iOS version, and what happened.
					</p>
					{#if product.subscription}
						<SubscriptionHelp subscription={product.subscription} appName={product.name} lang="en" />
					{/if}
					<p>
						{#if product.privacy}
							<a
								href="/products/{product.id}/privacy"
								class="text-primary-600 hover:underline dark:text-primary-400">Privacy Policy</a
							>
						{/if}
						{#if product.subscription}
							·
							<a
								href="/products/{product.id}/terms"
								class="text-primary-600 hover:underline dark:text-primary-400">Terms of Use</a
							>
						{/if}
					</p>
				</section>
			</div>
		</div>
	</div>
</article>
