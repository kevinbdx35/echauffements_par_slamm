import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://kevinbdx35.github.io',
  base: '/echauffements_par_slamm',
  integrations: [tailwind()],
});
