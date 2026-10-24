import {
  PALETTE,
  bagProp,
  bicycle,
  bookProp,
  bridge,
  bus,
  cake,
  calendar,
  cat,
  chair,
  circle,
  clockFace,
  cup,
  dog,
  doorOpen,
  doorFrame,
  ellipse,
  eggs,
  floorBoard,
  fridge,
  gate,
  grass,
  ground,
  line,
  milkCarton,
  path,
  person,
  plateWithFood,
  pot,
  rect,
  river,
  roundRect,
  schoolBuilding,
  shelf,
  shopFront,
  skyline,
  stairs,
  table,
  text,
  train,
  tree,
  umbrellaProp,
  wall,
  windowFrame,
} from './svg-kit.mjs';

const W = 320;
const H = 200;

const wrap = (background, content, title) =>
  `<g clip-path="url(#panelClip)"><rect width="${W}" height="${H}" fill="#f8fafc"/>${background}${content}</g>` +
  `<title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>`;

const indoor = (windows = [], floor = '#f5e6d3') => {
  let body = rect(0, 0, W, 168, '#f8fafc');
  body += floor === '#f5e6d3' ? floorBoard(168) : ground(168, floor);
  for (const win of windows) {
    body += windowFrame(win.x, win.y, win.w ?? 58, win.h ?? 46, { open: win.open ?? false, weather: win.weather ?? 'clear' });
  }
  return body;
};

const outdoor = (weather = 'clear', extra = '') => skyline({ weather, height: 168 }) + ground(168, '#e7e5e4') + extra;

// --- 25 templates -----------------------------------------------------------

const personUmbrellaBag = ({ sex, umbrellaSide, bagSide, bags = 1, umbrella = true }) => {
  // The canonical answer picture: umbrella held on one side, bag on the other.
  // Sides are described from the viewer's perspective so the four options stay unambiguous.
  let body = outdoor('clear', tree(292, 168, 0.62));
  body += person(160, 172, { sex });
  const sideX = { L: 118, R: 202 };

  if (umbrella) {
    body += umbrellaProp(sideX[umbrellaSide], 150, { kind: 'long', color: PALETTE.blueDeep, height: 46, canopy: 40 });
    body += line(sideX[umbrellaSide], 150, sideX[umbrellaSide] + (umbrellaSide === 'L' ? 26 : -26), 126, PALETTE.skin, 5);
  }
  if (bags === 1) {
    body += bagProp(sideX[bagSide] - 15, 152, 'tas', '#92400e');
    body += line(sideX[bagSide], 152, sideX[bagSide] + (bagSide === 'L' ? 22 : -22), 128, PALETTE.skin, 5);
  } else {
    body += bagProp(96, 154, 'tas', '#92400e');
    body += bagProp(190, 154, 'tas', '#a16207');
  }
  return wrap(body, '', 'Seseorang dengan payung dan tas');
};

const catCups = ({ animal, animalPos, cupsPos, cups }) => {
  let body = indoor([{ x: 250, y: 20 }]);
  const tableTop = 128;
  body += table(64, 176, 168, 22);
  body += roundRect(64, tableTop, 168, 7, 3, PALETTE.wood, PALETTE.inkSoft);

  if (cupsPos === 'onTable') {
    const startX = cups === 1 ? 178 : 158;
    for (let i = 0; i < cups; i += 1) {
      body += cup(startX + i * 26, tableTop, '#ffffff', 1.1);
    }
  } else {
    const startX = cups === 1 ? 178 : 152;
    for (let i = 0; i < cups; i += 1) {
      body += cup(startX + i * 26, 176, '#ffffff', 1.1);
    }
  }

  if (animalPos === 'onTable') {
    body += animal === 'cat' ? cat(118, tableTop) : dog(118, tableTop);
  } else {
    body += ellipse(120, 176, 30, 5, '#e2e8f0');
    body += animal === 'cat' ? cat(120, 176) : dog(120, 176);
  }
  return wrap(body, '', 'Hewan dan gelas di sekitar meja');
};

const clockScene = ({ hour, minute }) => {
  const body = indoor([{ x: 232, y: 24 }]) + rect(96, 96, 128, 4, 'none', '') + clockFace(160, 108, hour, minute, 54);
  return wrap(body, '', 'Jam dinding menunjukkan waktu tertentu');
};

// Side view so "paling depan" (front of the queue) is unambiguous: everyone faces the pole.
const sidePerson = (x, groundY, { hat = false, shirt = '#3b82f6', trousers = '#1e293b' } = {}) => {
  let body = '';
  body += line(x - 3, groundY - 22, x - 6, groundY, trousers, 6);
  body += line(x + 3, groundY - 22, x + 6, groundY, trousers, 6);
  body += roundRect(x - 7, groundY - 48, 14, 28, 6, shirt, softStrokeColor());
  body += circle(x - 1, groundY - 56, 8, PALETTE.skin, softStrokeColor());
  body += path(`M${x - 9} ${groundY - 58} q2 -10 9 -10 q8 0 8 10`, '#1f2937');
  body += circle(x - 5, groundY - 56, 1.3, PALETTE.ink);
  body += path(`M${x - 13} ${groundY - 30} q-6 8 -3 14`, 'none', `stroke="${shirt}" stroke-width="5.5" fill="none" stroke-linecap="round"`);
  if (hat) {
    body += roundRect(x - 12, groundY - 66, 21, 4, 2, '#0f172a', softStrokeColor());
    body += roundRect(x - 8, groundY - 72, 13, 7, 3, '#0f172a', softStrokeColor());
  }
  return body;
};

