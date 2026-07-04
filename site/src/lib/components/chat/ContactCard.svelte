<script lang="ts">
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import type { SocialLink } from '$lib/types';

	interface Props {
		contact: {
			email?: string;
			message?: string;
			socialLinks: SocialLink[];
		};
	}

	let { contact }: Props = $props();
</script>

<div
	class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
>
	{#if contact.message}
		<p class="text-sm text-gray-700 dark:text-gray-300">{contact.message}</p>
	{/if}

	{#if contact.email}
		<a
			href="mailto:{contact.email}"
			class="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
		>
			<SocialIcon platform="email" class="h-4 w-4" />
			{contact.email}
		</a>
	{/if}

	{#if contact.socialLinks.length > 0}
		<div class="mt-3 flex flex-wrap gap-2">
			{#each contact.socialLinks as link (link.url)}
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
