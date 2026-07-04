<script lang="ts">
	import type { OSSProject } from '$lib/types';

	interface Props {
		project: OSSProject;
	}

	let { project }: Props = $props();

	const languageColor: Record<string, string> = {
		TypeScript: 'bg-blue-500',
		JavaScript: 'bg-yellow-400',
		Swift: 'bg-orange-500',
		Kotlin: 'bg-purple-500',
		Rust: 'bg-orange-600',
		Go: 'bg-cyan-500',
		Python: 'bg-green-500',
		Ruby: 'bg-red-500',
		Shell: 'bg-gray-500'
	};
</script>

<a
	href="/oss/{project.id}"
	class="group flex flex-col rounded-xl border border-gray-200 bg-white p-3 transition-colors hover:border-primary-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
>
	<p class="truncate text-sm font-semibold text-gray-900 dark:text-white">{project.name}</p>

	<p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
		{project.description}
	</p>

	<div class="mt-auto flex items-center gap-1.5 pt-2 text-xs text-gray-500 dark:text-gray-400">
		<span class="h-2.5 w-2.5 rounded-full {languageColor[project.language] ?? 'bg-gray-400'}"></span>
		{project.language}
	</div>
</a>
