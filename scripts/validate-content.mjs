import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = join(root, 'src', 'data', 'simulations.json');
const publicDir = join(root, 'public');

const CHOICES = ['A', 'B', 'C', 'D'];
const EXPECTED = {
  vocabulary: 20,
  grammar: 15,
  reading: 15,
  story_image: 5,
  match_image: 5,
  listening: 10,
};

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function isText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

const data = JSON.parse(readFileSync(dataPath, 'utf8'));

if (!Array.isArray(data) || data.length !== 5) fail(`Dataset harus 5 set, ditemukan ${data?.length}`);

const ids = new Set();
const prompts = new Set();
const imagePaths = new Set();
const audioPaths = new Set();
let mcq = 0;
let essays = 0;
let passages = 0;

for (const set of data) {
  const tag = set.id;
  if (!isText(set.id) || !isText(set.title) || !isText(set.version)) fail(`${tag}: metadata tidak lengkap`);
  if (set.questions.length !== 70) fail(`${tag}: jumlah soal ${set.questions.length} != 70`);
  if (!Array.isArray(set.passages) || set.passages.length !== 5) {
    fail(`${tag}: jumlah passage ${set.passages?.length} != 5`);
  }
  passages += set.passages?.length ?? 0;

  const passageIds = new Set((set.passages ?? []).map((passage) => passage.id));
  const passageUse = new Map();
  const numbers = new Set();
  const categories = {};

  for (const question of set.questions) {
    const label = `${tag}/${question.id}`;
    if (!isText(question.id)) fail(`${tag}: ada soal tanpa id`);
    else if (ids.has(question.id)) fail(`${label}: id duplikat`);
    else ids.add(question.id);

    if (!isText(question.prompt)) fail(`${label}: prompt kosong`);
    else if (prompts.has(question.prompt.trim())) fail(`${label}: prompt identik dengan soal lain`);
    else prompts.add(question.prompt.trim());

    if (!Number.isInteger(question.number) || question.number < 1 || question.number > 70) {
      fail(`${label}: number tidak valid`);
    } else if (numbers.has(question.number)) {
      fail(`${label}: number ${question.number} duplikat`);
    } else numbers.add(question.number);

    categories[question.category] = (categories[question.category] ?? 0) + 1;

    if (question.kind === 'essay') {
      essays += 1;
      if (!isText(question.sample_answer)) fail(`${label}: sample_answer kosong`);
      if (!isText(question.rubric)) fail(`${label}: rubric kosong`);
      if (!Number.isInteger(question.max_characters) || question.max_characters <= 0) {
        fail(`${label}: max_characters tidak valid`);
      }
      if (question.options) fail(`${label}: esai tidak boleh punya options`);
      if (question.points !== 1) warnings.push(`${label}: points esai ${question.points}`);
    } else {
      mcq += 1;
      const options = question.options ?? {};
      const values = CHOICES.map((key) => options[key]);
      if (values.some((value) => !isText(value))) fail(`${label}: opsi A-D tidak lengkap`);
      if (new Set(values).size !== 4) fail(`${label}: opsi A-D tidak berbeda`);
      if (!CHOICES.includes(question.answer)) fail(`${label}: answer tidak A-D`);
      if (!isText(question.explanation)) fail(`${label}: explanation kosong`);
    }

    if (question.category === 'reading') {
      if (!passageIds.has(question.passage_id)) fail(`${label}: passage_id tidak ditemukan`);
      else passageUse.set(question.passage_id, (passageUse.get(question.passage_id) ?? 0) + 1);
    }

    if (question.category === 'story_image') {
      if (!Array.isArray(question.panels) || question.panels.length !== 4) {
        fail(`${label}: panels harus 4`);
      }
      if (!isText(question.asset)) fail(`${label}: asset kosong`);
      else imagePaths.add(question.asset);
    }

    if (question.category === 'match_image') {
      for (const key of CHOICES) {
        const entry = question.image_options?.[key];
        if (!entry || !isText(entry.scene) || !isText(entry.src)) {
          fail(`${label}: image_options ${key} tidak lengkap`);
        } else imagePaths.add(entry.src);
      }
      const answerLabel = question.options?.[question.answer] ?? '';
      if (!/[A-D]/.test(answerLabel)) fail(`${label}: opsi jawaban tidak menunjuk gambar A-D`);
    }

    if (question.category === 'listening') {
      const utterances = (question.transcript ?? '').match(/[女男]：/g) ?? [];
      if (utterances.length < 2) fail(`${label}: transcript butuh >= 2 utterance`);
      if (!isText(question.audio_src)) fail(`${label}: audio_src kosong`);
      else audioPaths.add(question.audio_src);
      if (question.max_plays !== 2) fail(`${label}: max_plays harus 2`);
      if (!Array.isArray(question.audio_cast) || question.audio_cast.length < 2) {
        fail(`${label}: audio_cast butuh dua suara`);
      }
    }
  }

  for (const [category, expected] of Object.entries(EXPECTED)) {
    const actual = categories[category] ?? 0;
    if (actual !== expected) fail(`${tag}: ${category} = ${actual}, harus ${expected}`);
  }

  for (const passageId of passageIds) {
    const used = passageUse.get(passageId) ?? 0;
    if (used !== 3) fail(`${tag}: passage ${passageId} dipakai ${used}x, harus 3`);
  }

  for (let number = 1; number <= 70; number += 1) {
    if (!numbers.has(number)) fail(`${tag}: nomor ${number} hilang`);
  }
}

