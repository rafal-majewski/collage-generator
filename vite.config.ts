import {sveltekit} from "@sveltejs/kit/vite";
import type * as Vite from "vite";
const svelteKitPlugin = sveltekit();

const viteConfig: Vite.UserConfig = {
	plugins: [svelteKitPlugin],
};

export default viteConfig;
