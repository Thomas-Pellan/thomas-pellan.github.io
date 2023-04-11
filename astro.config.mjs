import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import image from '@astrojs/image';
import { astroImageTools } from "astro-imagetools";
import compress from "astro-compress";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thomas-pellan.github.io',
  base: '/ibf-front',
  integrations: [vue(), image(), astroImageTools, compress(), sitemap({
    serialize(item) {
      item.changefreq = 'weekly';
      item.lastmod = new Date();
      item.priority = 0.9;
      if (/blog/.test(item.url)) {
        item.changefreq = 'weekly';
        item.lastmod = new Date();
        item.priority = 0.7;
      }
      if (/partners/.test(item.url) ) {
        item.changefreq = 'monthly';
        item.lastmod = new Date();
        item.priority = 0.7;
      }
      return item;
    },
  })]
});
