<script lang="ts">
	import type { Product } from '$lib/types';
	import SubscriptionHelp from '$lib/components/SubscriptionHelp.svelte';

	interface Props {
		data: {
			product: Product;
		};
	}

	let { data }: Props = $props();
	const product = data.product;
	const subscription = product.subscription!;
	const contactEmail = product.support?.contactEmail ?? product.privacy?.contactEmail;

	const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
	const heading = 'mb-3 text-lg font-semibold text-gray-900 dark:text-white';
	const link = 'text-primary-600 hover:underline dark:text-primary-400';
</script>

<article class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
			<h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">利用規約</h1>
			<p class="mb-8 text-sm text-gray-500 dark:text-gray-400">{product.name}</p>

			<div class="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
				<section>
					<h2 class={heading}>使用許諾契約</h2>
					<p>
						{product.name} の使用許諾契約は、Apple 標準の使用許諾契約（EULA）です。
						<a href={EULA} class={link}>Apple 標準の使用許諾契約を読む</a>
					</p>
					<p class="mt-2">このページには、それに加えて有料プラン（{subscription.planName}）の条件を書いています。</p>
				</section>

				<section>
					<h2 class={heading}>無料で使えるもの</h2>
					<ul class="list-inside list-disc space-y-1">
						{#each subscription.free as item}
							<li>{item}</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class={heading}>{subscription.planName}で使えるもの</h2>
					<ul class="list-inside list-disc space-y-1">
						{#each subscription.paid as item}
							<li>{item}</li>
						{/each}
					</ul>
				</section>

				<section>
					<h2 class={heading}>価格と自動更新</h2>
					<ul class="list-inside list-disc space-y-1">
						{#each subscription.prices as p}
							<li>{p.period} {p.price}（日本の価格・税込）</li>
						{/each}
					</ul>
					<ul class="mt-3 list-inside list-disc space-y-1">
						<li>代金は購入を確定したときに Apple ID に請求されます</li>
						<li>期間が終わる24時間前までに解約しないと、同じ期間・同じ価格で自動で更新されます</li>
						<li>更新の代金は、期間が終わる前の24時間以内に請求されます</li>
						<li>解約と管理は iPhone の「設定」→ 自分の名前 →「サブスクリプション」から行えます</li>
						{#if subscription.trial}
							<li>
								{subscription.trial.period}は、はじめの{subscription.trial.days}日間を無料で試せます。お試しの終わる24時間前までに解約しないと、そのまま有料の{subscription.trial.period}に切り替わり、代金が請求されます
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

				<SubscriptionHelp {subscription} appName={product.name} lang="ja" />

				{#if product.privacy}
					<section>
						<h2 class={heading}>プライバシーポリシー</h2>
						<p><a href="/products/{product.id}/privacy" class={link}>プライバシーポリシーを読む</a></p>
					</section>
				{/if}

				{#if contactEmail}
					<section>
						<h2 class={heading}>問い合わせ</h2>
						<p><a href="mailto:{contactEmail}" class={link}>{contactEmail}</a></p>
					</section>
				{/if}

				<section lang="en" class="border-t border-gray-200 pt-8 dark:border-gray-700">
					<h2 class={heading}>Terms of Use (English)</h2>
					<p>
						The license agreement for {product.name} is
						<a href={EULA} class={link}>Apple's standard EULA</a>. Paid features are sold as
						auto-renewable subscriptions ({subscription.prices.map((p) => p.price).join(' / ')} in Japan).
						Payment is charged to your Apple ID at confirmation of purchase. The subscription renews
						automatically unless cancelled at least 24 hours before the end of the current period; renewal is
						charged within 24 hours before the period ends.
						{#if subscription.trial}
							The {subscription.trial.periodEn} plan starts with a {subscription.trial.days}-day free trial. Unless you
							cancel at least 24 hours before the trial ends, it converts to the paid {subscription.trial.periodEn}
							plan and you are charged.
						{/if}
					</p>
					<div class="mt-4 space-y-4">
						<SubscriptionHelp {subscription} appName={product.name} lang="en" />
					</div>
					{#if contactEmail}
						<p class="mt-4">Contact: <a href="mailto:{contactEmail}" class={link}>{contactEmail}</a></p>
					{/if}
				</section>
			</div>
		</div>
	</div>
</article>
