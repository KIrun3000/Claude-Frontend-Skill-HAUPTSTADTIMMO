import { z } from 'zod';

// ============================================
// Brand & Contact Schemas
// ============================================

export const BrandSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  logo: z.string().url().optional(),
  colors: z.object({
    primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    accentLight: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  }),
  fonts: z.object({
    display: z.string(),
    body: z.string(),
  }),
});

export const ContactSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  hours: z.string().optional(),
  social: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
});

// ============================================
// Shared Sub-Schemas
// ============================================

export const CTAButtonSchema = z.object({
  text: z.string().max(30),
  href: z.string(),
});

// Legacy alias
export const CTASchema = CTAButtonSchema;

// Lead Form Schema (for Hero variants)
export const LeadFormFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['text', 'email', 'tel', 'select', 'textarea']),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(), // for select fields
});

export const LeadFormSchema = z.object({
  fields: z.array(LeadFormFieldSchema).min(1).max(5),
  submitText: z.string().max(30).default('Absenden'),
  privacyText: z.string().optional(),
});

// Slide Schema (for Hero Slider)
export const SlideSchema = z.object({
  title: z.string().max(80),
  subtitle: z.string().max(100).optional(),
  description: z.string().max(200).optional(),
  backgroundImage: z.string().url(),
  cta: CTAButtonSchema.optional(),
});

// Hero Section Props
export const HeroPropsSchema = z.object({
  title: z.string().max(80),
  subtitle: z.string().max(100).optional(),
  description: z.string().max(200).optional(),
  badge: z.object({
    icon: z.string().optional(),
    text: z.string().max(50),
  }).optional(),
  cta: z.object({
    primary: CTAButtonSchema,
    secondary: CTAButtonSchema.optional(),
  }).optional(),
  search: z.object({
    enabled: z.boolean(),
    types: z.array(z.string()),
    filters: z.array(z.string()),
  }).optional(),
  stats: z.array(z.object({
    value: z.string().max(20),
    label: z.string().max(50),
  })).optional(),
  image: z.string().url().optional(),
  video: z.string().url().optional(),
  backgroundImage: z.string().url().optional(),
  // New fields for variants
  leadForm: LeadFormSchema.optional(),
  slides: z.array(SlideSchema).min(2).max(7).optional(),
  autoplay: z.boolean().default(false),
  autoplayInterval: z.number().min(3000).max(10000).default(5000),
});

// USPs Section Props
export const USPsPropsSchema = z.object({
  items: z.array(z.object({
    icon: z.string(),
    title: z.string().max(50),
    description: z.string().max(100),
  })).min(2).max(6),
});

// Featured Listings Props
export const FeaturedListingsPropsSchema = z.object({
  title: z.string().max(60),
  subtitle: z.string().max(120).optional(),
  limit: z.number().min(3).max(12).default(6),
  layout: z.enum(['grid', 'featured', 'map']),
  cta: CTASchema.optional(),
});

// Process Step Schema (for Services and Process sections)
export const ProcessStepSchema = z.object({
  number: z.number().optional(),
  icon: z.string().optional(),
  title: z.string().max(50),
  description: z.string().max(200),
});

// Service Item Schema (extended)
export const ServiceItemSchema = z.object({
  icon: z.string(),
  title: z.string().max(50),
  description: z.string().max(150),
  // New optional fields
  cta: CTAButtonSchema.optional(),
  image: z.string().url().optional(),
  steps: z.array(ProcessStepSchema).max(5).optional(),
});

// Services Props
export const ServicesPropsSchema = z.object({
  title: z.string().max(60),
  subtitle: z.string().max(120).optional(),
  label: z.string().max(50).optional(),
  items: z.array(ServiceItemSchema).min(2).max(8).optional(),
  columns: z.array(z.object({
    icon: z.string(),
    title: z.string().max(50),
    services: z.array(z.object({
      icon: z.string(),
      title: z.string().max(80),
      description: z.string().max(200),
    })),
    cta: CTAButtonSchema.optional(),
  })).optional(),
});

// Logo Schema (for Trust variants)
export const LogoSchema = z.object({
  name: z.string().max(50),
  image: z.string().url(),
  url: z.string().url().optional(),
});

