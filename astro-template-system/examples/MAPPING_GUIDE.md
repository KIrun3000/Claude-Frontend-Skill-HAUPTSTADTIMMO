# 🗺️ Mapping Guide: Extract → Template System

Dieses Dokument beschreibt, wie das **Extract-Projekt** Daten aus gescrapten Websites in das Canonical JSON Format des Template-Systems überführen soll.

## 📋 Übersicht

```
Alte Website (HTML/CSS/JS)
    ↓ [Extract-Projekt]
    ↓ Scraping, Parsing, Normalisierung
    ↓
Canonical JSON
    ↓ [Template-System]
    ↓ Section Mapping, Rendering
    ↓
Neue Website (Astro Build)
```

## 🎯 Mapping-Prioritäten

### 1. Meta-Daten (PFLICHT)

| Quelle | Ziel | Extraktions-Hinweise |
|--------|------|---------------------|
| `<title>`, `<h1>` | `meta.brand.name` | Name des Unternehmens extrahieren |
| `<meta name="description">` | `meta.brand.tagline` | Tagline/Slogan |
| Favicon, Logo | `meta.brand.logo` | URL zum Logo |
| CSS Custom Properties, Computed Styles | `meta.brand.colors.*` | Primäre/Sekundäre/Akzent-Farben |
| `font-family` declarations | `meta.brand.fonts.*` | Display & Body Fonts |
| Tel/Email Links | `meta.contact.*` | Kontaktdaten |

#### Beispiel-Extraktion: Brand Colors

```typescript
// Pseudo-Code für Color Extraction
const primaryColor = 
  getCSSVariable('--primary-color') ||
  getMostUsedColor('background') ||
  extractFromLogo() ||
  '#1a1a2e'; // Fallback

const accentColor = 
  getCSSVariable('--accent-color') ||
  getButtonColors() ||
  getLinkColors() ||
  '#c9a227'; // Fallback
```

### 2. Seiten-Struktur

| HTML-Pattern | Page Slug | Sections |
|--------------|-----------|----------|
| `/`, `/index.html` | `/` | Hero, USPs, Listings, Services, Trust, Contact |
| `/angebote`, `/immobilien` | `/angebote` | Hero-B, Listings |
| `/ueber-uns`, `/about` | `/ueber-uns` | Hero-B, About, Team |
| `/kontakt`, `/contact` | `/kontakt` | Hero-B, Contact |
| `/leistungen`, `/services` | `/leistungen` | Hero-B, Services |

### 3. Section-Mapping

## 🔷 Hero Section

### Pattern-Erkennung

```html
<!-- Typische Hero-Patterns -->
<section class="hero|banner|jumbotron">
  <h1>Hauptüberschrift</h1>
  <p>Untertext</p>
  <div class="cta-buttons">
    <a href="/angebote">Button 1</a>
    <a href="/kontakt">Button 2</a>
  </div>
  <!-- Optional: Suchformular -->
  <form class="property-search">...</form>
</section>
```

### Mapping → Canonical

```typescript
{
  type: 'hero',
  variant: hasSearchWidget(heroSection) ? 'A' : 'B',
  order: 1,
  visible: true,
  props: {
    title: extractText('h1'),
    subtitle: extractText('h2, .subtitle, .tagline'),
    description: extractText('p:first-of-type'),
    cta: {
      primary: extractCTA(1),   // { text, href }
      secondary: extractCTA(2)
    },
    search: hasSearchWidget ? {
      enabled: true,
      types: extractSearchTypes(),      // ['wohnung', 'haus', ...]
      filters: extractSearchFilters()   // ['kaufen', 'mieten']
    } : undefined
  }
}
```

### Variant-Entscheidung

| Bedingung | Variant |
|-----------|---------|
| Hat Property-Suchformular | `A` |
| Einfach mit Text + CTAs | `B` |
| Hat Video/großes Bild | `B` (mit `image` prop) |

## 🔷 USPs Section

### Pattern-Erkennung

