import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from "mdsvex";
import rehypeExternalLinks from 'rehype-external-links';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svx"],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex({
    rehypePlugins: [[rehypeExternalLinks,
      {
        rel: ["noopener", "noreferrer"],
        target: "_blank"
      }]]
  }), preprocess()],

  kit: {
    adapter: adapter(),
    alias: {
      "src": "src"
    }
  }
};

export default config;
