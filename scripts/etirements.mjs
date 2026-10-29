// Convertit public/etirements.pdf en images (src/assets/etirements/) et en texte (src/data/etirements.json).
// À relancer après chaque mise à jour du PDF : node scripts/etirements.mjs
// Nécessite pdftoppm et pdftotext (paquet poppler-utils).
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const pdf = 'public/etirements.pdf';
const outDir = 'src/assets/etirements';
const tmp = mkdtempSync(join(tmpdir(), 'etirements-'));

const pages = Number(execFileSync('pdfinfo', [pdf], { encoding: 'utf8' }).match(/Pages:\s+(\d+)/)[1]);

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
execFileSync('pdftoppm', ['-png', '-scale-to-x', '1600', '-scale-to-y', '-1', pdf, join(tmp, 'page')]);

const pngs = readdirSync(tmp).filter(f => f.endsWith('.png')).sort();
for (const [i, file] of pngs.entries()) {
  const n = String(i + 1).padStart(2, '0');
  await sharp(join(tmp, file)).webp({ quality: 90 }).toFile(join(outDir, `page-${n}.webp`));
}
rmSync(tmp, { recursive: true, force: true });

const data = [];
for (let i = 1; i <= pages; i++) {
  const lines = execFileSync('pdftotext', ['-f', String(i), '-l', String(i), '-layout', pdf, '-'], { encoding: 'utf8' })
    .split('\n').map(l => l.trim()).filter(Boolean);
  const duree = lines.find(l => /^\d+\s*(sec|min)/i.test(l)) ?? '';
  const rest = lines.filter(l => l !== duree);
  const titre = rest[0] ?? `Page ${i}`;
  const texte = rest.slice(1).join(' ').replace(/\s+/g, ' ').trim();
  data.push({ page: i, titre, duree, texte });
}
writeFileSync('src/data/etirements.json', JSON.stringify(data, null, 2) + '\n');
console.log(`${pages} pages converties`);
