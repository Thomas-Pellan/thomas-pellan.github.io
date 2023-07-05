import { z, defineCollection } from 'astro:content'

const programCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        subTitle: z.string(),
    })
});
const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        subTitle: z.string(),
        callToAction: z.array(),
    })
});

export const collections = {
    programs: programCollection,
    blogs: blogCollection,
};