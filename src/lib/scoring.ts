import type { Category, Choice, Outcome, Question, Session, SimulationSet } from './types';
import { rubricCriteria } from './data';

export const MCQ_TOTAL = 68;
export const EXAM_TOTAL = 70;
export const ESSAY_TOTAL = 2;
export const EXAM_DURATION_MS = 115 * 60 * 1000;

export interface EssayScore {
  questionId: string;
  status: 'empty' | 'pending' | 'graded';
  score: number;
  selected: boolean[];
  criteria: string[];
}

export interface CategoryScore {
  category: Category;
  correct: number;
  total: number;
  pendingEssays: number;
}

export interface ScoreReport {
  objectiveCorrect: number;
  objectiveWrong: number;
  objectiveEmpty: number;
  objectiveTotal: number;
  essays: EssayScore[];
  essaysPending: number;
  essayPoints: number;
  provisional: boolean;
  total: number;
  totalMax: number;
  percentage: number;
  sections: CategoryScore[];
}

export function gradeQuestion(question: Question, answer: string | undefined): Outcome {
  if (question.kind === 'essay') return 'essay';
  if (!answer) return 'empty';
  return answer === question.answer ? 'correct' : 'wrong';
}

export function essayCriteria(question: Question): string[] {
  return rubricCriteria(question.rubric);
}

export function scoreEssay(question: Question, session: Session): EssayScore {
  const raw = (session.answers[question.id] ?? '').trim();
  const criteria = essayCriteria(question);
  const selected = session.essayRubricSelections[question.id] ?? [];
  const normalised = criteria.map((_, index) => selected[index] === true);

  if (raw.length === 0) {
    return { questionId: question.id, status: 'empty', score: 0, selected: normalised, criteria };
  }
  if (criteria.length === 0 || selected.length < criteria.length) {
    return { questionId: question.id, status: 'pending', score: 0, selected: normalised, criteria };
  }
  const maxPoints = question.points ?? 1;
  const hit = normalised.filter(Boolean).length;
  const score = Number(((hit / criteria.length) * maxPoints).toFixed(2));
  return { questionId: question.id, status: 'graded', score, selected: normalised, criteria };
}

export function computeScore(set: SimulationSet, session: Session): ScoreReport {
  const mcqs = set.questions.filter((question) => question.kind === 'mcq');
  const essays = set.questions.filter((question) => question.kind === 'essay');

  let objectiveCorrect = 0;
  let objectiveWrong = 0;
  let objectiveEmpty = 0;

  const sections = new Map<Category, CategoryScore>();
  const essayByQuestion = new Map<string, EssayScore>();

  for (const question of set.questions) {
    const bucket = sections.get(question.category) ?? {
      category: question.category,
      correct: 0,
      total: 0,
      pendingEssays: 0,
    };
    bucket.total += 1;
    sections.set(question.category, bucket);

    if (question.kind === 'essay') {
      const essay = scoreEssay(question, session);
      essayByQuestion.set(question.id, essay);
      if (essay.status === 'pending') bucket.pendingEssays += 1;
      continue;
    }

    const outcome = gradeQuestion(question, session.answers[question.id] as Choice | undefined);
    if (outcome === 'correct') {
      objectiveCorrect += 1;
      bucket.correct += 1;
    } else if (outcome === 'wrong') {
      objectiveWrong += 1;
    } else {
      objectiveEmpty += 1;
    }
  }

  const essayScores = essays.map(
    (question) =>
      essayByQuestion.get(question.id) ?? {
        questionId: question.id,
        status: 'empty' as const,
        score: 0,
        selected: [],
        criteria: essayCriteria(question),
      },
  );
  const essaysPending = essayScores.filter((essay) => essay.status === 'pending').length;
  const essayPoints = Number(essayScores.reduce((sum, essay) => sum + essay.score, 0).toFixed(2));
  const provisional = essaysPending > 0;
  const total = Number((objectiveCorrect + essayPoints).toFixed(2));
  const percentage = Math.round((total / EXAM_TOTAL) * 1000) / 10;

  return {
    objectiveCorrect,
    objectiveWrong,
    objectiveEmpty,
    objectiveTotal: mcqs.length,
    essays: essayScores,
    essaysPending,
    essayPoints,
    provisional,
    total,
    totalMax: EXAM_TOTAL,
    percentage,
    sections: [...sections.values()],
  };
}

export function sectionSummary(section: CategoryScore): string {
  if (section.pendingEssays > 0) {
    return `${section.correct}/${section.total - section.pendingEssays} + ${section.pendingEssays} esai pending`;
  }
  return `${section.correct}/${section.total}`;
}