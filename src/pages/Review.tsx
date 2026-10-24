import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AssetImage } from '../components/AssetImage';
import { Layout } from '../components/Layout';
import { publicAsset } from '../lib/publicAsset';
import { CATEGORY_LABEL, getPassage, getSimulationByNumber, setNumber } from '../lib/data';
import { resolveMatchImage } from '../lib/dataValidation';
import { gradeQuestion, essayCriteria } from '../lib/scoring';
import { readSession, saveEssayRubric } from '../lib/sessionStore';
import type { Choice, Outcome, Question, Session } from '../lib/types';

type Filter = 'all' | 'correct' | 'wrong' | 'empty' | 'essay';

const FILTER_LABEL: Record<Filter, string> = {
  all: 'Semua',
  correct: 'Benar',
  wrong: 'Salah',
  empty: 'Kosong',
  essay: 'Esai',
};

export function Review() {
  const { id } = useParams();
  const set = getSimulationByNumber(id);
  const [session, setSession] = useState<Session | null>(() => (set ? readSession(set.id) : null));
  const [filter, setFilter] = useState<Filter>('all');

  const rows = useMemo(() => {
    if (!set) return [];
    return set.questions.map((question) => ({
      question,
      outcome: gradeQuestion(question, session?.answers[question.id] as Choice | undefined) as Outcome,
    }));
  }, [set, session]);

  if (!set) {
    return (
      <Layout>
        <div className="card">
          <h1>Paket tidak ditemukan</h1>
          <Link className="btn primary" to="/">
            Beranda
          </Link>
        </div>
      </Layout>
    );
  }

  if (!session || session.status !== 'completed') {
    return <Navigate to={`/ujian/${setNumber(set)}`} replace />;
  }

  const visible = rows.filter(({ outcome }) => {
    if (filter === 'all') return true;
    if (filter === 'essay') return outcome === 'essay';
    return outcome === filter;
  });

  const handleRubric = (questionId: string, index: number, checked: boolean) => {
    const current = session.essayRubricSelections[questionId] ?? [];
    const next = [...current];
    next[index] = checked;
    setSession(saveEssayRubric(session, questionId, next));
  };

  const counts = {
    all: rows.length,
    correct: rows.filter((row) => row.outcome === 'correct').length,
    wrong: rows.filter((row) => row.outcome === 'wrong').length,
    empty: rows.filter((row) => row.outcome === 'empty').length,
    essay: rows.filter((row) => row.outcome === 'essay').length,
  };

  return (
    <Layout>
      <p className="eyebrow">Review • {set.title}</p>
      <h1>Pembahasan</h1>
      <p className="lead">
        Kunci jawaban, alasan, dan transcript sekarang terbuka karena paket ini sudah dikumpulkan.
      </p>

      <div className="filter-row" role="group" aria-label="Filter jawaban">
        {(Object.keys(FILTER_LABEL) as Filter[]).map((key) => (
          <button
            key={key}
            type="button"
            className="chip"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {FILTER_LABEL[key]} ({counts[key]})
          </button>
        ))}
      </div>

      {visible.length === 0 && <div className="notice">Tidak ada soal pada filter ini.</div>}

      <div className="stack">
        {visible.map(({ question, outcome }) => (
          <ReviewCard
            key={question.id}
            question={question}
            setTitle={set.title}
            passage={getPassage(set, question)}
            session={session}
            outcome={outcome}
            onRubric={handleRubric}
          />
        ))}
      </div>

      <div className="btn-row" style={{ marginTop: '1.5rem' }}>
        <Link className="btn primary" to={`/hasil/${setNumber(set)}`}>
          Kembali ke Hasil
        </Link>
        <Link className="btn ghost" to="/">
          Beranda
        </Link>
      </div>
    </Layout>
  );
}

interface CardProps {
  question: Question;
  setTitle: string;
  passage: ReturnType<typeof getPassage>;
  session: Session;
  outcome: Outcome;
  onRubric: (questionId: string, index: number, checked: boolean) => void;
}

