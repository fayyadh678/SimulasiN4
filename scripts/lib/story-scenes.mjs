import {
  PALETTE,
  bookProp,
  boxParcel,
  bridge,
  bus,
  cake,
  calendar,
  chair,
  circle,
  clockFace,
  cloud,
  cup,
  dog,
  doorOpen,
  ellipse,
  eggs,
  floorBoard,
  fridge,
  gate,
  grass,
  ground,
  keyProp,
  line,
  milkCarton,
  notebook,
  path,
  person,
  plateWithFood,
  pot,
  printerProp,
  rect,
  roundRect,
  routeMap,
  river,
  shelf,
  shelfEmpty,
  shopFront,
  signBoard,
  skyline,
  stairs,
  stationClock,
  table,
  text,
  thermometer,
  ticketMachine,
  train,
  trashBin,
  tree,
  umbrellaProp,
  umbrellaStand,
  wall,
  wateringCan,
  windowFrame,
    softStroke,
  } from './svg-kit.mjs';

export const PANEL_W = 320;
export const PANEL_H = 200;

export const sunIcon = (x, y, r = 14) =>
  `${circle(x, y, r, '#fbbf24', softStroke)}${Array.from({ length: 8 }, (_, index) => {
    const angle = (index * Math.PI) / 4;
    const x1 = x + Math.cos(angle) * (r + 3);
    const y1 = y + Math.sin(angle) * (r + 3);
    const x2 = x + Math.cos(angle) * (r + 9);
    const y2 = y + Math.sin(angle) * (r + 9);
    return line(x1, y1, x2, y2, '#f59e0b', 2.4);
  }).join('')}`;

export const moonIcon = (x, y) =>
  `${circle(x, y, 13, '#f8fafc', softStroke)}${circle(x + 6, y - 3, 11, '#c7d2fe')}`;

export const boltIcon = (x, y) =>
  path(`M${x} ${y - 14} l-9 15 l7 0 l-3 13 l13 -17 l-8 0 z`, '#f59e0b', softStroke);

export const zzzMarks = (x, y) =>
  `${text(x, y, 'z', 11, PALETTE.inkSoft)}${text(x + 9, y - 7, 'z', 13, PALETTE.inkSoft)}${text(x + 20, y - 16, 'z', 15, PALETTE.inkSoft)}`;

export const seeds = (x, y) =>
  `${circle(x, y, 2.4, PALETTE.woodDeep)}${circle(x + 8, y - 3, 2.4, PALETTE.woodDeep)}${circle(x + 16, y, 2.4, PALETTE.woodDeep)}`;

const shell = (bg, content) =>
  `<g clip-path="url(#panelClip)"><rect width="${PANEL_W}" height="${PANEL_H}" fill="#f8fafc"/>${bg}${content}</g>`;

const indoor = ({ floor = '#f5e6d3', windows = [], wallColor = '#f8fafc' } = {}) => {
  let body = rect(0, 0, PANEL_W, 168, wallColor);
  body += floor === '#f5e6d3' ? floorBoard(168) : ground(168, floor);
  for (const win of windows) {
    body += windowFrame(win.x, win.y, win.w ?? 58, win.h ?? 46, {
      open: win.open ?? false,
      weather: win.weather ?? 'clear',
    });
  }
  return body;
};

const outdoor = ({ weather = 'clear', groundColor = '#e7e5e4', extra = '' } = {}) =>
  skyline({ weather, height: 168 }) + ground(168, groundColor) + extra;

const arrow = (x, y, dir = 'right') => {
  if (dir === 'right') {
    return path(`M${x} ${y} l20 0 l-5 -6 z M${x} ${y} l20 0 l-5 6 z`, PALETTE.blueDeep) + line(x, y, x + 20, y, PALETTE.blueDeep, 2.4);
  }
  return (
    path(`M${x + 20} ${y} l-20 0 l5 -6 z M${x + 20} ${y} l-20 0 l5 6 z`, PALETTE.blueDeep) +
    line(x, y, x + 20, y, PALETTE.blueDeep, 2.4)
  );
};

const rainLines = (n = 8, y = 40) => {
  let body = '';
  for (let i = 0; i < n; i += 1) {
    body += line(20 + i * 36, y + ((i * 29) % 40), 15 + i * 36, y + 16 + ((i * 29) % 40), '#60a5fa', 2);
  }
  return body;
};

const steam = (x, y) => `${path(`M${x} ${y} q6 -12 0 -20 q-6 -8 0 -16`, 'none', `stroke="${PALETTE.greyDeep}" stroke-width="2" fill="none"`)}
${path(`M${x + 10} ${y} q6 -10 0 -18 q-6 -8 0 -14`, 'none', `stroke="${PALETTE.grey}" stroke-width="2" fill="none"`)}`;

const checkMark = (x, y, color = PALETTE.greenDeep) =>
  path(`M${x} ${y} l6 7 l12 -16`, 'none', `stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round"`);

const crossMark = (x, y, color = PALETTE.redDeep) =>
  `${line(x, y, x + 14, y + 14, color, 4)}${line(x + 14, y, x, y + 14, color, 4)}`;

