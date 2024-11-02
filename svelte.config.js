import createNodeAdapter from "@sveltejs/adapter-node";
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte";
const vitePreprocessor = vitePreprocess();
const adapter = createNodeAdapter();

/** @type {import("@sveltejs/kit").Config} */
const svelteConfig = {
	preprocess: [vitePreprocessor],
	kit: {
		adapter,
		files: {},
	},
};

export default svelteConfig;
