// Hero Sections
import HeroA from '../sections/Hero/HeroA.astro';
import HeroB from '../sections/Hero/HeroB.astro';

// USPs Sections
import USPsA from '../sections/USPs/USPsA.astro';

// Listings Sections
import ListingsA from '../sections/Listings/ListingsA.astro';

// Services Sections
import ServicesA from '../sections/Services/ServicesA.astro';
import ServicesB from '../sections/Services/ServicesB.astro';

// Trust Sections
import TrustA from '../sections/Trust/TrustA.astro';

// Contact Sections
import ContactA from '../sections/Contact/ContactA.astro';

// About Sections
import AboutA from '../sections/About/AboutA.astro';
import AboutB from '../sections/About/AboutB.astro';

// Districts Sections
import DistrictsA from '../sections/Districts/DistrictsA.astro';

// Testimonials Sections
import TestimonialsA from '../sections/Testimonials/TestimonialsA.astro';

// Rating Sections
import RatingA from '../sections/Rating/RatingA.astro';

// Team Sections
import TeamA from '../sections/Team/TeamA.astro';

// References Sections
import ReferencesA from '../sections/References/ReferencesA.astro';

// Blog Sections
import BlogA from '../sections/Blog/BlogA.astro';

// Footer Sections
import FooterA from '../sections/Footer/FooterA.astro';

export const SectionRegistry = {
  hero: {
    A: HeroA,
    B: HeroB,
  },
  usps: {
    A: USPsA,
  },
  'featured-listings': {
    A: ListingsA,
  },
  services: {
    A: ServicesA,
    B: ServicesB,
  },
  trust: {
    A: TrustA,
  },
  contact: {
    A: ContactA,
  },
  about: {
    A: AboutA,
    B: AboutB,
  },
  districts: {
    A: DistrictsA,
  },
  testimonials: {
    A: TestimonialsA,
  },
  rating: {
    A: RatingA,
  },
  team: {
    A: TeamA,
  },
  references: {
    A: ReferencesA,
  },
  blog: {
    A: BlogA,
  },
  footer: {
    A: FooterA,
  },
} as const;

export type SectionType = keyof typeof SectionRegistry;
export type SectionVariant<T extends SectionType> = keyof typeof SectionRegistry[T];

/**
 * Get a section component by type and variant
 */
export function getSection(type: string, variant: string) {
  const sectionType = SectionRegistry[type as SectionType];
  
  if (!sectionType) {
    console.warn(`Section type "${type}" not found in registry`);
    return null;
  }

  const component = sectionType[variant as keyof typeof sectionType];
  
  if (!component) {
    console.warn(`Variant "${variant}" not found for section type "${type}"`);
    return null;
  }

  return component;
}