// ---------------------------------------------------------------------------
// Story panels, keyed by question id. Each entry renders four 320x200 panels.
// ---------------------------------------------------------------------------

export const STORY_PANELS = {
  // n4-1 q51 忘れた傘 — umbrella left at the office, rain at night
  'S1-Q51': [
    shell(
      outdoor({ weather: 'cloud' }),
      `${person(140, 172, { sex: 'f', umbrella: 'L', umbrellaColor: PALETTE.blueDeep })}${arrow(200, 90)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 30 }] }),
      `${doorOpen(24, 104, 44, 64)}${umbrellaStand(150, 168)}${person(126, 172, { sex: 'f', flip: true, bag: 'R' })}
       ${umbrellaProp(163, 146, { kind: 'long', color: PALETTE.blueDeep })}${line(150, 168, 150, 148, PALETTE.inkSoft, 1.4)}`,
    ),
    shell(
      outdoor({ weather: 'night' }),
      `${person(150, 172, { sex: 'f', bag: 'R' })}${moonIcon(258, 56)}
       ${crossMark(196, 108)}`,
    ),
    shell(
      outdoor({ weather: 'rain' }),
      `${person(150, 172, { sex: 'f', shield: true })}${rainLines(8, 34)}
       ${path('M132 120 q18 22 -4 30', 'none', `stroke="${PALETTE.blueDeep}" stroke-width="2.4" fill="none"`)}
       ${umbrellaProp(248, 156, { kind: "short", color: PALETTE.greyDeep })}`,
    ),
  ],

  // n4-1 q52 切符の買い方 — find destination, buy ticket, gate, platform
  'S1-Q52': [
    shell(
      outdoor({ weather: 'clear', extra: `${rect(0, 60, 320, 108, '#fef3c7')}` }),
      `${routeMap(150, 130)}${person(96, 172, { phone: false })}${arrow(240, 96)}`,
    ),
    shell(
      indoor({ floor: '#e7e5e4' }),
      `${ticketMachine(196, 168)}${person(120, 172, { bag: 'L' })}
       ${roundRect(140, 82, 26, 16, 2, '#fde68a', PALETTE.inkSoft)}
       ${line(150, 104, 150, 120, PALETTE.inkSoft, 2)}${arrow(238, 56, 'left')}`,
    ),
    shell(
      indoor({ floor: '#e7e5e4' }),
      `${gate(60, 168)}${person(96, 172)}${rect(150, 130, 18, 10, '#fde68a', PALETTE.inkSoft)}
       ${checkMark(240, 70)}`,
    ),
    shell(
      outdoor({ weather: 'clear', groundColor: '#e2e8f0' }),
      `${train(30, 150, 200)}${person(272, 172, { bag: 'L' })}${line(0, 158, 320, 158, PALETTE.inkSoft, 3)}
       ${rect(0, 160, 320, 10, '#cbd5e1')}`,
    ),
  ],

  // n4-1 q53 料理の失敗 — water on stove, phone call, pot boils dry, back to turn off
  'S1-Q53': [
    shell(
      indoor({ windows: [{ x: 226, y: 28 }] }),
      `${roundRect(96, 128, 96, 12, 4, '#94a3b8', PALETTE.inkSoft)}
       ${person(84, 172, { sex: 'f' })}${pot(150, 128, false)}${rect(146, 120, 38, 8, '#cbd5e1', PALETTE.inkSoft)}
       ${path('M170 128 q0 18 14 26', 'none', `stroke="${PALETTE.blueDeep}" stroke-width="2" fill="none"`)}`,
    ),
    shell(
      indoor({ windows: [{ x: 226, y: 28 }] }),
      `${roundRect(96, 128, 96, 12, 4, '#94a3b8', PALETTE.inkSoft)}${pot(150, 128, false)}
       ${roundRect(240, 96, 26, 40, 4, '#1e293b', PALETTE.inkSoft)}${person(240, 172, { sex: 'f', phone: true })}
       ${arrow(196, 60, 'right')}`,
    ),
    shell(
      indoor({ windows: [{ x: 226, y: 28 }] }),
      `${roundRect(96, 128, 96, 12, 4, '#94a3b8', PALETTE.inkSoft)}${pot(150, 128, false)}
       ${steam(162, 112)}${circle(160, 100, 12, '#cbd5e1', 'stroke="#94a3b8" stroke-width="1.5" fill-opacity="0.75"')}
       ${text(206, 60, '!', 26, PALETTE.red)}`,
    ),
    shell(
      indoor({ windows: [{ x: 226, y: 28 }] }),
      `${roundRect(96, 128, 96, 12, 4, '#94a3b8', PALETTE.inkSoft)}${pot(150, 128, false)}
       ${person(86, 172, { sex: 'f' })}${line(196, 116, 214, 116, PALETTE.inkSoft, 5)}
       ${line(214, 116, 214, 108, PALETTE.inkSoft, 4)}${checkMark(238, 62)}`,
    ),
  ],

  // n4-1 q54 自転車の修理 — ride, flat tyre, push to shop, repair + smile
  'S1-Q54': [
    shell(
      outdoor({ weather: 'clear' }),
      `${person(120, 172, {})}${circle(180, 152, 15, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
       ${circle(226, 152, 15, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
       ${line(180, 152, 200, 130, PALETTE.red, 3)}${line(200, 130, 226, 152, PALETTE.red, 3)}
       ${line(200, 130, 196, 122, PALETTE.ink, 3)}${line(188, 122, 206, 122, PALETTE.ink, 3)}${arrow(272, 80)}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${person(150, 172, {})}${circle(210, 152, 15, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
       ${circle(256, 152, 15, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
       ${path('M222 148 q8 -8 6 -12', 'none', `stroke="${PALETTE.greyDeep}" stroke-width="2" fill="none"`)}
       ${text(288, 132, '!', 22, PALETTE.red)}${crossMark(232, 168)}`,
    ),
    shell(
      outdoor({ weather: 'clear', extra: shopFront(196, 168, 110) }),
      `${person(120, 172, {})}${circle(176, 152, 14, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
       ${circle(216, 152, 14, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}${arrow(96, 88, 'left')}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${shopFront(198, 168, 104)}${person(120, 172, {})}${circle(168, 152, 14, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
       ${circle(206, 152, 14, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}${checkMark(150, 84)}`,
    ),
  ],

  // n4-1 q55 昼休みの予定 — park lunch, sudden rain, run to shelter, eat indoors
  'S1-Q55': [
    shell(
      outdoor({ weather: 'clear', groundColor: '#d1fae5', extra: tree(268, 168, 0.9) }),
      `${roundRect(96, 140, 74, 10, 3, PALETTE.wood, PALETTE.inkSoft)}${person(120, 150, { pose: 'sit', sex: 'f' })}
       ${person(170, 150, { pose: 'sit' })}${cup(180, 138)}`,
    ),
    shell(
      outdoor({ weather: 'rain', groundColor: '#d1fae5' }),
      `${roundRect(96, 140, 74, 10, 3, PALETTE.wood, PALETTE.inkSoft)}${person(120, 150, { pose: 'sit', sex: 'f' })}
       ${person(170, 150, { pose: 'sit' })}${rainLines(9, 30)}${umbrellaProp(282, 80, { kind: "short", color: PALETTE.greyDeep })}`,
    ),
    shell(
      outdoor({ weather: 'rain', groundColor: '#d1fae5', extra: shopFront(200, 168, 110) }),
      `${person(96, 172, { sex: 'f', pose: 'run' })}${person(130, 172, { pose: 'run' })}${rainLines(6, 34)}${arrow(180, 90)}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 26, weather: 'rain' }] }),
      `${person(96, 172, { sex: 'f' })}${person(146, 172, {})}${roundRect(190, 130, 74, 10, 3, PALETTE.wood, PALETTE.inkSoft)}
       ${cup(206, 126)}${checkMark(272, 62)}`,
    ),
  ],

  // n4-2 q51 落とした財布 — pay, leave wallet on chair, staff calls, return
  'S2-Q51': [
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${table(96, 150, 84)}${person(160, 172, {})}${roundRect(120, 102, 30, 18, 3, '#92400e', PALETTE.inkSoft)}
       ${circle(132, 112, 2.4, '#fde68a')}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${table(96, 150, 84)}${chair(196, 168)}${rect(198, 138, 30, 18, '#92400e', PALETTE.inkSoft)}
       ${person(70, 172, { flip: true })}${arrow(48, 84, 'left')}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${table(96, 150, 84)}${rect(120, 132, 30, 18, '#92400e', PALETTE.inkSoft)}${person(206, 172, { sex: 'f', phone: true })}
       ${line(196, 118, 172, 118, PALETTE.inkSoft, 2)}${circle(168, 118, 3, PALETTE.inkSoft)}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${table(96, 150, 84)}${person(180, 172, {})}${rect(126, 132, 30, 18, '#92400e', PALETTE.inkSoft)}
       ${checkMark(228, 84)}`,
    ),
  ],

  // n4-2 q52 ケーキの注文 — reserve cake, write name/date, come on birthday, collect
  'S2-Q52': [
    shell(
      indoor({ windows: [{ x: 232, y: 26 }] }),
      `${roundRect(150, 100, 74, 68, 6, '#fef3c7', PALETTE.inkSoft)}${cake(166, 160, 1)}
       ${person(92, 172, { sex: 'f' })}${person(262, 172, { sex: 'f' })}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 26 }] }),
      `${roundRect(150, 100, 74, 68, 6, '#fef3c7', PALETTE.inkSoft)}${person(96, 172, { sex: 'f' })}
       ${roundRect(206, 118, 62, 46, 3, '#ffffff', PALETTE.inkSoft)}${line(212, 132, 258, 132, '#cbd5e1', 2)}
       ${line(212, 144, 250, 144, '#cbd5e1', 2)}${line(212, 156, 254, 156, '#cbd5e1', 2)}`,
    ),
    shell(
      outdoor({ weather: 'clear', extra: shopFront(140, 168, 130) }),
      `${person(196, 172, { sex: 'f', bag: 'L' })}${calendar(40, 40, 21, 5)}${checkMark(92, 108)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 26 }] }),
      `${person(104, 172, { sex: 'f' })}${person(236, 172, { sex: 'f' })}${cake(166, 150, 1)}
       ${roundRect(150, 112, 66, 12, 3, '#fbcfe8', PALETTE.inkSoft)}${checkMark(276, 60)}`,
    ),
  ],

  // n4-2 q53 雨の日の洗濯 — hang laundry, leave, rain, laundry wet
  'S2-Q53': [
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5', extra: tree(30, 168, 0.7) }),
      `${line(88, 74, 236, 74, PALETTE.inkSoft, 3)}${line(88, 74, 88, 60, PALETTE.inkSoft, 3)}
       ${line(236, 74, 236, 60, PALETTE.inkSoft, 3)}
       ${roundRect(104, 78, 26, 34, 3, '#93c5fd', PALETTE.inkSoft)}${roundRect(146, 78, 26, 40, 3, '#f9a8d4', PALETTE.inkSoft)}
       ${roundRect(188, 78, 26, 30, 3, '#fde68a', PALETTE.inkSoft)}${person(58, 172, {})}`,
    ),
    shell(
      outdoor({ weather: 'clear', extra: `${line(88, 74, 236, 74, PALETTE.inkSoft, 3)}
       ${roundRect(104, 78, 26, 34, 3, '#93c5fd', PALETTE.inkSoft)}${roundRect(146, 78, 26, 40, 3, '#f9a8d4', PALETTE.inkSoft)}` }),
      `${person(268, 172, { bag: 'R', flip: true })}${arrow(228, 96, 'left')}${rect(150, 100, 60, 68, '#fef3c7', PALETTE.inkSoft)}`,
    ),
    shell(
      outdoor({ weather: 'rain', extra: `${line(88, 74, 236, 74, PALETTE.inkSoft, 3)}
       ${roundRect(104, 78, 26, 34, 3, '#93c5fd', PALETTE.inkSoft)}${roundRect(146, 78, 26, 40, 3, '#f9a8d4', PALETTE.inkSoft)}` }),
      `${rainLines(10, 28)}${clockFace(268, 62, 12, 0, 18)}${cloud(56, 56, 0.8)}`,
    ),
    shell(
      outdoor({ weather: 'rain', extra: `${line(88, 74, 236, 74, PALETTE.inkSoft, 3)}
       ${roundRect(104, 78, 26, 46, 3, '#93c5fd', PALETTE.inkSoft)}${roundRect(146, 78, 26, 52, 3, '#f9a8d4', PALETTE.inkSoft)}` }),
      `${person(60, 172, {})}${rainLines(6, 30)}${path('M132 96 q6 10 0 16', 'none', `stroke="${PALETTE.blue}" stroke-width="2" fill="none"`)}
       ${path('M174 96 q6 10 0 18', 'none', `stroke="${PALETTE.blue}" stroke-width="2" fill="none"`)}${umbrellaProp(258, 142, { kind: "short", color: PALETTE.greyDeep })}`,
    ),
  ],

  // n4-2 q54 集合場所の変更 — meet station, construction, move to clock tower, meet
  'S2-Q54': [
    shell(
      outdoor({ weather: 'clear', extra: shopFront(20, 168, 96) }),
      `${person(120, 172, { sex: 'f', phone: true })}${person(210, 172, { phone: true })}
       ${roundRect(150, 34, 74, 30, 8, '#ffffff', PALETTE.inkSoft)}${line(158, 44, 216, 44, '#cbd5e1', 2)}
       ${line(158, 54, 202, 54, '#cbd5e1', 2)}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${roundRect(60, 90, 172, 78, 4, '#cbd5e1', PALETTE.inkSoft)}${line(60, 120, 232, 120, PALETTE.amber, 5)}
       ${line(60, 146, 232, 146, PALETTE.amber, 5)}${text(146, 112, '×', 26, PALETTE.redDeep)}
       ${person(266, 172, { phone: true })}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${stationClock(196, 132)}${person(120, 172, { sex: 'f', phone: true })}${arrow(232, 80, 'left')}
       ${roundRect(40, 60, 74, 30, 8, '#ffffff', PALETTE.inkSoft)}${line(48, 70, 106, 70, '#cbd5e1', 2)}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${stationClock(158, 132)}${person(96, 172, { sex: 'f' })}${person(220, 172, {})}${checkMark(244, 62)}`,
    ),
  ],

  // n4-2 q55 図書館での返却 — borrow, return after 2 weeks, closed, return box
  'S2-Q55': [
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${shelf(36, 152, 84, 3)}${person(170, 172, { book: true })}${roundRect(148, 110, 30, 22, 2, '#f97316', PALETTE.inkSoft)}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${shelf(36, 152, 84, 3)}${person(170, 172, { book: true })}${calendar(228, 44, 28, 2, 70, 56)}
       ${arrow(150, 88, 'left')}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${signBoard(170, 168, '休')}${person(106, 172, { book: true })}${crossMark(122, 74)}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 26 }] }),
      `${roundRect(196, 116, 54, 52, 4, '#94a3b8', PALETTE.inkSoft)}${rect(206, 106, 34, 8, '#64748b', PALETTE.inkSoft)}
       ${person(120, 172, {})}${bookProp(224, 132, '#f97316', 22, 16)}${checkMark(276, 62)}`,
    ),
  ],

  // n4-3 q51 会議の準備 — arrange desks, try to print, no paper, refill and print
  'S3-Q51': [
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${table(60, 150, 74)}${table(150, 150, 74)}${chair(78, 172)}${chair(168, 172)}${person(252, 172, {})}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${table(60, 150, 74)}${printerProp(196, 130)}${person(148, 172, {})}${roundRect(120, 96, 26, 20, 2, '#ffffff', PALETTE.inkSoft)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${printerProp(196, 130)}${person(150, 172, {})}${text(170, 82, '!', 24, PALETTE.red)}
       ${roundRect(262, 100, 34, 30, 2, '#f8fafc', PALETTE.inkSoft)}${line(268, 120, 290, 120, '#cbd5e1', 2)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${printerProp(196, 130)}${person(150, 172, {})}${roundRect(206, 96, 30, 22, 2, '#ffffff', PALETTE.inkSoft)}
       ${roundRect(240, 118, 40, 30, 2, '#e2e8f0', PALETTE.inkSoft)}${checkMark(276, 66)}`,
    ),
  ],

  // n4-3 q52 熱のある朝 — wake and take temperature, high, call in sick, rest
  'S3-Q52': [
    shell(
      indoor({ windows: [{ x: 236, y: 24 }] }),
      `${roundRect(180, 110, 110, 34, 6, '#dbeafe', PALETTE.inkSoft)}${roundRect(188, 96, 30, 16, 5, '#ffffff', PALETTE.inkSoft)}
       ${person(110, 150, { pose: 'sit' })}${thermometer(152, 132, false)}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 24 }] }),
      `${roundRect(180, 110, 110, 34, 6, '#dbeafe', PALETTE.inkSoft)}${person(110, 150, { pose: 'sit' })}
       ${thermometer(152, 132, true)}${text(210, 74, '38.5', 14, PALETTE.redDeep, 'font-weight="700"')}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 24 }] }),
      `${person(150, 172, { phone: true })}${roundRect(196, 100, 62, 44, 8, '#ffffff', PALETTE.inkSoft)}
       ${line(204, 114, 250, 114, '#cbd5e1', 2)}${line(204, 126, 236, 126, '#cbd5e1', 2)}`,
    ),
    shell(
      indoor({ windows: [{ x: 236, y: 24 }] }),
      `${roundRect(120, 140, 120, 28, 8, '#e0e7ff', PALETTE.inkSoft)}${roundRect(128, 128, 36, 16, 6, '#ffffff', PALETTE.inkSoft)}
       ${person(180, 150, { pose: 'sit' })}${zzzMarks(250, 78)}`,
    ),
  ],

  // n4-3 q53 荷物の配達 — ring bell, nobody home, notice slip, family finds it
  'S3-Q53': [
    shell(
      outdoor({ weather: 'clear', extra: shopFront(200, 168, 110) }),
      `${doorOpen(28, 96, 46, 72)}${person(150, 172, { bag: 'L', bagKind: 'koper', bagColor: '#92400e' })}
       ${circle(196, 104, 3, PALETTE.amberDeep)}${boxParcel(110, 148, 26, 22)}`,
    ),
    shell(
      outdoor({ weather: 'clear', extra: shopFront(200, 168, 110) }),
      `${doorOpen(28, 96, 46, 72)}${person(150, 172, { bag: 'L', bagKind: 'koper' })}${text(120, 86, '…', 22, PALETTE.inkSoft)}`,
    ),
    shell(
      outdoor({ weather: 'clear', extra: shopFront(200, 168, 110) }),
      `${roundRect(236, 120, 40, 48, 3, '#94a3b8', PALETTE.inkSoft)}${person(160, 172, {})}
       ${roundRect(186, 108, 34, 24, 2, '#ffffff', PALETTE.inkSoft)}${line(192, 118, 214, 118, '#cbd5e1', 2)}
       ${arrow(236, 88)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(150, 172, { sex: 'f' })}${roundRect(196, 104, 42, 30, 2, '#ffffff', PALETTE.inkSoft)}
       ${line(204, 116, 232, 116, '#cbd5e1', 2)}${line(204, 126, 224, 126, '#cbd5e1', 2)}${text(262, 96, '?', 22, PALETTE.amberDeep)}`,
    ),
  ],

  // n4-3 q54 夜の買い物 — list, buy milk+bread, short of money, buy only bread
  'S3-Q54': [
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(150, 172, { sex: 'f' })}${notebook(196, 150)}${line(224, 128, 246, 128, '#94a3b8', 2)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${shelf(40, 152, 86, 3)}${person(170, 172, { sex: 'f', bag: 'L' })}${milkCarton(140, 144)}${bookProp(210, 160, '#d97706', 30, 14)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${roundRect(120, 120, 110, 26, 4, '#94a3b8', PALETTE.inkSoft)}${person(160, 172, { sex: 'f' })}
       ${roundRect(196, 96, 34, 20, 3, '#92400e', PALETTE.inkSoft)}${text(252, 92, '!', 22, PALETTE.red)}${crossMark(276, 128)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${person(150, 172, { sex: 'f', bag: 'R' })}${bookProp(196, 148, '#d97706', 30, 14)}${milkCarton(240, 148)}
       ${crossMark(250, 118)}${checkMark(276, 60)}`,
    ),
  ],

  // n4-3 q55 駅での案内 — lost with map, ask station staff, staff points to exit, leave
  'S3-Q55': [
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${person(150, 172, { bag: 'L' })}${routeMap(196, 144)}${text(122, 76, '?', 24, PALETTE.amberDeep)}
       ${signBoard(20, 168, '駅')}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${person(120, 172, { bag: 'L' })}${person(230, 172, { sex: 'f', shirt: '#1d4ed8' })}
       ${roundRect(160, 86, 66, 30, 8, '#ffffff', PALETTE.inkSoft)}${line(168, 96, 216, 96, '#cbd5e1', 2)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${person(96, 172, { bag: 'R' })}${person(236, 172, { sex: 'f', shirt: '#1d4ed8' })}
       ${signBoard(180, 130, '3')}${arrow(150, 96)}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${person(150, 172, { bag: 'R' })}${signBoard(230, 168, '3')}${arrow(200, 84)}${checkMark(74, 62)}`,
    ),
  ],

  // n4-4 q51 なくした鍵 — search bag, no key, remember desk, return to office
  'S4-Q51': [
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(140, 172, { sex: 'f', bag: 'L' })}${doorOpen(24, 100, 44, 68)}${text(196, 78, '?', 20, PALETTE.amberDeep)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(140, 172, { sex: 'f' })}
       ${roundRect(120, 96, 34, 24, 3, '#92400e', PALETTE.inkSoft)}${roundRect(160, 104, 30, 18, 3, '#92400e', PALETTE.inkSoft)}
       ${crossMark(206, 96)}${text(202, 70, '?', 22, PALETTE.amberDeep)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(140, 172, { sex: 'f' })}${table(180, 150, 84)}${roundRect(46, 74, 74, 44, 8, '#e0f2fe', PALETTE.inkSoft)}
       ${line(54, 88, 110, 88, '#cbd5e1', 2)}${circle(170, 96, 10, '#fde68a', PALETTE.inkSoft)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${table(150, 150, 90)}${person(96, 172, { sex: 'f' })}${keyProp(196, 124)}${checkMark(272, 62)}`,
    ),
  ],

  // n4-4 q52 バスの乗り遅れ — 7:45, run to stop, bus departs, wait for next
  'S4-Q52': [
    shell(
      indoor({ windows: [{ x: 236, y: 24 }] }),
      `${person(140, 172, {})}${clockFace(232, 96, 7, 45, 30)}${text(232, 148, '7:45', 13, PALETTE.ink, 'font-weight="700"')}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${person(120, 172, { pose: 'run', bag: 'R' })}${signBoard(220, 168, 'バス')}${arrow(240, 84, 'right')}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${bus(96, 150, 1)}${person(276, 172, {})}${line(40, 170, 300, 170, PALETTE.greyDeep, 3)}${text(122, 62, '…', 24, PALETTE.inkSoft)}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${person(140, 172, { bag: 'R' })}${signBoard(214, 168, 'バス')}${clockFace(268, 70, 8, 5, 20)}`,
    ),
  ],

  // n4-4 q53 野菜の栽培 — sow seeds, water daily, sprout, harvest tomato
  'S4-Q53': [
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5' }),
      `${person(110, 172, { sex: 'm', s: 0.72, shirt: '#f59e0b' })}${pot(180, 168)}${seeds(196, 164)}`,
    ),
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5' }),
      `${person(110, 172, { s: 0.72, shirt: '#f59e0b' })}${pot(190, 168)}${wateringCan(150, 140)}
       ${path('M162 140 q10 -6 18 -2', 'none', `stroke="${PALETTE.blue}" stroke-width="2" fill="none"`)}`,
    ),
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5' }),
      `${pot(150, 168, true)}${person(96, 172, { s: 0.72, shirt: '#f59e0b' })}${sunIcon(246, 62)}`,
    ),
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5' }),
      `${pot(150, 168, true, 'tomato')}${person(96, 172, { s: 0.72, shirt: '#f59e0b' })}${circle(214, 116, 7, PALETTE.red, PALETTE.inkSoft)}
       ${checkMark(252, 66)}`,
    ),
  ],

  // n4-4 q54 映画のチケット — check times, queue, sold out, buy next show
  'S4-Q54': [
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(110, 172, { sex: 'f' })}${person(160, 172, {})}${roundRect(196, 88, 46, 62, 4, '#1f2937', PALETTE.inkSoft)}
       ${rect(200, 92, 38, 48, '#93c5fd')}${line(206, 104, 230, 104, '#ffffff', 2)}${line(206, 116, 226, 116, '#ffffff', 2)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${roundRect(40, 110, 110, 14, 4, '#94a3b8', PALETTE.inkSoft)}${person(140, 172, { sex: 'f' })}${person(190, 172, {})}
       ${person(240, 172, {})}${arrow(276, 84, 'left')}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${ticketMachine(150, 168)}${person(96, 172, { sex: 'f' })}${text(214, 76, '×', 24, PALETTE.redDeep)}
       ${roundRect(60, 78, 54, 34, 3, '#ffffff', PALETTE.inkSoft)}${line(68, 90, 106, 90, '#cbd5e1', 2)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${ticketMachine(160, 168)}${person(106, 172, { sex: 'f' })}${person(248, 172, {})}
       ${roundRect(180, 88, 34, 22, 2, '#fde68a', PALETTE.inkSoft)}${checkMark(276, 60)}`,
    ),
  ],

  // n4-4 q55 弁当の配達 — pack two boxes, cycle off, rain gear, deliver dry
  'S4-Q55': [
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${roundRect(140, 104, 96, 60, 4, '#fef3c7', PALETTE.inkSoft)}${roundRect(154, 116, 30, 20, 3, '#f97316', PALETTE.inkSoft)}
       ${roundRect(190, 116, 30, 20, 3, '#f97316', PALETTE.inkSoft)}${person(96, 172, { sex: 'f' })}`,
    ),
    shell(
      outdoor({ weather: 'cloud' }),
      `${person(120, 172, {})}${circle(184, 152, 14, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}
       ${circle(226, 152, 14, 'none', `stroke="${PALETTE.ink}" stroke-width="3"`)}${line(184, 152, 202, 132, PALETTE.red, 3)}
       ${line(202, 132, 226, 152, PALETTE.red, 3)}${roundRect(196, 118, 26, 20, 3, '#fef3c7', PALETTE.inkSoft)}${arrow(270, 84)}`,
    ),
    shell(
      outdoor({ weather: 'rain' }),
      `${person(150, 172, { coat: '#fde047' })}${rainLines(8, 30)}${umbrellaProp(86, 80, { kind: "short", color: PALETTE.greyDeep })}
       ${roundRect(196, 122, 26, 20, 3, '#fef3c7', PALETTE.inkSoft)}`,
    ),
    shell(
      outdoor({ weather: 'rain', extra: shopFront(200, 168, 110) }),
      `${person(120, 172, { coat: '#fde047' })}${roundRect(150, 118, 34, 26, 3, '#93c5fd', PALETTE.inkSoft)}
       ${rainLines(5, 34)}${checkMark(268, 66)}`,
    ),
  ],

  // n4-5 q51 道を間違えた日 — north exit, map shows south, pass through station, arrive
  'S5-Q51': [
    shell(
      outdoor({ weather: 'clear', extra: signBoard(230, 168, '北') }),
      `${person(140, 172, { sex: 'f', bag: 'L' })}${signBoard(230, 168, '北')}${arrow(190, 88)}`,
    ),
    shell(
      outdoor({ weather: 'clear' }),
      `${person(120, 172, { sex: 'f', bag: 'L' })}${routeMap(180, 144)}${signBoard(40, 168, '南')}
       ${text(272, 76, '!', 22, PALETTE.red)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${gate(60, 168)}${person(140, 172, { sex: 'f', bag: 'L' })}${signBoard(232, 168, '南')}${arrow(196, 84, 'right')}`,
    ),
    shell(
      outdoor({ weather: 'clear', extra: shopFront(190, 168, 120) }),
      `${person(120, 172, { sex: 'f', bag: 'L' })}${shopFront(190, 168, 120)}${signBoard(34, 168, '南')}${checkMark(276, 58)}`,
    ),
  ],

  // n4-5 q52 コピー機のトラブル — copy, blank page, fix setting, good copy
  'S5-Q52': [
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${roundRect(140, 92, 84, 76, 6, '#e2e8f0', PALETTE.inkSoft)}${rect(150, 104, 64, 26, '#ffffff', PALETTE.inkSoft)}
       ${person(90, 172, { shirt: '#0d9488' })}${roundRect(196, 146, 34, 22, 2, '#ffffff', PALETTE.inkSoft)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${roundRect(140, 92, 84, 76, 6, '#e2e8f0', PALETTE.inkSoft)}${person(90, 172, { shirt: '#0d9488' })}
       ${roundRect(196, 132, 34, 24, 2, '#f8fafc', PALETTE.inkSoft)}${text(232, 100, '?', 20, PALETTE.amberDeep)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${roundRect(140, 92, 84, 76, 6, '#e2e8f0', PALETTE.inkSoft)}${rect(150, 104, 64, 26, '#ffffff', PALETTE.inkSoft)}
       ${person(90, 172, { shirt: '#0d9488' })}${arrow(196, 82, 'left')}${line(206, 116, 232, 116, '#94a3b8', 3)}`,
    ),
    shell(
      indoor({ floor: '#e2e8f0' }),
      `${roundRect(140, 92, 84, 76, 6, '#e2e8f0', PALETTE.inkSoft)}${person(90, 172, { shirt: '#0d9488' })}
       ${roundRect(196, 136, 36, 24, 2, '#ffffff', PALETTE.inkSoft)}${line(202, 144, 226, 144, '#64748b', 2)}
       ${line(202, 152, 220, 152, '#64748b', 2)}${checkMark(258, 74)}`,
    ),
  ],

  // n4-5 q53 公園の約束 — arrive park, play, clock says 5, walk home
  'S5-Q53': [
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5', extra: tree(270, 168, 0.9) }),
      `${person(110, 172, { sex: 'f' })}${person(158, 172, { s: 0.7, shirt: '#f59e0b' })}${roundRect(186, 130, 56, 8, 3, PALETTE.amber, PALETTE.inkSoft)}
       ${line(192, 138, 192, 168, PALETTE.inkSoft, 3)}${line(236, 138, 236, 168, PALETTE.inkSoft, 3)}`,
    ),
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5', extra: tree(276, 168, 0.8) }),
      `${person(96, 172, { sex: 'f' })}${person(150, 164, { s: 0.7, shirt: '#f59e0b' })}${line(150, 120, 176, 140, PALETTE.greyDeep, 4)}
       ${line(176, 140, 210, 120, PALETTE.greyDeep, 4)}${circle(196, 96, 6, PALETTE.greyDeep)}`,
    ),
    shell(
      outdoor({ weather: 'sun', groundColor: '#d1fae5', extra: tree(240, 168, 0.8) }),
      `${stationClock(268, 150)}${text(268, 78, '17:00', 13, PALETTE.ink, 'font-weight="700"')}
       ${person(96, 172, { sex: 'f' })}${person(144, 172, { s: 0.7, shirt: '#f59e0b' })}${arrow(60, 88, 'left')}`,
    ),
    shell(
      outdoor({ weather: 'cloud', groundColor: '#d1fae5', extra: tree(276, 168, 0.7) }),
      `${person(110, 172, { sex: 'f' })}${person(164, 172, { s: 0.7, shirt: '#f59e0b' })}${arrow(56, 82, 'left')}
       ${signBoard(224, 168, '公園')}`,
    ),
  ],

  // n4-5 q54 なくなった電池 — set alarm, stopped, replace battery, hands move
  'S5-Q54': [
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${roundRect(60, 116, 90, 12, 4, '#94a3b8', PALETTE.inkSoft)}${person(180, 172, {})}
       ${circle(96, 100, 18, 'none', `stroke="${PALETTE.ink}" stroke-width="2" fill="none"`)}${line(96, 100, 96, 88, PALETTE.ink, 2.4)}
       ${line(96, 100, 104, 104, PALETTE.red, 2)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(180, 172, {})}${circle(96, 100, 18, '#ffffff', PALETTE.inkSoft)}${line(96, 100, 96, 88, PALETTE.inkSoft, 2.4)}
       ${line(96, 100, 104, 104, PALETTE.inkSoft, 2)}${text(136, 82, '…', 20, PALETTE.inkSoft)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(180, 172, {})}${roundRect(60, 118, 90, 10, 4, '#94a3b8', PALETTE.inkSoft)}
       ${circle(96, 100, 18, '#ffffff', PALETTE.inkSoft)}${roundRect(122, 100, 24, 16, 2, '#f59e0b', PALETTE.inkSoft)}
       ${line(120, 96, 108, 88, PALETTE.inkSoft, 2)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 24 }] }),
      `${person(180, 172, {})}${circle(96, 100, 18, '#ffffff', PALETTE.inkSoft)}${line(96, 100, 96, 86, PALETTE.ink, 2.6)}
       ${line(96, 100, 108, 102, PALETTE.red, 2.2)}${arrow(116, 78, 'right')}${checkMark(144, 70)}`,
    ),
  ],

  // n4-5 q55 旅行の写真 — photo at lake, battery low, charge at cafe, photo again
  'S5-Q55': [
    shell(
      outdoor({ weather: 'sun', extra: `${river(0, 138, 320, 22)}${tree(268, 138, 0.8)}` }),
      `${person(120, 168, { bag: 'L' })}${roundRect(150, 96, 28, 22, 3, '#1f2937', PALETTE.inkSoft)}
       ${circle(164, 107, 8, '#93c5fd')}`,
    ),
    shell(
      outdoor({ weather: 'sun', extra: river(0, 138, 320, 22) }),
      `${person(120, 168, { bag: 'L' })}${roundRect(158, 90, 26, 42, 4, '#e2e8f0', PALETTE.inkSoft)}
       ${rect(161, 102, 20, 8, PALETTE.red)}${rect(161, 114, 20, 2, '#cbd5e1')}${rect(161, 120, 20, 2, '#cbd5e1')}
       ${text(200, 88, '!', 20, PALETTE.red)}`,
    ),
    shell(
      indoor({ windows: [{ x: 232, y: 26 }] }),
      `${table(120, 150, 90)}${person(190, 172, { sex: 'f' })}${person(120, 172, { bag: 'L' })}
       ${line(150, 150, 176, 118, PALETTE.inkSoft, 2)}${roundRect(166, 108, 24, 14, 3, '#1f2937', PALETTE.inkSoft)}
       ${boltIcon(100, 74)}`,
    ),
    shell(
      outdoor({ weather: 'sun', extra: `${river(0, 138, 320, 22)}${tree(268, 138, 0.8)}` }),
      `${person(120, 168, { bag: 'L' })}${roundRect(150, 96, 28, 22, 3, '#1f2937', PALETTE.inkSoft)}
       ${circle(164, 107, 8, '#93c5fd')}${circle(236, 58, 15, '#fde68a', PALETTE.inkSoft)}${checkMark(214, 74)}`,
    ),
  ],
};