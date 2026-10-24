import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svgDocument, roundRect, text, PALETTE } from './lib/svg-kit.mjs';
import { PANEL_H, PANEL_W, STORY_PANELS } from './lib/story-scenes.mjs';
import { MATCH_SCENES } from './lib/matching-scenes.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const data = JSON.parse(readFileSync(join(root, 'src', 'data', 'simulations.json'), 'utf8'));

const chase = '#cc0000';

function storySvg(panels, alt) {
  const gap = 8;
  const width = PANEL_W * 2 + gap * 3;
  const height = PANEL_H * 2 + gap * 3;
  let body = `<defs><clipPath id="panelClip"><rect width="${PANEL_W}" height="${PANEL_H}" rx="10"/></clipPath></defs>`;
  body += `<rect width="${width}" height="${height}" fill="#e2e8f0"/>`;

  panels.forEach((panel, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = gap + col * (PANEL_W + gap);
    const y = gap + row * (PANEL_H + gap);
    body += `<g transform="translate(${x} ${y})">${panel}</g>`;
    body += `<g transform="translate(${x} ${y})">
${roundRect(8, 8, 22, 22, 6, 'rgba(15,23,42,0.72)')}
${text(19, 24, String(index + 1), 13, '#ffffff', 'font-weight="700"')}
</g>`;
  });

  return svgDocument({ width, height, body, background: '#e2e8f0', title: alt });
}

function matchSvg(inner, alt) {
  return svgDocument({
    width: PANEL_W,
    height: PANEL_H,
    body: `<defs><clipPath id="panelClip"><rect width="${PANEL_W}" height="${PANEL_H}" rx="10"/></clipPath></defs>${inner}`,
    background: PALETTE.paper,
    title: alt,
  });
}

let storyCount = 0;
let matchCount = 0;
const problems = [];

for (const set of data) {
  for (const question of set.questions) {
    if (question.category === 'story_image') {
      const renderers = STORY_PANELS[question.id];
      if (!renderers || renderers.length !== 4) {
        problems.push(`Story panel tidak lengkap: ${question.id} (${renderers?.length ?? 0})`);
        continue;
      }
      const panels = renderers.map((panel) => {
              if (typeof panel === 'string') return panel;
              try {
                return panel();
              } catch (error) {
                problems.push(`Gagal render ${question.id}: ${error.message}`);
                return '';
              }
            });
      const target = join(publicDir, question.asset);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, storySvg(panels, question.image_alt ?? 'Ilustrasi empat panel'), 'utf8');
      storyCount += 1;
    }

    if (question.category === 'match_image') {
      const scenes = MATCH_SCENES[question.id];
      if (!scenes) {
        problems.push(`Scene matching tidak ada: ${question.id}`);
        continue;
      }
      for (const key of ['A', 'B', 'C', 'D']) {
        const render = scenes[key];
        if (!render) {
          problems.push(`Opsi ${key} tidak ada: ${question.id}`);
          continue;
        }
        let inner = '';
        try {
          inner = render();
        } catch (error) {
          problems.push(`Gagal render ${question.id}${key}: ${error.message}`);
        }
        const target = join(publicDir, question.image_options[key].src);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, matchSvg(inner, 'Ilustrasi pilihan gambar'), 'utf8');
        matchCount += 1;
      }
    }
  }
}

console.log(`SVG cerita: ${storyCount}/25`);
console.log(`SVG pilihan matching: ${matchCount}/100`);
if (problems.length) {
  console.error('\nMasalah:');
  for (const problem of problems) console.error(` - ${problem}`);
  process.exit(1);
}
console.log('Semua 125 SVG berhasil dibuat.');