const queue = ({ count, hatIndex, sitting = false }) => {
  let body = outdoor('clear');
  body += roundRect(36, 168, 258, 6, 3, PALETTE.grey, PALETTE.inkSoft);
  body += line(52, 168, 52, 60, '#64748b', 5);
  body += roundRect(36, 44, 52, 26, 4, '#fde68a', PALETTE.inkSoft);
  body += roundRect(42, 50, 40, 13, 3, '#fbbf24', PALETTE.inkSoft);
  body += circle(50, 66, 4, '#334155');
  body += circle(74, 66, 4, '#334155');
  body += path('M52 84 l-8 -12 l16 0 z', PALETTE.amberDeep);

  const spacing = 54;
  for (let i = 0; i < count; i += 1) {
    const x = 96 + i * spacing;
    if (sitting) {
      body += seatAndSitter(x, 168, { hat: i === hatIndex });
    } else {
      body += sidePerson(x, 168, { hat: i === hatIndex });
    }
  }
  return wrap(body, '', 'Antrean di halte bus');
};

const seatAndSitter = (x, groundY, { hat = false } = {}) => {
  // Bench seen from the side, person seated facing left.
  let body = '';
  body += roundRect(x - 18, groundY - 22, 36, 5, 2, '#94a3b8', PALETTE.inkSoft);
  body += line(x - 14, groundY - 17, x - 14, groundY, '#64748b', 3);
  body += line(x + 14, groundY - 17, x + 14, groundY, '#64748b', 3);
  body += roundRect(x - 4, groundY - 40, 13, 19, 5, '#3b82f6', PALETTE.inkSoft);
  body += line(x - 2, groundY - 22, x - 10, groundY - 22, '#1e293b', 6);
  body += line(x - 10, groundY - 22, x - 11, groundY - 6, '#1e293b', 6);
  body += circle(x + 2, groundY - 48, 7.5, PALETTE.skin, PALETTE.inkSoft);
  body += path(`M${x - 6} ${groundY - 50} q3 -9 9 -9 q7 0 7 9`, '#1f2937');
  body += circle(x - 1, groundY - 48, 1.2, PALETTE.ink);
  body += path(`M${x - 3} ${groundY - 36} q-7 6 -6 12`, 'none', `stroke="#3b82f6" stroke-width="5" fill="none" stroke-linecap="round"`);
  if (hat) {
    body += roundRect(x - 7, groundY - 57, 19, 4, 2, '#0f172a', PALETTE.inkSoft);
    body += roundRect(x - 3, groundY - 63, 12, 7, 3, '#0f172a', PALETTE.inkSoft);
  }
  return body;
};

const stairway = (baseX, groundY, dir = 'up', steps = 5) => {
  // dir 'up' climbs to the right, 'down' descends to the right.
  let body = '';
  const rise = 14;
  const run = 20;
  for (let i = 0; i < steps; i += 1) {
    const x = dir === 'up' ? baseX + i * run : baseX + i * run;
    const y = dir === 'up' ? groundY - i * rise : groundY - (steps - 1 - i) * rise;
    body += rect(x, y - rise, run, rise + 2, '#e2e8f0', softStrokeColor());
    body += line(x, y - rise, x + run, y - rise, '#94a3b8', 1.6);
  }
  body += line(baseX - 4, groundY, baseX + steps * run + 4, groundY, '#94a3b8', 2.5);
  return body;
};

const transit = ({ vehicle = 'train', stairs = null, sitting = false, sex = 'f' }) => {
  if (sitting) {
    let body = indoor([], '#e2e8f0');
    body += roundRect(28, 20, 264, 62, 8, '#dbeafe', PALETTE.inkSoft);
    for (let i = 0; i < 4; i += 1) {
      body += roundRect(42 + i * 64, 30, 48, 40, 4, '#bfdbfe', PALETTE.inkSoft);
      body += line(42 + i * 64, 50, 90 + i * 64, 50, '#93c5fd', 1.4);
    }
    body += line(0, 92, 320, 92, '#cbd5e1', 2.5);
    body += chair(124, 172);
    body += person(138, 172, { sex, pose: 'sit' });
    body += roundRect(24, 100, 30, 72, 4, '#e2e8f0', PALETTE.inkSoft);
    body += roundRect(266, 100, 30, 72, 4, '#e2e8f0', PALETTE.inkSoft);
    return wrap(body, '', 'Penumpang duduk di dalam kereta');
  }

  let body = outdoor('clear');
  if (vehicle === 'bus') {
    body += bus(4, 168, 1);
  } else {
    body += train(0, 124, 180);
  }
  body += line(0, 168, 320, 168, PALETTE.greyDeep, 2);

  if (stairs === 'up') {
      body += stairway(238, 168, 'up', 4);
      body += person(300, 168 - 3 * 14, { sex, pose: 'walk' });
      body += path('M236 150 l44 -40', 'none', 'stroke="#1d4ed8" stroke-width="3" stroke-dasharray="7 5" fill="none"');
      body += path('M280 110 l8 -4 l-4 9 z', '#1d4ed8');
    } else if (stairs === 'down') {
      body += stairway(238, 168, 'down', 4);
      body += person(250, 168 - 3 * 14, { sex, pose: 'walk' });
      body += path('M282 110 l44 40', 'none', 'stroke="#b45309" stroke-width="3" stroke-dasharray="7 5" fill="none"');
      body += path('M326 150 l4 8 l-9 -4 z', '#b45309');
    } else {
      body += person(232, 168, { sex, pose: 'walk' });
    }
  return wrap(body, '', 'Penumpang keluar dari kendaraan');
};

