<script lang="ts">
	interface Props {
		label?: string;
	}

	let { label }: Props = $props();
</script>

<div
	class="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400"
>
	<span
		class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 dark:border-gray-600 dark:border-t-primary-400"
	></span>
	{label ?? '読み込み中…'}
</div>
