import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const excluded = new Set([
  '.git', '.github', 'node_modules', 'dist', 'android', 'ios',
  'scripts', 'src', 'package.json', 'package-lock.json',
  'capacitor.config.ts', 'capacitor.config.json'
]);

function copyTree(src, dst) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyTree(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

copyTree(root, dist);

const indexPath = path.join(dist, 'index.html');
if (!fs.existsSync(indexPath)) {
  throw new Error('NurseMate index.html was not found in the repository root.');
}

let html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('nursemate-admob.js')) {
  const tag = '<script src="nursemate-admob.js"></script>';
  html = html.replace(/<\/body>/i, `${tag}\n</body>`);
  fs.writeFileSync(indexPath, html);
}
