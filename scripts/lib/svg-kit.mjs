// Procedural SVG illustration kit: flat, consistent, no external assets, no emoji.
// Every drawing is composed from the primitives below so all 125 files share one visual language.

export const PALETTE = {
  ink: '#334155',
  inkSoft: '#64748b',
  skin: '#f3c9a8',
  skinAlt: '#e0ac86',
  hair: '#3f3f46',
  hairAlt: '#7c2d12',
  white: '#ffffff',
  paper: '#f8fafc',
  blue: '#3b82f6',
  blueDeep: '#2563eb',
  sky: '#dbeafe',
  teal: '#0d9488',
  green: '#22c55e',
  greenDeep: '#15803d',
  red: '#ef4444',
  redDeep: '#b91c1c',
  amber: '#f59e0b',
  amberDeep: '#b45309',
  brown: '#a16207',
  wood: '#c8a27a',
  woodDeep: '#8b5e34',
  grey: '#cbd5e1',
  greyDeep: '#94a3b8',
  purple: '#8b5cf6',
  pink: '#f9a8d4',
  navy: '#1e3a8a',
  snow: '#e2e8f0',
};

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function svgDocument({ width, height, body, background = PALETTE.paper, title }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${esc(title ?? 'Ilustrasi soal')}">
<title>${esc(title ?? 'Ilustrasi soal')}</title>
<rect width="${width}" height="${height}" fill="${background}"/>
${body}
</svg>
`;
}

export const rect = (x, y, w, h, fill, extra = '') =>
  tag('rect', [['x', x], ['y', y], ['width', w], ['height', h], ['fill', fill], ...attrPairs(extra)]);

export const roundRect = (x, y, w, h, r, fill, extra = '') =>
  tag('rect', [['x', x], ['y', y], ['width', w], ['height', h], ['rx', r], ['fill', fill], ...attrPairs(extra)]);

export const circle = (cx, cy, r, fill, extra = '') =>
  tag('circle', [['cx', cx], ['cy', cy], ['r', r], ['fill', fill], ...attrPairs(extra)]);

export const ellipse = (cx, cy, rx, ry, fill, extra = '') =>
  tag('ellipse', [['cx', cx], ['cy', cy], ['rx', rx], ['ry', ry], ['fill', fill], ...attrPairs(extra)]);

export const path = (d, fill, extra = '') => tag('path', [['d', d], ['fill', fill], ...attrPairs(extra)]);

export const line = (x1, y1, x2, y2, stroke, width = 3, extra = '') =>
  tag('line', [
    ['x1', x1],
    ['y1', y1],
    ['x2', x2],
    ['y2', y2],
    ['stroke', stroke],
    ['stroke-width', width],
    ['stroke-linecap', 'round'],
    ...attrPairs(extra),
  ]);

export function text(x, y, value, size = 12, fill = PALETTE.ink, extra = '') {
  const attrs = [
    ['x', x],
    ['y', y],
    ['font-size', size],
    ['fill', fill],
    ['font-family', "'Noto Sans JP','Inter',sans-serif"],
    ['text-anchor', 'middle'],
    ...attrPairs(extra),
  ];
  const seen = new Map();
  for (const [key, val] of attrs) {
    if (val === null || val === undefined || val === '') continue;
    seen.set(key, val);
  }
  const rendered = [...seen.entries()].map(([key, val]) => `${key}="${val}"`).join(' ');
  return `<text ${rendered}>${esc(value)}</text>`;
}

export const stroke = `stroke="${PALETTE.ink}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
export const softStroke = `stroke="${PALETTE.inkSoft}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"`;
const outline = `fill="none" stroke="${PALETTE.ink}" stroke-width="1.6" stroke-linejoin="round"`;

function normaliseExtra(extra) {
  if (!extra) return '';
  const value = String(extra).trim();
  if (!value) return '';
  // Allow callers to pass a bare colour (e.g. "#64748b") by turning it into stroke.
  if (!/=/.test(value)) return `stroke="${value}"`;
  return value;
}

function fillAttr(fill) {
  return fill === null || fill === undefined ? '' : `fill="${fill}"`;
}

/** Build an element with unique attributes; later attributes win over earlier duplicates. */
function tag(name, attributes) {
  const seen = new Map();
  for (const [key, value] of attributes) {
    if (value === null || value === undefined || value === '') continue;
    seen.set(key, value);
  }
  const rendered = [...seen.entries()].map(([key, value]) => `${key}="${value}"`).join(' ');
  return `<${name} ${rendered}/>`;
}

function attrPairs(extra) {
  const source = normaliseExtra(extra);
  const pairs = [];
  const pattern = /([a-zA-Z:-]+)="([^"]*)"/g;
  let match = pattern.exec(source);
  while (match) {
    pairs.push([match[1], match[2]]);
    match = pattern.exec(source);
  }
  return pairs;
}

// ---------------------------------------------------------------------------
// Scenery
// ---------------------------------------------------------------------------