const books = ({ variant }) => {
  let body = indoor([{ x: 232, y: 26 }]);
  body += table(96, 140, 128, 26);
  if (variant === 'onlyBlue') {
    body += bookProp(140, 114, '#2563eb', 44, 14);
  } else if (variant === 'redLeft') {
    body += bookProp(112, 114, '#dc2626', 40, 14);
    body += bookProp(166, 114, '#2563eb', 40, 14);
  } else if (variant === 'redRight') {
    body += bookProp(112, 114, '#2563eb', 40, 14);
    body += bookProp(166, 114, '#dc2626', 40, 14);
  } else {
    body += bookProp(130, 114, '#2563eb', 44, 14);
    body += bookProp(126, 96, '#dc2626', 44, 14);
  }
  return wrap(body, '', 'Buku di atas meja');
};

const walker = ({ sex, animal, phone, pose = 'walk' }) => {
  let body = outdoor('clear', tree(276, 168, 0.8));
  if (pose === 'sit') body += chair(120, 168);
  body += person(160, 172, { sex, pose, phone: phone ? 'R' : undefined });
  const pet = animal === 'dog' ? dog(226, 170) : cat(226, 170);
  body += pet;
  body += line(176, 150, 208, 154, PALETTE.redDeep, 2);
  return wrap(body, '', 'Seseorang berjalan dengan hewan peliharaan');
};

const ticketIcon = (x, y, tilt = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${tilt})">
${roundRect(0, -9, 26, 15, 2, '#fde68a', softStrokeColor())}
${line(9, -9, 9, 6, '#b45309', 1.2)}
${line(14, -6, 22, -6, '#b45309', 1.2)}
</g>`;

const tickets = ({ count, giver }) => {
  let body = indoor([], '#e2e8f0');
  body += roundRect(60, 132, 200, 22, 5, '#94a3b8', softStrokeColor());
  body += line(160, 132, 160, 154, '#64748b', 1.4);

  const clerkX = 104;
  const guestX = 216;
  const clerkReach = 26;
  const guestReach = -26;

  // clerk wears an apron + badge, customer does not: role stays readable.
  body += person(clerkX, 172, { sex: 'f', shirt: '#1d4ed8', apron: '#e2e8f0' });
  body += person(guestX, 172, { sex: 'm', shirt: '#22c55e' });

  if (giver === 'clerk') {
    // tickets sit next to the clerk's outstretched hand, arrow points to the customer
    for (let i = 0; i < count; i += 1) {
      body += ticketIcon(clerkX + clerkReach + i * 10, 132 - i * 13, -6 + i * 4);
    }
    body += path(`M${clerkX + clerkReach} 150 l34 -8`, 'none', 'stroke="#1d4ed8" stroke-width="2.6" stroke-dasharray="6 4" fill="none"');
    body += path(`M${clerkX + clerkReach + 34} 142 l7 -6 l-1 9 z`, '#1d4ed8');
  } else {
    for (let i = 0; i < count; i += 1) {
      body += ticketIcon(guestX + guestReach - 22 - i * 6, 132 - i * 13, 6 - i * 4);
    }
    body += path(`M${guestX + guestReach} 150 l-30 -8`, 'none', 'stroke="#16a34a" stroke-width="2.6" stroke-dasharray="6 4" fill="none"');
    body += path(`M${guestX + guestReach - 30} 142 l-7 -6 l1 9 z`, '#16a34a');
  }
  return wrap(body, '', 'Petugas dan pelanggan bertukar tiket');
};

const deskLayout = ({ chairSide, binSide, variant }) => {
  let body = indoor([{ x: 232, y: 26 }]);
  body += table(112, 146, 96, 24);
  if (variant === 'binOnDesk') {
    body += chair(140, 172);
    body += roundRect(196, 108, 18, 20, 2, '#94a3b8', PALETTE.inkSoft);
  } else {
    body += chairSide === 'left' ? chair(74, 172) : chair(222, 172);
    body += binSide === 'left' ? roundRect(60, 140, 18, 24, 2, '#94a3b8', PALETTE.inkSoft) : roundRect(246, 140, 18, 24, 2, '#94a3b8', PALETTE.inkSoft);
  }
  return wrap(body, '', 'Meja dengan kursi dan tempat sampah');
};

const crowd = ({ people, umbrellas, hats }) => {
  let body = outdoor('cloud');
  const total = people;
  for (let i = 0; i < total; i += 1) {
    const x = 80 + i * 62;
    const hasUmbrella = i < umbrellas;
    const hasHat = i >= total - hats;
    body += person(x, 172, {
      sex: i % 2 === 0 ? 'm' : 'f',
      umbrella: hasUmbrella ? (i % 2 === 0 ? 'L' : 'R') : undefined,
      hat: hasHat ? '#0f172a' : false,
    });
  }
  return wrap(body, '', 'Beberapa orang dengan payung dan topi');
};

const inTrain = ({ sex, pose, place }) => {
  let body = indoor([], '#e2e8f0');
  body += roundRect(40, 40, 240, 104, 8, '#dbeafe', PALETTE.inkSoft);
  body += line(40, 92, 280, 92, '#bfdbfe', 3);
  for (let i = 0; i < 4; i += 1) body += rect(58 + i * 56, 52, 40, 30, '#e0f2fe', softStrokeColor());
  if (place === 'outside') {
    body += rect(0, 148, 320, 4, PALETTE.inkSoft);
    body += person(160, 148, { sex, pose });
  } else {
    body += person(place === 'door' ? 250 : 96, 172, { sex, pose });
    body += place === 'door' ? roundRect(228, 96, 64, 72, 4, '#cbd5e1', PALETTE.inkSoft) : chairobj(84, 172);
    if (pose === 'sit' && place !== 'door') body += chair(84, 172);
  }
  return wrap(body, '', 'Penumpang di dalam kereta');
};

const softStrokeColor = () => `stroke="${PALETTE.inkSoft}" stroke-width="1.2"`;
const chairobj = () => '';

const fridgeScene = ({ eggCount, milk }) => {
  let body = indoor([{ x: 232, y: 26 }]);
  body += fridge(120, 168);
  body += eggs(132, 148, eggCount);
  if (milk) body += milkCarton(166, 148);
  body += rect(120, 96, 62, 26, '#f8fafc', 'stroke="#94a3b8" stroke-width="1.2" fill-opacity="0.35"');
  return wrap(body, '', 'Isi lemari pendingin');
};

const bags = ({ variant }) => {
  let body = indoor([{ x: 232, y: 26 }]);
  body += table(96, 150, 128, 26);
  if (variant === 'bigTop') {
    body += bagProp(120, 122, 'tas', '#1d4ed8');
    body += bagProp(132, 100, 'tas', '#b91c1c');
  } else if (variant === 'smallTop') {
    body += bagProp(120, 122, 'tas', '#b91c1c');
    body += bagProp(132, 100, 'tas', '#1d4ed8');
  } else if (variant === 'sideBySide') {
    body += bagProp(104, 122, 'tas', '#b91c1c');
    body += bagProp(160, 122, 'tas', '#1d4ed8');
  } else {
    body += chair(140, 172);
    body += bagProp(132, 138, 'tas', '#1d4ed8');
  }
  return wrap(body, '', 'Dua tas di atas meja');
};

const shoeIcon = (x, y, angle = 0, color = '#0f172a') =>
  `<g transform="translate(${x} ${y}) rotate(${angle})">
