<script lang="ts">
	import { legalPath } from '$lib/legal';
	import type { LegalPage } from '$lib/legal';

	interface Props {
		productId: string;
		productName: string;
		page: LegalPage;
	}

	let { productId, productName, page }: Props = $props();
	const muted =
		'text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400';
</script>

<a href={legalPath(productId, page, 'ja')} hreflang="ja" lang="ja" class="float-right mb-6 {muted}">日本語</a>
<a href="/products/{productId}" class="mb-6 inline-flex items-center gap-1 {muted}">
	<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
	</svg>
	{productName}
</a>
