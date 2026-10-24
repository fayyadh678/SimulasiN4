import type { Category, Question, SimulationSet } from './types';

const EXPECTED_CATEGORIES: Record<Category, number> = {
  vocabulary: 20,
  grammar: 15,
  reading: 15,
  story_image: 5,
  match_image: 5,
  listening: 10,
};

const CHOICES = ['A', 'B', 'C', 'D'] as const;

export interface ValidationResult {
  errors: string[];
  stats: {
    sets: number;
    questions: number;
    mcq: number;
    essays: number;
    passages: number;
    storyAssets: number;
    matchAssets: number;
    audioAssets: number;
  };
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateSimulations(data: SimulationSet[]): ValidationResult {
  const errors: string[] = [];
  const ids = new Set<string>();
  const prompts = new Set<string>();
  const assets = new Set<string>();

  let mcq = 0;
  let essays = 0;
  let passages = 0;
  let storyAssets = 0;
  let matchAssets = 0;
  let audioAssets = 0;

  if (!Array.isArray(data) || data.length !== 5) {
    errors.push(`Dataset harus berisi tepat 5 set, ditemukan ${data?.length ?? 0}`);
  }

  for (const set of data) {
    const label = set.id ?? '(tanpa id)';
    if (!isNonEmpty(set.id) || !isNonEmpty(set.title) || !isNonEmpty(set.version)) {
      errors.push(`${label}: id/title/version wajib diisi`);
    }
    if (!Array.isArray(set.questions) || set.questions.length !== 70) {
      errors.push(`${label}: jumlah soal harus 70, ditemukan ${set.questions?.length ?? 0}`);
    }
    if (!Array.isArray(set.passages) || set.passages.length !== 5) {
      errors.push(`${label}: jumlah passage harus 5, ditemukan ${set.passages?.length ?? 0}`);
    }
    passages += set.passages?.length ?? 0;

    const passageIds = new Set((set.passages ?? []).map((passage) => passage.id));
    const passageUsage = new Map<string, number>();
    const categories: Record<string, number> = {};
    const numbers = new Set<number>();

    for (const question of set.questions ?? []) {
      const qlabel = `${label}/${question.id ?? '(tanpa id)'}`;
      if (!isNonEmpty(question.id) || ids.has(question.id)) {
        errors.push(`${qlabel}: id duplikat atau kosong`);
      } else {
        ids.add(question.id);
      }
      if (!isNonEmpty(question.prompt) || prompts.has(question.prompt.trim())) {
        errors.push(`${qlabel}: prompt kosong atau duplikat lintas 350 soal`);
      } else {
        prompts.add(question.prompt.trim());
      }
      if (typeof question.number !== 'number' || question.number < 1 || question.number > 70) {
        errors.push(`${qlabel}: number harus 1..70`);
      } else if (numbers.has(question.number)) {
        errors.push(`${qlabel}: number ${question.number} duplikat dalam set`);
      } else {
        numbers.add(question.number);
      }

      categories[question.category] = (categories[question.category] ?? 0) + 1;

      if (question.kind === 'essay') {
        essays += 1;
        if (!isNonEmpty(question.sample_answer)) errors.push(`${qlabel}: essay tanpa sample_answer`);
        if (!isNonEmpty(question.rubric)) errors.push(`${qlabel}: essay tanpa rubric`);
        if (!isNonEmpty(question.max_characters ? String(question.max_characters) : '')) {
          errors.push(`${qlabel}: essay tanpa max_characters`);
        }
        if (question.options) errors.push(`${qlabel}: essay tidak boleh punya options A-D`);
      } else {
        mcq += 1;
        const options = question.options;
        if (!options) {
          errors.push(`${qlabel}: MCQ tanpa options`);
        } else {
          const values = CHOICES.map((choice) => options[choice]);
          if (values.some((value) => !isNonEmpty(value))) {
            errors.push(`${qlabel}: opsi A-D harus terisi`);
          }
          if (new Set(values).size !== 4) {
            errors.push(`${qlabel}: opsi A-D harus berbeda`);
          }
        }
        if (!question.answer || !CHOICES.includes(question.answer)) {
          errors.push(`${qlabel}: answer harus A-D`);
        }
        if (!isNonEmpty(question.explanation)) errors.push(`${qlabel}: MCQ tanpa explanation`);
      }

      if (question.category === 'reading') {
        if (!question.passage_id || !passageIds.has(question.passage_id)) {
          errors.push(`${qlabel}: passage_id tidak ditemukan`);
        } else {
          passageUsage.set(question.passage_id, (passageUsage.get(question.passage_id) ?? 0) + 1);
        }
      }

      if (question.category === 'story_image') {
        if (!question.panels || question.panels.length !== 4) {
          errors.push(`${qlabel}: story_image harus punya 4 panel`);
        }
        if (!isNonEmpty(question.asset)) {
          errors.push(`${qlabel}: story_image tanpa asset`);
        } else {
          storyAssets += 1;
          assets.add(question.asset);
        }
      }

      if (question.category === 'match_image') {
        const options = question.image_options;
        if (!options) {
          errors.push(`${qlabel}: match_image tanpa image_options`);
        } else {
          for (const choice of CHOICES) {
            const entry = options[choice];
            if (!entry || !isNonEmpty(entry.scene) || !isNonEmpty(entry.src)) {
              errors.push(`${qlabel}: image_options ${choice} tidak lengkap`);
            } else {
              matchAssets += 1;
              assets.add(entry.src);
            }
          }
        }
      }

      if (question.category === 'listening') {
        if (!isNonEmpty(question.transcript) || (question.transcript.match(/[女男]：/g) ?? []).length < 2) {
          errors.push(`${qlabel}: transcript listening butuh minimal dua utterance 女：/男：`);
        }
        if (!isNonEmpty(question.audio_src)) {
          errors.push(`${qlabel}: listening tanpa audio_src`);
        } else {
          audioAssets += 1;
          assets.add(question.audio_src);
        }
        if (question.max_plays !== 2) errors.push(`${qlabel}: max_plays harus 2`);
      }
    }

    for (const [category, expected] of Object.entries(EXPECTED_CATEGORIES) as [Category, number][]) {
      const actual = categories[category] ?? 0;
      if (actual !== expected) {
        errors.push(`${label}: kategori ${category} harus ${expected}, ditemukan ${actual}`);
      }
    }

    for (const passageId of passageIds) {
      const used = passageUsage.get(passageId) ?? 0;
      if (used !== 3) errors.push(`${label}: passage ${passageId} dipakai ${used} soal, harus 3`);
    }

    for (const number of Array.from({ length: 70 }, (_, index) => index + 1)) {
      if (!numbers.has(number)) errors.push(`${label}: nomor soal ${number} hilang`);
    }
  }

  if (ids.size !== 350) errors.push(`Total id unik harus 350, ditemukan ${ids.size}`);
  if (mcq !== 340) errors.push(`Total MCQ harus 340, ditemukan ${mcq}`);
  if (essays !== 10) errors.push(`Total esai harus 10, ditemukan ${essays}`);
  if (passages !== 25) errors.push(`Total passage harus 25, ditemukan ${passages}`);
  if (storyAssets !== 25) errors.push(`Story SVG harus 25, ditemukan ${storyAssets}`);
  if (matchAssets !== 100) errors.push(`Match SVG harus 100, ditemukan ${matchAssets}`);
  if (audioAssets !== 50) errors.push(`Audio MP3 harus 50, ditemukan ${audioAssets}`);

  return {
    errors,
    stats: {
      sets: data.length,
      questions: data.reduce((sum, set) => sum + (set.questions?.length ?? 0), 0),
      mcq,
      essays,
      passages,
      storyAssets,
      matchAssets,
      audioAssets,
    },
  };
}

export function assetPaths(data: SimulationSet[]): { images: string[]; audio: string[] } {
  const images: string[] = [];
  const audio: string[] = [];
  for (const set of data) {
    for (const question of set.questions) {
      if (question.category === 'story_image' && question.asset) images.push(question.asset);
      if (question.category === 'match_image' && question.image_options) {
        for (const choice of CHOICES) images.push(question.image_options[choice].src);
      }
      if (question.category === 'listening' && question.audio_src) audio.push(question.audio_src);
    }
  }
  return { images, audio };
}

export function resolveMatchImage(question: Question): string | null {
  if (!question.options || !question.answer || !question.image_options) return null;
  const label = question.options[question.answer];
  const match = label?.match(/([A-D])/);
  if (!match) return null;
  return question.image_options[match[1] as 'A' | 'B' | 'C' | 'D']?.src ?? null;
}