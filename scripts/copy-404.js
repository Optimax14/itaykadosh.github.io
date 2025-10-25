import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const outDir = resolve(process.cwd(), 'dist', 'public');
const indexHtml = resolve(outDir, 'index.html');
const notFound = resolve(outDir, '404.html');

if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, notFound);
  console.log('Created 404.html for GitHub Pages SPA fallback');
} else {
  console.warn('index.html not found in build output; 404.html not created');
}

