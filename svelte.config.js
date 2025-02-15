import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess'
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess : sveltePreprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html',
			pages: 'build', // Must match the path in GitHub Actions
      		assets: 'build'
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : '/noisycharts-composer'
		}
	}
	
};

export default config;
