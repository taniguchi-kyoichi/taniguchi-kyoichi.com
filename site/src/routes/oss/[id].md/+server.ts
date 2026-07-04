import type { RequestHandler } from './$types';
import { ossProjects } from '$lib/data/oss';
import { error } from '@sveltejs/kit';
import { SITE_URL } from '$lib/seo';

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

export const GET: RequestHandler = async ({ params, fetch, setHeaders }) => {
	const project = ossProjects.find((p) => p.id === params.id);

	if (!project) {
		throw error(404, 'Project not found');
	}

	setHeaders({
		'content-type': 'text/markdown; charset=utf-8',
		'cache-control': 'public, max-age=3600, stale-while-revalidate=86400'
	});

	const readme = await fetchReadme(project.repository, fetch);

	const lines: string[] = [];
	lines.push(`# ${project.name}`);
	lines.push('');
	lines.push(`> ${project.description}`);
	lines.push('');

	lines.push('## Overview');
	lines.push('');
	lines.push(`- **Language**: ${project.language}`);
	if (project.topics && project.topics.length > 0) {
		lines.push(`- **Topics**: ${project.topics.join(', ')}`);
	}
	lines.push(`- **Repository**: ${project.repository}`);
	if (project.homepage) lines.push(`- **Homepage**: ${project.homepage}`);
	lines.push(`- **Page**: ${SITE_URL}/oss/${project.id}`);
	lines.push('');

	if (readme) {
		lines.push('## README');
		lines.push('');
		lines.push(readme);
	}

	return new Response(lines.join('\n'));
};
