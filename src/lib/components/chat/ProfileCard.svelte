<script lang="ts">
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import type { SocialLink } from '$lib/types';

	interface Props {
		profile: {
			name: string;
			nameEn: string;
			title: string;
			bio: string;
			avatar?: string;
			location?: string;
			socialLinks: SocialLink[];
		};
	}

	let { profile }: Props = $props();
</script>

<div
	class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
>
	<div class="flex items-center gap-4">
		{#if profile.avatar}
			<img
				src={profile.avatar}
				alt={profile.name}
				class="h-16 w-16 rounded-full object-cover"
			/>
		{/if}
		<div class="min-w-0">
			<p class="truncate text-base font-semibold text-gray-900 dark:text-white">
				{profile.name}
			</p>
			<p class="text-sm text-primary-600 dark:text-primary-400">{profile.title}</p>
			{#if profile.location}
				<p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">📍 {profile.location}</p>
			{/if}
		</div>
	</div>

	<p class="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{profile.bio}</p>

	{#if profile.socialLinks.length > 0}
		<div class="mt-3 flex flex-wrap gap-2">
			{#each profile.socialLinks as link (link.url)}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
					aria-label={link.label}
				>
					<SocialIcon platform={link.platform} class="h-4 w-4" />
				</a>
			{/each}
		</div>
	{/if}
</div>
