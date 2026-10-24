import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CATEGORY_LABEL, getSimulationByNumber, setNumber } from '../lib/data';
import { formatElapsed, formatPercent } from '../lib/format';
import { computeScore, EXAM_TOTAL, sectionSummary } from '../lib/scoring';
import { readSession, saveEssayRubric } from '../lib/sessionStore';
import type { Session } from '../lib/types';

export function Results() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const set = getSimulationByNumber(id);
  const [session, setSession] = useState<Session | null>(() => (set ? readSession(set.id) : null));

  const score = useMemo(() => (set && session ? computeScore(set, session) : null), [set, session]);

  const handleRubric = useCallback(
    (questionId: string, index: number, checked: boolean) => {
      if (!set || !session) return;
      const current = session.essayRubricSelections[questionId] ?? [];
      const next = [...current];
      next[index] = checked;
      const updated = saveEssayRubric(session, questionId, next);
      setSession({ ...updated });
    },
    [set, session],
  );

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

  if (!session || session.status !== 'completed' || !score) {
    return (
      <Layout>
        <div className="card">
          <h1>Hasil belum tersedia</h1>
          <p className="lead">
            Paket {set.title} belum diselesaikan. Selesaikan ujian terlebih dahulu untuk melihat skor dan pembahasan.
          </p>
          <div className="btn-row">
            <Link className="btn primary" to={`/ujian/${setNumber(set)}`}>
              {session?.status === 'in_progress' ? 'Lanjutkan Ujian' : 'Mulai Ujian'}
            </Link>
            <Link className="btn ghost" to="/">
              Beranda
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const duration = session.startedAt && session.completedAt ? session.completedAt - session.startedAt : 0;
  const autoSubmitted = params.get('auto') === '1';

  return (
    <Layout>
      <p className="eyebrow">Hasil • {set.title}</p>
      <h1>{score.provisional ? 'Skor sementara' : 'Skor latihan'}</h1>

      {autoSubmitted && (
        <div className="notice warning" role="alert">
          Waktu habis. Ujian dikumpulkan otomatis.
        </div>
      )}

      <div className="card">
        <div className="result-hero">
          <div>
            <p className="result-score">
              {score.provisional ? `${score.objectiveCorrect}/${score.objectiveTotal}` : `${score.total}/${EXAM_TOTAL}`}
            </p>
            <p className="small muted" style={{ marginBottom: 0 }}>
              {score.provisional
                ? 'Objektif benar · esai menunggu penilaian'
                : `Persentase latihan ${formatPercent(score.percentage)}`}
            </p>
          </div>
          <div className="btn-row">
            <Link className="btn primary" to={`/review/${setNumber(set)}`}>
              Lihat Pembahasan
            </Link>
            <Link className="btn" to={`/simulasi/${setNumber(set)}`}>
              Detail paket
            </Link>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat">
            <div className="k">Benar</div>
            <div className="v">{score.objectiveCorrect}</div>
          </div>
          <div className="stat">
            <div className="k">Salah</div>
            <div className="v">{score.objectiveWrong}</div>
          </div>
          <div className="stat">
            <div className="k">Kosong</div>
            <div className="v">{score.objectiveEmpty}</div>
          </div>
          <div className="stat">
            <div className="k">Durasi</div>
            <div className="v" style={{ fontSize: '1rem' }}>
              {formatElapsed(duration)}
            </div>
          </div>
          <div className="stat">
            <div className="k">Esai</div>
            <div className="v" style={{ fontSize: '1rem' }}>
              {score.essaysPending > 0
                ? `${score.essaysPending} menunggu penilaian mandiri`
                : `Poin ${score.essayPoints}/2`}
            </div>
          </div>
        </div>

        {score.provisional ? (
          <div className="notice warning" style={{ marginTop: '1rem' }}>
            Objektif {score.objectiveCorrect}/68 · Esai menunggu penilaian. Skor total baru muncul setelah kedua esai
            dinilai di bawah ini.
          </div>
        ) : (
          <div className="notice success" style={{ marginTop: '1rem' }}>
            Skor Latihan: {score.total}/70 · {formatPercent(score.percentage)}. Ini bukan skor resmi JLPT.
          </div>
        )}
      </div>

      <div className="card">
        <h2>Ringkasan per seksi</h2>
        <table className="info-table">
          <tbody>
            {score.sections.map((section) => (
              <tr key={section.category}>
                <th>{CATEGORY_LABEL[section.category]}</th>
                <td>{sectionSummary(section)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Nilai Esai</h2>
        <p className="small muted">
          Centang kriteria yang terpenuhi. Setiap kriteria bernilai 0,25 dan contoh jawaban bukan satu-satunya
          jawaban benar.
        </p>
        {score.essays.map((essay) => {
          const question = set.questions.find((item) => item.id === essay.questionId);
          if (!question) return null;
          return (
            <div key={essay.questionId} className="review-card" style={{ boxShadow: 'none' }}>
              <div className="head">
                <strong>Soal {question.number}</strong>
                <span className={`pill ${essay.status === 'graded' ? 'status-completed' : essay.status === 'empty' ? 'empty' : 'status-in_progress'}`}>
                  {essay.status === 'graded' ? `Nilai ${essay.score}` : essay.status === 'empty' ? 'Kosong · 0' : 'Menunggu penilaian'}
                </span>
              </div>
              <p className="ja small" lang="ja">
                {question.prompt}
              </p>
              <p className="small muted">Jawabanmu:</p>
              <p className="ja" lang="ja">
                {(session.answers[question.id] ?? '').trim() || '—'}
              </p>
              {essay.criteria.length > 0 && (
                <div>
                  {essay.criteria.map((criterion, index) => (
                    <div className="rubric-item" key={criterion}>
                      <input
                        id={`${question.id}-crit-${index}`}
                        type="checkbox"
                        checked={session.essayRubricSelections[question.id]?.[index] === true}
                        onChange={(event) => handleRubric(question.id, index, event.target.checked)}
                      />
                      <label htmlFor={`${question.id}-crit-${index}`}>
                        <span className="ja" lang="ja">
                          {criterion}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <p className="small muted" style={{ marginBottom: 0 }}>
          Contoh jawaban dan rubrik lengkap tersedia di halaman pembahasan.
        </p>
      </div>

      <div className="btn-row" style={{ marginTop: '1rem' }}>
        <button type="button" className="btn" onClick={() => navigate('/')}>
          Beranda
        </button>
        <Link className="btn ghost" to={`/review/${setNumber(set)}`}>
          Review semua soal
        </Link>
      </div>
    </Layout>
  );
}