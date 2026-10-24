import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LABEL, simulations } from '../lib/data';
import { readSession } from '../lib/sessionStore';
import type { ExamStatus, Session } from '../lib/types';
import { Layout } from '../components/Layout';
import { answeredCount } from '../lib/sessionStore';

const STATUS_LABEL: Record<ExamStatus, string> = {
  not_started: 'Belum dimulai',
  in_progress: 'Sedang dikerjakan',
  completed: 'Selesai',
};

export function SelectSimulation() {
  const [sessions, setSessions] = useState<Record<string, Session>>({});

  useEffect(() => {
    const map: Record<string, Session> = {};
    for (const set of simulations) map[set.id] = readSession(set.id);
    setSessions(map);
  }, []);

  return (
    <Layout>
      <p className="eyebrow">Latihan tidak resmi</p>
      <h1>Pilih satu dari 5 paket latihan</h1>
      <p className="lead">
        Setiap paket berisi 70 soal dengan pola yang sama: kosakata, grammar, reading, cerita bergambar,
        mencocokkan gambar, dan listening. Waktu pengerjaan 115 menit per paket.
      </p>

      <div className="grid-cards">
        {simulations.map((set) => {
          const session = sessions[set.id];
          const status = session?.status ?? 'not_started';
          const answered = session ? answeredCount(set, session) : 0;
          const percent = Math.round((answered / set.questions.length) * 100);
          const number = set.id.replace('n4-', '');
          const target =
            status === 'in_progress'
              ? `/ujian/${number}`
              : status === 'completed'
                ? `/hasil/${number}`
                : `/simulasi/${number}`;
          return (
            <article className="card set-card" key={set.id}>
              <header>
                <h3>{set.title}</h3>
                <span className={`pill status-${status}`}>{STATUS_LABEL[status]}</span>
              </header>
              <ul className="meta-list">
                <li>70 soal</li>
                <li>115 menit</li>
                <li>2 esai</li>
                <li>68 pilihan ganda</li>
              </ul>
              <p className="small muted" style={{ marginBottom: 0 }}>
                {answered > 0 ? `${answered} soal terjawab` : 'Belum ada jawaban tersimpan'}
              </p>
              <div className="progress-track" aria-hidden="true">
                <span style={{ width: `${percent}%` }} />
              </div>
              <div className="btn-row" style={{ marginTop: 'auto' }}>
                <Link className="btn primary" to={target}>
                  {status === 'in_progress' ? 'Lanjutkan Ujian' : status === 'completed' ? 'Lihat Hasil' : 'Pilih Simulasi'}
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2>Komposisi tiap paket</h2>
        <div className="stat-grid">
          <div className="stat">
            <div className="k">01–20</div>
            <div className="v" style={{ fontSize: '1rem' }}>
              {CATEGORY_LABEL.vocabulary} · 20
            </div>
          </div>
          <div className="stat">
            <div className="k">21–35</div>
            <div className="v" style={{ fontSize: '1rem' }}>
              Grammar · 13 pilihan + 2 esai
            </div>
          </div>
          <div className="stat">
            <div className="k">36–50</div>
            <div className="v" style={{ fontSize: '1rem' }}>
              Reading · 15 (5 teks × 3)
            </div>
          </div>
          <div className="stat">
            <div className="k">51–60</div>
            <div className="v" style={{ fontSize: '1rem' }}>
              Cerita &amp; cocok gambar · 10
            </div>
          </div>
          <div className="stat">
            <div className="k">61–70</div>
            <div className="v" style={{ fontSize: '1rem' }}>
              Listening · 10 audio
            </div>
          </div>
        </div>
        <div className="notice" style={{ marginTop: '1rem' }}>
          Website latihan mandiri — tidak berafiliasi dengan JLPT. Skor latihan tidak sama dengan scaled score resmi.
        </div>
      </div>
    </Layout>
  );
}