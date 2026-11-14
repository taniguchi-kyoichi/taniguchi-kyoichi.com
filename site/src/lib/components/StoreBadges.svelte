<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		appStore?: string;
		googlePlay?: string;
		/** 並びの寄せ方 */
		align?: 'start' | 'center';
	}

	let { appStore, googlePlay, align = 'start' }: Props = $props();

	/**
	 * サーバーでは両方を出し、表示の後で端末に合わせて1つに絞る。
	 * 判定に失敗しても（JS が動かなくても）両方が見えたままになる。
	 */
	let device = $state<'unknown' | 'ios' | 'android' | 'desktop'>('unknown');

	onMount(() => {
		const ua = navigator.userAgent;
		const isIOS =
			/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
		if (isIOS) device = 'ios';
		else if (/Android/.test(ua)) device = 'android';
		else device = 'desktop';
	});

	const primary = $derived(
		device === 'ios' && appStore
			? 'appStore'
			: device === 'android' && googlePlay
				? 'googlePlay'
				: null
	);
</script>

<!--
	バッジは Apple と Google の公式の物を改変せずに使う（static/badges/）。
	- App Store: 高さ40px以上・周りに高さの1/4の余白・並べるときは App Store が先
	- Google Play: App Store と同じ大きさ以上。PNG は上下に透明の余白（250px のうち上下 29px ずつ）を
	  含むので、見た目の高さが App Store と揃うように画像を大きくし、余白の分だけ負のマージンで詰める
-->
<div class="store-badges" class:center={align === 'center'} class:single={primary !== null}>
	{#if primary === 'appStore' && appStore}
		<a href={appStore} target="_blank" rel="noopener noreferrer" class="badge-link">
			<img class="badge-apple" src="/badges/app-store-ja.svg" alt="App Storeからダウンロード" />
		</a>
		{#if googlePlay}
			<a href={googlePlay} target="_blank" rel="noopener noreferrer" class="other-store">
				Androidの方はGoogle Playへ
			</a>
		{/if}
	{:else if primary === 'googlePlay' && googlePlay}
		<a href={googlePlay} target="_blank" rel="noopener noreferrer" class="badge-link">
			<img class="badge-google" src="/badges/google-play-ja.png" alt="Google Play で手に入れよう" />
		</a>
		{#if appStore}
			<a href={appStore} target="_blank" rel="noopener noreferrer" class="other-store">
				iPhoneの方はApp Storeへ
			</a>
		{/if}
	{:else}
		<div class="badge-row">
			{#if appStore}
				<a href={appStore} target="_blank" rel="noopener noreferrer" class="badge-link">
					<img class="badge-apple" src="/badges/app-store-ja.svg" alt="App Storeからダウンロード" />
				</a>
			{/if}
			{#if googlePlay}
				<a href={googlePlay} target="_blank" rel="noopener noreferrer" class="badge-link">
					<img
						class="badge-google"
						src="/badges/google-play-ja.png"
						alt="Google Play で手に入れよう"
					/>
				</a>
			{/if}
		</div>
	{/if}
</div>

<style>
	.store-badges {
		/* App Store のバッジの高さ。並べるときは 320px の幅でも2つが1行に収まる高さにする */
		--badge-h: 44px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}
	@media (min-width: 400px) {
		.store-badges {
			--badge-h: 48px;
		}
	}
	/* 1つに絞ったときは大きく */
	.store-badges.single {
		--badge-h: 56px;
	}
	.store-badges.center {
		align-items: center;
	}

	.badge-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		/* 周りの余白は App Store のバッジの高さの1/4以上 */
		gap: max(16px, calc(var(--badge-h) / 4));
	}
	.center .badge-row {
		justify-content: center;
	}

	.badge-link {
		display: inline-flex;
		border-radius: 10px;
		transition: transform 160ms ease;
	}
	.badge-link:focus-visible {
		outline: 3px solid var(--pw-accent, currentColor);
		outline-offset: 3px;
	}
	.badge-link:active {
		transform: scale(0.97);
	}

	.badge-apple {
		display: block;
		height: var(--badge-h);
		width: auto;
		aspect-ratio: 108.85157 / 40;
	}
	/* 646×250 のうち見えている部分は高さ 192px（上下 29px は透明） */
	.badge-google {
		display: block;
		height: calc(var(--badge-h) * 250 / 192);
		width: auto;
		aspect-ratio: 646 / 250;
		margin-block: calc(var(--badge-h) * -29 / 192);
	}

	.other-store {
		font-size: 0.8125rem;
		color: var(--pw-muted, currentColor);
		text-decoration: underline;
		text-underline-offset: 3px;
		white-space: nowrap;
	}
	.other-store:hover {
		color: var(--pw-fg, currentColor);
	}
	.other-store:focus-visible {
		outline: 2px solid var(--pw-accent, currentColor);
		outline-offset: 2px;
		border-radius: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.badge-link {
			transition: none;
		}
		.badge-link:active {
			transform: none;
		}
	}
</style>
