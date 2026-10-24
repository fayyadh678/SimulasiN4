import type { Session, SimulationSet } from './types';

const STORAGE_PREFIX = 'n4:simulasi:v3';
const SCHEMA_VERSION = 1;

export function storageKey(setId: string): string {
  return `${STORAGE_PREFIX}:${setId}:session`;
}

export function emptySession(setId: string): Session {
  return {
    schemaVersion: SCHEMA_VERSION,
    setId,
    status: 'not_started',
    answers: {},
    playCount: {},
    startedAt: null,
    deadlineAt: null,
    completedAt: null,
    essayRubricSelections: {},
  };
}

function isSession(value: unknown, setId: string): value is Session {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.schemaVersion === SCHEMA_VERSION &&
    candidate.setId === setId &&
    (candidate.status === 'not_started' ||
      candidate.status === 'in_progress' ||
      candidate.status === 'completed') &&
    typeof candidate.answers === 'object' &&
    candidate.answers !== null &&
    typeof candidate.playCount === 'object' &&
    candidate.playCount !== null &&
    (candidate.startedAt === null || typeof candidate.startedAt === 'number') &&
    (candidate.deadlineAt === null || typeof candidate.deadlineAt === 'number') &&
    (candidate.completedAt === null || typeof candidate.completedAt === 'number') &&
    typeof candidate.essayRubricSelections === 'object' &&
    candidate.essayRubricSelections !== null
  );
}

export function readSession(setId: string): Session {
  try {
    const raw = window.localStorage.getItem(storageKey(setId));
    if (!raw) return emptySession(setId);
    const parsed: unknown = JSON.parse(raw);
    return isSession(parsed, setId) ? parsed : emptySession(setId);
  } catch {
    return emptySession(setId);
  }
}

export function writeSession(session: Session): void {
  window.localStorage.setItem(storageKey(session.setId), JSON.stringify(session));
}

export function resetSession(setId: string): Session {
  const fresh = emptySession(setId);
  writeSession(fresh);
  return fresh;
}

export function startSession(setId: string, now: number, durationMs: number): Session {
  const current = readSession(setId);
  const session: Session = {
    ...current,
    status: 'in_progress',
    startedAt: now,
    deadlineAt: now + durationMs,
    completedAt: null,
  };
  writeSession(session);
  return session;
}

export function setAnswer(session: Session, questionId: string, value: string): Session {
  if (session.status === 'completed') return session;
  const next: Session = {
    ...session,
    answers: { ...session.answers, [questionId]: value },
  };
  writeSession(next);
  return next;
}

export function clearAnswer(session: Session, questionId: string): Session {
  if (session.status === 'completed') return session;
  const answers = { ...session.answers };
  delete answers[questionId];
  const next = { ...session, answers };
  writeSession(next);
  return next;
}

export function recordPlay(session: Session, questionId: string, maxPlays: number): Session {
  const used = session.playCount[questionId] ?? 0;
  if (used >= maxPlays) return session;
  const next: Session = {
    ...session,
    playCount: { ...session.playCount, [questionId]: used + 1 },
  };
  writeSession(next);
  return next;
}

export function completeSession(session: Session, now: number): Session {
  if (session.status === 'completed') return session;
  const next: Session = { ...session, status: 'completed', completedAt: now };
  writeSession(next);
  return next;
}

export function saveEssayRubric(session: Session, questionId: string, selected: boolean[]): Session {
  if (session.status !== 'completed') return session;
  const next: Session = {
    ...session,
    essayRubricSelections: { ...session.essayRubricSelections, [questionId]: selected },
  };
  writeSession(next);
  return next;
}

export function answeredCount(set: SimulationSet, session: Session): number {
  return set.questions.filter((question) => (session.answers[question.id] ?? '').trim().length > 0).length;
}

export function remainingMs(session: Session, now: number): number {
  if (session.status === 'completed') return 0;
  if (session.deadlineAt === null) return 0;
  return Math.max(0, session.deadlineAt - now);
}