${path('M0 0 q0 -9 9 -9 l6 0 q4 0 6 4 l5 5 l-26 0 z', color, softStrokeColor())}
</g>`;

const shoes = ({ sex, action }) => {
  const body2 = (inner) => wrap(inner, '', 'Orang memakai atau melepas sepatu');

  if (action === 'remove') {
    // genkan step, door, a pair of shoes already off next to the step
    let body = indoor([{ x: 36, y: 22 }], '#e7e5e4');
    body += roundRect(150, 156, 148, 12, 3, '#d6b48a', softStrokeColor());
    body += doorFrame(244, 84, 48, 72);
    body += person(196, 156, { sex, shoes: '#f3c9a8', pose: 'walk' });
    body += shoeIcon(160, 170, 0);
    body += shoeIcon(176, 176, 8);
    body += line(196, 132, 178, 176, '#94a3b8', 1.4, 'stroke-dasharray="5 4"');
    return body2(body);
  }

  if (action === 'putOn') {
    // crouching by the entrance, one shoe on, one in hand
    let body = indoor([{ x: 36, y: 22 }], '#e7e5e4');
    body += roundRect(150, 156, 148, 12, 3, '#d6b48a', softStrokeColor());
    body += doorFrame(244, 84, 48, 72);
    body += openDoorArc(244, 84, 48, 72);
    body += person(206, 156, { sex, shoes: '#0f172a' });
    body += shoeIcon(176, 152, -12, '#0f172a');
    body += circle(206, 92, 5, '#f3c9a8', softStrokeColor());
    return body2(body);
  }

  if (action === 'carry') {
    // outside the building, walking away, holding both shoes
    let body = outdoor('clear');
    body += shopFront(20, 168, 118);
    body += doorFrame(44, 96, 40, 72);
    body += person(214, 168, { sex, shoes: '#f3c9a8', pose: 'walk', flip: true });
    body += shoeIcon(246, 128, 12);
    body += shoeIcon(258, 134, 20);
    body += line(206, 128, 244, 130, '#94a3b8', 1.6);
    return body2(body);
  }

  // man putting shoes on at the door
  let body = indoor([{ x: 36, y: 22 }], '#e7e5e4');
  body += roundRect(150, 156, 148, 12, 3, '#d6b48a', softStrokeColor());
  body += doorFrame(244, 84, 48, 72);
  body += person(206, 156, { sex: 'm', shirt: '#1d4ed8', shoes: '#0f172a' });
  body += shoeIcon(176, 152, -12, '#0f172a');
  return body2(body);
};

const openDoorArc = (x, y, w, h) =>
  path(`M${x} ${y} l${w * 0.9} 6`, 'none', 'stroke="#94a3b8" stroke-width="3" fill="none"');

const landscape = ({ variant }) => {
  let body = skyline({ weather: 'clear', height: 150 });
  body += rect(0, 150, 320, 50, '#d1fae5');
  if (variant === 'bridgeFront') {
    body += river(0, 128, 320, 20);
    body += bridge(84, 128, 150);
    body += schoolBuilding(100, 104);
  } else if (variant === 'schoolFront') {
    body += schoolBuilding(96, 116);
    body += river(0, 138, 320, 18);
    body += bridge(180, 140, 100);
  } else if (variant === 'mountain') {
    body += path('M40 150 l70 -76 l70 76 z', '#a3a3a3', PALETTE.inkSoft);
    body += bridge(60, 140, 90);
    body += schoolBuilding(180, 150);
  } else {
    body += schoolBuilding(96, 150);
    body += river(0, 146, 320, 18);
  }
  return wrap(body, '', 'Sekolah, jembatan, dan sungai');
};

const bike = ({ sex, shoes, action, bikeColor }) => {
  let body = outdoor('clear');
  body += bicycle(120, 170, bikeColor);
  body += person(96, 172, { sex, shoes, pose: action === 'ride' ? 'sit' : 'stand' });
  if (action === 'push') body += line(146, 138, 176, 150, PALETTE.inkSoft, 2.4);
  return wrap(body, '', 'Orang dengan sepeda');
};

const calendarScene = ({ day, weekday }) => {
  const body = indoor([{ x: 232, y: 26 }]) + calendar(112, 60, day, weekday, 100, 78);
  return wrap(body, '', 'Kalender dinding');
};

const cooking = ({ variant }) => {
  let body = indoor([{ x: 236, y: 26 }]);
  body += roundRect(120, 132, 110, 16, 4, '#94a3b8', PALETTE.inkSoft);
  body += pot(150, 132);
  if (variant === 'adultCooksChildWashes') {
    body += person(110, 172, { sex: 'f' });
    body += person(206, 172, { s: 0.7, shirt: '#f59e0b' });
    body += roundRect(232, 140, 30, 20, 3, '#e2e8f0', PALETTE.inkSoft);
  } else if (variant === 'childCooks') {
    body += person(110, 172, { s: 0.75, shirt: '#f59e0b' });
    body += person(210, 172, { sex: 'f' });
    body += roundRect(70, 140, 30, 20, 3, '#e2e8f0', PALETTE.inkSoft);
  } else if (variant === 'childBehind') {
    body += person(110, 172, { sex: 'f' });
    body += person(206, 172, { s: 0.7, shirt: '#f59e0b' });
  } else {
    body += person(112, 176, { pose: 'sit', sex: 'f' });
    body += person(196, 176, { pose: 'sit' });
    body += table(140, 150, 70, 22);
    body += plateWithFood(150, 128);
  }
  return wrap(body, '', 'Orang memasak dan mencuci piring');
};

// Top-down road view: the clearest way to show "belok kanan" vs "lurus".
const traffic = ({ busTurn, bikeGo }) => {
  let body = rect(0, 0, W, H, '#f8fafc');
  body += rect(0, 96, W, 44, '#d6d3d1');
  body += line(0, 118, W, 118, '#f8fafc', 3, 'stroke-dasharray="18 14"');
  body += rect(0, 60, W, 8, '#e2e8f0');
  body += rect(0, 168, W, 8, '#e2e8f0');
  body += rect(0, 96, W, 3, '#cbd5e1');
  body += rect(0, 140, W, 3, '#cbd5e1');

  // side road on the right so a right turn actually goes somewhere
  body += rect(246, 0, 34, H, '#d6d3d1');
  body += rect(246, 0, 3, H, '#cbd5e1');
  body += rect(277, 0, 3, H, '#cbd5e1');
  body += line(263, 0, 263, H, '#f8fafc', 3, 'stroke-dasharray="18 14"');

  // bus body pointing right
  body += roundRect(28, 104, 116, 30, 7, '#fbbf24', softStrokeColor());
  body += roundRect(40, 110, 30, 18, 3, '#e0f2fe', softStrokeColor());
  body += roundRect(78, 110, 30, 18, 3, '#e0f2fe', softStrokeColor());
  body += roundRect(112, 110, 24, 18, 3, '#e0f2fe', softStrokeColor());
  body += circle(52, 138, 7, '#334155');
  body += circle(124, 138, 7, '#334155');

  const arrow = (d, color, head) =>
    `${path(d, 'none', `stroke="${color}" stroke-width="6" stroke-linecap="round" fill="none"`)}${path(head, color)}`;

  if (busTurn === 'right') {
    body += arrow('M148 119 q46 0 60 34 q10 26 34 30', '#b45309', 'M238 176 l16 8 l-4 -17 z');
  } else if (busTurn === 'left') {
    body += arrow('M148 119 q-26 -6 -36 -30', '#b45309', 'M106 84 l-8 -14 l17 2 z');
  } else {
    body += arrow('M148 119 l46 0', '#b45309', 'M188 112 l14 7 l-14 7 z');
  }

  // bicycle below, heading right
  body += circle(196, 152, 9, 'none', 'stroke="#334155" stroke-width="3"');
  body += circle(228, 152, 9, 'none', 'stroke="#334155" stroke-width="3"');
  body += path('M196 152 l10 -13 l10 13 z', 'none', 'stroke="#1d4ed8" stroke-width="3" fill="none"');
  body += line(206, 139, 222, 139, '#1d4ed8', 3);
  body += circle(240, 140, 5, '#f3c9a8', softStrokeColor());

  if (bikeGo === 'turn') {
    body += arrow('M238 150 q14 0 18 -22 q4 -18 20 -22', '#1d4ed8', 'M272 100 l14 -6 l-3 16 z');
  } else {
    body += arrow('M238 152 l28 0', '#1d4ed8', 'M260 145 l14 7 l-14 7 z');
  }

  body += text(160, 84, 'BUS', 11, '#92400e', 'font-weight="700"');
  return wrap(body, '', 'Bus dan sepeda di persimpangan jalan');
};

const windowsFloors = ({ first, second }) => {
  let body = rect(0, 0, 320, 200, '#e2e8f0');
  body += rect(60, 30, 200, 138, '#f8fafc', PALETTE.inkSoft);
  body += line(60, 96, 260, 96, '#94a3b8', 5);
  for (let i = 0; i < 3; i += 1) {
    body += windowFrame(80 + i * 60, 46, 44, 34, { open: second === 'open' });
    body += windowFrame(80 + i * 60, 112, 44, 34, { open: first === 'open' });
  }
  body += text(284, 62, '2F', 12, PALETTE.inkSoft, 'font-weight="700"');
  body += text(284, 128, '1F', 12, PALETTE.inkSoft, 'font-weight="700"');
  return wrap(body, '', 'Jendela dua lantai bangunan');
};

const library = ({ variant }) => {
  let body = indoor([{ x: 236, y: 26 }]);
  if (variant === 'staffStack') {
    body += table(96, 140, 120, 22);
    body += bookProp(112, 118, '#60a5fa', 30, 16);
    body += bookProp(144, 118, '#f472b6', 30, 16);
    body += person(244, 172, { sex: 'f', shirt: '#1d4ed8' });
  } else {
    body += shelf(30, 152, 84, 3);
    if (variant === 'carryOut') {
      body += doorOpen(240, 96, 44, 72);
      body += person(120, 172, { sex: 'f', book: true });
    } else if (variant === 'return') {
      body += person(142, 172, { sex: 'f', book: true });
      body += bookProp(96, 100, '#f97316', 18, 14);
    } else {
      body += person(150, 172, { sex: 'f', book: true });
      body += chair(196, 172);
      body += person(206, 172, { sex: 'f', pose: 'sit', book: true });
    }
  }
  return wrap(body, '', 'Aktivitas di perpustakaan');
};

const umbrellas = ({ variant }) => {
  let body = indoor([], '#e7e5e4');
  body += line(60, 168, 260, 168, PALETTE.inkSoft, 4);
  if (variant === 'shortLeft') {
    body += umbrellaProp(120, 168, { kind: 'short', color: '#f59e0b' });
    body += umbrellaProp(190, 168, { kind: 'long', color: PALETTE.blueDeep });
  } else if (variant === 'shortRight') {
    body += umbrellaProp(120, 168, { kind: 'long', color: PALETTE.blueDeep });
    body += umbrellaProp(190, 168, { kind: 'short', color: '#f59e0b' });
  } else if (variant === 'bothLong') {
    body += umbrellaProp(120, 168, { kind: 'long', color: PALETTE.blueDeep });
    body += umbrellaProp(190, 168, { kind: 'long', color: '#f59e0b' });
  } else {
    body += umbrellaProp(120, 168, { kind: 'long', color: PALETTE.blueDeep });
    body += umbrellaProp(190, 168, { kind: 'short', color: '#f59e0b' });
  }
  return wrap(body, '', 'Dua payung berdiri');
};

const cakePlate = (x, y, eaten) => {
  let body = ellipse(x + 22, y, 26, 6, '#e2e8f0', softStrokeColor());
  if (eaten) {
    // a wedge is already gone, and a fork lies on the plate
    body += path(`M${x + 10} ${y - 2} l10 -18 l12 0 l6 18 z`, '#f9a8d4', softStrokeColor());
    body += path(`M${x + 10} ${y - 2} l12 -18`, 'none', `stroke="#f472b6" stroke-width="1.4" fill="none"`);
    body += line(x + 34, y - 6, x + 44, y - 14, '#94a3b8', 2);
  } else {
    body += path(`M${x + 8} ${y - 2} l2 -20 l26 0 l2 20 z`, '#f9a8d4', softStrokeColor());
    body += line(x + 10, y - 14, x + 36, y - 14, '#fbcfe8', 3);
    body += line(x + 19, y - 22, x + 19, y - 32, '#f59e0b', 2.4);
    body += ellipse(x + 19, y - 34, 2.4, 3.4, '#fbbf24');
  }
  return body;
};

const cakeScene = ({ sex, eats, drinks }) => {
  let body = indoor([{ x: 246, y: 22 }], '#f5e6d3');
  body += table(120, 168, 132, 24);

  // plate with cake sits on the table, inside the child's reach
  body += cakePlate(148, 142, eats ? false : true);
  body += cakePlate(148, 142, eats);

  if (drinks) {
    body += cup(206, 140, '#ffffff', 1.2);
    body += line(206, 124, 214, 116, '#cbd5e1', 2);
  }

  body += chair(70, 168);
  body += person(84, 168, { sex, pose: 'sit', cup: drinks ? true : undefined, shirt: sex === 'f' ? '#f472b6' : '#3b82f6' });

  if (eats) {
    body += path('M100 132 q10 -6 18 0', 'none', 'stroke="#b45309" stroke-width="2" fill="none"');
  }
  return wrap(body, '', 'Anak dengan kue dan minuman');
};

const queueLuggage = ({ count, luggageIndex }) => {
  let body = outdoor('clear') + roundRect(56, 152, 208, 6, 3, PALETTE.grey, PALETTE.inkSoft);
  for (let i = 0; i < count; i += 1) {
    const x = 88 + i * 50;
    body += person(x, 166, { sex: i % 2 === 0 ? 'm' : 'f' });
  }
  if (luggageIndex !== null) {
    const x = 88 + luggageIndex * 50;
    body += bagProp(x - 30, 164, 'koper', '#7c2d12');
  }
  return wrap(body, '', 'Antrean dengan koper');
};

const weatherScene = ({ weather, sleeve, coat }) => {
  let body = outdoor(weather);
  body += roundRect(96, 44, 128, 92, 6, '#f8fafc', PALETTE.inkSoft);
  body += windowFrame(112, 54, 44, 34, { open: false, weather });
  body += windowFrame(168, 54, 44, 34, { open: false, weather });
  body += rect(96, 108, 128, 6, '#e2e8f0');
  body += person(160, 176, {
    s: 0.9,
    sex: 'm',
    sleeve,
    coat,
    shirt: '#22c55e',
  });
  return wrap(body, '', 'Anak di dalam ruangan dengan cuaca di luar');
};

const scene = (title, background, content) => wrap(background, content, title);

// --- mapping: every matching question's four options ------------------------

export const MATCH_SCENES = {
  'S1-Q56': {
    A: () => personUmbrellaBag({ sex: 'm', umbrellaSide: 'L', bagSide: 'R' }),
    B: () => personUmbrellaBag({ sex: 'm', umbrellaSide: 'R', bagSide: 'L' }),
    C: () => personUmbrellaBag({ sex: 'm', umbrella: false, bagSide: 'R', bags: 2 }),
    D: () => personUmbrellaBag({ sex: 'f', umbrellaSide: 'L', bagSide: 'R' }),
  },
  'S1-Q57': {
    A: () => catCups({ animal: 'cat', animalPos: 'onTable', cupsPos: 'onFloor', cups: 2 }),
    B: () => catCups({ animal: 'cat', animalPos: 'underTable', cupsPos: 'onTable', cups: 1 }),
    C: () => catCups({ animal: 'cat', animalPos: 'underTable', cupsPos: 'onTable', cups: 2 }),
    D: () => catCups({ animal: 'dog', animalPos: 'underTable', cupsPos: 'onTable', cups: 2 }),
  },
  'S1-Q58': {
    A: () => clockScene({ hour: 9, minute: 45 }),
    B: () => clockScene({ hour: 9, minute: 15 }),
    C: () => clockScene({ hour: 3, minute: 9 }),
    D: () => clockScene({ hour: 8, minute: 15 }),
  },
  'S1-Q59': {
    A: () => queue({ count: 3, hatIndex: 0 }),
    B: () => queue({ count: 3, hatIndex: 2 }),
    C: () => queue({ count: 2, hatIndex: 0 }),
    D: () => queue({ count: 3, hatIndex: 1, sitting: true }),
  },
  'S1-Q60': {
    A: () => transit({ sitting: true }),
    B: () => transit({ vehicle: 'train', stairs: 'down' }),
    C: () => transit({ vehicle: 'bus', stairs: 'up' }),
    D: () => transit({ vehicle: 'train', stairs: 'up' }),
  },
  'S2-Q56': {
    A: () => books({ variant: 'redLeft' }),
    B: () => books({ variant: 'redRight' }),
    C: () => books({ variant: 'redTop' }),
    D: () => books({ variant: 'onlyBlue' }),
  },
  'S2-Q57': {
    A: () => walker({ sex: 'f', animal: 'dog', phone: true }),
    B: () => walker({ sex: 'f', animal: 'cat', phone: true }),
    C: () => walker({ sex: 'f', animal: 'dog', phone: false, pose: 'sit' }),
    D: () => walker({ sex: 'm', animal: 'dog', phone: true }),
  },
  'S2-Q58': {
    A: () => tickets({ count: 3, giver: 'customer' }),
    B: () => tickets({ count: 1, giver: 'clerk' }),
    C: () => tickets({ count: 2, giver: 'clerk' }),
    D: () => tickets({ count: 2, giver: 'customer' }),
  },
  'S2-Q59': {
    A: () => deskLayout({ chairSide: 'left', binSide: 'right' }),
    B: () => deskLayout({ chairSide: 'right', binSide: 'left' }),
    C: () => deskLayout({ chairSide: 'right', binSide: 'right' }),
    D: () => deskLayout({ chairSide: 'behind', binSide: null, variant: 'binOnDesk' }),
  },
  'S2-Q60': {
    A: () => crowd({ people: 3, umbrellas: 2, hats: 1 }),
    B: () => crowd({ people: 3, umbrellas: 1, hats: 1 }),
    C: () => crowd({ people: 2, umbrellas: 2, hats: 0 }),
    D: () => crowd({ people: 3, umbrellas: 1, hats: 2 }),
  },
  'S3-Q56': {
    A: () => inTrain({ sex: 'm', pose: 'stand', place: 'window' }),
    B: () => inTrain({ sex: 'm', pose: 'sit', place: 'window' }),
    C: () => inTrain({ sex: 'm', pose: 'stand', place: 'outside' }),
    D: () => inTrain({ sex: 'f', pose: 'stand', place: 'door' }),
  },
  'S3-Q57': {
    A: () => fridgeScene({ eggCount: 4, milk: true }),
    B: () => fridgeScene({ eggCount: 6, milk: false }),
    C: () => fridgeScene({ eggCount: 6, milk: true }),
    D: () => fridgeScene({ eggCount: 8, milk: false }),
  },
  'S3-Q58': {
    A: () => bags({ variant: 'bigTop' }),
    B: () => bags({ variant: 'sideBySide' }),
    C: () => bags({ variant: 'smallTop' }),
    D: () => bags({ variant: 'onChair' }),
  },
  'S3-Q59': {
    A: () => shoes({ sex: 'f', action: 'remove', place: 'inside' }),
    B: () => shoes({ sex: 'f', action: 'putOn', place: 'door' }),
    C: () => shoes({ sex: 'm', action: 'putOn', place: 'door' }),
    D: () => shoes({ sex: 'f', action: 'carry', place: 'outside' }),
  },
  'S3-Q60': {
    A: () => landscape({ variant: 'bridgeFront' }),
    B: () => landscape({ variant: 'schoolFront' }),
    C: () => landscape({ variant: 'mountain' }),
    D: () => landscape({ variant: 'nearSide' }),
  },
  'S4-Q56': {
    A: () => bike({ sex: 'm', shoes: '#f8fafc', action: 'ride', bikeColor: '#0f172a' }),
    B: () => bike({ sex: 'f', shoes: '#0f172a', action: 'push', bikeColor: '#f8fafc' }),
    C: () => bike({ sex: 'm', shoes: '#0f172a', action: 'ride', bikeColor: '#f8fafc' }),
    D: () => bike({ sex: 'm', shoes: '#0f172a', action: 'push', bikeColor: '#f8fafc' }),
  },
  'S4-Q57': {
    A: () => calendarScene({ day: 15, weekday: 4 }),
    B: () => calendarScene({ day: 15, weekday: 6 }),
    C: () => calendarScene({ day: 15, weekday: 0 }),
    D: () => calendarScene({ day: 5, weekday: 4 }),
  },
  'S4-Q58': {
    A: () => cooking({ variant: 'childCooks' }),
    B: () => cooking({ variant: 'adultCooksChildWashes' }),
    C: () => cooking({ variant: 'childBehind' }),
    D: () => cooking({ variant: 'eating' }),
  },
  'S4-Q59': {
    A: () => traffic({ busTurn: 'straight', bikeGo: 'turn' }),
    B: () => traffic({ busTurn: 'left', bikeGo: 'straight' }),
    C: () => traffic({ busTurn: 'right', bikeGo: 'straight' }),
    D: () => traffic({ busTurn: 'right', bikeGo: 'turn' }),
  },
  'S4-Q60': {
    A: () => windowsFloors({ first: 'closed', second: 'open' }),
    B: () => windowsFloors({ first: 'open', second: 'closed' }),
    C: () => windowsFloors({ first: 'open', second: 'open' }),
    D: () => windowsFloors({ first: 'closed', second: 'closed' }),
  },
  'S5-Q56': {
    A: () => library({ variant: 'carryOut' }),
    B: () => library({ variant: 'return' }),
    C: () => library({ variant: 'borrowSit' }),
    D: () => library({ variant: 'staffStack' }),
  },
  'S5-Q57': {
    A: () => umbrellas({ variant: 'shortRight' }),
    B: () => umbrellas({ variant: 'bothLong' }),
    C: () => umbrellas({ variant: 'shortLeft' }),
    D: () => umbrellas({ variant: 'longLeft' }),
  },
  'S5-Q58': {
    A: () => cakeScene({ sex: 'm', eats: true, drinks: true }),
    B: () => cakeScene({ sex: 'f', eats: false, drinks: true }),
    C: () => cakeScene({ sex: 'm', eats: true, drinks: false }),
    D: () => cakeScene({ sex: 'm', eats: false, drinks: true }),
  },
  'S5-Q59': {
    A: () => queueLuggage({ count: 4, luggageIndex: 3 }),
    B: () => queueLuggage({ count: 4, luggageIndex: 0 }),
    C: () => queueLuggage({ count: 3, luggageIndex: 2 }),
    D: () => queueLuggage({ count: 4, luggageIndex: null }),
  },
  'S5-Q60': {
    A: () => weatherScene({ weather: 'rain', sleeve: 'long', coat: null }),
    B: () => weatherScene({ weather: 'snow', sleeve: 'short', coat: null }),
    C: () => weatherScene({ weather: 'snow', sleeve: 'long', coat: '#1d4ed8' }),
    D: () => weatherScene({ weather: 'clear', sleeve: 'short', coat: null }),
  },
};

export { W as MATCH_W, H as MATCH_H };
export { scene as unusedScene };