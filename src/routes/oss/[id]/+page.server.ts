import type { PageServerLoad } from './$types';
import { ossProjects } from '$lib/data/oss';
import { error } from '@sveltejs/kit';
import { profile } from '$lib/data/profile';
import { DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_SIZE, SITE_URL } from '$lib/seo';
import type { SEO } from '$lib/seo';

async function fetchReadme(
	repository: string,
	fetchFn: typeof fetch
): Promise<string | null> {
	const repoMatch = repository.match(/github\.com\/([^/]+)\/([^/]+)/);
	if (!repoMatch) return null;

	const [, owner, repo] = repoMatch;

	try {
		const main = await fetchFn(
			`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
		);
		if (main.ok) return await main.text();

		const master = await fetchFn(
			`https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`
		);
		if (master.ok) return await master.text();
	} catch {
		return null;
	}
	return null;
}

export const load: PageServerLoad = async ({ params, fetch }) => {
	const project = ossProjects.find((p) => p.id === params.id);

	if (!project) {
		throw error(404, 'Project not found');
	}

	const readme = await fetchReadme(project.repository, fetch);

	// Sibling packages in the same category. Cross-linking detail pages weaves a
	// dense internal-link mesh (each page goes from ~1 inbound link to 5–8),
	// which both helps these pages rank and lets visitors discover related work.
	const related = ossProjects.filter(
		(p) => p.id !== project.id && p.category === project.category
	);

	// Front-load the package name + its one-line purpose so the SERP title carries
	// the keywords people actually search ("swift markdown", "swift router", …),
	// not just "name | 谷口恭一". og:site_name still carries the branding.
	const tagline = project.description.split('。')[0];

	const seo: SEO = {
		title: `${project.name} — ${tagline}`,
		description: project.description,
		canonical: `${SITE_URL}/oss/${project.id}`,
		ogType: 'website',
		ogImage: DEFAULT_OG_IMAGE,
		ogImageAlt: project.name,
		ogImageWidth: DEFAULT_OG_IMAGE_SIZE,
		ogImageHeight: DEFAULT_OG_IMAGE_SIZE,
		twitterCard: 'summary',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'SoftwareSourceCode',
			name: project.name,
			description: project.description,
			codeRepository: project.repository,
			programmingLanguage: project.language,
			...(project.topics ? { keywords: project.topics.join(', ') } : {}),
			author: { '@type': 'Person', name: profile.name, url: SITE_URL }
		}
	};

	return { project, readme, related, seo };
};