if (ids.size !== 350) fail(`Total id unik ${ids.size} != 350`);
if (prompts.size !== 350) fail(`Total prompt unik ${prompts.size} != 350`);
if (mcq !== 340) fail(`Total MCQ ${mcq} != 340`);
if (essays !== 10) fail(`Total esai ${essays} != 10`);
if (passages !== 25) fail(`Total passage ${passages} != 25`);
if (imagePaths.size !== 125) fail(`Total SVG ${imagePaths.size} != 125`);
if (audioPaths.size !== 50) fail(`Total MP3 ${audioPaths.size} != 50`);

const dom = new JSDOM();
let svgCount = 0;
let mp3Count = 0;
let bytes = 0;

for (const relative of imagePaths) {
    const absolute = join(publicDir, relative);
    if (!existsSync(absolute)) {
      fail(`Asset hilang: public/${relative}`);
      continue;
    }
    const size = statSync(absolute).size;
    bytes += size;
    if (size < 200) fail(`SVG terlalu kecil (${size} B): public/${relative}`);
    const content = readFileSync(absolute, 'utf8');
    if (!content.includes('<svg') || !content.includes('</svg>')) fail(`SVG tidak valid: public/${relative}`);
    const document = new dom.window.DOMParser().parseFromString(content, 'application/xml');
    const parserError = document.querySelector('parsererror');
    if (parserError) {
      fail(`SVG bukan XML valid (${parserError.textContent.trim().slice(0, 90)}): public/${relative}`);
    }
    const withoutNamespace = content.replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '');
    if (/https?:\/\//.test(withoutNamespace)) {
      warnings.push(`SVG memuat URL eksternal: public/${relative}`);
    }
    svgCount += 1;
}

for (const relative of audioPaths) {
  const absolute = join(publicDir, relative);
  if (!existsSync(absolute)) {
    fail(`Audio hilang: public/${relative}`);
    continue;
  }
  const size = statSync(absolute).size;
  bytes += size;
  if (size < 4000) fail(`MP3 terlalu kecil (${size} B): public/${relative}`);
  const header = readFileSync(absolute).subarray(0, 3);
  const isMp3 = (header[0] === 0x49 && header[1] === 0x44 && header[2] === 0x33) || (header[0] === 0xff && (header[1] & 0xe0) === 0xe0);
  if (!isMp3) fail(`File bukan MP3 valid: public/${relative}`);
  mp3Count += 1;
}

for (const dir of ['images', 'audio']) {
  const absolute = join(publicDir, dir);
  if (!existsSync(absolute)) fail(`Folder public/${dir} tidak ada`);
}

const extraDirs = existsSync(publicDir) ? readdirSync(publicDir) : [];

console.log('=== Validasi konten Simulasi JLPT N4 ===');
console.log(`Set: ${data.length} | Soal: ${ids.size} | MCQ: ${mcq} | Esai: ${essays} | Passage: ${passages}`);
console.log(`SVG terverifikasi: ${svgCount} | MP3 terverifikasi: ${mp3Count} | Total aset: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
console.log(`Folder public/: ${extraDirs.join(', ') || '(kosong)'}`);

if (warnings.length) {
  console.log('\nPeringatan:');
  for (const warning of warnings) console.log(` - ${warning}`);
}

if (errors.length) {
  console.error('\nGAGAL:');
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log('\nSemua pemeriksaan konten dan aset lolos.');