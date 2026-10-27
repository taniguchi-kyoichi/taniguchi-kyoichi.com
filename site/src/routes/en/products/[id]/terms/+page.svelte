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
	const subscription = data.en.subscription!;
	const trial = product.subscription!.trial;
	const contactEmail = product.support?.contactEmail ?? product.privacy?.contactEmail;

	const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
	const heading = 'mb-3 text-lg font-semibold text-gray-900 dark:text-white';
	const link = 'text-primary-600 hover:underline dark:text-primary-400';
</script>

<article class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<LegalNavEn productId={product.id} productName={name} page="terms" />

		<div class="rounded-xl bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800">
			<h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Terms of Use</h1>
			<p class="mb-8 text-sm text-gray-500 dark:text-gray-400">{name}</p>

			<div class="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
				<section>
					<h2 class={heading}>License agreement</h2>
					<p>
						The license agreement for {name} is Apple's standard license agreement (EULA).
						<a href={EULA} class={link}>Read Apple's standard license agreement</a>
					</p>
					<p class="mt-2">
						In addition to that agreement, this page sets out the terms of the paid plan ({subscription.planName}).
					</p>
				</section>

				<section>
					<h2 class={heading}>What you can use for free</h2>
					<ul class="list-inside list-disc space-y-1">
						{#each subscription.free as item}
							<li>{item}</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class={heading}>What you can use with {subscription.planName}</h2>
					<ul class="list-inside list-disc space-y-1">
						{#each subscription.paid as item}
							<li>{item}</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class={heading}>Price and automatic renewal</h2>
					<ul class="list-inside list-disc space-y-1">
						{#each subscription.prices as p}
							<li>{p.period} {p.price} (price in Japan, tax included)</li>
						{/each}
					</ul>
					<ul class="mt-3 list-inside list-disc space-y-1">
						<li>Payment is charged to your Apple ID when you confirm the purchase</li>
						<li>
							Unless you cancel at least 24 hours before the end of the period, the subscription automatically
							renews for the same period at the same price
						</li>
						<li>The renewal is charged within the 24 hours before the end of the period</li>
						<li>You can cancel and manage the subscription in the iPhone Settings app → your name → Subscriptions</li>
						{#if trial}
							<li>
								The {trial.periodEn} plan is free to try for the first {trial.days} days. Unless you cancel at least
								24 hours before the trial ends, it switches to the paid {trial.periodEn} plan and you are charged
							</li>
						{/if}
					</ul>
					{#if subscription.notes}
						<ul class="mt-3 list-inside list-disc space-y-1">
							{#each subscription.notes as note}
								<li>{note}</li>
							{/each}
						</ul>
					{/if}
				</section>

				<SubscriptionHelp
					subscription={{ ...product.subscription!, restoreStepsEn: subscription.restoreSteps }}
					appName={name}
					lang="en"
					standalone
				/>

				{#if product.privacy && data.en.privacy}
					<section>
						<h2 class={heading}>Privacy Policy</h2>
						<p><a href={legalPath(product.id, 'privacy', 'en')} class={link}>Read the privacy policy</a></p>
					</section>
				{/if}

				{#if contactEmail}
					<section>
						<h2 class={heading}>Contact</h2>
						<p><a href="mailto:{contactEmail}" class={link}>{contactEmail}</a></p>
					</section>
				{/if}
			</div>
		</div>
	</div>
</article>
