import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

const getArg = (name) => {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const inputPath = process.env.PROMAKLER_SITE_JSON || getArg('--input');
const idArg = getArg('--id');

if (!inputPath) {
  console.error('❌ Missing --input <site.json> (or PROMAKLER_SITE_JSON).');
  process.exit(1);
}

const resolvedInput = path.resolve(inputPath);
const inferredId = path.basename(resolvedInput, path.extname(resolvedInput));
const siteId = idArg || inferredId;

if (!siteId) {
  console.error('❌ Missing --id <domain>.');
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), 'src', 'content', 'sites', 'generated');
fs.mkdirSync(targetDir, { recursive: true });

const targetPath = path.join(targetDir, `${siteId}.json`);
fs.copyFileSync(resolvedInput, targetPath);

console.log(`✅ Imported site JSON`);
console.log(`   Input:  ${resolvedInput}`);
console.log(`   Output: ${targetPath}`);
