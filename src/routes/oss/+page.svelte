<script lang="ts">
	import { ossProjects, ossByCategory } from '$lib/data/oss';
	import OSSCard from '$lib/components/OSSCard.svelte';
</script>

<section class="bg-white py-12 md:py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 sm:mb-14">
			<a
				href="/"
				class="mb-4 inline-flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back
			</a>
			<h1 class="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
				Open Source Projects
			</h1>
			<p class="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
				アプリ開発で繰り返し必要になった部品を、再利用可能な <strong class="font-semibold text-gray-800 dark:text-gray-200">Swift パッケージ</strong>
				として切り出して公開しています。エージェント／プロトコル、LLM、SwiftUI、通信基盤など {ossProjects.length} 個を種類別にまとめました。
			</p>
		</div>

		<div class="space-y-10 sm:space-y-14">
			{#each ossByCategory as group}
				<div>
					<div class="mb-4 flex items-baseline gap-2 sm:mb-6">
						<h2 class="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
							{group.category}
						</h2>
						<span class="text-sm text-gray-400 dark:text-gray-500">{group.projects.length}</span>
					</div>
					<div class="grid gap-4 sm:gap-6 md:grid-cols-2">
						{#each group.projects as project}
							<OSSCard {project} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
