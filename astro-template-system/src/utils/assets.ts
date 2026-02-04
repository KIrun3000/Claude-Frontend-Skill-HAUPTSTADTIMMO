/**
 * Central Asset Catalog
 * Manages both local assets and remote URLs (Unsplash, etc.)
 * for reuse across different section variants
 */

export const Assets = {
  // Hero Backgrounds
  heroBerlinSkyline: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1920&q=80',
  heroBrandenburgGate: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80',
  
  // About / Team Images
  teamMeeting: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  officeInterior: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  
  // Property Listings
  propertyApartment1: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  propertyApartment2: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  propertyPenthouse: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  propertyVilla: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  propertyOffice: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  propertyLand: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  
  // Berlin Districts (local WebP)
  districtMitte: '/assets/images/bezirke/mitte.webp',
  districtFriedrichshainKreuzberg: '/assets/images/bezirke/friedrichshain-kreuzberg.webp',
  districtPankow: '/assets/images/bezirke/pankow.webp',
  districtCharlottenburg: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
  districtTempelhofSchoeneberg: '/assets/images/bezirke/tempelhof-schoeneberg.webp',
  districtSteglitzZehlendorf: '/assets/images/bezirke/steglitz-zehlendorf.webp',
  districtNeukoelln: '/assets/images/bezirke/neukoelln.webp',
  districtLichtenberg: '/assets/images/bezirke/lichtenberg.webp',
  districtTreptowKoepenick: '/assets/images/bezirke/treptow-koepenick.webp',
  districtMarzahnHellersdorf: '/assets/images/bezirke/marzahn-hellersdorf.webp',
  districtReinickendorf: '/assets/images/bezirke/reinickendorf.webp',
  districtKreuzberg: '/assets/images/bezirke/friedrichshain-kreuzberg.webp',
  
  // Location / Maps
  mapPlaceholder: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
  berlinAerial: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=80',
  
  // Blog / News
  blogRealEstate: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  blogFinance: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80',
  blogMarket: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=300&q=80',
  
  // Team Members
  agentMale1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  agentFemale1: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  agentMale2: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  agentFemale2: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  
  // Local Assets (for custom/reusable elements)
  // Will be populated as needed under /assets/images/...
  local: {
    logo: '/assets/images/logo.png', // If custom logo is added
    patternBg: '/assets/images/pattern-bg.svg', // If custom patterns are added
  }
} as const;

export type AssetKey = keyof typeof Assets;