function ReviewCard({ question, passage, session, outcome, onRubric }: CardProps) {
  const userAnswer = session.answers[question.id];
  const badgeClass =
    outcome === 'correct'
      ? 'status-completed'
      : outcome === 'wrong'
        ? 'wrong'
        : outcome === 'essay'
          ? 'status-in_progress'
          : 'empty';
  const badgeText =
    outcome === 'correct' ? 'Benar' : outcome === 'wrong' ? 'Salah' : outcome === 'essay' ? 'Esai' : 'Kosong';
  const criteria = essayCriteria(question);
  const matchSrc = question.category === 'match_image' ? resolveMatchImage(question) : null;

  return (
    <article className="review-card">
      <div className="head">
        <strong>Soal {question.number}</strong>
        <span className="pill">{CATEGORY_LABEL[question.category]}</span>
        <span className={`pill ${badgeClass}`}>{badgeText}</span>
      </div>

      {passage && (
        <div className="passage">
          <h3 className="ja" lang="ja">
            {passage.title}
          </h3>
          <p className="ja" lang="ja" style={{ marginBottom: 0 }}>
            {passage.body}
          </p>
        </div>
      )}

      {question.category === 'story_image' && question.asset && (
        <div className="story-panel-wrap">
          <AssetImage src={question.asset} alt={question.image_alt ?? 'Ilustrasi empat panel'} />
        </div>
      )}

      {question.category === 'listening' && question.audio_src && (
        <div className="audio-box">
          <audio controls src={publicAsset(question.audio_src)} preload="metadata" style={{ width: '100%' }}>
            <track kind="captions" />
          </audio>
        </div>
      )}

      <p className="ja" lang="ja">
        {question.prompt}
      </p>

      {question.kind === 'essay' ? (
        <>
          <div className="answer-lines">
            <div>
              <span className="muted small">Jawabanmu:</span>
              <p className="ja" lang="ja" style={{ marginBottom: 0 }}>
                {(userAnswer ?? '').trim() || '—'}
              </p>
            </div>
            <div>
              <span className="muted small">Contoh jawaban (bukan satu-satunya):</span>
              <p className="ja" lang="ja" style={{ marginBottom: 0 }}>
                {question.sample_answer}
              </p>
            </div>
          </div>
          <div>
            <p className="small muted">Rubrik empat kriteria @0,25:</p>
            {criteria.map((criterion, index) => (
              <div className="rubric-item" key={criterion}>
                <input
                  id={`review-${question.id}-${index}`}
                  type="checkbox"
                  checked={session.essayRubricSelections[question.id]?.[index] === true}
                  onChange={(event) => onRubric(question.id, index, event.target.checked)}
                  disabled={(userAnswer ?? '').trim().length === 0}
                />
                <label htmlFor={`review-${question.id}-${index}`}>{criterion}</label>
              </div>
            ))}
            {(userAnswer ?? '').trim().length === 0 && (
              <p className="small muted">Esai kosong otomatis bernilai 0.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <ul className="option-list">
            {(['A', 'B', 'C', 'D'] as Choice[]).map((key) => {
              const isAnswer = question.answer === key;
              const isChosen = userAnswer === key;
              const isWrongChoice = isChosen && !isAnswer;
              return (
                <li
                  key={key}
                  className={`option${isAnswer ? ' correct' : ''}${isWrongChoice ? ' selected-wrong' : ''}`}
                  aria-label={`Pilihan ${key}${isAnswer ? ', jawaban benar' : ''}`}
                >
                  <span className="key" aria-hidden="true">
                    {key}
                  </span>
                  <span className="ja">{question.options?.[key]}</span>
                </li>
              );
            })}
          </ul>
          <div className="answer-lines">
            <div>
              <span className="muted small">Jawabanmu: </span>
              {userAnswer ? `${userAnswer}. ${question.options?.[userAnswer as Choice]}` : '—'}
            </div>
            <div>
              <span className="muted small">Kunci: </span>
              {question.answer}. {question.options?.[question.answer as Choice]}
            </div>
            {matchSrc && (
              <div>
                <span className="muted small">Gambar sesuai pernyataan: </span>
                <div style={{ maxWidth: 320, marginTop: '0.4rem' }}>
                  <AssetImage src={matchSrc} alt="Gambar yang sesuai dengan pernyataan" />
                </div>
              </div>
            )}
            <div>
              <span className="muted small">Alasan: </span>
              {question.explanation}
            </div>
          </div>
        </>
      )}

      {question.category === 'listening' && question.transcript && (
        <div>
          <p className="small muted" style={{ marginBottom: '0.35rem' }}>
            Transcript:
          </p>
          <div className="transcript ja" lang="ja">
            {question.transcript}
          </div>
        </div>
      )}
    </article>
  );
}