import { defineCollection } from 'astro:content';
import { SiteSchema } from '../../schema/site.schema';

const sitesCollection = defineCollection({
  type: 'data',
  schema: SiteSchema,
});

export const collections = {
  sites: sitesCollection,
};
