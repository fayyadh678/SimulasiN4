import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AssetImage } from '../components/AssetImage';
import { EssayEditor } from '../components/EssayEditor';
import { ExamTimer } from '../components/ExamTimer';
import { Layout } from '../components/Layout';
import { ListeningPlayer } from '../components/ListeningPlayer';
import { Modal } from '../components/Modal';
import { OptionList } from '../components/OptionList';
import { QuestionNav } from '../components/QuestionNav';
import { CATEGORY_LABEL, getPassage, getSimulationByNumber, isEssay, setNumber } from '../lib/data';
import { answeredCount, completeSession, readSession, recordPlay, setAnswer } from '../lib/sessionStore';
import type { Choice, Question, Session } from '../lib/types';

export function Exam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const set = getSimulationByNumber(id);
  const [session, setSession] = useState<Session | null>(null);
  const [index, setIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const submittedRef = useRef(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!set) return;
    const loaded = readSession(set.id);
    if (loaded.status === 'not_started') {
      navigate(`/simulasi/${setNumber(set)}`, { replace: true });
      return;
    }
    if (loaded.status === 'completed') {
      navigate(`/hasil/${setNumber(set)}`, { replace: true });
      return;
    }
    setSession(loaded);
  }, [set, navigate]);

  const finish = useCallback(
    (auto: boolean) => {
      if (!set || !session || submittedRef.current) return;
      submittedRef.current = true;
      completeSession(session, Date.now());
      navigate(`/hasil/${setNumber(set)}${auto ? '?auto=1' : ''}`, { replace: true });
    },
    [set, session, navigate],
  );

  const handleExpire = useCallback(() => {
    if (!session) return;
    finish(true);
  }, [session, finish]);

  useEffect(() => {
    if (session && session.deadlineAt !== null && Date.now() >= session.deadlineAt) {
      finish(true);
    }
  }, [session, finish]);

  useEffect(() => {
    mainRef.current?.focus();
  }, [index]);

  const questions = set?.questions ?? [];
  const current: Question | undefined = questions[index];
  const answered = useMemo(() => (set && session ? answeredCount(set, session) : 0), [set, session]);

  if (!set || !current || !session) {
    return (
      <Layout>
        <div className="card">
          <h1>Memuat ujian…</h1>
          <p className="lead">Jika halaman ini tidak berubah, kembali ke beranda dan pilih paket lagi.</p>
          <Link className="btn" to="/">
            Beranda
          </Link>
        </div>
      </Layout>
    );
  }

  const update = (next: Session) => setSession(next);

  const handleSelect = (value: Choice) => update(setAnswer(session, current.id, value));
  const handleEssay = (value: string) => update(setAnswer(session, current.id, value));

  const go = (nextIndex: number) => {
    const bounded = Math.min(Math.max(nextIndex, 0), questions.length - 1);
    setIndex(bounded);
    setShowNav(false);
  };

  const passage = getPassage(set, current);

  return (
    <Layout>
      <div className="exam-topbar">
        <div>
          <div className="small muted">{set.title}</div>
          <div className="question-index">
            {index + 1}/70 · {CATEGORY_LABEL[current.category]}
          </div>
        </div>
        <div className="btn-row">
          <span className="small muted">{answered} dijawab</span>
          <ExamTimer deadlineAt={session.deadlineAt} active={session.status === 'in_progress'} onExpire={handleExpire} />
        </div>
      </div>

      <div className="progress-track" style={{ margin: '0.75rem 0 1.25rem' }} aria-hidden="true">
        <span style={{ width: `${((index + 1) / 70) * 100}%` }} />
      </div>

      <div className="exam-layout">
        <div ref={mainRef} tabIndex={-1}>
          <article className="card">
            <div className="question-head">
              <span className="question-index">Soal {current.number}</span>
              <span className="pill">{CATEGORY_LABEL[current.category]}</span>
            </div>

            {current.category === 'reading' && passage && (
              <div className="passage">
                <h3>
                  <span className="ja" lang="ja">
                    {passage.title}
                  </span>
                </h3>
                <p className="ja" lang="ja" style={{ marginBottom: 0 }}>
                  {passage.body}
                </p>
              </div>
            )}

            {current.category === 'story_image' && current.asset && (
              <div className="story-panel-wrap">
                <AssetImage src={current.asset} alt={current.image_alt ?? 'Ilustrasi empat panel'} />
              </div>
            )}

            {current.category === 'listening' && current.audio_src && (
              <ListeningPlayer
                src={current.audio_src}
                maxPlays={current.max_plays ?? 2}
                used={session.playCount[current.id] ?? 0}
                onPlay={() => update(recordPlay(session, current.id, current.max_plays ?? 2))}
              />
            )}

            <p className="prompt ja" lang="ja">
              {current.prompt}
            </p>

            {isEssay(current) ? (
              <EssayEditor
                value={session.answers[current.id] ?? ''}
                maxCharacters={current.max_characters ?? 350}
                onChange={handleEssay}
              />
            ) : current.category === 'match_image' && current.image_options ? (
              <div className="image-grid" role="radiogroup" aria-label={`Pilihan gambar soal ${current.number}`}>
                {(['A', 'B', 'C', 'D'] as Choice[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={session.answers[current.id] === key}
                    aria-label={`Pilihan ${key}`}
                    className="image-choice"
                    onClick={() => handleSelect(key)}
                  >
                    <AssetImage src={current.image_options![key].src} alt={`Pilihan ${key}`} />
                    <span className="label">Gambar {key}</span>
                  </button>
                ))}
              </div>
            ) : (
              <OptionList question={current} selected={session.answers[current.id]} onSelect={handleSelect} />
            )}

            <div className="btn-row" style={{ marginTop: '1.5rem' }}>
              <button type="button" className="btn" onClick={() => go(index - 1)} disabled={index === 0}>
                ← Sebelumnya
              </button>
              <button
                type="button"
                className="btn mobile-only"
                onClick={() => setShowNav(true)}
              >
                Daftar Soal
              </button>
              <div className="spacer" />
              {index === questions.length - 1 ? (
                <button type="button" className="btn primary" onClick={() => setConfirmSubmit(true)}>
                  Selesaikan Ujian
                </button>
              ) : (
                <button type="button" className="btn primary" onClick={() => go(index + 1)}>
                  Berikutnya →
                </button>
              )}
            </div>
          </article>
        </div>

        <aside className="sidebar" aria-label="Navigasi soal">
          <h2>Daftar Soal</h2>
          <p className="small muted">{answered}/70 terjawab</p>
          <QuestionNav questions={questions} session={session} currentIndex={index} onJump={go} />
          <button
            type="button"
            className="btn primary"
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={() => setConfirmSubmit(true)}
          >
            Selesaikan Ujian
          </button>
          <p className="small muted" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
            Soal esai ditandai garis putus-putus.
          </p>
        </aside>
      </div>

      {showNav && (
        <div className="drawer" role="presentation" onClick={() => setShowNav(false)}>
          <div onClick={(event) => event.stopPropagation()} role="dialog" aria-label="Daftar soal">
            <div className="btn-row" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
              <strong>Daftar Soal</strong>
              <button type="button" className="btn small" onClick={() => setShowNav(false)}>
                Tutup
              </button>
            </div>
            <QuestionNav questions={questions} session={session} currentIndex={index} onJump={go} />
          </div>
        </div>
      )}

      <Modal open={confirmSubmit} title="Selesaikan ujian?" onClose={() => setConfirmSubmit(false)}>
        <p>
          Kamu sudah menjawab <strong>{answered}</strong> dari 70 soal. Masih ada{' '}
          <strong>{70 - answered}</strong> soal kosong.
        </p>
        <p className="small muted">
          Setelah dikumpulkan, jawaban tidak dapat diubah. Kunci jawaban dan pembahasan akan tersedia di halaman
          hasil/review.
        </p>
        <div className="btn-row">
          <button type="button" className="btn primary" onClick={() => finish(false)}>
            Ya, kumpulkan sekarang
          </button>
          <button type="button" className="btn" onClick={() => setConfirmSubmit(false)}>
            Periksa lagi
          </button>
        </div>
      </Modal>
    </Layout>
  );
}