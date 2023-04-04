import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import image from '@astrojs/image';
import { astroImageTools } from "astro-imagetools";
import compress from "astro-compress";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ibf-equicoqching.com',
  integrations: [vue(), image(), astroImageTools, compress(), sitemap()],
});
