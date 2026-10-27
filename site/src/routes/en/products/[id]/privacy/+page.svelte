<script lang="ts">
	import type { Product, ProductEnglish } from '$lib/types';
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
	const privacy = product.privacy!;
	const dataItems = data.en.privacy?.dataItems;
	const thirdPartyServices = data.en.privacy?.thirdPartyServices;

	const collectionSummary: Record<string, string> = {
		none: 'does not collect any of your personal information.',
		minimal: 'handles only the minimum information needed to provide the service.',
		standard: 'collects certain information to provide and improve the service.'
	};
	const heading = 'mb-3 text-lg font-semibold text-gray-900 dark:text-white';
</script>

<article class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<LegalNavEn productId={product.id} productName={name} page="privacy" />

		<div class="rounded-xl bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800">
			<h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
			<p class="mb-8 text-sm text-gray-500 dark:text-gray-400">
				{name} | Last updated: {privacy.effectiveDate}
			</p>

			<div class="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
				<section>
					<h2 class={heading}>Overview</h2>
					<p>
						{name}
						{collectionSummary[privacy.dataCollection]}
						This privacy policy explains how the app handles information.
					</p>
				</section>

				<section>
					<h2 class={heading}>Information we collect</h2>
					{#if privacy.dataCollection === 'none'}
						<p>
							The app does not collect personal information. All data is stored only on your device and is
							not sent to external servers.
						</p>
					{:else if dataItems && dataItems.length > 0}
						<p class="mb-3">The app handles the following information:</p>
						<ul class="list-inside list-disc space-y-1">
							{#each dataItems as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else}
						<p>For details on the information the app handles, please contact us.</p>
					{/if}
				</section>

				{#if thirdPartyServices && thirdPartyServices.length > 0}
					<section>
						<h2 class={heading}>Third-party services</h2>
						<p class="mb-3">The app uses the following third-party services:</p>
						<ul class="list-inside list-disc space-y-1">
							{#each thirdPartyServices as service}
								<li>{service}</li>
							{/each}
						</ul>
						<p class="mt-3">The privacy policy of each service provider applies to the use of these services.</p>
					</section>
				{/if}

				<section>
					<h2 class={heading}>Analytics</h2>
					{#if privacy.analyticsUsed}
						<p>The app uses analytics tools to improve the service.</p>
					{:else}
						<p>The app does not use analytics tools.</p>
					{/if}
				</section>

				<section>
					<h2 class={heading}>Changes to this privacy policy</h2>
					<p>
						This privacy policy may be updated as needed. If there are important changes, we will let you know
						in the app or on this page.
					</p>
				</section>

				<section>
					<h2 class={heading}>Contact</h2>
					<p>For questions or inquiries about privacy, please contact us at the email address below.</p>
					<p class="mt-2">
						<a href="mailto:{privacy.contactEmail}" class="text-primary-600 hover:underline dark:text-primary-400">
							{privacy.contactEmail}
						</a>
					</p>
				</section>
			</div>
		</div>
	</div>
</article>