export function cloud(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
${circle(0, 0, 14, '#ffffff', softStroke)}
${circle(16, 2, 18, '#ffffff', softStroke)}
${circle(36, 0, 13, '#ffffff', softStroke)}
${roundRect(-12, 0, 62, 14, 7, '#ffffff', softStroke)}
</g>`;
}

export function skyline({ weather = 'clear', height = 200 } = {}) {
  let body = rect(0, 0, 320, height, weather === 'night' ? '#c7d2fe' : '#e0f2fe');
  if (weather === 'sun' || weather === 'clear') {
    body += circle(276, 34, 16, '#fbbf24', softStroke);
  }
  if (weather === 'cloud' || weather === 'rain' || weather === 'snow') {
    body += cloud(240, 34);
    body += cloud(188, 26, 0.7);
  }
  if (weather === 'rain') {
    for (let i = 0; i < 14; i += 1) {
      const x = 16 + i * 22;
      const y = 58 + ((i * 37) % 82);
      body += line(x, y, x - 5, y + 16, '#60a5fa', 2, 'stroke-opacity="0.85"');
    }
  }
  if (weather === 'snow') {
    for (let i = 0; i < 22; i += 1) {
      const x = 12 + i * 14;
      const y = 38 + ((i * 53) % 112);
      body += circle(x, y, 2.6, '#ffffff', 'stroke="#cbd5e1" stroke-width="0.8"');
    }
  }
  if (weather === 'night') {
    body += circle(268, 34, 12, '#f8fafc', softStroke);
  }
  return body;
}

export function ground(y = 168, color = '#e7e5e4') {
  return rect(0, y, 320, 200 - y, color) + line(0, y, 320, y, '#d6d3d1', 1.5);
}

export function floorBoard(y = 168) {
  let body = ground(y, '#f5e6d3');
  for (let x = -20; x < 340; x += 46) {
    body += line(x, y, x + 16, 200, '#e2cbaa', 1.2);
  }
  return body;
}

export function grass(y = 168) {
  let body = rect(0, y, 320, 200 - y, '#d1fae5');
  body += line(0, y, 320, y, '#86efac', 2);
  for (let i = 0; i < 8; i += 1) {
    const x = 18 + i * 40;
    body += path(`M${x} ${y} q3 -12 6 0`, '#4ade80');
  }
  return body;
}

export function wall(y = 168) {
  return rect(0, 0, 320, y, '#f8fafc') + ground(y, '#eef2f6');
}

export function windowFrame(x, y, w = 62, h = 48, { open = false, weather = 'clear' } = {}) {
  let body = rect(x, y, w, h, open ? '#e0f2fe' : '#dbeafe', softStroke);
  if (open) {
    body += line(x, y, x + w, y + h, '#bfdbfe', 1.4);
    body += line(x + w, y, x, y + h, '#bfdbfe', 1.4);
  } else {
    body += line(x, y, x, y + h, '#94a3b8', 2.4);
    body += line(x + w / 2, y, x + w / 2, y + h, '#94a3b8', 2);
    body += line(x, y + h / 2, x + w, y + h / 2, '#94a3b8', 2);
  }
  body += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" ${stroke}/>`;
  if (open) {
    body += path(`M${x} ${y} l-10 -10 l${w} 0 l10 10 z`, '#f1f5f9', softStroke);
  }
  if (weather === 'snow') {
    for (let i = 0; i < 6; i += 1) body += circle(x + 8 + i * 9, y + 10 + ((i * 13) % 30), 2.2, '#ffffff');
  }
  if (weather === 'rain') {
    for (let i = 0; i < 6; i += 1) body += line(x + 6 + i * 9, y + 6, x + 2 + i * 9, y + 20, '#60a5fa', 1.8);
  }
  return body;
}

export function doorOpen(x, y, w = 44, h = 78) {
  return `${rect(x, y, w, h, '#fef3c7', softStroke)}
${line(x + 4, y + 4, x + w - 4, y + h - 4, '#fde68a', 1.4)}
${circle(x + w - 8, y + h / 2, 2.4, PALETTE.inkSoft)}`;
}

export function doorFrame(x, y, w = 40, h = 74) {
  return `${roundRect(x, y, w, h, 3, '#f8fafc', softStroke)}
${line(x + w, y, x + w, y + h, '#cbd5e1', 3)}
${circle(x + w - 7, y + h / 2, 2.2, PALETTE.inkSoft)}`;
}

export function stairs(x, y, steps = 5, dir = 'up') {
  let body = '';
  const rise = 12;
  const run = 16;
  for (let i = 0; i < steps; i += 1) {
    const yy = y - i * rise;
    const xx = dir === 'up' ? x + i * run : x - i * run;
    body += rect(xx, yy - rise, run + 2, rise, '#e2e8f0', softStroke);
  }
  body += line(x - 4, y, x + steps * run, y, PALETTE.greyDeep, 2);
  return body;
}

export function table(x, y, w = 90, h = 40, color = PALETTE.wood) {
  return `${roundRect(x, y - h, w, 8, 3, color, softStroke)}
${line(x + 8, y - h + 8, x + 8, y, PALETTE.woodDeep, 4)}
${line(x + w - 8, y - h + 8, x + w - 8, y, PALETTE.woodDeep, 4)}`;
}

export function chair(x, y, flip = false) {
  const back = flip ? x + 18 : x;
  return `${roundRect(x, y - 26, 24, 7, 3, '#94a3b8', softStroke)}
${line(x + 3, y - 19, x + 3, y, '#64748b', 3.4)}
${line(x + 21, y - 19, x + 21, y, '#64748b', 3.4)}
${roundRect(back, y - 52, 6, 27, 3, '#94a3b8', softStroke)}`;
}

