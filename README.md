# Simulasi JLPT N4

Website latihan mandiri berisi **5 paket simulasi JLPT N4**. Setiap paket punya **70 soal** dengan pola identik, timer 115 menit, pembahasan, dan penilaian esai mandiri.

> **Latihan tidak resmi.** Website ini tidak berafiliasi dengan JLPT. Skor latihan (maksimal 70) bukan *scaled score* resmi dan tidak menyatakan kelulusan sertifikasi.

## URL

- **GitHub Pages:** <https://fayyadh678.github.io/SimulasiN4/>
- **Vercel (opsional):** import repo yang sama, Build Command `npm run build`, Output Directory `dist`, tanpa variabel `GITHUB_PAGES`.

## Isi

| Item | Jumlah |
|---|---:|
| Paket simulasi | 5 |
| Soal | 350 (68 pilihan ganda + 2 esai per paket) |
| Teks reading | 25 (5 teks × 3 soal per paket) |
| Ilustrasi SVG | 125 (25 cerita 4 panel + 100 pilihan matching) |
| Audio listening Jepang | 50 MP3 |

Komposisi tiap paket:

| Nomor | Kategori | Jumlah |
|---|---|---:|
| 01–20 | Kosakata dan Kanji | 20 |
| 21–33 | Grammar pilihan ganda | 13 |
| 34–35 | Esai jawaban singkat | 2 |
| 36–50 | Reading (5 teks × 3 soal) | 15 |
| 51–55 | Cerita bergambar (4 panel) | 5 |
| 56–60 | Mencocokkan gambar (4 opsi) | 5 |
| 61–70 | Listening audio | 10 |
| **Total** | | **70** |

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build produksi ke dist/
npm run preview    # pratinjau hasil build
npm run test       # unit test + validasi 350 soal dan seluruh aset
```

## Skrip

| Perintah | Fungsi |
|---|---|
| `npm run test` | Vitest + `scripts/validate-content.mjs` |
| `npm run validate` | Validasi dataset, XML SVG, integritas MP3 |
| `npm run assets:images` | Buat ulang 125 SVG dari `scripts/lib/*-scenes.mjs` |
| `npm run assets:audio` | Buat ulang 50 MP3 dari transcript |

### Regenerasi audio

Audio membutuhkan Python 3.12 dengan `piper-tts`, `pyopenjtalk-plus`, dan model Piper Jepang di `tools/voices/ja.onnx`, plus `ffmpeg-static` dari `node_modules`.

```bash
python -m pip install piper-tts pyopenjtalk-plus
python scripts/generate-audio.py          # 50 file
python scripts/generate-audio.py --only set-1
```

Suara perempuan memakai Google Translate TTS (ja), suara laki-laki memakai Piper neural `ja_JP-hi_fi_captain`. Semua hasil dibundel ke `public/audio/`, jadi saat ujian tidak ada panggilan API.

## Struktur

```text
src/
├── data/simulations.json     # sumber data 350 soal (tanpa perubahan dari spec)
├── lib/
│   ├── data.ts               # akses dataset, label kategori, rubrik
│   ├── dataValidation.ts     # aturan konten 5×70
│   ├── scoring.ts            # skor objektif + esai 4 kriteria @0,25
│   ├── sessionStore.ts       # sesi localStorage terisolasi per paket
│   ├── publicAsset.ts        # base path GitHub Pages/Vercel
│   └── format.ts
├── components/               # Layout, QuestionCard parts, ListeningPlayer, EssayEditor
├── pages/                    # SelectSimulation, SimulationIntro, Exam, Results, Review
└── styles.css
public/
├── images/set-1..5/          # 125 SVG
└── audio/set-1..5/           # 50 MP3
scripts/
├── validate-content.mjs
├── generate-images.mjs
├── generate-audio.py
└── lib/                      # kit gambar dan komposisi scene
```

## Perilaku penting

- Timer memakai **deadline absolut** (`Date.now() + 115 menit`) dan baru mulai setelah tombol **Mulai Ujian**; refresh tidak mereset waktu.
- Sesi disimpan terpisah per paket (`n4:simulasi:v3:n4-3:session`), sehingga paket lain tidak terpengaruh.
- Audio dibatasi **2 kali putar** per soal dan dihitung saat pemutaran benar-benar dimulai.
- Kunci, pembahasan, dan transcript hanya dirender pada halaman hasil/review setelah status `completed`.
- Esai kosong bernilai 0; esai terisi ditandai *menunggu penilaian* sampai pengguna menilai 4 kriteria rubrik.
- Skor sementara ditampilkan sebagai `Objektif X/68`, bukan dibagi 70.

## Deploy

Push ke `main` menjalankan `.github/workflows/deploy.yml` (test → build dengan `GITHUB_PAGES=true` → GitHub Pages). Aktifkan `Settings → Pages → Source: GitHub Actions` sekali saja.

## Keterbatasan

- Dataset dikirim ke browser, jadi pengguna teknis dapat memeriksa kunci lewat DevTools. Ini latihan tanpa proctoring.
- Penilaian esai bersifat mandiri; tidak ada penilaian otomatis.
- Ilustrasi dibuat secara prosedural (SVG) dan audio disintesis, bukan rekaman studio.