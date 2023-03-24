import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import image from '@astrojs/image';
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
    integrations: [vue(), image(), astroImageTools],
});
