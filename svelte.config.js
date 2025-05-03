import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('svelte/compiler').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@lib': 'src/lib'
		}
	}
};

export default config;