```html
<!-- Typische USP-Patterns -->
<section class="features|usps|benefits|warum-wir">
  <div class="feature-grid">
    <div class="feature">
      <i class="fa-icon"></i>
      <h3>Titel</h3>
      <p>Beschreibung</p>
    </div>
    <!-- Repeat 3-6x -->
  </div>
</section>
```

### Mapping → Canonical

```typescript
{
  type: 'usps',
  variant: 'A',
  order: 2,
  props: {
    items: extractUSPs().map(usp => ({
      icon: extractIconClass(usp),     // 'fa-award', 'fa-star', ...
      title: extractText(usp, 'h3, h4, .title'),
      description: extractText(usp, 'p, .description')
    }))
  }
}
```

### Icon-Mapping

Wenn kein Font Awesome Icon gefunden:

```typescript
const iconMapping = {
  'Erfahrung': 'fa-award',
  'Betreuung': 'fa-handshake',
  'Qualität': 'fa-shield-halved',
  'Bewertung': 'fa-star',
  'Service': 'fa-concierge-bell',
  // ... etc
};
```

## 🔷 Featured Listings Section

### Pattern-Erkennung

```html
<!-- Property Grid/Cards -->
<section class="properties|angebote|listings">
  <h2>Aktuelle Angebote</h2>
  <div class="property-grid">
    <div class="property-card">...</div>
    <div class="property-card">...</div>
  </div>
  <a href="/angebote">Alle Angebote</a>
</section>
```

### Mapping → Canonical

```typescript
{
  type: 'featured-listings',
  variant: 'A',
  order: 3,
  props: {
    title: extractText('h2, h3'),
    subtitle: extractText('.subtitle, p:first-of-type'),
    limit: countPropertyCards() || 6,
    layout: 'grid',  // Immer 'grid' für Variant A
    cta: extractLinkToFullListings() || {
      text: 'Alle Angebote',
      href: '/angebote'
    }
  }
}
```

**Wichtig:** Die Properties selbst werden NICHT hier extrahiert, sondern als Beispiel-Data übernommen!

## 🔷 Services Section

### Pattern-Erkennung

```html
<section class="services|leistungen|angebot">
  <h2>Unsere Leistungen</h2>
  <div class="service-grid">
    <div class="service">
      <i class="icon"></i>
      <h3>Service-Name</h3>
      <p>Beschreibung</p>
    </div>
  </div>
</section>
```

### Mapping → Canonical

```typescript
{
  type: 'services',
  variant: 'A',
  order: 5,
  props: {
    title: extractText('h2'),
    subtitle: extractText('.subtitle, p.intro'),
    items: extractServices().map(service => ({
      icon: extractIconClass(service) || guessIcon(service.title),
      title: extractText(service, 'h3, h4'),
      description: extractText(service, 'p, .description')
    }))
  }
}
```

## 🔷 Trust/Stats Section

### Pattern-Erkennung

```html
<section class="stats|zahlen|fakten|trust">
  <div class="stat-grid">
    <div class="stat">
      <span class="value">500+</span>
      <span class="label">Kunden</span>
    </div>
  </div>
</section>
```

### Mapping → Canonical

```typescript
{
  type: 'trust',
  variant: 'A',
  order: 4,
  props: {
    title: extractText('h2') || undefined,
    stats: extractStats().map(stat => ({
      value: extractNumber(stat),  // "500+", "20 Jahre", "95%"
      label: extractLabel(stat)     // "Kunden", "Erfahrung", "Zufriedenheit"
    }))
  }
}
```

## 🔷 Contact Section

### Pattern-Erkennung

```html
<section class="contact|kontakt">
  <h2>Kontakt</h2>
  <form class="contact-form">
    <input name="name" />
    <input name="email" />
    <input name="phone" />
    <textarea name="message"></textarea>
    <button>Senden</button>
  </form>
  <div class="map">...</div>
</section>
```

### Mapping → Canonical

```typescript
{
  type: 'contact',
  variant: 'A',
  order: 6,
  props: {
    title: extractText('h2, .contact-title'),
    subtitle: extractText('.subtitle, .intro'),
    showMap: hasElement('.map, iframe[src*="google.com/maps"]'),
    formFields: extractFormFields()  // ['name', 'email', 'phone', 'message']
  }
}
```

