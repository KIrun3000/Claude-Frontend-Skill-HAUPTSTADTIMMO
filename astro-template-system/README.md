# 🏠 Immobilien Template System

Ein modulares, Schema-basiertes Template-System für Immobilienmakler-Websites, gebaut mit Astro.

## 🎯 Überblick

Dieses System ermöglicht die automatisierte Generierung von Immobilien-Websites basierend auf einem **Canonical JSON Schema**. Es wurde entwickelt für:

- **Automatische Relaunches** von Makler-Websites
- **Template-basierte Generierung** mit Sections & Varianten
- **Brand-spezifisches Theming** über Design Tokens
- **Skalierbare Content-Struktur** für Extract-Projekt Integration

## 📁 Projekt-Struktur

```
astro-template-system/
├── schema/                     # Schema-Definitionen für Extract-Projekt
│   ├── site.schema.ts         # Zod Schema (Runtime Validation)
│   └── site.schema.json       # JSON Schema (Standard)
│
├── examples/                   # Beispiele für Extract-Projekt
│   └── canonical-input.json   # Erwartetes Input-Format
│
├── src/
│   ├── sections/              # Section Library
│   │   ├── Hero/
│   │   │   ├── HeroA.astro   # Hero mit Suchfunktion
│   │   │   └── HeroB.astro   # Einfacher Hero
│   │   ├── Listings/
│   │   │   └── ListingsA.astro
│   │   ├── USPs/
│   │   ├── Services/
│   │   ├── Trust/
│   │   └── Contact/
│   │
│   ├── components/
│   │   └── PropertyCard.astro
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │
│   ├── content/              # Content Collections
│   │   ├── config.ts
│   │   └── sites/
│   │       └── hauptstadt.json  # Canonical Site Data
│   │
│   ├── data/
│   │   └── properties.json   # Fake Property Data
│   │
│   ├── pages/
│   │   ├── [...slug].astro   # Dynamic Page Renderer
│   │   └── objekte/[slug].astro
│   │
│   ├── utils/
│   │   └── sectionRegistry.ts
│   │
│   └── styles/
│       └── global.css        # CSS Variables & Global Styles
│
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Öffne [http://localhost:4321](http://localhost:4321)

### Build

```bash
npm run build
```

## 📊 Canonical Schema

### Input-Format (von Extract-Projekt)

Das System erwartet ein JSON-Objekt mit folgender Struktur:

```typescript
{
  "meta": {
    "domain": "beispiel-immobilien.de",
    "template": "template-a",  // template-a | template-b | template-c
    "brand": {
      "name": "Beispiel Immobilien",
      "tagline": "Ihr Partner für...",
      "colors": {
        "primary": "#1a1a2e",
        "secondary": "#16213e",
        "accent": "#c9a227",
        "accentLight": "#faf5e8"
      },
      "fonts": {
        "display": "Playfair Display",
        "body": "DM Sans"
      }
    },
    "contact": {
      "phone": "+49 30 12345678",
      "email": "info@beispiel.de",
      "address": "Musterstraße 1, 10115 Berlin"
    }
  },
  "pages": [
    {
      "slug": "/",
      "title": "Startseite",
      "sections": [
        {
          "type": "hero",
          "variant": "A",
          "order": 1,
          "visible": true,
          "props": { /* Section-specific props */ }
        }
      ]
    }
  ]
}
```

### Validierung

Input wird automatisch gegen Zod-Schema validiert:

```typescript
import { SiteSchema } from './schema/site.schema';

const result = SiteSchema.safeParse(inputData);
if (!result.success) {
  console.error('Validation errors:', result.error);
}
```

## 🧩 Section Library

### Verfügbare Sections

| Section Type | Varianten | Beschreibung |
|-------------|-----------|--------------|
| `hero` | A, B | Hero mit/ohne Suchfunktion |
| `usps` | A | USP-Grid mit Icons |
| `featured-listings` | A | Property Grid |
| `services` | A | Service-Cards |
| `trust` | A | Stats/Zahlen |
| `contact` | A | Kontaktformular |

### Section Props

Jede Section hat typisierte Props. Beispiel Hero:

```typescript
{
  "type": "hero",
  "variant": "A",
  "props": {
    "title": "Finden Sie Ihre Traumimmobilie",
    "subtitle": "in Berlin",
    "description": "Über 20 Jahre Erfahrung",
    "cta": {
      "primary": { "text": "Angebote", "href": "/angebote" },
      "secondary": { "text": "Kontakt", "href": "/kontakt" }
    },
    "search": {
      "enabled": true,
      "types": ["wohnung", "haus"],
      "filters": ["kaufen", "mieten"]
    }
  }
}
```

### Neue Section hinzufügen

1. **Component erstellen:**
```astro
// src/sections/MySection/MySectionA.astro
---
interface Props {
  title: string;
  items: Array<{ text: string }>;
}

const { title, items } = Astro.props;
---

<section class="my-section">
  <h2>{title}</h2>
  {items.map(item => <div>{item.text}</div>)}
