import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import { astroImageTools } from "astro-imagetools";
import compress from "astro-compress";
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';
import serviceWorker from 'astrojs-service-worker';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ibf-equicoaching.com',
  trailingSlash: 'never',
  build: {
    format: 'file'
  },
  integrations: [vue(), astroImageTools, compress(), serviceWorker(), sitemap({
    serialize(item) {
      item.changefreq = 'weekly';
      item.lastmod = new Date();
      item.priority = 0.9;
      if (/blog/.test(item.url)) {
        item.changefreq = 'weekly';
        item.lastmod = new Date();
        item.priority = 0.7;
      }
      if (/partners/.test(item.url)) {
        item.changefreq = 'monthly';
        item.lastmod = new Date();
        item.priority = 0.7;
      }
      //Removing trailling slash from sitemap urls
      if(item.url.slice(-1) === '/'){
        item.url = item.url.slice(0, -1)
      }
      return item;
    }
  }), webmanifest({
    name: 'IBf Equicoaching',
    icon: 'public/img/logo-50x50.webp',
    start_url: '/',
    short_name: 'IBF',
    description: 'Equicoaching et Horse Coaching, Formations',
    theme_color: '#fff',
    background_color: '#86071f',
    display: 'standalone',
    config: {
      iconPurpose: ['maskable', 'any'],
    },
  })]
});