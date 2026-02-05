import fs from 'fs';
import path from 'path';

const registryPath = path.resolve(process.cwd(), 'src', 'utils', 'sectionRegistry.ts');
const registrySource = fs.readFileSync(registryPath, 'utf-8');

const toTitle = (value: string) =>
  value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const sections: Array<{ type: string; variants: string[] }> = [];

let inRegistry = false;
let braceDepth = 0;
let currentSection: { type: string; variants: string[] } | null = null;

const lines = registrySource.split('\n');
for (const rawLine of lines) {
  const line = rawLine.trim();

  if (!inRegistry) {
    if (line.startsWith('export const SectionRegistry')) {
      inRegistry = true;
      if (line.includes('{')) braceDepth += (line.match(/{/g) || []).length;
      if (line.includes('}')) braceDepth -= (line.match(/}/g) || []).length;
    }
    continue;
  }

  const openCount = (line.match(/{/g) || []).length;
  const closeCount = (line.match(/}/g) || []).length;

  if (braceDepth === 1) {
    const match = line.match(/^['"]?([A-Za-z0-9-]+)['"]?:\s*{\s*$/);
    if (match) {
      currentSection = { type: match[1], variants: [] };
      sections.push(currentSection);
    }
  } else if (braceDepth === 2 && currentSection) {
    const match = line.match(/^['"]?([A-Za-z0-9-]+)['"]?:/);
    if (match && match[1] !== 'default') {
      currentSection.variants.push(match[1]);
    }
  }

  // Update brace depth for each line after inspection
  braceDepth += openCount;
  braceDepth -= closeCount;

  if (braceDepth === 0 && inRegistry) {
    break;
  }
}

const manifestSections = sections.map((section) => {
  const uniqueVariants = Array.from(new Set(section.variants));
  const defaultVariant = uniqueVariants.includes('A') ? 'A' : uniqueVariants[0];
  return {
    type: section.type,
    default_variant: defaultVariant,
    variants: uniqueVariants.map((id) => ({ id, name: toTitle(id) })),
  };
});

const manifest = {
  template_id: 'astro-template-system',
  template_name: 'Astro Template System',
  sections: manifestSections,
};

const targetDir = path.resolve(process.cwd(), 'schema');
fs.mkdirSync(targetDir, { recursive: true });

const targetPath = path.join(targetDir, 'template.manifest.json');
fs.writeFileSync(targetPath, JSON.stringify(manifest, null, 2), 'utf-8');

console.log(`✅ Wrote ${targetPath}`);