export function shelf(x, y, w = 86, rows = 3) {
  let body = roundRect(x, y - rows * 26, w, rows * 26, 4, '#fef3c7', softStroke);
  for (let i = 1; i <= rows; i += 1) {
    body += line(x, y - i * 26, x + w, y - i * 26, PALETTE.woodDeep, 3);
    for (let b = 0; b < 4; b += 1) {
      body += roundRect(
        x + 6 + b * 19,
        y - i * 26 + 8,
        12,
        16,
        2,
        ['#60a5fa', '#f472b6', '#34d399', '#fbbf24'][b % 4],
        softStroke,
      );
    }
  }
  return body;
}

export function tree(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
${rect(-5, -46, 10, 46, '#a16207', softStroke)}
${circle(0, -58, 24, '#4ade80', softStroke)}
${circle(-18, -46, 16, '#22c55e', softStroke)}
${circle(18, -46, 16, '#22c55e', softStroke)}
</g>`;
}

export function bridge(x, y, w = 140) {
  return `${path(`M${x} ${y} q${w / 2} -34 ${w} 0`, 'none', `stroke="#a16207" stroke-width="8" fill="none"`)}
${line(x, y - 2, x, y + 14, PALETTE.woodDeep, 4)}
${line(x + w, y - 2, x + w, y + 14, PALETTE.woodDeep, 4)}
${line(x + 6, y - 4, x + w - 6, y - 4, '#d6d3d1', 2)}`;
}

export function river(x, y, w = 320, h = 26) {
  return `${roundRect(x, y, w, h, 10, '#7dd3fc', softStroke)}
${line(x + 10, y + h / 2, x + w - 10, y + h / 2, '#38bdf8', 3)}`;
}

export function schoolBuilding(x, y) {
  return `${roundRect(x, y - 70, 120, 70, 4, '#fde68a', softStroke)}
${rect(x + 12, y - 56, 22, 22, '#93c5fd', softStroke)}
${rect(x + 44, y - 56, 22, 22, '#93c5fd', softStroke)}
${rect(x + 76, y - 56, 22, 22, '#93c5fd', softStroke)}
${rect(x + 48, y - 26, 22, 26, PALETTE.woodDeep, softStroke)}
${path(`M${x - 6} ${y - 70} l66 -24 l66 24 z`, '#f59e0b', softStroke)}`;
}

export function shopFront(x, y, w = 110) {
  return `${roundRect(x, y - 70, w, 70, 4, '#fef3c7', softStroke)}
${rect(x, y - 70, w, 12, PALETTE.red, softStroke)}
${rect(x + 10, y - 50, 34, 34, '#bae6fd', softStroke)}
${rect(x + 58, y - 50, 34, 34, '#bae6fd', softStroke)}
${rect(x + w / 2 - 12, y - 50, 24, 50, '#fde68a', softStroke)}`;
}

export function stationClock(x, y) {
  return `${line(x, y, x, y - 34, '#64748b', 5)}
${clockFace(x, y - 50, 3, 0, 18)}`;
}

// ---------------------------------------------------------------------------
// Objects
// ---------------------------------------------------------------------------

export function cup(x, y, color = '#f8fafc', scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
${roundRect(0, -16, 16, 16, 3, color, softStroke)}
${line(2, -16, 14, -16, '#cbd5e1', 1.6)}
${path('M16 -13 q8 4 0 9', 'none', `stroke="${PALETTE.inkSoft}" stroke-width="1.8" fill="none"`)}
</g>`;
}

export function bookProp(x, y, color = '#60a5fa', w = 26, h = 18) {
  return `${roundRect(x, y - h, w, h, 2, color, softStroke)}
${line(x + 4, y - h + 4, x + w - 4, y - h + 4, '#ffffff', 1.6, 'stroke-opacity="0.7"')}`;
}

export function bagProp(x, y, kind = 'tas', color = '#78350f') {
  if (kind === 'koper') {
    return `${roundRect(x, y - 34, 34, 28, 4, color, softStroke)}
${line(x + 17, y - 34, x + 17, y - 42, PALETTE.woodDeep, 3)}
${line(x + 7, y - 6, x + 7, y, PALETTE.woodDeep, 3)}
${line(x + 27, y - 6, x + 27, y, PALETTE.woodDeep, 3)}`;
  }
  return `${path(`M${x} ${y - 6} q0 -22 14 -22 q14 0 14 22 z`, color, softStroke)}
${path(`M${x + 5} ${y - 22} q9 -8 18 0`, 'none', `stroke="${PALETTE.woodDeep}" stroke-width="2" fill="none"`)}`;
}

export function umbrellaProp(x, y, { kind = 'long', color = PALETTE.blueDeep, rotate = 0, height = null, canopy = null } = {}) {
  const shaft = height ?? (kind === 'short' ? 34 : 52);
  const canopyW = canopy ?? (kind === 'short' ? 36 : 54);
  return `<g transform="translate(${x} ${y}) rotate(${rotate})">
${line(0, 0, 0, -shaft, '#475569', 3)}
${path(`M${-canopyW / 2} ${-shaft} q${canopyW / 2} -22 ${canopyW} 0 z`, color, softStroke)}
${path(`M${-canopyW / 2} ${-shaft} q${canopyW / 2} -22 ${canopyW} 0`, 'none', `stroke="${PALETTE.ink}" stroke-width="1.2" fill="none"`)}
${path(`M0 ${-shaft} l0 -7 q7 0 7 6`, 'none', `stroke="#475569" stroke-width="2.4" fill="none"`)}
</g>`;
}

