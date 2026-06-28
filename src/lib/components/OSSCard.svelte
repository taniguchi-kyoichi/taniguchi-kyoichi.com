<script lang="ts">
	import type { OSSProject } from '$lib/types';
	import { ossKindLabel } from '$lib/data/oss';
	import SocialIcon from './SocialIcon.svelte';

	interface Props {
		project: OSSProject;
		/** Resolved DocC site URL, when the package's docs are live. */
		doccUrl?: string | null;
	}

	let { project, doccUrl = null }: Props = $props();

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

<div
	class="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-primary-300 hover:shadow-md sm:rounded-2xl sm:p-6 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
>
	<div class="mb-2 flex items-center gap-2 sm:mb-3">
		<SocialIcon platform="github" class="h-4 w-4 text-gray-700 sm:h-5 sm:w-5 dark:text-gray-300" />
		<h3 class="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
			<!-- Stretched link: the whole card opens the detail page. -->
			<a
				href="/oss/{project.id}"
				class="after:absolute after:inset-0 group-hover:text-primary-600 dark:group-hover:text-primary-400"
			>
				{project.name}
			</a>
		</h3>
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
		<div class="mb-3 flex flex-wrap gap-1 sm:mb-4 sm:gap-1.5">
			{#each project.topics.slice(0, 4) as topic}
				<span
					class="rounded-md bg-primary-50 px-1.5 py-0.5 text-xs font-medium text-primary-700 sm:px-2 dark:bg-primary-900/30 dark:text-primary-400"
				>
					{topic}
				</span>
			{/each}
		</div>
	{/if}

	<!-- Direct links sit above the stretched card link (z-10) so they stay clickable. -->
	<div
		class="relative z-10 mt-auto flex items-center gap-4 border-t border-gray-100 pt-3 dark:border-gray-700/60"
	>
		<a
			href={project.repository}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
		>
			<SocialIcon platform="github" class="h-4 w-4" />
			GitHub
		</a>
		{#if doccUrl}
			<a
				href={doccUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					/>
				</svg>
				Docs
			</a>
		{/if}
	</div>
</div>
