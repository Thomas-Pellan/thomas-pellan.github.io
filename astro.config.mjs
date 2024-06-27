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
      if ('https://www.ibf-equicoaching.com/' === item.url) {
        item.video = [{
          title: 'Et si vous osiez le coaching autrement ? IBF Equicoaching',
          description: 'Présentation de IBF Equicoaching',
          thumbnail_loc: 'https://i.ytimg.com/vi/pgN6-mk2y4A/hqdefault.jpg',
          content_loc: 'https://www.youtube.com/watch?v=pgN6-mk2y4A',
          duration: 209,
          allow_embed: 'yes'
        }]
      }
      if ('https://www.ibf-equicoaching.com/about' === item.url) {
        item.video = [{
          title: 'Camille Marzec, Équicoach certifiée et fondatrice d\'IBF Équicoaching - Coach Station',
          description: 'Interview IBF Equicoaching',
          thumbnail_loc: 'https://i.ytimg.com/vi/qZ4Y1D2HMi4/hqdefault.jpg',
          content_loc: 'https://www.youtube.com/watch?v=qZ4Y1D2HMi4',
          duration: 3036,
          allow_embed: 'yes'
        }]
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
  })],
  redirects: {
    '/map/service': '/service',
    '/map/map/blog/etre-coach-26-ans': '/blog/etre-coach-26-ans',
    '/map/map/blog/deroulement-seance-individuelle': '/blog/deroulement-seance-individuelle',
    '/map/equicoaching-grenoble': '/equicoaching-grenoble',
    '/map/equicoaching-switzerland': '/equicoaching-switzerland',
    '/map/equicoaching-aix-les-bains': '/equicoaching-aix-les-bains',
    '/map/equicoaching-albertville': '/equicoaching-albertville',
    '/map/equicoaching-suisse': '/equicoaching-suisse',
    '/map/equicoaching-annecy': '/equicoaching-annecy',
    '/map/equicoaching-chambery': '/equicoaching-chambery',
    '/map/blog/intelligence-emotionnelle': '/blog/intelligence-emotionnelle',
    '/map/blog/equicoaching-quest-ce-que-cest': '/blog/equicoaching-quest-ce-que-cest',
    '/map/contact': '/contact',
    '/map/charte-accessibilite': '/charte-accessibilite',
    '/map/company': '/company',
    '/map/events': '/events',
    '/avis': '/',
    '/partners/index': '/partners',
    '/map/map': '/map',
    '/map/about': '/about',
    '/map/pricing-training': '/pricing-training',
    '/map/pricing-equitation': '/pricing-equitation',
    '/mecgv': '/cgv',
    '/map/bons': '/bons',
    '/map/mentions-legales': '/mentions-legales',
    '/map/cookies': '/cookies',
    '/blog/index' : '/blog',
  }
});