export function umbrellaStand(x, y) {
  return `${roundRect(x, y - 22, 26, 22, 3, '#94a3b8', softStroke)}
${line(x + 6, y - 22, x + 6, y - 44, '#475569', 2.6)}
${line(x + 19, y - 22, x + 19, y - 40, '#475569', 2.6)}`;
}

export function clockFace(x, y, hour, minute, r = 26) {
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  const point = (angle, length) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [x + Math.cos(rad) * length, y + Math.sin(rad) * length];
  };
  const [hx, hy] = point(hourAngle, r * 0.52);
  const [mx, my] = point(minuteAngle, r * 0.78);
  let body = `${circle(x + 2, y + 3, r, 'rgba(15,23,42,0.08)')}
${circle(x, y, r, '#ffffff', softStroke)}
${circle(x, y, r, 'none', `stroke="${PALETTE.ink}" stroke-width="2"`)}`;
  for (let i = 0; i < 12; i += 1) {
    const [tx, ty] = point(i * 30, r - 5);
    body += circle(tx, ty, i % 3 === 0 ? 2 : 1.2, PALETTE.inkSoft);
  }
  const numerals = [
    [12, 0],
    [3, 90],
    [6, 180],
    [9, 270],
  ];
  for (const [value, angle] of numerals) {
    const [nx, ny] = point(angle, r - 14);
    body += text(nx, ny + 4, String(value), Math.max(8, Math.round(r * 0.34)), PALETTE.ink, 'font-weight="600"');
  }
  body += `<line x1="${x}" y1="${y}" x2="${hx}" y2="${hy}" stroke="${PALETTE.ink}" stroke-width="${Math.max(3, r * 0.13)}" stroke-linecap="round"/>`;
  body += `<line x1="${x}" y1="${y}" x2="${mx}" y2="${my}" stroke="${PALETTE.red}" stroke-width="${Math.max(2, r * 0.08)}" stroke-linecap="round"/>`;
  body += circle(x, y, Math.max(2.4, r * 0.09), PALETTE.ink);
  return body;
}

export function calendar(x, y, day, weekdayIndex, w = 84, h = 62) {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  let body = `${roundRect(x, y, w, h, 4, '#ffffff', softStroke)}
${rect(x, y, w, 14, PALETTE.red, softStroke)}`;
  const cell = (w - 8) / 7;
  for (let col = 0; col < 7; col += 1) {
    const cx = x + 4 + col * cell + cell / 2;
    body += text(cx, y + 11, days[col], 8, '#ffffff', 'font-weight="700"');
    if (col === weekdayIndex) {
      body += roundRect(x + 3 + col * cell, y + 17, cell - 2, h - 21, 3, '#fde68a');
    }
  }
  body += text(x + 4 + weekdayIndex * cell + cell / 2, y + h - 8, String(day), 15, PALETTE.ink, 'font-weight="700"');
  return body;
}

export function eggs(x, y, count) {
  let body = '';
  for (let i = 0; i < count; i += 1) {
    const col = i % 3;
    const row = Math.floor(i / 3);
    body += ellipse(x + col * 15, y - row * 15 - 8, 6.5, 8.5, '#fef9c3', softStroke);
  }
  return body;
}

export function milkCarton(x, y) {
  return `${roundRect(x, y - 30, 20, 30, 2, '#e0f2fe', softStroke)}
${path(`M${x} ${y - 30} l10 -9 l10 9 z`, '#bae6fd', softStroke)}
${line(x + 4, y - 16, x + 16, y - 16, '#60a5fa', 2)}`;
}

export function cake(x, y, candles = 1) {
  let body = `${roundRect(x, y - 22, 34, 22, 4, '#fbcfe8', softStroke)}
${path(`M${x} ${y - 22} q17 -10 34 0`, '#f9a8d4', softStroke)}`;
  for (let i = 0; i < candles; i += 1) {
    body += line(x + 9 + i * 14, y - 22, x + 9 + i * 14, y - 34, '#f59e0b', 2.4);
    body += ellipse(x + 9 + i * 14, y - 36, 2.4, 3.6, '#fbbf24');
  }
  return body;
}

