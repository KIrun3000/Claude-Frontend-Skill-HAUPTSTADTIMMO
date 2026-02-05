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

const sourcePath = path.resolve(process.cwd(), 'schema', 'template.manifest.json');
if (!fs.existsSync(sourcePath)) {
  console.error(`❌ Missing ${sourcePath}. Run npm run export-manifest first.`);
  process.exit(1);
}

const targetDir = path.join(contractsDir, 'templates');
fs.mkdirSync(targetDir, { recursive: true });

const targetPath = path.join(targetDir, 'astro-template-system.manifest.json');
fs.copyFileSync(sourcePath, targetPath);

console.log(`✅ Published manifest to ${targetPath}`);
