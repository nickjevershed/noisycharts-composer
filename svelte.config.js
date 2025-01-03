import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess'
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess : sveltePreprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : '/noisycharts'
		}
	}
	
};

export default config;