export function cat(x, y, flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
${path('M-13 -6 q-14 -12 -4 -22 q4 8 8 12', 'none', `stroke="#f59e0b" stroke-width="4" fill="none" stroke-linecap="round"`)}
${ellipse(0, -14, 15, 9.5, '#fbbf24', softStroke)}
${circle(14, -26, 8.5, '#fbbf24', softStroke)}
${path('M8 -32 l-1 -9 l9 6 z', '#fbbf24', softStroke)}
${path('M15 -34 l5 -7 l5 8 z', '#fbbf24', softStroke)}
${ellipse(12, -27, 1.5, 1.9, '#334155')}
${ellipse(18, -27, 1.5, 1.9, '#334155')}
${path('M15 -22 l-2 2 l4 0 z', '#b45309')}
${line(20, -24, 27, -26, '#94a3b8', 1)}
${line(20, -22, 27, -21, '#94a3b8', 1)}
${line(-8, -6, -9, 0, '#f59e0b', 3.6)}
${line(-2, -6, -3, 0, '#f59e0b', 3.6)}
${line(6, -6, 7, 0, '#f59e0b', 3.6)}
${line(11, -6, 12, 0, '#f59e0b', 3.6)}
</g>`;
}

export function dog(x, y, flip = false) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)">
${path('M-14 -14 q-10 -12 0 -14', 'none', `stroke="#b08a5f" stroke-width="4" fill="none" stroke-linecap="round"`)}
${ellipse(0, -16, 17, 10, '#d6b48a', softStroke)}
${circle(15, -28, 9.5, '#d6b48a', softStroke)}
${ellipse(9, -34, 4, 5, '#b08a5f', softStroke)}
${ellipse(22, -30, 4.5, 7.5, '#b08a5f', softStroke)}
${ellipse(12, -29, 1.5, 1.8, '#334155')}
${ellipse(21, -31, 2.4, 2.6, '#78350f')}
${path('M18 -24 q3 3 -1 4', 'none', `stroke="#78350f" stroke-width="1.4" fill="none"`)}
${line(-9, -7, -9, 0, '#b08a5f', 3.8)}
${line(-2, -7, -2, 0, '#b08a5f', 3.8)}
${line(6, -7, 6, 0, '#b08a5f', 3.8)}
${line(11, -7, 11, 0, '#b08a5f', 3.8)}
</g>`;
}

export function bicycle(x, y, color = PALETTE.red) {
  return `${circle(x, y - 14, 15, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
${circle(x + 46, y - 14, 15, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
${path(`M${x} ${y - 14} l16 -22 l14 22 l-14 0 z`, 'none', `stroke="${color}" stroke-width="3" fill="none"`)}
${line(x + 16, y - 36, x + 34, y - 36, color, 3)}
${line(x + 34, y - 36, x + 46, y - 14, color, 3)}
${line(x + 30, y - 40, x + 40, y - 40, PALETTE.ink, 3)}`;
}

export function train(x, y, w = 190) {
  return `${roundRect(x, y - 76, w, 76, 8, '#93c5fd', softStroke)}
${rect(x + 12, y - 62, 34, 26, '#e0f2fe', softStroke)}
${rect(x + 56, y - 62, 34, 26, '#e0f2fe', softStroke)}
${rect(x + 100, y - 62, 34, 26, '#e0f2fe', softStroke)}
${rect(x + 144, y - 62, 30, 26, '#e0f2fe', softStroke)}
${rect(x + 24, y - 20, 42, 20, '#f8fafc', softStroke)}
${rect(x + 118, y - 20, 42, 20, '#f8fafc', softStroke)}
${line(x, y, x + w, y, PALETTE.inkSoft, 3)}`;
}

export function bus(x, y, dir = 1) {
  const flip = dir < 0 ? -1 : 1;
  return `<g transform="translate(${x} ${y}) scale(${flip} 1)">
${roundRect(0, -70, 150, 70, 10, '#fbbf24', softStroke)}
${rect(10, -56, 30, 24, '#e0f2fe', softStroke)}
${rect(48, -56, 30, 24, '#e0f2fe', softStroke)}
${rect(86, -56, 30, 24, '#e0f2fe', softStroke)}
${rect(12, -22, 30, 22, '#f8fafc', softStroke)}
${circle(34, 2, 10, PALETTE.ink)}
${circle(116, 2, 10, PALETTE.ink)}
</g>`;
}

export function car(x, y, dir = 1, color = '#0ea5e9') {
  return `<g transform="translate(${x} ${y}) scale(${dir < 0 ? -1 : 1} 1)">
${roundRect(0, -34, 88, 24, 8, color, softStroke)}
${path('M14 -34 l12 -14 l34 0 l12 14 z', '#bae6fd', softStroke)}
${circle(20, -6, 8, PALETTE.ink)}
${circle(68, -6, 8, PALETTE.ink)}
</g>`;
}

export function printerProp(x, y) {
  return `${roundRect(x, y - 34, 52, 26, 4, '#e2e8f0', softStroke)}
${roundRect(x + 8, y - 48, 36, 14, 4, '#f8fafc', softStroke)}
${rect(x + 8, y - 16, 36, 14, '#ffffff', softStroke)}
${circle(x + 44, y - 27, 2.6, '#22c55e')}`;
}

export function fridge(x, y) {
  return `${roundRect(x, y - 96, 62, 96, 6, '#e2e8f0', softStroke)}
${line(x, y - 62, x + 62, y - 62, PALETTE.greyDeep, 2)}
${line(x + 50, y - 88, x + 50, y - 68, PALETTE.inkSoft, 3)}
${line(x + 50, y - 56, x + 50, y - 30, PALETTE.inkSoft, 3)}`;
}

export function pot(x, y, sprout = false, fruit = null) {
  let body = path(`M${x} ${y - 18} l34 0 l-5 18 l-24 0 z`, '#c2410c', softStroke);
  if (sprout) {
    body += `${line(x + 17, y - 18, x + 17, y - 34, '#15803d', 2.6)}
${path(`M${x + 17} ${y - 32} q-12 -4 -12 -12 q12 0 12 12`, '#4ade80', softStroke)}
${path(`M${x + 17} ${y - 36} q12 -4 12 -12 q-12 0 -12 12`, '#4ade80', softStroke)}`;
  }
  if (fruit === 'tomato') {
    body += circle(x + 12, y - 24, 6, PALETTE.red, softStroke);
    body += circle(x + 24, y - 27, 5.5, PALETTE.red, softStroke);
  }
  return body;
}

