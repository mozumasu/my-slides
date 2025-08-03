import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: undefined,
  integrations: [tailwind()],
  vite: {
    ssr: {
      noExternal: ['@packages/ui']
    }
  }
});