// Review Schema (for Trust variants)
export const ReviewSchema = z.object({
  text: z.string().max(300),
  author: z.string().max(100),
  role: z.string().max(100).optional(),
  rating: z.number().min(1).max(5),
  avatar: z.string().url().optional(),
  source: z.string().max(50).optional(),
});

// Press/Award Schema (for Trust variants)
export const PressAwardSchema = z.object({
  title: z.string().max(100),
  source: z.string().max(50),
  year: z.string().max(10).optional(),
  image: z.string().url().optional(),
  url: z.string().url().optional(),
});

// Trust/Stats Props
export const TrustPropsSchema = z.object({
  title: z.string().max(60).optional(),
  subtitle: z.string().max(200).optional(),
  stats: z.array(z.object({
    value: z.string().max(20),
    label: z.string().max(50),
    icon: z.string().optional(),
  })).min(2).max(6).optional(),
  // New fields for variants
  logos: z.array(LogoSchema).max(12).optional(),
  reviews: z.array(ReviewSchema).max(6).optional(),
  reviewScore: z.object({
    score: z.number().min(1).max(5),
    count: z.number(),
    source: z.string().max(50),
  }).optional(),
  press: z.array(PressAwardSchema).max(8).optional(),
});

// Office Schema (for multi-office contact)
export const OfficeSchema = z.object({
  name: z.string().max(60),
  address: z.string(),
  phone: z.string(),
  email: z.string().email(),
  hours: z.string().optional(),
  mapUrl: z.string().url().optional(),
  image: z.string().url().optional(),
});

// Contact Props
export const ContactPropsSchema = z.object({
  title: z.string().max(60),
  subtitle: z.string().max(120).optional(),
  showMap: z.boolean().default(false),
  formFields: z.array(z.enum(['name', 'email', 'phone', 'message', 'subject'])),
  // New fields for variants
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    hours: z.string().optional(),
    social: z.object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      linkedin: z.string().url().optional(),
    }).optional(),
  }).optional(),
  offices: z.array(OfficeSchema).max(6).optional(),
  mapUrl: z.string().url().optional(),
  mapEmbedUrl: z.string().url().optional(),
});

// Founder Schema (for About variants)
export const FounderSchema = z.object({
  name: z.string().max(100),
  role: z.string().max(100),
  image: z.string().url(),
  quote: z.string().max(500),
  signature: z.string().url().optional(),
});

// Value Schema (for About variants)
export const ValueSchema = z.object({
  icon: z.string(),
  title: z.string().max(50),
  description: z.string().max(200),
});