</section>
```

2. **In Registry registrieren:**
```typescript
// src/utils/sectionRegistry.ts
import MySectionA from '../sections/MySection/MySectionA.astro';

export const SectionRegistry = {
  // ... existing
  'my-section': {
    A: MySectionA,
  },
};
```

3. **Schema erweitern:**
```typescript
// schema/site.schema.ts
export const SectionSchema = z.object({
  type: z.enum([
    'hero',
    'usps',
    'my-section',  // Add here
    // ...
  ]),
  // ...
});
```

## 🎨 Theming & Design Tokens

### Brand Colors

Brand-spezifische Farben werden automatisch als CSS Variables injiziert:

```css
:root {
  --color-primary: #1a1a2e;     /* von brand.colors.primary */
  --color-accent: #c9a227;      /* von brand.colors.accent */
  --font-display: 'Playfair Display';
  --font-body: 'DM Sans';
}
```

### Custom Styles

Alle Sections nutzen CSS Variables für konsistentes Theming:

```css
.my-section {
  background: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-display);
}
```

## 🏗️ Workflow für Extract-Projekt

### 1. Extract liefert Canonical JSON

```json
{
  "meta": { /* ... */ },
  "pages": [ /* ... */ ]
}
```

### 2. JSON in Content Collection ablegen

```bash
# Kopiere das JSON
cp extracted-site.json src/content/sites/kunde-name.json
```

### 3. Build & Deploy

```bash
npm run build
# → dist/ enthält fertige statische Site
```

### 4. Preview Deploy (Vercel)

```bash
vercel --yes
# → Kostenlose Preview-URL für Kunde
```

### 5. Production Deploy (nach Auftrag)

```bash
vercel --prod
# + Custom Domain Setup
```

## 📝 Property Data

### Fake Data für Demo

Beispiel-Objekte liegen in `src/data/properties.json`:

```json
[
  {
    "id": "1",
    "slug": "wohnung-prenzlauer-berg",
    "type": "wohnung",
    "status": "mieten",
    "title": "3-Zimmer-Wohnung",
    "price": { "value": 1450, "type": "miete-kalt" },
    "details": { "area": 78, "rooms": 3 }
  }
]
```

### CRM-Integration (später)

Properties können später aus CRM-XML gemappt werden:

```typescript
// Beispiel: XML → Property Schema
const property = {
  id: xmlNode.id,
  type: mapType(xmlNode.objektart),
  price: {
    value: parseFloat(xmlNode.preis),
    type: xmlNode.vermarktungsart === 'KAUF' ? 'kauf' : 'miete-kalt'
  },
  // ...
};
```

## 🧪 Testing

### Validation testen

```bash
npm run astro check
```

### Content validieren

```typescript
import { getCollection } from 'astro:content';

const sites = await getCollection('sites');
// Astro validiert automatisch gegen Zod Schema
```

## 📦 Deployment

### Vercel (empfohlen)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy dist/
netlify deploy --prod --dir=dist
```

### Cloudflare Pages

```bash
npm run build
# Verbinde Repo mit Cloudflare Pages
```

## 🔧 Konfiguration

### Astro Config

```javascript
// astro.config.mjs
export default defineConfig({
  // Bereits konfiguriert für optimale Performance
});
```

### TypeScript

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict"
}
```

## 📚 Weitere Ressourcen

### Schema-Dokumentation

Siehe `schema/site.schema.ts` für vollständige Schema-Definition mit Kommentaren.

### Beispiele

- `examples/canonical-input.json` - Vollständiges Beispiel
- `src/content/sites/hauptstadt.json` - Live-Beispiel

### Astro Docs

- [Astro Documentation](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)

## 🤝 Integration mit Extract-Projekt

### Erwartete Outputs von Extract

1. **Canonical JSON** - Siehe `examples/canonical-input.json`
2. **Assets** - Logos, Bilder (URLs oder Base64)
3. **Optional:** Property-Data als separates JSON

### Mapping-Hints für Extract

```typescript
// Hero-Section aus HTML extrahieren:
{
  type: 'hero',
  variant: hasSearchWidget ? 'A' : 'B',
  props: {
    title: extractH1Text(),
    subtitle: extractSubheadline(),
    cta: extractCTAs(),
    search: hasSearchWidget ? extractSearchConfig() : undefined
  }
}
```

## 🐛 Troubleshooting

### Section wird nicht gerendert

1. Prüfe Section Registry: `src/utils/sectionRegistry.ts`
2. Prüfe type/variant in JSON: müssen exakt matchen
3. Check Console für Warnings

### Validation Errors

```bash
npm run astro check
```

Zeigt Zod-Validation Errors mit genauer Position.

### Styles funktionieren nicht

1. Prüfe ob CSS Variables korrekt gesetzt sind
2. Check Browser DevTools → Computed Styles
3. Stelle sicher dass `global.css` importiert ist

## 📄 Lizenz

Privates Projekt - Alle Rechte vorbehalten

---

**Made with ❤️ for automated Immobilien Relaunches**