export function wateringCan(x, y) {
  return `${roundRect(x, y - 22, 24, 20, 3, '#38bdf8', softStroke)}
${path(`M${x + 24} ${y - 18} l12 -4 l0 6 z`, '#38bdf8', softStroke)}
${path(`M${x + 6} ${y - 22} q6 -10 12 0`, 'none', `stroke="#0ea5e9" stroke-width="2.4" fill="none"`)}`;
}

export function thermometer(x, y, high = false) {
  const level = high ? 34 : 16;
  return `${roundRect(x, y - 46, 10, 46, 5, '#ffffff', softStroke)}
${rect(x + 3, y - level - 10, 4, level, high ? PALETTE.red : '#38bdf8')}
${circle(x + 5, y - 4, 7, high ? PALETTE.red : '#38bdf8', softStroke)}`;
}

export function futon(x, y) {
  return `${roundRect(x, y - 24, 120, 24, 8, '#e0e7ff', softStroke)}
${roundRect(x + 8, y - 34, 34, 14, 6, '#ffffff', softStroke)}
${rect(x, y - 10, 120, 10, '#c7d2fe')}`;
}

export function bed(x, y) {
  return `${roundRect(x, y - 30, 110, 26, 6, '#dbeafe', softStroke)}
${roundRect(x + 6, y - 42, 30, 14, 6, '#ffffff', softStroke)}
${line(x, y - 42, x, y, '#94a3b8', 4)}
${line(x + 110, y - 26, x + 110, y, '#94a3b8', 4)}`;
}

export function boxParcel(x, y, w = 30, h = 26) {
  return `${roundRect(x, y - h, w, h, 3, '#d6b48a', softStroke)}
${line(x + w / 2, y - h, x + w / 2, y, '#a16207', 2)}
${line(x, y - h / 2, x + w, y - h / 2, '#a16207', 2)}`;
}

export function ticketMachine(x, y) {
  return `${roundRect(x, y - 76, 62, 76, 6, '#cbd5e1', softStroke)}
${rect(x + 8, y - 68, 46, 26, '#1e3a8a', softStroke)}
${rect(x + 12, y - 62, 38, 6, '#93c5fd')}
${rect(x + 8, y - 34, 46, 10, '#f8fafc', softStroke)}
${rect(x + 16, y - 16, 30, 8, '#94a3b8', softStroke)}`;
}

export function gate(x, y) {
  return `${rect(x, y - 60, 12, 60, '#94a3b8', softStroke)}
${rect(x + 76, y - 60, 12, 60, '#94a3b8', softStroke)}
${rect(x + 12, y - 52, 64, 10, '#cbd5e1', softStroke)}
${line(x + 12, y - 30, x + 76, y - 30, '#cbd5e1', 6)}`;
}

export function routeMap(x, y) {
  return `${roundRect(x, y - 60, 74, 60, 4, '#ffffff', softStroke)}
${line(x + 10, y - 50, x + 60, y - 20, '#2563eb', 3)}
${line(x + 10, y - 20, x + 60, y - 50, '#f97316', 3)}
${circle(x + 10, y - 50, 3, PALETTE.ink)}
${circle(x + 60, y - 20, 3, PALETTE.ink)}
${circle(x + 10, y - 20, 3, PALETTE.ink)}
${circle(x + 60, y - 50, 3, PALETTE.ink)}`;
}

export function shelfEmpty(x, y) {
  return `${roundRect(x, y - 54, 88, 54, 4, '#fef3c7', softStroke)}
${line(x, y - 36, x + 88, y - 36, PALETTE.woodDeep, 3)}
${line(x, y - 18, x + 88, y - 18, PALETTE.woodDeep, 3)}`;
}

export function signBoard(x, y, label = '') {
  return `${line(x + 10, y - 40, x + 10, y, PALETTE.woodDeep, 4)}
${roundRect(x, y - 58, 74, 24, 3, '#fef9c3', softStroke)}
${label ? text(x + 37, y - 41, label, 11, PALETTE.ink, 'font-weight="700"') : ''}`;
}

export function trashBin(x, y) {
  return `${path(`M${x} ${y - 26} l22 0 l-3 26 l-16 0 z`, '#94a3b8', softStroke)}
${line(x - 2, y - 26, x + 24, y - 26, PALETTE.inkSoft, 3)}`;
}

export function phoneInHand(x, y) {
  return roundRect(x - 4, y - 12, 9, 16, 2, '#1e293b', softStroke);
}

export function messageBubble(x, y, w = 74) {
  return `${roundRect(x, y - 30, w, 30, 8, '#ffffff', softStroke)}
${path(`M${x + 12} ${y} l0 10 l10 -10 z`, '#ffffff', softStroke)}
${line(x + 8, y - 20, x + w - 12, y - 20, '#cbd5e1', 3)}
${line(x + 8, y - 12, x + w - 26, y - 12, '#cbd5e1', 3)}`;
}

export function notebook(x, y) {
  return `${roundRect(x, y - 22, 26, 22, 3, '#ffffff', softStroke)}
${line(x + 5, y - 16, x + 21, y - 16, '#94a3b8', 2)}
${line(x + 5, y - 10, x + 18, y - 10, '#94a3b8', 2)}
${line(x + 5, y - 4, x + 20, y - 4, '#94a3b8', 2)}`;
}

