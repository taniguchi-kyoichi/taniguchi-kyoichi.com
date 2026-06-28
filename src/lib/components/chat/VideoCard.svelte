<script lang="ts">
	import type { YouTubeVideo } from '$lib/types';
	import { formatDate } from '$lib/utils/rss';

	interface Props {
		video: YouTubeVideo;
	}

	let { video }: Props = $props();
</script>

<a
	href={video.url}
	target="_blank"
	rel="noopener noreferrer"
	class="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
>
	<div class="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
		<img
			src={video.thumbnail}
			alt={video.title}
			loading="lazy"
			width="1280"
			height="720"
			class="h-full w-full object-cover transition-transform group-hover:scale-105"
		/>
		<span
			class="absolute inset-0 flex items-center justify-center text-white/90 opacity-90 transition-opacity group-hover:opacity-100"
		>
			<svg class="h-10 w-10 drop-shadow" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M8 5v14l11-7z" />
			</svg>
		</span>
	</div>
	<div class="flex flex-col p-3">
		<span class="text-xs text-gray-500 dark:text-gray-400">{formatDate(video.publishedAt)}</span>
		<h3
			class="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
		>
			{video.title}
		</h3>
	</div>
</a>