// Team Member Schema (for About variants)
export const TeamMemberSchema = z.object({
  name: z.string().max(100),
  role: z.string().max(100),
  image: z.string().url(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  bio: z.string().max(300).optional(),
});

// About Props
export const AboutPropsSchema = z.object({
  label: z.string().max(50).optional(),
  title: z.string().max(80),
  subtitle: z.string().max(200).optional(),
  content: z.string(),
  image: z.string().url().optional(),
  imageOverlay: z.object({
    number: z.string().max(10),
    label: z.string().max(30),
  }).optional(),
  features: z.array(z.object({
    icon: z.string(),
    text: z.string().max(100),
  })).optional(),
  // New fields for variants
  founder: FounderSchema.optional(),
  values: z.array(ValueSchema).max(6).optional(),
  team: z.array(TeamMemberSchema).max(12).optional(),
});

// Districts Props
export const DistrictsPropsSchema = z.object({
  label: z.string().max(50).optional(),
  title: z.string().max(60),
  subtitle: z.string().max(200).optional(),
  items: z.array(z.object({
    name: z.string().max(50),
    count: z.number().or(z.string()),
    image: z.string().url(),
  })).min(4).max(12),
});

// Testimonials Props
export const TestimonialsPropsSchema = z.object({
  label: z.string().max(50).optional(),
  title: z.string().max(60),
  subtitle: z.string().max(200).optional(),
  items: z.array(z.object({
    text: z.string().max(500),
    author: z.string().max(100),
    role: z.string().max(100).optional(),
    rating: z.number().min(1).max(5),
    avatar: z.string().optional(),
  })).min(2).max(10),
});

// Rating Props
export const RatingPropsSchema = z.object({
  score: z.number().min(1).max(5),
  count: z.number(),
  source: z.string().max(50),
  sourceIcon: z.string().optional(),
  badges: z.array(z.object({
    icon: z.string(),
    title: z.string().max(50),
    subtitle: z.string().max(50),
  })).optional(),
});

// Team Props
export const TeamPropsSchema = z.object({
  label: z.string().max(50).optional(),
  title: z.string().max(60),
  subtitle: z.string().max(200).optional(),
  members: z.array(z.object({
    name: z.string().max(100),
    role: z.string().max(100),
    image: z.string().url(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    linkedin: z.string().url().optional(),
  })).min(1).max(20),
});

// References Props
export const ReferencesPropsSchema = z.object({
  label: z.string().max(50).optional(),
  title: z.string().max(60),
  subtitle: z.string().max(200).optional(),
  items: z.array(z.object({
    type: z.string().max(50),
    title: z.string().max(100),
    location: z.string().max(100),
    image: z.string().url(),
    status: z.string().max(30),
    stats: z.array(z.object({
      icon: z.string(),
      value: z.string().max(30),
    })).optional(),
  })).min(2).max(12),
});

// Blog Props
export const BlogPropsSchema = z.object({
  label: z.string().max(50).optional(),
  title: z.string().max(60),
  subtitle: z.string().max(200).optional(),
  featured: z.object({
    image: z.string().url(),
    category: z.string().max(30),
    date: z.string(),
    title: z.string().max(100),
    excerpt: z.string().max(300),
    link: z.string(),
  }).optional(),
  posts: z.array(z.object({
    image: z.string().url(),
    title: z.string().max(100),
    date: z.string(),
    link: z.string(),
  })).optional(),
});

// ============================================
// New Section Types: CTA & Process
// ============================================

// Benefit/USP Schema (for CTA variants)
export const BenefitSchema = z.object({
  icon: z.string(),
  title: z.string().max(50),
  description: z.string().max(150).optional(),
});

// Package Feature Schema (for Modernisierungspaket)
export const PackageFeatureSchema = z.object({
  icon: z.string().optional(),
  text: z.string().max(100),
  included: z.boolean().default(true),
});

// CTA Section Props
export const CTAPropsSchema = z.object({
  title: z.string().max(80),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(300).optional(),
  cta: z.object({
    primary: CTAButtonSchema,
    secondary: CTAButtonSchema.optional(),
  }),
  backgroundImage: z.string().url().optional(),
  backgroundColor: z.string().optional(),
  benefits: z.array(BenefitSchema).max(4).optional(),
  // For Modernisierungspaket variant
  package: z.object({
    name: z.string().max(50),
    price: z.string().max(30).optional(),
    priceNote: z.string().max(100).optional(),
    features: z.array(PackageFeatureSchema).max(10),
    highlight: z.string().max(100).optional(),
  }).optional(),
});

// Process Section Props
export const ProcessPropsSchema = z.object({
  label: z.string().max(50).optional(),
  title: z.string().max(80),
  subtitle: z.string().max(200).optional(),
  steps: z.array(z.object({
    number: z.number().optional(),
    icon: z.string().optional(),
    title: z.string().max(60),
    description: z.string().max(300),
    image: z.string().url().optional(),
  })).min(3).max(7).optional(),
  cta: CTAButtonSchema.optional(),
  // For timeline variant
  timeline: z.array(z.object({
    year: z.string().max(10),
    title: z.string().max(60),
    description: z.string().max(200),
  })).optional(),
}).refine((data) => {
  const hasSteps = Array.isArray(data.steps) && data.steps.length > 0;
  const hasTimeline = Array.isArray(data.timeline) && data.timeline.length > 0;
  return hasSteps || hasTimeline;
}, {
  message: 'Process section requires either steps or timeline entries.',
});

// Footer Props
export const FooterPropsSchema = z.object({
  about: z.object({
    logo: z.string().optional(),
    text: z.string().max(300),
    social: z.array(z.object({
      platform: z.string(),
      icon: z.string(),
      url: z.string().url(),
    })).optional(),
  }).optional(),
  columns: z.array(z.object({
    title: z.string().max(50),
    links: z.array(z.object({
      text: z.string().max(50),
      href: z.string(),
    })),
  })).optional(),
  legal: z.array(z.object({
    text: z.string().max(30),
    href: z.string(),
  })).optional(),
  copyright: z.string().max(100),
});

// ============================================
// Section Schema (Union of all types)
// ============================================

export const SectionSchema = z.object({
  type: z.enum([
    'hero',
    'usps',
    'featured-listings',
    'services',
    'trust',
    'contact',
    'about',
    'districts',
    'testimonials',
    'rating',
    'team',
    'references',
    'blog',
    'footer',
    // New section types
    'cta',
    'process',
  ]),
  variant: z.string(), // "A" | "B" | descriptive keys like "fullscreen-image"
  order: z.number(),
  visible: z.boolean().default(true),
  props: z.record(z.any()), // Type-specific props validated at runtime
});

// ============================================
// Page Schema
// ============================================

export const PageSchema = z.object({
  slug: z.string(),
  title: z.string().max(80),
  description: z.string().max(160).optional(),
  sections: z.array(SectionSchema),
});

// ============================================
// Site Schema (Main Export)
// ============================================

export const SiteSchema = z.object({
  meta: z.object({
    domain: z.string(),
    template: z.enum(['template-a', 'template-b', 'template-c']),
    sectionStylePreset: z.enum(['modern', 'hauptstadt-classic']).default('modern'),
    detailPageVariant: z.enum(['default', 'vo']).default('default'),
    brand: BrandSchema,
    contact: ContactSchema,
  }),
  pages: z.array(PageSchema),
});

// ============================================
// TypeScript Types
// ============================================

// ============================================
// TypeScript Types
// ============================================

// Base types
export type Brand = z.infer<typeof BrandSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type CTA = z.infer<typeof CTAButtonSchema>;
export type CTAButton = z.infer<typeof CTAButtonSchema>;

// Sub-schema types
export type LeadFormField = z.infer<typeof LeadFormFieldSchema>;
export type LeadForm = z.infer<typeof LeadFormSchema>;
export type Slide = z.infer<typeof SlideSchema>;
export type ProcessStep = z.infer<typeof ProcessStepSchema>;
export type ServiceItem = z.infer<typeof ServiceItemSchema>;
export type Logo = z.infer<typeof LogoSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type PressAward = z.infer<typeof PressAwardSchema>;
export type Office = z.infer<typeof OfficeSchema>;
export type Founder = z.infer<typeof FounderSchema>;
export type Value = z.infer<typeof ValueSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type Benefit = z.infer<typeof BenefitSchema>;
export type PackageFeature = z.infer<typeof PackageFeatureSchema>;

// Section Props types
export type HeroProps = z.infer<typeof HeroPropsSchema>;
export type USPsProps = z.infer<typeof USPsPropsSchema>;
export type FeaturedListingsProps = z.infer<typeof FeaturedListingsPropsSchema>;
export type ServicesProps = z.infer<typeof ServicesPropsSchema>;
export type TrustProps = z.infer<typeof TrustPropsSchema>;
export type ContactProps = z.infer<typeof ContactPropsSchema>;
export type AboutProps = z.infer<typeof AboutPropsSchema>;
export type DistrictsProps = z.infer<typeof DistrictsPropsSchema>;
export type TestimonialsProps = z.infer<typeof TestimonialsPropsSchema>;
export type RatingProps = z.infer<typeof RatingPropsSchema>;
export type TeamProps = z.infer<typeof TeamPropsSchema>;
export type ReferencesProps = z.infer<typeof ReferencesPropsSchema>;
export type BlogProps = z.infer<typeof BlogPropsSchema>;
export type FooterProps = z.infer<typeof FooterPropsSchema>;
// New section types
export type CTAProps = z.infer<typeof CTAPropsSchema>;
export type ProcessProps = z.infer<typeof ProcessPropsSchema>;

// Structure types
export type Section = z.infer<typeof SectionSchema>;
export type Page = z.infer<typeof PageSchema>;
export type Site = z.infer<typeof SiteSchema>;
