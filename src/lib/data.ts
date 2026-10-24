import rawData from '../data/simulations.json';
import type { Category, Passage, Question, SimulationSet } from './types';

const data = rawData as unknown as SimulationSet[];

export const simulations: SimulationSet[] = data;

export const CATEGORY_LABEL: Record<Category, string> = {
  vocabulary: 'Kosakata dan Kanji',
  grammar: 'Grammar',
  reading: 'Reading',
  story_image: 'Cerita Bergambar',
  match_image: 'Mencocokkan Gambar',
  listening: 'Listening',
};

export const CATEGORY_SHORT: Record<Category, string> = {
  vocabulary: 'Kosakata',
  grammar: 'Grammar',
  reading: 'Reading',
  story_image: 'Cerita gambar',
  match_image: 'Cocok gambar',
  listening: 'Listening',
};

export function getSimulation(setId: string | undefined): SimulationSet | undefined {
  return simulations.find((set) => set.id === setId);
}

export function getSimulationByNumber(value: string | number | undefined): SimulationSet | undefined {
  const normalised = String(value ?? '').trim();
  return simulations.find((set) => set.id === `n4-${normalised}`);
}

export function getPassage(set: SimulationSet, question: Question): Passage | undefined {
  if (!question.passage_id) return undefined;
  return set.passages.find((passage) => passage.id === question.passage_id);
}

export function isEssay(question: Question): boolean {
  return question.kind === 'essay';
}

export function isMcq(question: Question): boolean {
  return question.kind === 'mcq';
}

export function setNumber(set: SimulationSet): string {
  return set.id.replace('n4-', '');
}

export function rubricCriteria(rubric: string | undefined): string[] {
  if (!rubric) return [];
  return rubric
    .split(/,\s*(?=[A-Za-z])/)
    .map((item) => item.trim())
    .filter(Boolean);
}