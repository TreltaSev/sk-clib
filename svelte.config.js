import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			layout: { _: path.resolve('src/lib/docs/_layouts/bare.svelte') },
			extensions: ['.svx']
		})
	],

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},

		alias: {
			'@lib': 'src/lib',
			'@doc': 'src/lib/docs'
		}
	}
};

export default config;
