<script lang="ts">
	import type { OSSProject } from '$lib/types';
	import { ossKindLabel } from '$lib/data/oss';
	import SocialIcon from './SocialIcon.svelte';

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
	class="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-primary-300 hover:shadow-md sm:rounded-2xl sm:p-6 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
>
	<div class="mb-2 flex items-center gap-2 sm:mb-3">
		<SocialIcon platform="github" class="h-4 w-4 text-gray-700 sm:h-5 sm:w-5 dark:text-gray-300" />
		<h3 class="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">{project.name}</h3>
		<span
			class="ml-auto shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-500 sm:text-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
		>
			{ossKindLabel[project.kind]}
		</span>
	</div>

	<p class="mb-3 flex-grow text-sm text-gray-600 sm:mb-4 dark:text-gray-300">
		{project.description}
	</p>

	<div class="mb-3 flex items-center gap-2 sm:mb-4">
		<div class="flex items-center gap-1.5">
			<span
				class="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 {languageColor[project.language] ?? 'bg-gray-400'}"
			></span>
			<span class="text-xs text-gray-600 sm:text-sm dark:text-gray-400">{project.language}</span>
		</div>
		<span class="text-gray-300 dark:text-gray-600">·</span>
		<span class="text-xs text-gray-500 sm:text-sm dark:text-gray-400">{project.category}</span>
	</div>

	{#if project.topics && project.topics.length > 0}
		<div class="flex flex-wrap gap-1 sm:gap-1.5">
			{#each project.topics.slice(0, 4) as topic}
				<span
					class="rounded-md bg-primary-50 px-1.5 py-0.5 text-xs font-medium text-primary-700 sm:px-2 dark:bg-primary-900/30 dark:text-primary-400"
				>
					{topic}
				</span>
			{/each}
		</div>
	{/if}
</a>
