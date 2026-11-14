<script lang="ts">
	import type { SubscriptionConfig } from '$lib/types';

	interface Props {
		subscription: SubscriptionConfig;
		appName: string;
		lang: 'ja' | 'en';
		/** Google Play でも売っているとき true。Android の復元・解約・返金の手順を足す */
		googlePlay?: boolean;
		/**
		 * 英語だけのページ（/en/...）に置くとき true。見出しを h2 にし、日本語の節を省かずに訳した文面を出す。
		 * false は日本語のページの末尾の英語の節（h3・要約）。
		 */
		standalone?: boolean;
	}

	let { subscription, appName, lang, googlePlay = false, standalone = false }: Props = $props();

	const heading = 'mb-3 text-lg font-semibold text-gray-900 dark:text-white';
	const subheading = 'mb-2 mt-4 font-semibold text-gray-900 dark:text-white';
	const link = 'text-primary-600 hover:underline dark:text-primary-400';

	const APPLE_REFUND = 'https://reportaproblem.apple.com/';
	const PLAY_SUBSCRIPTIONS = 'https://play.google.com/store/account/subscriptions';
	const PLAY_REFUND_JA = 'https://support.google.com/googleplay/answer/2479637?hl=ja';
	const androidStepsJa = $derived(subscription.restoreStepsAndroid);
	const androidStepsEn = $derived(subscription.restoreStepsAndroidEn);

	const PLAY_REFUND_EN = 'https://support.google.com/googleplay/answer/2479637?hl=en';
</script>

