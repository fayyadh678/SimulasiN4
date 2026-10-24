export type Category =
  | 'vocabulary'
  | 'grammar'
  | 'reading'
  | 'story_image'
  | 'match_image'
  | 'listening';

export type Kind = 'mcq' | 'essay';
export type Choice = 'A' | 'B' | 'C' | 'D';

export interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface ImageOption {
  scene: string;
  src: string;
}

export interface Question {
  id: string;
  number: number;
  category: Category;
  kind: Kind;
  prompt: string;
  title?: string;
  options?: Options;
  answer?: Choice;
  explanation?: string;
  passage_id?: string;
  sample_answer?: string;
  rubric?: string;
  points?: number;
  max_characters?: number;
  panels?: string[];
  asset?: string;
  image_alt?: string;
  image_instructions?: string;
  image_options?: Record<Choice, ImageOption>;
  transcript?: string;
  audio_src?: string;
  voice_locale?: string;
  audio_cast?: string[];
  max_plays?: number;
}

export interface Passage {
  id: string;
  title: string;
  body: string;
}

export interface SimulationSet {
  id: string;
  title: string;
  version: string;
  questions: Question[];
  passages: Passage[];
}

export type ExamStatus = 'not_started' | 'in_progress' | 'completed';

export interface Session {
  schemaVersion: 1;
  setId: string;
  status: ExamStatus;
  answers: Record<string, string>;
  playCount: Record<string, number>;
  startedAt: number | null;
  deadlineAt: number | null;
  completedAt: number | null;
  essayRubricSelections: Record<string, boolean[]>;
}

export type Outcome = 'correct' | 'wrong' | 'empty' | 'essay';