export function keyProp(x, y) {
  return `${circle(x, y, 5, 'none', `stroke="${PALETTE.amberDeep}" stroke-width="2.4" fill="none"`)}
${line(x + 5, y, x + 20, y, PALETTE.amberDeep, 2.4)}
${line(x + 16, y, x + 16, y + 5, PALETTE.amberDeep, 2.4)}
${line(x + 20, y, x + 20, y + 5, PALETTE.amberDeep, 2.4)}`;
}

export function phoneBattery(x, y) {
  return `${roundRect(x, y - 34, 22, 44, 4, '#e2e8f0', softStroke)}
${rect(x + 3, y - 22, 16, 8, '#ef4444')}
${rect(x + 3, y - 12, 16, 2, '#cbd5e1')}
${rect(x + 3, y - 8, 16, 2, '#cbd5e1')}
${rect(x + 8, y - 38, 6, 4, '#94a3b8')}`;
}

export function batteryCell(x, y) {
  return `${roundRect(x, y - 16, 26, 16, 2, '#f59e0b', softStroke)}
${rect(x + 26, y - 12, 3, 8, '#94a3b8')}
${line(x + 8, y - 8, x + 8, y - 8, '#ffffff', 2)}`;
}

export function alarmClock(x, y, ringing = false) {
  return `${circle(0, 0, 15, 'none', `stroke="${PALETTE.ink}" stroke-width="2" fill="none"`)}
${circle(0, 0, 13, '#ffffff', softStroke)}
${line(0, 0, 0, -9, PALETTE.ink, 2.4)}
${line(0, 0, 7, 3, PALETTE.red, 2)}
${path('M-14 -10 l-7 -8', 'none', `stroke="${PALETTE.ink}" stroke-width="3" fill="none"`)}
${path('M14 -10 l7 -8', 'none', `stroke="${PALETTE.ink}" stroke-width="3" fill="none"`)}
${line(-9, 15, -14, 20, PALETTE.ink, 3)}
${line(9, 15, 14, 20, PALETTE.ink, 3)}
${ringing ? `${line(-24, -18, -28, -26, PALETTE.inkSoft, 2)}${line(24, -18, 28, -26, PALETTE.inkSoft, 2)}` : ''}`;
}

export function cameraProp(x, y) {
  return `${roundRect(x, y - 26, 40, 26, 4, '#1f2937', softStroke)}
${circle(x + 20, y - 13, 9, '#93c5fd', softStroke)}
${circle(x + 20, y - 13, 5, '#e0f2fe')}
${rect(x + 4, y - 30, 10, 5, '#4b5563')}`;
}

export function cakeSliceOnPlate(x, y) {
  return `${ellipse(x + 20, y - 2, 24, 6, '#e2e8f0', softStroke)}
${path(`M${x + 8} ${y - 4} l12 -16 l12 16 z`, '#fbcfe8', softStroke)}`;
}

export function plateWithFood(x, y, kind = 'meal') {
  const food = kind === 'meal' ? circle(x + 20, y - 8, 9, '#fb923c', softStroke) : circle(x + 20, y - 8, 9, '#f472b6', softStroke);
  return `${ellipse(x + 20, y - 2, 24, 7, '#e2e8f0', softStroke)}${food}`;
}

