import { describe, expect, it } from 'vitest';
import rawData from '../data/simulations.json';
import type { SimulationSet } from './types';
import { computeScore, gradeQuestion, scoreEssay } from './scoring';
import { emptySession } from './sessionStore';
import { rubricCriteria } from './data';

const data = rawData as unknown as SimulationSet[];
const set = data[0];

describe('gradeQuestion', () => {
  it('menilai MCQ benar, salah, dan kosong', () => {
    const question = set.questions[0];
    expect(gradeQuestion(question, question.answer)).toBe('correct');
    const wrong = (['A', 'B', 'C', 'D'] as const).find((key) => key !== question.answer);
    expect(gradeQuestion(question, wrong)).toBe('wrong');
    expect(gradeQuestion(question, undefined)).toBe('empty');
  });

  it('tidak menilai esai sebagai pilihan ganda', () => {
    const essay = set.questions.find((question) => question.kind === 'essay')!;
    expect(gradeQuestion(essay, 'A')).toBe('essay');
  });
});

describe('scoreEssay', () => {
  const essay = set.questions.find((question) => question.kind === 'essay')!;

  it('memberi 0 untuk esai kosong', () => {
    const session = emptySession(set.id);
    expect(scoreEssay(essay, session).status).toBe('empty');
    expect(scoreEssay(essay, session).score).toBe(0);
  });

  it('menandai pending jika rubrik belum lengkap', () => {
    const session = emptySession(set.id);
    session.answers[essay.id] = 'ごめんなさい。明日は行けません。';
    expect(scoreEssay(essay, session).status).toBe('pending');
  });

  it('menghitung 0,25 per kriteria terpenuhi', () => {
    const criteria = rubricCriteria(essay.rubric);
    expect(criteria).toHaveLength(4);
    const session = emptySession(set.id);
    session.answers[essay.id] = 'ごめんなさい。明日は行けません。';
    session.essayRubricSelections[essay.id] = [true, true, false, true];
    const result = scoreEssay(essay, session);
    expect(result.status).toBe('graded');
    expect(result.score).toBe(0.75);
  });
});

describe('computeScore', () => {
  it('memberi skor objektif 68 dan sementara tanpa esai', () => {
    const session = emptySession(set.id);
    for (const question of set.questions.filter((item) => item.kind === 'mcq')) {
      session.answers[question.id] = question.answer!;
    }
    const report = computeScore(set, session);
    expect(report.objectiveCorrect).toBe(68);
    expect(report.objectiveTotal).toBe(68);
    expect(report.essayPoints).toBe(0);
    expect(report.provisional).toBe(false);
    expect(report.total).toBe(68);
    expect(report.percentage).toBe(97.1);
  });

  it('menampilkan skor sementara ketika esai terisi belum dinilai', () => {
    const session = emptySession(set.id);
    const essay = set.questions.find((question) => question.kind === 'essay')!;
    session.answers[essay.id] = 'テスト';
    const report = computeScore(set, session);
    expect(report.provisional).toBe(true);
    expect(report.essaysPending).toBe(1);
    expect(report.total).toBe(0);
  });

  it('menghitung skor penuh 70 ketika semua benar dan esai dinilai penuh', () => {
    const session = emptySession(set.id);
    for (const question of set.questions) {
      if (question.kind === 'mcq') session.answers[question.id] = question.answer!;
      else {
        session.answers[question.id] = '答え';
        session.essayRubricSelections[question.id] = [true, true, true, true];
      }
    }
    const report = computeScore(set, session);
    expect(report.provisional).toBe(false);
    expect(report.total).toBe(70);
    expect(report.percentage).toBe(100);
    expect(report.objectiveWrong).toBe(0);
    expect(report.objectiveEmpty).toBe(0);
  });

  it('tidak mengubah set lain karena sesi disimpan terpisah', () => {
    const session = emptySession(data[3].id);
    const report = computeScore(data[3], session);
    expect(report.objectiveCorrect).toBe(0);
    expect(report.objectiveEmpty).toBe(68);
    expect(report.sections.every((section) => section.total > 0)).toBe(true);
  });
});