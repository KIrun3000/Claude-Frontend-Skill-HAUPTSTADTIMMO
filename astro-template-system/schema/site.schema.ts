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
// Section Schemas
// ============================================

export const CTASchema = z.object({
  text: z.string().max(30),
  href: z.string(),
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
    primary: CTASchema,
    secondary: CTASchema.optional(),
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

// Services Props
export const ServicesPropsSchema = z.object({
  title: z.string().max(60),
  subtitle: z.string().max(120).optional(),
  label: z.string().max(50).optional(),
  items: z.array(z.object({
    icon: z.string(),
    title: z.string().max(50),
    description: z.string().max(150),
  })).min(2).max(8).optional(),
  columns: z.array(z.object({
    icon: z.string(),
    title: z.string().max(50),
    services: z.array(z.object({
      icon: z.string(),
      title: z.string().max(80),
      description: z.string().max(200),
    })),
    cta: CTASchema.optional(),
  })).optional(),
});

// Trust/Stats Props
export const TrustPropsSchema = z.object({
  title: z.string().max(60).optional(),
  stats: z.array(z.object({
    value: z.string().max(20),
    label: z.string().max(50),
  })).min(2).max(6),
});

// Contact Props
export const ContactPropsSchema = z.object({
  title: z.string().max(60),
  subtitle: z.string().max(120).optional(),
  showMap: z.boolean().default(false),
  formFields: z.array(z.enum(['name', 'email', 'phone', 'message', 'subject'])),
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
  ]),
  variant: z.string(), // "A" | "B" | "C"
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

export type Brand = z.infer<typeof BrandSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type CTA = z.infer<typeof CTASchema>;
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
export type Section = z.infer<typeof SectionSchema>;
export type Page = z.infer<typeof PageSchema>;
export type Site = z.infer<typeof SiteSchema>;
