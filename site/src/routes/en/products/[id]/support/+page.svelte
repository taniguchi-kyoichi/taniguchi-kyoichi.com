<script lang="ts">
	import type { Product, ProductEnglish } from '$lib/types';
	import { legalPath } from '$lib/legal';
	import SubscriptionHelp from '$lib/components/SubscriptionHelp.svelte';
	import LegalNavEn from '$lib/components/LegalNavEn.svelte';

	interface Props {
		data: {
			product: Product;
			en: ProductEnglish;
		};
	}

	let { data }: Props = $props();
	const product = data.product;
	const name = data.en.name;
	const support = product.support!;
	const faq = data.en.support?.faq;
	const systemRequirements = data.en.support?.systemRequirements;
	const subscription = product.subscription && data.en.subscription
		? { ...product.subscription, restoreStepsEn: data.en.subscription.restoreSteps }
		: undefined;
	const hasPrivacy = Boolean(product.privacy && data.en.privacy);

	const heading = 'mb-3 text-lg font-semibold text-gray-900 dark:text-white';
	const link = 'text-primary-600 hover:underline dark:text-primary-400';

	let openFaqIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}
</script>

<svelte:head>
	{#if faq && faq.length > 0}
		{@html `<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			inLanguage: 'en',
			mainEntity: faq.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: { '@type': 'Answer', text: item.answer }
			}))
		}).replace(/</g, '\\u003c')}</script>`}
	{/if}
</svelte:head>

<article class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<LegalNavEn productId={product.id} productName={name} page="support" />

		<div class="rounded-xl bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800">
			<div class="mb-8 flex items-center gap-4">
				{#if product.thumbnail}
					<img
						src={product.thumbnail}
						alt={name}
						width="320"
						height="320"
						loading="lazy"
						class="h-16 w-16 rounded-2xl shadow-sm"
					/>
				{/if}
				<div>
					<h1 class="text-2xl font-bold text-gray-900 dark:text-white">{name} Support</h1>
					{#if systemRequirements}
						<p class="text-sm text-gray-500 dark:text-gray-400">Requirements: {systemRequirements}</p>
					{/if}
				</div>
			</div>

			<div class="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
				{#if faq && faq.length > 0}
					<section>
						<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Frequently asked questions</h2>
						<div class="space-y-2">
							{#each faq as item, i}
								<div class="rounded-lg border border-gray-200 dark:border-gray-700">
									<button
										onclick={() => toggleFaq(i)}
										class="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-900 dark:text-white"
									>
										<span>{item.question}</span>
										<svg
											class="h-5 w-5 shrink-0 transition-transform {openFaqIndex === i ? 'rotate-180' : ''}"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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

				{#if subscription}
					<SubscriptionHelp {subscription} appName={name} lang="en" standalone />
				{/if}

				<section>
					<h2 class={heading}>Contact</h2>
					<p>
						If the FAQ above does not solve your problem, or if you want to report a bug or make a request,
						feel free to email us at the address below.
					</p>
					<p class="mt-2">
						<a href="mailto:{support.contactEmail}" class={link}>{support.contactEmail}</a>
					</p>
				</section>

				{#if hasPrivacy || subscription}
					<section>
						<h2 class={heading}>Privacy policy and terms of use</h2>
						<ul class="list-inside list-disc space-y-1">
							{#if hasPrivacy}
								<li><a href={legalPath(product.id, 'privacy', 'en')} class={link}>Privacy Policy</a></li>
							{/if}
							{#if subscription}
								<li>
									<a href={legalPath(product.id, 'terms', 'en')} class={link}>Terms of use and subscription terms</a>
								</li>
							{/if}
						</ul>
					</section>
				{/if}
			</div>
		</div>
	</div>
</article>
