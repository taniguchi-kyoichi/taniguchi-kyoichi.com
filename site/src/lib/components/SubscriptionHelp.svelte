<script lang="ts">
	import type { SubscriptionConfig } from '$lib/types';

	interface Props {
		subscription: SubscriptionConfig;
		appName: string;
		lang: 'ja' | 'en';
	}

	let { subscription, appName, lang }: Props = $props();

	const heading = 'mb-3 text-lg font-semibold text-gray-900 dark:text-white';
</script>

{#if lang === 'ja'}
	<section>
		<h2 class={heading}>購入を復元する</h2>
		<p class="mb-2">機種を変えたときや、アプリを入れ直したときは、次の手順で有料プランを戻せます。</p>
		<ol class="list-inside list-decimal space-y-1">
			{#each subscription.restoreSteps as step}
				<li>{step}</li>
			{/each}
		</ol>
		<p class="mt-2">購入したときと同じ Apple ID でサインインしている必要があります。</p>
	</section>

	<section>
		<h2 class={heading}>サブスクリプションを管理・解約する</h2>
		<p class="mb-2">
			サブスクリプションは Apple の App Store が管理しています。アプリの中からは解約できません。
		</p>
		<ol class="list-inside list-decimal space-y-1">
			<li>iPhone の「設定」を開く</li>
			<li>いちばん上の自分の名前を押す</li>
			<li>「サブスクリプション」を押し、「{appName}」を選ぶ</li>
		</ol>
		<p class="mt-2">
			更新日の24時間前までに解約すると、次の期間の料金はかかりません。解約しても、支払い済みの期間の終わりまでは有料プランを使えます。返金は
			<a
				href="https://reportaproblem.apple.com/"
				class="text-primary-600 hover:underline dark:text-primary-400">Apple が受け付けています</a
			>。
		</p>
	</section>
{:else}
	<section>
		<h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Restore purchases</h3>
		<ol class="list-inside list-decimal space-y-1">
			{#each subscription.restoreStepsEn as step}
				<li>{step}</li>
			{/each}
		</ol>
		<p class="mt-2">You must be signed in with the Apple ID you used to buy.</p>
	</section>

	<section>
		<h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Manage or cancel your subscription</h3>
		<p>
			Subscriptions are managed by Apple. Open Settings, tap your name, then Subscriptions, and choose
			{appName}. If you cancel at least 24 hours before the renewal date, you will not be charged for the
			next period. Refunds are handled by Apple at
			<a href="https://reportaproblem.apple.com/" class="text-primary-600 hover:underline dark:text-primary-400"
				>reportaproblem.apple.com</a
			>.
		</p>
	</section>
{/if}
