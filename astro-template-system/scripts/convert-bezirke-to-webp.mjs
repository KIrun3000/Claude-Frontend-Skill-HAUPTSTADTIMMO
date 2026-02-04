#!/usr/bin/env node
/**
 * Converts Berlin district PNGs from assets folder to WebP in public/assets/images/bezirke
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Cursor stores provided images here; fallback to workspace assets if present
const WORKSPACE_ASSETS = path.join(__dirname, '../../assets');
const CURSOR_ASSETS = path.join(process.env.HOME || '', '.cursor/projects/Users-lucaingenbleek-Documents-Claude-Frontend-Skill-HAUPTSTADTIMMO/assets');
const ASSETS_SRC = fs.existsSync(CURSOR_ASSETS) ? CURSOR_ASSETS : WORKSPACE_ASSETS;
const OUT_DIR = path.join(__dirname, '../public/assets/images/bezirke');

const FILE_TO_SLUG = {
  'Bezirk_Mitte-af2aa210-6a90-4f55-90ec-81dbdc12e48d.png': 'mitte',
  'Bezirk_Fhain_Kreuzberg-c250a71e-add7-4d01-b0bc-fa3497e3b9dc.png': 'friedrichshain-kreuzberg',
  'Bezirk_Pankow-4cd22399-c28c-40bf-bace-d5ca00049c4a.png': 'pankow',
  'Bezirk_Steglitz_Zehlendorf-21f98a32-2a60-4ba5-af95-a3397430baf0.png': 'steglitz-zehlendorf',
  'Bezirk_Tempelhof_Scho_neberg-361702db-cd5e-4bb7-a579-b0868fc75332.png': 'tempelhof-schoeneberg',
  'Bezirk_Neuko_lln-1ccebb12-1c54-458c-b15b-957614dcb396.png': 'neukoelln',
  'Bezirk_Lichtenberg-f7ecad3c-d24e-4ee8-8c63-f9160b04983a.png': 'lichtenberg',
  'Bezirk_Treptow-Ko_penick-60d7851e-3bb5-42ff-9953-562d9ad2755f.png': 'treptow-koepenick',
  'Bezirk_Marzahn-Hellersdorf-a56c7bd6-bc53-42c3-bce3-d49da71c2a3b.png': 'marzahn-hellersdorf',
  'Bezirk_Reinickendorf-6cebf793-d32c-498d-86c0-e79153584866.png': 'reinickendorf',
};

async function main() {
  if (!fs.existsSync(ASSETS_SRC)) {
    console.error('Source assets folder not found:', ASSETS_SRC);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [filename, slug] of Object.entries(FILE_TO_SLUG)) {
    const srcPath = path.join(ASSETS_SRC, filename);
    if (!fs.existsSync(srcPath)) {
      console.warn('Skip (not found):', filename);
      continue;
    }
    const outPath = path.join(OUT_DIR, `${slug}.webp`);
    await sharp(srcPath)
      .webp({ quality: 85 })
      .resize(800, 600, { fit: 'cover' })
      .toFile(outPath);
    console.log('OK:', slug + '.webp');
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
