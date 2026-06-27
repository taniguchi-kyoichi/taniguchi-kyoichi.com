<script lang="ts">
	import { page } from '$app/state';
</script>

<section
	class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center"
>
	<p class="text-5xl font-bold text-primary-600 sm:text-6xl dark:text-primary-400">
		{page.status}
	</p>
	<h1 class="mt-4 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
		{page.status === 404 ? 'ページが見つかりません' : '問題が発生しました'}
	</h1>
	<p class="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
		{page.error?.message ?? 'しばらくしてから再度お試しください。'}
	</p>
	<a
		href="/"
		class="mt-6 inline-flex rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
	>
		ホームに戻る
	</a>
</section>