{#if lang === 'ja'}
	<section>
		<h2 class={heading}>購入を復元する</h2>
		<p class="mb-2">機種を変えたときや、アプリを入れ直したときは、次の手順で有料プランを戻せます。</p>
		{#if googlePlay && androidStepsJa}
			<h3 class={subheading}>iPhone</h3>
		{/if}
		<ol class="list-inside list-decimal space-y-1">
			{#each subscription.restoreSteps as step}
				<li>{step}</li>
			{/each}
		</ol>
		{#if googlePlay && androidStepsJa}
			<h3 class={subheading}>Android</h3>
			<ol class="list-inside list-decimal space-y-1">
				{#each androidStepsJa as step}
					<li>{step}</li>
				{/each}
			</ol>
		{/if}
		{#if googlePlay}
			<p class="mt-2">
				iPhoneでは購入したときと同じApple IDで、Androidでは購入したときと同じGoogleアカウントでGoogle Playにログインしている必要があります。
			</p>
		{:else}
			<p class="mt-2">購入したときと同じ Apple ID でサインインしている必要があります。</p>
		{/if}
	</section>

	<section>
		<h2 class={heading}>サブスクリプションを管理・解約する</h2>
		{#if googlePlay}
			<p class="mb-2">
				サブスクリプションは、iPhoneで購入したときはAppleのApp Storeが、Androidで購入したときはGoogle Playが管理しています。アプリを削除しただけでは解約されません。
			</p>
			<h3 class={subheading}>iPhoneで購入したとき</h3>
		{:else}
			<p class="mb-2">
				サブスクリプションは Apple の App Store が管理しています。アプリの中からは解約できません。
			</p>
		{/if}
		<ol class="list-inside list-decimal space-y-1">
			<li>iPhone の「設定」を開く</li>
			<li>いちばん上の自分の名前をタップする</li>
			<li>「サブスクリプション」をタップし、「{appName}」を選ぶ</li>
		</ol>
		<p class="mt-2">
			更新日の24時間前までに解約すると、次の期間の料金はかかりません。解約しても、支払い済みの期間の終わりまでは有料プランを使えます。返金は
			<a href={APPLE_REFUND} class={link}>Apple が受け付けています</a>。
		</p>
		{#if googlePlay}
			<h3 class={subheading}>Androidで購入したとき</h3>
			<ol class="list-inside list-decimal space-y-1">
				<li>Google Playアプリを開く</li>
				<li>右上のプロフィールアイコンをタップする</li>
				<li>「お支払いと定期購入」→「定期購入」をタップする</li>
				<li>「{appName}」を選び、「定期購入を解約」をタップする</li>
			</ol>
			<p class="mt-2">
				<a href={PLAY_SUBSCRIPTIONS} class={link}>Google Playの定期購入の画面</a>からも開けます。次の更新日より前に解約すると、次の期間の料金はかかりません。解約しても、支払い済みの期間の終わりまでは有料プランを使えます。返金は
				<a href={PLAY_REFUND_JA} class={link}>Google Playが受け付けています</a>。
			</p>
		{/if}
	</section>
{:else if standalone}
	<section>
		<h2 class={heading}>Restore purchases</h2>
		<p class="mb-2">If you change phones or reinstall the app, you can get your paid plan back with these steps.</p>
		{#if googlePlay && androidStepsEn}
			<h3 class={subheading}>On iPhone</h3>
		{/if}
		<ol class="list-inside list-decimal space-y-1">
			{#each subscription.restoreStepsEn as step}
				<li>{step}</li>
			{/each}
		</ol>
		{#if googlePlay && androidStepsEn}
			<h3 class={subheading}>On Android</h3>
			<ol class="list-inside list-decimal space-y-1">
				{#each androidStepsEn as step}
					<li>{step}</li>
				{/each}
			</ol>
		{/if}
		{#if googlePlay}
			<p class="mt-2">
				On iPhone, you must be signed in with the same Apple ID you used to buy. On Android, you must be signed
				in to Google Play with the same Google account you used to buy.
			</p>
		{:else}
			<p class="mt-2">You must be signed in with the same Apple ID you used to buy.</p>
		{/if}
	</section>

	<section>
		<h2 class={heading}>Manage or cancel your subscription</h2>
		{#if googlePlay}
			<p class="mb-2">
				If you bought on iPhone, the subscription is managed by Apple's App Store. If you bought on Android, it is
				managed by Google Play. Deleting the app does not cancel it.
			</p>
			<h3 class={subheading}>If you bought on iPhone</h3>
		{:else}
			<p class="mb-2">
				Subscriptions are managed by Apple's App Store. You cannot cancel from inside the app.
			</p>
		{/if}
		<ol class="list-inside list-decimal space-y-1">
			<li>Open the iPhone Settings app</li>
			<li>Tap your name at the top</li>
			<li>Tap Subscriptions, and choose "{appName}"</li>
		</ol>
		<p class="mt-2">
			If you cancel at least 24 hours before the renewal date, you will not be charged for the next period. After you cancel, you can keep using the paid plan until the end of the period you have already paid for. Refunds are
			<a href={APPLE_REFUND} class={link}>handled by Apple</a>.
		</p>
		{#if googlePlay}
			<h3 class={subheading}>If you bought on Android</h3>
			<ol class="list-inside list-decimal space-y-1">
				<li>Open the Google Play app</li>
				<li>Tap your profile icon at the top right</li>
				<li>Tap Payments &amp; subscriptions → Subscriptions</li>
				<li>Choose "{appName}" and tap Cancel subscription</li>
			</ol>
			<p class="mt-2">
				You can also open <a href={PLAY_SUBSCRIPTIONS} class={link}>your Google Play subscriptions</a> directly. If
				you cancel before the next renewal date, you will not be charged for the next period. After you cancel, you
				can keep using the paid plan until the end of the period you have already paid for. Refunds are
				<a href={PLAY_REFUND_EN} class={link}>handled by Google Play</a>.
			</p>
		{/if}
	</section>
{:else}
	<section>
		<h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Restore purchases</h3>
		{#if googlePlay && androidStepsEn}
			<h3 class={subheading}>On iPhone</h3>
		{/if}
		<ol class="list-inside list-decimal space-y-1">
			{#each subscription.restoreStepsEn as step}
				<li>{step}</li>
			{/each}
		</ol>
		{#if googlePlay && androidStepsEn}
			<h3 class={subheading}>On Android</h3>
			<ol class="list-inside list-decimal space-y-1">
				{#each androidStepsEn as step}
					<li>{step}</li>
				{/each}
			</ol>
		{/if}
		<p class="mt-2">
			{#if googlePlay}
				You must be signed in with the Apple ID (iPhone) or the Google account (Android) you used to buy.
			{:else}
				You must be signed in with the Apple ID you used to buy.
			{/if}
		</p>
	</section>

	<section>
		<h3 class="mb-2 font-semibold text-gray-900 dark:text-white">Manage or cancel your subscription</h3>
		<p>
			{#if googlePlay}On iPhone, the subscription is managed by Apple.{:else}Subscriptions are managed by Apple.{/if}
			Open Settings, tap your name, then Subscriptions, and choose
			{appName}. If you cancel at least 24 hours before the renewal date, you will not be charged for the
			next period. Refunds are handled by Apple at
			<a href={APPLE_REFUND} class={link}>reportaproblem.apple.com</a>.
		</p>
		{#if googlePlay}
			<p class="mt-2">
				On Android, the subscription is managed by Google Play. In the Google Play app, tap your profile icon, then
				Payments &amp; subscriptions → Subscriptions, choose {appName}, and tap Cancel subscription. Refunds are
				<a href={PLAY_REFUND_EN} class={link}>handled by Google Play</a>.
			</p>
		{/if}
	</section>
{/if}
