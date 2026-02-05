import fs from 'fs';
import path from 'path';

const findContractsDir = () => {
  const envDir = process.env.PROMAKLER_CONTRACTS_DIR;
  if (envDir && fs.existsSync(envDir)) return envDir;

  let current = process.cwd();
  for (let i = 0; i < 6; i += 1) {
    const candidate = path.join(current, 'contracts');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return null;
};

const contractsDir = findContractsDir();
if (!contractsDir) {
  console.error('❌ contracts directory not found. Set PROMAKLER_CONTRACTS_DIR.');
  process.exit(1);
}

const schemaDir = path.join(contractsDir, 'schemas');
const sourceJson = path.join(schemaDir, 'site.schema.json');
const sourceTs = path.join(schemaDir, 'site.schema.ts');

if (!fs.existsSync(sourceJson)) {
  console.error(`❌ Missing ${sourceJson}`);
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), 'schema');
fs.mkdirSync(targetDir, { recursive: true });

const targetJson = path.join(targetDir, 'site.schema.json');
fs.copyFileSync(sourceJson, targetJson);

if (fs.existsSync(sourceTs)) {
  const targetTs = path.join(targetDir, 'site.schema.ts');
  fs.copyFileSync(sourceTs, targetTs);
}

console.log('✅ Synced contracts schemas');
console.log(`   Source: ${schemaDir}`);
console.log(`   Target: ${targetDir}`);