### Form Fields Mapping

```typescript
const formFieldMapping = {
  'name': /name|vorname|nachname/i,
  'email': /email|e-mail|mail/i,
  'phone': /phone|tel|telefon|mobil/i,
  'subject': /subject|betreff|thema/i,
  'message': /message|nachricht|text/i
};
```

## 🔍 Extraktions-Heuristiken

### 1. Color Extraction

```typescript
function extractBrandColors(page: Page): BrandColors {
  // Methode 1: CSS Variables
  const cssVars = page.getCSSVariables();
  
  // Methode 2: Logo-Analyse
  const logoColors = analyzeLogo(page.getLogo());
  
  // Methode 3: Most Used Colors
  const usedColors = analyzeColorUsage(page);
  
  // Priorität: CSS Vars > Logo > Most Used
  return {
    primary: cssVars['--primary'] || logoColors.dominant || usedColors[0],
    secondary: cssVars['--secondary'] || logoColors.secondary || usedColors[1],
    accent: cssVars['--accent'] || logoColors.accent || '#c9a227',
    accentLight: lighten(accent, 0.4)
  };
}
```

### 2. Section-Order Bestimmung

```typescript
function determineSectionOrder(sections: Section[]): Section[] {
  const orderRules = {
    'hero': 1,
    'usps': 2,
    'featured-listings': 3,
    'trust': 4,
    'services': 5,
    'contact': 6
  };
  
  return sections.sort((a, b) => 
    (orderRules[a.type] || 99) - (orderRules[b.type] || 99)
  );
}
```

### 3. Content Length Limits

```typescript
const limits = {
  'hero.title': 80,
  'hero.subtitle': 100,
  'hero.description': 200,
  'cta.text': 30,
  'usp.title': 50,
  'usp.description': 100,
  'service.title': 50,
  'service.description': 150,
};

function truncateIfNeeded(text: string, type: string): string {
  const limit = limits[type];
  return text.length > limit 
    ? text.substring(0, limit - 3) + '...'
    : text;
}
```

## 🚨 Fehlerbehandlung

### Fehlende Sections

```typescript
// Mindest-Set für valide Seite
const requiredSections = ['hero'];

// Falls Section nicht gefunden, Defaults:
const defaultSections = {
  hero: {
    type: 'hero',
    variant: 'B',
    props: {
      title: brandName,
      subtitle: 'Ihr Immobilienpartner'
    }
  }
};
```

### Ungültige Colors

```typescript
function validateColor(color: string): string {
  const hexPattern = /^#[0-9A-Fa-f]{6}$/;
  
  if (hexPattern.test(color)) {
    return color;
  }
  
  // Try to convert from rgb, rgba, etc.
  const converted = convertToHex(color);
  
  // Fallback
  return converted || '#1a1a2e';
}
```

## 📊 Output-Validierung

Nach der Extraktion IMMER validieren:

```typescript
import { SiteSchema } from './schema/site.schema';

function validateOutput(extractedData: any): boolean {
  const result = SiteSchema.safeParse(extractedData);
  
  if (!result.success) {
    console.error('Validation failed:', result.error.errors);
    return false;
  }
  
  return true;
}
```

## 🧪 Testing

### Test-Cases für Extract

1. **Minimal-Website**: Nur Startseite mit Hero + Contact
2. **Standard-Website**: Alle Standard-Sections
3. **Complex-Website**: Mehrere Pages, viele Sections
4. **Edge-Cases**: Ungewöhnliche Layouts, fehlende Daten

### Beispiel Test-Output

Siehe `examples/canonical-input.json` als Referenz.

## 🔗 Integration

### 1. Extract führt aus

```bash
extract-tool scrape https://alte-website.de --output extracted.json
```

### 2. Validierung

```bash
validate-schema extracted.json
```

### 3. Template-System übernimmt

```bash
cp extracted.json astro-template-system/src/content/sites/kunde.json
cd astro-template-system
npm run build
```

---

**Bei Fragen zum Mapping → siehe Schema-Definition in `schema/site.schema.ts`**
