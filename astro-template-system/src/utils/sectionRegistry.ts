// ============================================
// Hero Sections
// ============================================
import HeroA from '../sections/Hero/HeroA.astro';
import HeroB from '../sections/Hero/HeroB.astro';
import HeroFullscreenImage from '../sections/Hero/HeroFullscreenImage.astro';
import HeroSplitTextImage from '../sections/Hero/HeroSplitTextImage.astro';
import HeroLeadformInline from '../sections/Hero/HeroLeadformInline.astro';
import HeroSlider from '../sections/Hero/HeroSlider.astro';

// ============================================
// USPs Sections
// ============================================
import USPsA from '../sections/USPs/USPsA.astro';

// ============================================
// Listings Sections
// ============================================
import ListingsA from '../sections/Listings/ListingsA.astro';

// ============================================
// Services Sections
// ============================================
import ServicesA from '../sections/Services/ServicesA.astro';
import ServicesB from '../sections/Services/ServicesB.astro';
import ServicesIconGrid3Col from '../sections/Services/ServicesIconGrid3Col.astro';
import ServicesCardGrid2Col from '../sections/Services/ServicesCardGrid2Col.astro';
import ServicesCardGrid4Col from '../sections/Services/ServicesCardGrid4Col.astro';
import ServicesListAlternating from '../sections/Services/ServicesListAlternating.astro';
import ServicesProcessHybrid from '../sections/Services/ServicesProcessHybrid.astro';

// ============================================
// Content Sections (Fallback)
// ============================================
import ContentTextBlock from '../sections/Content/ContentTextBlock.astro';

// ============================================
// Trust Sections
// ============================================
import TrustA from '../sections/Trust/TrustA.astro';
import TrustStatistics from '../sections/Trust/TrustStatistics.astro';
import TrustLogoGrid from '../sections/Trust/TrustLogoGrid.astro';
import TrustReviewsSummary from '../sections/Trust/TrustReviewsSummary.astro';
import TrustPressAwards from '../sections/Trust/TrustPressAwards.astro';

// ============================================
// CTA Sections (NEW TYPE)
// ============================================
import CTASolidBackground from '../sections/CTA/CTASolidBackground.astro';
import CTASplitBenefits from '../sections/CTA/CTASplitBenefits.astro';
import CTAImageBackground from '../sections/CTA/CTAImageBackground.astro';
import CTAModernisierungspaket from '../sections/CTA/CTAModernisierungspaket.astro';

// ============================================
// Contact Sections
// ============================================
import ContactA from '../sections/Contact/ContactA.astro';
import ContactSimple from '../sections/Contact/ContactSimple.astro';
import ContactForm from '../sections/Contact/ContactForm.astro';
import ContactWithMap from '../sections/Contact/ContactWithMap.astro';
import ContactMultiOffice from '../sections/Contact/ContactMultiOffice.astro';

// ============================================
// About Sections
// ============================================
import AboutA from '../sections/About/AboutA.astro';
import AboutB from '../sections/About/AboutB.astro';
import AboutTextWithImage from '../sections/About/AboutTextWithImage.astro';
import AboutFounderStory from '../sections/About/AboutFounderStory.astro';
import AboutTeamGrid from '../sections/About/AboutTeamGrid.astro';
import AboutValuesCards from '../sections/About/AboutValuesCards.astro';

// ============================================
// Process Sections (NEW TYPE)
// ============================================
import ProcessStepIcons from '../sections/Process/ProcessStepIcons.astro';
import ProcessAlternating from '../sections/Process/ProcessAlternating.astro';
import ProcessTimelineCompact from '../sections/Process/ProcessTimelineCompact.astro';

// ============================================
// Districts Sections
// ============================================
import DistrictsA from '../sections/Districts/DistrictsA.astro';

// ============================================
// Testimonials Sections
// ============================================
import TestimonialsA from '../sections/Testimonials/TestimonialsA.astro';

// ============================================
// Rating Sections
// ============================================
import RatingA from '../sections/Rating/RatingA.astro';

// ============================================
// Team Sections
// ============================================
import TeamA from '../sections/Team/TeamA.astro';

// ============================================
// References Sections
// ============================================
import ReferencesA from '../sections/References/ReferencesA.astro';

// ============================================
// Blog Sections
// ============================================
import BlogA from '../sections/Blog/BlogA.astro';

// ============================================
// Footer Sections
// ============================================
import FooterA from '../sections/Footer/FooterA.astro';
import FooterMultiColumn from '../sections/Footer/FooterMultiColumn.astro';
import FooterMinimal from '../sections/Footer/FooterMinimal.astro';

// ============================================
// Section Registry
// ============================================
export const SectionRegistry = {
  hero: {
    // Legacy variants (kept for backwards compatibility)
    A: HeroA,
    B: HeroB,
    // New descriptive variants
    'fullscreen-image': HeroFullscreenImage,
    'split-text-image': HeroSplitTextImage,
    'leadform-inline': HeroLeadformInline,
    'slider': HeroSlider,
  },
  usps: {
    A: USPsA,
  },
  'featured-listings': {
    A: ListingsA,
  },
  services: {
    // Legacy variants
    A: ServicesA,
    B: ServicesB,
    // New descriptive variants
    'icon-grid-3col': ServicesIconGrid3Col,
    'card-grid-2col': ServicesCardGrid2Col,
    'card-grid-4col': ServicesCardGrid4Col,
    'list-alternating': ServicesListAlternating,
    'process-hybrid': ServicesProcessHybrid,
  },
  content: {
    'text-block': ContentTextBlock,
  },
  trust: {
    // Legacy variant
    A: TrustA,
    // New descriptive variants
    'statistics': TrustStatistics,
    'logo-grid': TrustLogoGrid,
    'reviews-summary': TrustReviewsSummary,
    'press-awards': TrustPressAwards,
  },
  // NEW SECTION TYPE: CTA
  cta: {
    'solid-background': CTASolidBackground,
    'split-benefits': CTASplitBenefits,
    'image-background': CTAImageBackground,
    'modernisierungspaket': CTAModernisierungspaket,
    // Default alias
    A: CTASolidBackground,
  },
  contact: {
    // Legacy variant
    A: ContactA,
    // New descriptive variants
    'simple': ContactSimple,
    'form': ContactForm,
    'with-map': ContactWithMap,
    'multi-office': ContactMultiOffice,
  },
  about: {
    // Legacy variants
    A: AboutA,
    B: AboutB,
    // New descriptive variants
    'text-with-image': AboutTextWithImage,
    'founder-story': AboutFounderStory,
    'team-grid': AboutTeamGrid,
    'values-cards': AboutValuesCards,
  },
  // NEW SECTION TYPE: Process
  process: {
    'step-icons': ProcessStepIcons,
    'alternating': ProcessAlternating,
    'timeline-compact': ProcessTimelineCompact,
    // Default alias
    A: ProcessStepIcons,
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
    // Legacy variant
    A: FooterA,
    // New descriptive variants
    'multi-column': FooterMultiColumn,
    'minimal': FooterMinimal,
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

/**
 * Get all available variants for a section type
 */
export function getVariants(type: string): string[] {
  const sectionType = SectionRegistry[type as SectionType];
  if (!sectionType) return [];
  return Object.keys(sectionType);
}

/**
 * Check if a section type exists
 */
export function hasSection(type: string): boolean {
  return type in SectionRegistry;
}

/**
 * Check if a variant exists for a section type
 */
export function hasVariant(type: string, variant: string): boolean {
  const sectionType = SectionRegistry[type as SectionType];
  if (!sectionType) return false;
  return variant in sectionType;
}