export function tvScreen(x, y) {
  return `${roundRect(x, y - 46, 74, 46, 4, '#1f2937', softStroke)}
${rect(x + 4, y - 42, 66, 34, '#93c5fd')}
${line(x + 28, y, x + 40, y + 8, '#64748b', 3)}
${line(x + 46, y, x + 34, y + 8, '#64748b', 3)}`;
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

/**
 * Draw a person whose feet rest at (x, y).
 * opts: s, sex ('m'|'f'), pose ('stand'|'walk'|'sit'|'run'), flip, hat, mask,
 *       umbrella ('L'|'R'), umbrellaKind, umbrellaColor,
 *       bag ('L'|'R'), bagKind, bagColor, book (bool), phone (bool), cup (bool),
 *       sleeve ('short'|'long'), coat, shirt, trousers, shoes, hairColor
 */
export function person(x, y, opts = {}) {
  const s = opts.s ?? 1;
  const sex = opts.sex ?? 'm';
  const pose = opts.pose ?? 'stand';
  const flip = opts.flip ? -1 : 1;
  const sleeve = opts.sleeve ?? 'long';
  const shirt = opts.shirt ?? (sex === 'f' ? '#f472b6' : '#3b82f6');
  const trousers = opts.trousers ?? (sex === 'f' ? '#4338ca' : '#1e293b');
  const skin = opts.skin ?? PALETTE.skin;
  const hair = opts.hairColor ?? (sex === 'f' ? '#3f3f46' : '#1f2937');
  const shoes = opts.shoes ?? '#0f172a';

  const hipY = pose === 'sit' ? -22 : -34;
  const shoulderY = pose === 'sit' ? -50 : -62;
  const headY = pose === 'sit' ? -64 : -78;
  const legSpan = pose === 'walk' ? 9 : pose === 'run' ? 14 : 6;

  // "L"/"R" refer to the character's own hands, matching Japanese 左手/右手.
    // A figure facing the viewer therefore shows its left hand on the right of the picture.
    const hands = {
      L: [15 + (pose === 'walk' ? 3 : 0), hipY - 4],
      R: [-(15 + (pose === 'walk' ? 3 : 0)), hipY - 4],
    };
    if (pose === 'sit') {
      hands.L = [14, shoulderY + 12];
      hands.R = [-14, shoulderY + 12];
    }

  let body = '';

  if (pose === 'sit') {
    body += line(-6, hipY, -8, hipY + 2, trousers, 8);
    body += line(-8, hipY + 2, -24, hipY + 2, trousers, 8);
    body += line(-24, hipY + 2, -25, 0, trousers, 8);
    body += line(6, hipY, 8, hipY + 2, trousers, 8);
    body += line(8, hipY + 2, 24, hipY + 2, trousers, 8);
    body += line(24, hipY + 2, 25, 0, trousers, 8);
    body += ellipse(-25, -1, 6, 3.2, shoes);
    body += ellipse(25, -1, 6, 3.2, shoes);
  } else {
    body += line(-5, hipY, -legSpan, -2, trousers, 8);
    body += line(5, hipY, legSpan, -2, trousers, 8);
    body += ellipse(-legSpan - 1, -1, 6, 3.4, shoes);
    body += ellipse(legSpan + 1, -1, 6, 3.4, shoes);
  }

  body += roundRect(-13, shoulderY, 26, hipY - shoulderY + 6, 8, shirt, softStroke);
  if (sex === 'f' && pose !== 'sit') {
    body += path(`M-13 ${hipY - 2} l26 0 l4 10 l-34 0 z`, opts.skirt ?? '#be185d', softStroke);
  }

  if (opts.apron) {
    body += roundRect(-11, shoulderY + 12, 22, hipY - shoulderY - 4, 4, opts.apron, softStroke);
    body += circle(-7, shoulderY + 20, 2.2, PALETTE.blueDeep);
  }

  const arm = (side, hand) => {
    const sign = side === 'L' ? -1 : 1;
    const elbowX = sign * 18;
    const elbowY = shoulderY + 12;
    const d = `M${sign * 10} ${shoulderY + 3} L${elbowX} ${elbowY} L${hand[0]} ${hand[1]}`;
    return `<path d="${d}" fill="none" stroke="${sleeve === 'short' ? skin : shirt}" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${d}" fill="none" stroke="${PALETTE.inkSoft}" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>`;
  };

  body += arm('L', hands.L);
  body += arm('R', hands.R);
  body += circle(hands.L[0], hands.L[1], 3.4, skin, softStroke);
  body += circle(hands.R[0], hands.R[1], 3.4, skin, softStroke);

  body += line(0, shoulderY, 0, shoulderY - 5, skin, 6);
  body += circle(0, headY, 11, skin, softStroke);

  if (sex === 'f') {
    body += path(
      `M-11 ${headY - 1} q-2 -15 11 -15 q13 0 11 15 q-6 -7 -11 -7 q-5 0 -11 7`,
      hair,
      softStroke,
    );
    body += circle(-9, headY + 4, 4, hair);
    body += circle(9, headY + 4, 4, hair);
  } else {
    body += path(`M-11 ${headY - 2} q0 -14 11 -14 q11 0 11 14 q-6 -8 -11 -8 q-5 0 -11 8`, hair, softStroke);
  }

  body += circle(-4, headY + 1, 1.4, PALETTE.ink);
  body += circle(4, headY + 1, 1.4, PALETTE.ink);
  body += path(`M-3 ${headY + 6} q3 3 6 0`, 'none', `stroke="${PALETTE.ink}" stroke-width="1.4" fill="none"`);

  if (opts.hat) {
    const hatColor = opts.hat === true ? '#0f172a' : opts.hat;
    body += roundRect(-13, headY - 11, 26, 5, 2.5, hatColor, softStroke);
    body += roundRect(-9, headY - 20, 18, 10, 4, hatColor, softStroke);
  }
  if (opts.mask) {
    body += roundRect(-8, headY + 3, 16, 6, 2, '#f8fafc', softStroke);
  }
  if (opts.coat) {
    body += path(`M-13 ${shoulderY} l26 0 l3 ${hipY - shoulderY + 4} l-32 0 z`, opts.coat, softStroke);
  }

  const out = [];

  if (opts.umbrella === 'L' || opts.umbrella === 'R') {
    const hand = hands[opts.umbrella];
    const tilt = opts.umbrella === 'L' ? -6 : 6;
    out.push(
      umbrellaProp(hand[0], hand[1] + 2, {
        kind: opts.umbrellaKind ?? 'long',
        color: opts.umbrellaColor ?? PALETTE.blueDeep,
        rotate: tilt,
      }),
    );
  }

  if (opts.bag === 'L' || opts.bag === 'R') {
    const hand = hands[opts.bag];
      out.push(
        bagProp(hand[0] - (opts.bag === 'R' ? 4 : 10), hand[1] + 26, opts.bagKind ?? 'tas', opts.bagColor ?? '#92400e'),
      );
    }

    if (opts.book) {
      out.push(bookProp(-19, shoulderY + 30, opts.bookColor ?? '#f97316', 34, 24));
    }
    if (opts.phone) {
      out.push(phoneInHand(hands.R[0] + 2, hands.R[1] - 6));
    }
    if (opts.cup) {
      out.push(cup(hands.R[0] + 1, hands.R[1] + 4));
    }

    return `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})">${body}${out.join('')}</g>`;
  }

export { outline, esc };