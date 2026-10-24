import { describe, expect, it } from 'vitest';
import rawData from '../data/simulations.json';
import type { SimulationSet } from '../lib/types';
import { assetPaths, resolveMatchImage, validateSimulations } from '../lib/dataValidation';

const data = rawData as unknown as SimulationSet[];

describe('dataset 350 soal', () => {
  it('lolos semua aturan validasi konten', () => {
    const result = validateSimulations(data);
    expect(result.errors).toEqual([]);
  });

  it('memiliki statistik yang dijanjikan', () => {
    const { stats } = validateSimulations(data);
    expect(stats).toMatchObject({
      sets: 5,
      questions: 350,
      mcq: 340,
      essays: 10,
      passages: 25,
      storyAssets: 25,
      matchAssets: 100,
      audioAssets: 50,
    });
  });

  it('menyediakan 125 path gambar dan 50 path audio unik', () => {
    const { images, audio } = assetPaths(data);
    expect(new Set(images).size).toBe(125);
    expect(new Set(audio).size).toBe(50);
  });

  it('menolak set dengan jumlah soal salah', () => {
    const broken = structuredClone(data) as SimulationSet[];
    broken[0].questions.pop();
    const result = validateSimulations(broken);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('menolak duplikasi prompt lintas set', () => {
    const broken = structuredClone(data) as SimulationSet[];
    broken[1].questions[0].prompt = broken[0].questions[0].prompt;
    const result = validateSimulations(broken);
    expect(result.errors.some((error) => error.includes('duplikat'))).toBe(true);
  });
});

describe('resolveMatchImage', () => {
  it('mengubah label opsi menjadi gambar yang benar untuk setiap soal matching', () => {
    for (const set of data) {
      for (const question of set.questions.filter((item) => item.category === 'match_image')) {
        const src = resolveMatchImage(question);
        expect(src, question.id).not.toBeNull();
        const labelLetter = question.options?.[question.answer as 'A' | 'B' | 'C' | 'D']?.match(/[A-D]/)?.[0];
        expect(src).toBe(question.image_options?.[labelLetter as 'A' | 'B' | 'C' | 'D']?.src);
      }
    }
  });
});