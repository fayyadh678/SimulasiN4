import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Modal } from '../components/Modal';
import { CATEGORY_LABEL, getSimulationByNumber, setNumber } from '../lib/data';
import { EXAM_DURATION_MS } from '../lib/scoring';
import { readSession, resetSession, startSession } from '../lib/sessionStore';
import type { Session } from '../lib/types';

export function SimulationIntro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const set = getSimulationByNumber(id);
  const [session, setSession] = useState<Session | null>(() => (set ? readSession(set.id) : null));
  const [confirmReset, setConfirmReset] = useState(false);

  if (!set) {
    return (
      <Layout>
        <div className="card">
          <h1>Paket tidak ditemukan</h1>
          <p className="lead">Nomor simulasi yang diminta tidak tersedia.</p>
          <Link className="btn primary" to="/">
            Kembali ke beranda
          </Link>
        </div>
      </Layout>
    );
  }

  const current = session ?? readSession(set.id);

  const handleStart = () => {
    const next = startSession(set.id, Date.now(), EXAM_DURATION_MS);
    setSession(next);
    navigate(`/ujian/${setNumber(set)}`);
  };

  const handleReset = () => {
    setSession(resetSession(set.id));
    setConfirmReset(false);
  };

  return (
    <Layout>
      <p className="eyebrow">Simulasi N4 • Paket {setNumber(set)}</p>
      <h1>{set.title}</h1>
      <p className="lead">
        70 soal dengan komposisi tetap. Timer 115 menit baru berjalan setelah kamu menekan tombol Mulai Ujian.
      </p>

      <div className="card">
        <h2>Komposisi soal</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <th>01–20</th>
              <td>{CATEGORY_LABEL.vocabulary} — 20 pilihan ganda</td>
            </tr>
            <tr>
              <th>21–33</th>
              <td>Grammar / susunan kalimat — 13 pilihan ganda</td>
            </tr>
            <tr>
              <th>34–35</th>
              <td>Grammar / menulis — 2 esai jawaban singkat (maks. 350 karakter)</td>
            </tr>
            <tr>
              <th>36–50</th>
              <td>Reading — 5 teks × 3 soal</td>
            </tr>
            <tr>
              <th>51–55</th>
              <td>Cerita bergambar — 5 soal dengan ilustrasi 4 panel</td>
            </tr>
            <tr>
              <th>56–60</th>
              <td>Mencocokkan gambar — 5 soal dengan 4 pilihan gambar</td>
            </tr>
            <tr>
              <th>61–70</th>
              <td>Listening — 10 audio Jepang</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>70 soal (68 pilihan ganda + 2 esai)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Peraturan</h2>
        <ul>
          <li>Waktu total 115 menit. Timer memakai deadline absolut, jadi tetap berjalan meski halaman di-refresh.</li>
          <li>Jawaban tersimpan otomatis di perangkat ini, terpisah untuk setiap paket.</li>
          <li>Audio listening boleh diputar maksimal 2 kali per soal selama simulasi.</li>
          <li>Transcript audio, kunci jawaban, dan pembahasan hanya tampil setelah ujian dikumpulkan.</li>
          <li>Dua esai dinilai mandiri memakai rubrik setelah submit — tidak ada penilaian otomatis palsu.</li>
          <li>Jika waktu habis, ujian otomatis dikumpulkan saat kamu kembali ke halaman ini.</li>
        </ul>
        <div className="notice warning">
          Latihan tidak resmi. Skor latihan (maksimal 70) bukan scaled score JLPT dan tidak menyatakan kelulusan sertifikasi.
        </div>
      </div>

      <div className="card">
        <h2>Status paket</h2>
        <p>
          Status saat ini: <strong>{current.status === 'not_started' ? 'Belum dimulai' : current.status === 'in_progress' ? 'Sedang dikerjakan' : 'Selesai'}</strong>
        </p>
        <div className="btn-row">
          {current.status === 'not_started' && (
            <button type="button" className="btn primary" onClick={handleStart}>
              Mulai Ujian
            </button>
          )}
          {current.status === 'in_progress' && (
            <>
              <Link className="btn primary" to={`/ujian/${setNumber(set)}`}>
                Lanjutkan Ujian
              </Link>
              <button type="button" className="btn danger" onClick={() => setConfirmReset(true)}>
                Ulangi dari awal
              </button>
            </>
          )}
          {current.status === 'completed' && (
            <>
              <Link className="btn primary" to={`/hasil/${setNumber(set)}`}>
                Lihat Hasil
              </Link>
              <Link className="btn" to={`/review/${setNumber(set)}`}>
                Lihat Pembahasan
              </Link>
              <button type="button" className="btn danger" onClick={() => setConfirmReset(true)}>
                Ulangi
              </button>
            </>
          )}
          <Link className="btn ghost" to="/">
            Kembali ke beranda
          </Link>
        </div>
      </div>

      <Modal open={confirmReset} title="Ulangi simulasi ini?" onClose={() => setConfirmReset(false)}>
        <p>
          Semua jawaban, status esai, dan hasil untuk <strong>{set.title}</strong> akan dihapus. Paket lain tidak
          terpengaruh.
        </p>
        <div className="btn-row">
          <button type="button" className="btn danger" onClick={handleReset}>
            Ya, hapus dan mulai ulang
          </button>
          <button type="button" className="btn" onClick={() => setConfirmReset(false)}>
            Batal
          </button>
        </div>
      </Modal>
    </Layout>
  );
}