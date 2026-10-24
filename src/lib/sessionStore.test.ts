import { beforeEach, describe, expect, it } from 'vitest';
import {
  answeredCount,
  clearAnswer,
  completeSession,
  emptySession,
  readSession,
  recordPlay,
  remainingMs,
  resetSession,
  saveEssayRubric,
  setAnswer,
  startSession,
  storageKey,
  writeSession,
} from './sessionStore';
import { EXAM_DURATION_MS } from './scoring';
import rawData from '../data/simulations.json';
import type { SimulationSet } from './types';

const data = rawData as unknown as SimulationSet[];
const setA = data[0];
const setB = data[3];

beforeEach(() => {
  window.localStorage.clear();
});

describe('sessionStore', () => {
  it('memakai key terpisah untuk setiap set', () => {
    expect(storageKey('n4-1')).not.toBe(storageKey('n4-4'));
    expect(storageKey('n4-4')).toBe('n4:simulasi:v3:n4-4:session');
  });

  it('tidak memulai timer sebelum startSession dipanggil', () => {
    const session = readSession(setA.id);
    expect(session.status).toBe('not_started');
    expect(session.deadlineAt).toBeNull();
  });

  it('menyimpan deadline absolut 115 menit', () => {
    const now = 1_700_000_000_000;
    const session = startSession(setA.id, now, EXAM_DURATION_MS);
    expect(session.deadlineAt).toBe(now + 115 * 60 * 1000);
    expect(readSession(setA.id).deadlineAt).toBe(session.deadlineAt);
  });

  it('tidak mereset timer setelah refresh', () => {
    const now = 1_700_000_000_000;
    startSession(setA.id, now, EXAM_DURATION_MS);
    const reloaded = readSession(setA.id);
    expect(reloaded.deadlineAt).toBe(now + EXAM_DURATION_MS);
    expect(remainingMs(reloaded, now + 1000)).toBe(EXAM_DURATION_MS - 1000);
  });

  it('mengisolasi set 4 dari set lain', () => {
    const now = 1_700_000_000_000;
    startSession(setB.id, now, EXAM_DURATION_MS);
    setAnswer(readSession(setB.id), setB.questions[0].id, 'A');
    const other = readSession(setA.id);
    expect(other.status).toBe('not_started');
    expect(other.answers).toEqual({});
    expect(answeredCount(setA, other)).toBe(0);
    expect(answeredCount(setB, readSession(setB.id))).toBe(1);
  });

  it('membekukan jawaban setelah selesai', () => {
    const now = 1_700_000_000_000;
    startSession(setA.id, now, EXAM_DURATION_MS);
    setAnswer(readSession(setA.id), setA.questions[0].id, 'B');
    completeSession(readSession(setA.id), now + 5000);
    const completed = readSession(setA.id);
    expect(completed.status).toBe('completed');
    const after = setAnswer(completed, setA.questions[1].id, 'C');
    expect(after.answers[setA.questions[1].id]).toBeUndefined();
  });

  it('membatasi pemutaran audio sesuai max_plays', () => {
    startSession(setA.id, Date.now(), EXAM_DURATION_MS);
    let session = readSession(setA.id);
    session = recordPlay(session, 'S1-Q61', 2);
    session = recordPlay(session, 'S1-Q61', 2);
    session = recordPlay(session, 'S1-Q61', 2);
    expect(session.playCount['S1-Q61']).toBe(2);
  });

  it('menghapus jawaban dan menyimpan rubrik esai', () => {
    const now = Date.now();
    startSession(setA.id, now, EXAM_DURATION_MS);
    const questionId = setA.questions[0].id;
    setAnswer(readSession(setA.id), questionId, 'A');
    clearAnswer(readSession(setA.id), questionId);
    expect(readSession(setA.id).answers[questionId]).toBeUndefined();

    const essay = setA.questions.find((question) => question.kind === 'essay')!;
    completeSession(readSession(setA.id), now + 1000);
    const saved = saveEssayRubric(readSession(setA.id), essay.id, [true, false, true, false]);
    expect(saved.essayRubricSelections[essay.id]).toEqual([true, false, true, false]);
  });

  it('mengabaikan data localStorage yang rusak', () => {
    window.localStorage.setItem(storageKey(setA.id), '{bukan json');
    expect(readSession(setA.id).status).toBe('not_started');
    window.localStorage.setItem(storageKey(setA.id), JSON.stringify({ schemaVersion: 99 }));
    expect(readSession(setA.id).status).toBe('not_started');
  });

  it('reset hanya menghapus set yang dipilih', () => {
    const now = Date.now();
    startSession(setA.id, now, EXAM_DURATION_MS);
    startSession(setB.id, now, EXAM_DURATION_MS);
    resetSession(setA.id);
    expect(readSession(setA.id).status).toBe('not_started');
    expect(readSession(setB.id).status).toBe('in_progress');
  });

  it('menulis sesi valid yang bisa dibaca ulang', () => {
    const session = { ...emptySession(setA.id), status: 'in_progress' as const };
    writeSession(session);
    expect(readSession(setA.id).status).toBe('in_progress');
  });
});