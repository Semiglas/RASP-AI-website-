import { defineConfig } from 'astro/config';
import autoprefixer from 'autoprefixer';
import tailwind from "@astrojs/tailwind";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  vite: {
    postcss: {
      plugins: [autoprefixer({})]
    }
  },
  integrations: [tailwind(), image()]
});