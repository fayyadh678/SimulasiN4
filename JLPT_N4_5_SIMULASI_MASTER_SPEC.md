# MASTER SPEC — Simulasi JLPT N4: 5 Paket Sulit dalam 1 Website

> **Dokumen eksekusi untuk coding agent, disetujui pemilik — 24 Oktober 2026.** Jangan hanya membuat mockup; bangun satu aplikasi lengkap, seluruh lima paket ujian, aset ilustrasi dan audio, test, lalu publish online apabila memiliki akses. **Satu file ini adalah sumber konten utama untuk 350 soal**; jangan meminta pengguna menulis soalnya lagi.

## 0. INSTRUKSI PALING PENTING

**Repository target EKSKLUSIF:** `https://github.com/fayyadh678/SimulasiN4.git` (bukan `TestTrialN4`, bukan `SimulasiN4ver1`).

**Nama produk:** `Simulasi JLPT N4` — lima kartu menu: `Simulasi N4 1`, `Simulasi N4 2`, `Simulasi N4 3`, `Simulasi N4 4`, `Simulasi N4 5`.

**Perintah:** buat **1 website online**, **5 paket** dengan **70 soal yang berbeda untuk tiap paket**, semuanya dengan pola dan urutan seksi yang sama. Beranda memiliki **5 kartu pilihan**. Saat kartu diklik, tampil layar info paket + **Mulai Ujian** (jangan langsung menjawab sebelum tombol Mulai). Di setiap paket ada timer, 70 soal, jawaban A–D untuk objektif, 2 esai singkat, tombol submit, skor, dan pembahasan/kunci yang hanya terlihat setelah menyelesaikan paket itu. Setiap paket harus independen: progres, hasil dan timer tidak tercampur.

**Hosting wajib dituju:** GitHub Pages dengan target URL **`https://fayyadh678.github.io/SimulasiN4/`** (hanya valid setelah deploy benar-benar berhasil). **Vercel** sebagai opsi hosting tambahan dari GitHub yang sama. Website **tidak boleh hanya localhost**. Jangan mengklaim telah deploy tanpa bukti URL dapat diakses.

**Status awal repository:** saat riset 24 Oktober 2026, halaman publik repository tampak kosong; **cek ulang sebelum push**, jangan menghapus pekerjaan orang lain bila sudah terisi.

## 1. Kesesuaian ujian N4 dan penentuan kesulitan

- Referensi struktur resmi: <https://www.jlpt.jp/e/guideline/testsections.html> (Vocabulary 25 menit, Grammar+Reading 55 menit, Listening 35 menit, total 115 menit waktu tes per seksi).
- Contoh tipe soal resmi: <https://www.jlpt.jp/e/samples/sampleindex.html>.
- FAQ JLPT: <https://www.jlpt.jp/e/faq/> menyatakan mayoritas soal objektif empat pilihan; esai **bukan** bagian tes resmi. Oleh karena itu tandai esai sebagai **fitur latihan tambahan** dan website sebagai **simulasi tidak resmi**.
- Kesulitan set-set ini dibuat **N4 menantang / N4+ konteks**, bukan N3 atau N2: gunakan pengecoh yang mirip, konteks logika singkat, transisi waktu/lokasi, syarat, pengecualian, beberapa instruksi, kata sambung, ～てしまう, ～つもり, ～ながら, ～のに, ～ために, ～ば/～たら, ～までに, ～ておく, ～ように, ～かもしれない, ～ことにする, ～そう, dll. Jangan membuat teks terlalu panjang atau grammar di luar cakupan N4 demi terlihat susah.
- Semua konten adalah soal latihan orisinal. Dilarang mengambil mentah soal berhak cipta dari JLPT atau memakai contoh resmi sebagai konten soal baru.
- **Penilaian JLPT resmi adalah scaled score**, bukan benar/70. Jangan klaim skor latihan sebagai skor resmi atau menyebut pengguna otomatis lulus sertifikasi.

## 2. Komposisi HARUS IDENTIK untuk masing-masing dari 5 paket

| Nomor soal | Kategori | Jumlah tiap paket | Tipe |
|---|---|---:|---|
| 01–20 | Kosakata dan Kanji (`vocabulary`) | 20 | Pilihan A/B/C/D |
| 21–33 | Grammar / susunan kalimat (`grammar`) | 13 | Pilihan A/B/C/D |
| 34–35 | Grammar / menulis (`grammar`) | 2 | **Esai jawaban singkat**, tanpa A/B/C/D |
| 36–50 | Cerita / Reading (`reading`) | 15 | **5 teks × 3 soal**, A/B/C/D |
| 51–55 | Cerita bergambar (`story_image`) | 5 | Gambar **4 panel**, pilihan teks A/B/C/D |
| 56–60 | Mencocokkan gambar (`match_image`) | 5 | 4 gambar pilihan A/B/C/D |
| 61–70 | Listening audio (`listening`) | 10 | Rekaman Jepang MP3, A/B/C/D |
| **TOTAL** | | **70** | **68 objektif + 2 esai** |

Total website: **350 soal = 340 pilihan ganda + 10 esai**, **25 teks bacaan**, **25 SVG cerita empat panel**, **100 SVG opsi mencocokkan gambar** (total **125 SVG**), **50 audio Jepang**. Tepat dua esai per paket, masih sesuai permintaan '1–3 esai, maksimal 3'. Esai **menggantikan** dua butir grammar A–D, bukan menjadi soal ke-71/72, sehingga tiap paket tetap 70.

**Jangan pernah mengulang soal yang sama lintas lima paket** (id, prompt, bacaan, cerita visual, naskah listening harus berbeda; konsep tata bahasa dan tema sehari-hari boleh sama). Jangan menggabungkan soal dari V1/V2 lama. Paket di akhir dokumen telah disusun sebagai data final, gunakan apa adanya setelah review linguistik.

## 3. Alur UI — satu situs, bukan lima situs terpisah

### Halaman 1: Beranda pilih simulasi (`/#/`)
- Header brand **Simulasi JLPT N4** dan subtitle *Pilih satu dari 5 paket latihan*. Label kecil `N4 Challenge • 70 Soal • 115 Menit`, catatan `Latihan tidak resmi`.
- Grid **5 card** bernama `Simulasi N4 1` ... `Simulasi N4 5`; desktop 2/3 kolom, HP 1 kolom.
- Setiap kartu menampilkan 70 soal, 115 menit, 2 esai, progress khusus set (Belum dimulai / Sedang dikerjakan / Selesai), dan tombol **Pilih Simulasi**.
- Jangan menampilkan jawaban benar atau isi naskah audio di menu.
- Pengguna bebas memilih urutan set; tidak perlu menuntaskan set 1 untuk masuk set 2.

### Halaman 2: Detail paket (`/#/simulasi/1` s.d. `/#/simulasi/5`)
- Judul sesuai pilihan, komposisi kategori, peraturan, timer, catatan listening (maksimal 2× putar per audio), info esai dan sistem review manual.
- CTA **Mulai Ujian**, atau **Lanjutkan Ujian** jika sedang mengerjakan. Untuk paket selesai: **Lihat Hasil / Review / Ulangi** (reset dengan konfirmasi, jangan hilangkan hasil tanpa izin).
- Baru ketika tombol **Mulai Ujian** ditekan, mulai deadline `Date.now()+115*60*1000`; klik kartu menu tidak memulai timer.

### Halaman 3: Ujian (`/#/ujian/1` ... `/#/ujian/5`)
- One-question-at-a-time dengan nomor `{i}/70`, kategori saat ini, progress bar, waktu `01:55:00` menurun, jumlah dijawab, grid nomor soal yang bisa diklik.
- Soal MCQ: 4 pilihan A-D. Soal reading: passage tepat untuk 3 pertanyaan harus bisa dibaca utuh di atas soal. Story: tampilkan 1 ilustrasi **4 panel**. Match: tampilkan **4 gambar yang clickable** dengan A/B/C/D. Listening: audio lokal/play-pause, maksimum **dua pemutaran per soal** dalam mode simulasi, transcript disembunyikan sampai selesai. Esai: `textarea` dengan placeholder `Tulis 2–3 kalimat dalam bahasa Jepang`, max 350 karakter, ketik Jepang, tanpa opsi A–D.
- Tombol **Sebelumnya**, **Berikutnya**, **Daftar Soal**, **Selesaikan Ujian** dengan dialog konfirmasi dan info jumlah yang belum dijawab.
- Saat refresh/berpindah tab, jawaban dan timer bertahan. Timer pakai **timestamp deadline absolut**; jika kedaluwarsa saat halaman tidak aktif, auto-submit segera ketika user kembali.
- Jangan tampilkan benar/salah, contoh jawaban esai, pembahasan, atau teks audio selama ujian. Data front-end masih dapat diinspeksi DevTools; ini latihan tanpa proctoring dan tidak bisa dijamin aman dari inspeksi teknis.
- Jika audio gagal dimainkan, tampilkan peringatan jelas dan tombol ulang muat; **jangan menghukum user dengan penilaian diam-diam** tanpa mengupayakan audio dapat didengar. Lakukan cek integritas sebelum rilis.

### Halaman 4: Hasil (`/#/hasil/1` ... `/5`)
- Sesudah submit manual/otomatis, tampilkan jumlah objektif benar `X/68`, jumlah salah, kosong, durasi, ringkasan per seksi, status esai `0–2 sedang menunggu evaluasi mandiri`, dan tombol **Nilai Esai** + **Lihat Pembahasan**.
- Skor objektif = jumlah benar di 68 MCQ; maksimal 68. Esai masing-masing 0–1 (rubrik 4 komponen @0,25). Jika esai tidak diisi, otomatis 0. Jika esai berisi teks, **wajib dinilai sendiri setelah submit**, jangan memberi skor otomatis palsu.
- Setelah semua esai berisi selesai evaluasi mandiri, tampilkan `Skor Latihan: total/70` + persen 1 desimal. Sebelum evaluasi lengkap, beri label `Skor sementara X/68` dan `Menunggu penilaian esai`; jangan membagi objektif dengan 70 lalu mengklaim nilai final.
- Jawaban benar, sample esai, rubrik dan transkrip hanya ada di *halaman hasil/review setelah status `completed`*.

### Halaman 5: Review (`/#/review/1` ... `/5`)
- Filter **Semua / Benar / Salah / Kosong / Esai**. Kartu tiap butir: prompt asli, jawaban user, kunci benar, alasan dalam bahasa Indonesia, passage/gambar dan untuk listening transcript Jepang. Sertakan audio replay setelah completion.
- Untuk esai, tunjukkan teks user, contoh jawaban, rubrik empat poin (0/0,25/0,5/0,75/1), opsi centang untuk setiap kriteria dan tombol **Simpan Penilaian**. Jelaskan bahwa contoh bukan satu-satunya jawaban benar; pengguna bisa menulis versi lain selama maksudnya sesuai.
- Review hanya boleh diakses jika set status `completed`; jika belum submit, redirect kembali ke ujian. User bisa memulai set lain tanpa mereset yang pertama.

## 4. Style visual — simple & clean

- Palet: latar `#F8FAFC`, kartu putih `#FFFFFF`, judul `#0F172A`, teks abu `#64748B`, border `#E2E8F0`, aksen biru `#2563EB`. Hijau/merah status jawaban hanya di hasil/review.
- Header tipis, sidebar nomor soal desktop jika muat, mobile nav compact/drawer; content max width 960px; radius 12–16px, shadow ringan; ruang putih luas, hindari gradient/animasi berlebihan.
- Gunakan `Inter`/system untuk Indonesia dan `Noto Sans JP` (fallback terpasang) untuk teks Jepang. Huruf Jepang minimal 18px pada soal.
- Keyboard-friendly, indikator focus jelas, 44×44 px touch target, dukung perangkat 360/768/1280 px; hormati `prefers-reduced-motion`.
- Gambar 2×2 pada soal matching di HP; berikan loading dan fallback/error message **tanpa membocorkan jawaban**. Sebaiknya SVG ilustrasi manusia/objek dengan gaya yang konsisten, bukan emoji/placeholder.
- Subtitle no certificate/no official: `Website latihan mandiri — tidak berafiliasi dengan JLPT.`

## 5. Model data dan kontrak JSON (BANK SOAL DI AKHIR DOKUMEN)

Di bagian **`## 12. Dataset lengkap`** tersedia **satu blok JSON valid** berisi array 5 set. Ini adalah **sumber data otoritatif**. Agent harus ekstrak ke `src/data/simulations.json` **tanpa mengubah soal atau kunci**. Jangan membuat ulang soal menggunakan AI saat build; jangan shuffle isi dataset lintas set. Bila melakukan normalisasi tipe, validasi hasil 350 soal.

Struktur setiap set: `id`, `title`, `version`, `questions[]`, `passages[]`.

Setiap pertanyaan punya: `id` unik misalnya `S1-Q01`, `number` 1–70, `category`, `kind` (`mcq`/`essay`), `prompt`. MCQ punya `options:{A,B,C,D}`, `answer:'A'|'B'|'C'|'D'`, `explanation` (bahasa Indonesia). Essay punya `sample_answer`, `rubric`, `max_characters`, `points`.

`reading` mengacu ke `passage_id`. `story_image` menyediakan `panels[4]` (deskripsi 4 panel untuk menghasilkan satu SVG), `asset` dan `image_instructions`. `match_image` punya `image_options` A–D masing-masing `scene` dan `src`. `listening` punya `transcript`, `audio_src`, `max_plays:2` dan `audio_cast`. Jangan pernah menampilkan field `answer`, `explanation`, `sample_answer`, `rubric`, `transcript`, atau deskripsi scene aset yang berpotensi membocorkan jawaban sebelum submitted.

**Penting:** `image_options` menggunakan teks label `Gambar A/B/C/D` pada options agar UI tetap A-D; konten pilihan yang sesungguhnya adalah aset SVG sesuai `src`. Jangan mencetak deskripsi scene sebagai caption di halaman ujian (itu spoiler).

## 6. Proses produksi gambar dan audio — WAJIB, bukan opsional

### 6.1 Gambar SVG (125 berkas)
- Untuk setiap story, buat satu SVG 4 panel sesuai `panels` array. Gunakan pembeda waktu/peristiwa jelas, urutan bernomor kecil `1`–`4` pada sudut tiap panel; **jangan menulis jawaban eksplisit**.
- Untuk setiap match_image, buat **4 SVG berbeda** sesuai masing-masing `scene` A–D. Semua harus digambar, termasuk distractors, dan keempatnya dibuat konsisten dalam proporsi/ukuran sehingga tidak ada opsi yang menang hanya karena lebih bagus resolusinya.
- Semua SVG disimpan persis dengan path yang ada di data, di bawah `public/` (contoh `public/images/set-2/matching/q57-c.svg`). Gunakan viewBox/width/height, aksesibilitas caption generik, kontras. Jangan pakai URL stok eksternal atau emoji sebagai aset akhir.
- Asset check terotomasi: hitung `25 stories + 25 × 4 match images = 125 SVG` dan semua path ada serta SVG parseable. Browser harus benar-benar dapat mengunduhnya dari hosting.

### 6.2 Listening (50 MP3 berisi suara Jepang)
- Untuk 10 butir listening **tiap set**, produksi **MP3 nyata** dari `transcript` (bukan teks yang dibaca browser tanpa aset, bukan file kosong). Total **50 MP3**, tepat sesuai `audio_src` dan simpan di bawah `public/`.
- Gunakan TTS Jepang berkualitas (jika tersedia) atau rekaman suara manusia berlisensi/diizinkan; idealnya dua voice untuk dialog perempuan/pria, pelafalan jelas dan tempo mendekati N4. **Jangan mengunduh audio JLPT resmi berhak cipta**.
- Pisahkan baris speaker `女：` dan `男：` untuk produksi suara; nama speaker jangan diucapkan sebagai bagian audio. Jeda 300–700 ms antar giliran; pembacaan tidak terlalu cepat. Gunakan normalisasi suara agar volume setiap file seimbang.
- Setiap file diverifikasi durasinya `> 1s`, codec playable (`audio/mpeg`), tidak silent, tidak 404; gunakan wav/MP3 conversion jika generator TTS menghasilkan format lain.
- Tidak boleh mengandalkan API berbayar saat pengguna mengerjakan; seluruh file MP3 sudah dibundel saat deployment. Jika tidak tersedia TTS saat coding, jangan berbohong bahwa audio sudah siap; jadikan produksi audio dan verifikasi sebagai blocker release yang jujur.
- `max_plays:2`: hitung **saat play berhasil dimulai**, bukan saat tombol tak merespons; simpan `playCount` per set+question di localStorage. Setelah tombol replay kehabisan kuota, audio tidak boleh diputar lagi selama attempt ini (kecuali pada review setelah submit).
- Transcript hanya ditampilkan sesudah submit; jika di sisi client dalam data bundle, tidak mungkin tersembunyi dari DevTools, hanya dari UI umum.

## 7. Framework, struktur kode, persistensi dan aksesibilitas

**Stack:** React + Vite + TypeScript; plain CSS / CSS Modules / Tailwind diperbolehkan. Website static: **tanpa backend**, tanpa login, tidak perlu database, tidak perlu API key. Pilih React Router `HashRouter` supaya URL `/#/ujian/3` bekerja meskipun di GitHub Pages yang tidak menyediakan rewrite SPA. Alternatif state-route internal sah bila history/reload aman.

Struktur minimal:

```text
SimulasiN4/
├── .github/workflows/deploy.yml
├── public/
│   ├── images/set-1 ... set-5/ (125 *.svg total)
│   └── audio/set-1 ... set-5/  (50 *.mp3 total)
├── src/
│   ├── data/simulations.json
│   ├── lib/dataValidation.ts
│   ├── lib/scoring.ts
│   ├── lib/sessionStore.ts
│   ├── components/QuestionCard.tsx
│   ├── components/ListeningPlayer.tsx
│   ├── components/EssayEditor.tsx
│   ├── pages/SelectSimulation.tsx
│   ├── pages/SimulationIntro.tsx
│   ├── pages/Exam.tsx
│   ├── pages/Results.tsx
│   ├── pages/Review.tsx
│   └── App.tsx
├── scripts/validate-content.mjs
├── README.md
├── vite.config.ts
├── package.json
└── index.html
```

Untuk static asset dengan GitHub Pages subpath, selalu gunakan:

```ts
const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
// publicAsset('audio/set-1/q61.mp3') -> '/SimulasiN4/audio/set-1/q61.mp3' di GH Pages
// dan '/audio/set-1/q61.mp3' di Vercel.
```

Session isolated per set (bukan satu object global yang saling overwrite):

```ts
type ExamStatus = 'not_started' | 'in_progress' | 'completed';
type Session = {
  schemaVersion: 1;
  setId: 'n4-1' | 'n4-2' | 'n4-3' | 'n4-4' | 'n4-5';
  status: ExamStatus;
  answers: Record<string, string>;   // MCQ: A-D; essay: raw Japanese text
  playCount: Record<string, number>;
  startedAt: number | null;
  deadlineAt: number | null;
  completedAt: number | null;
  essayRubricSelections: Record<string, boolean[]>;
};
// storage key contoh: 'n4:simulasi:v3:n4-3:session'
```

- Simpan `Date.now()` dan `deadlineAt` absolut; jangan per-refresh reset waktu.
- `status === 'completed'` immutable untuk jawaban MCQ/essay; user boleh mengevaluasi rubrik esai yang sudah disubmit, bukan mengubah jawaban ujian.
- Setiap set disimpan terpisah dan tidak memengaruhi set lain; kartu beranda membaca ringkasan status dari kelima key.
- Validasi JSON localStorage saat baca: versi, id, schema; on corrupt, tampilkan opsi reset set terkait saja.
- Bahasa UI Indonesia; teks Jepang dengan `lang="ja"`; aksesibilitas untuk radio dan textarea; loading/error jelas; timer update `aria-live` jangan membaca setiap detik secara mengganggu.

## 8. Penilaian dan contoh algoritma

1. Untuk tiap MCQ 68 butir per paket, skor 1 bila `answers[q.id] === q.answer`, selain itu 0. Jangan memperlakukan `essay` sebagai opsi A-D.
2. Esai kosong = 0. Esai tidak kosong ditandai *pending* setelah ujian selesai, lalu user melakukan evaluasi mandiri **4 kriteria @0,25** dari `rubric`; maksimum 1 per esai.
3. Skor final muncul ketika kedua esai berstatus sudah dinilai (esai kosong langsung bernilai 0). Total `0–70`; persentase `round((total/70)*1000)/10`.
4. Selagi ada esai nonkosong yang belum dinilai: tampilkan jelas `Objektif X/68 · Esai menunggu penilaian`, bukan menjanjikan nilai otomatis tepat.
5. Per seksi tampilkan contoh `Kosakata 15/20`, `Grammar pilihan 10/13 + esai pending`, `Reading 12/15`, `Cerita gambar 4/5`, `Cocok gambar 3/5`, `Listening 7/10`. Skor latihan tidak sama dengan skor JLPT asli.
6. Jangan tampilkan pembahasan, contoh jawaban atau pilihan benar hingga pengguna men-submit set itu (atau timer berakhir). Sesudahnya semua kunci ditampilkan pada review paket bersangkutan.

## 9. Deployment GitHub Pages + Vercel dari REPO BARU

**Repo yang benar:** <https://github.com/fayyadh678/SimulasiN4.git> — owner `fayyadh678`, nama `SimulasiN4` (huruf besar penting pada path hosting). **BUKAN** repository versi sebelumnya.

### GitHub Pages — release utama
1. `git clone https://github.com/fayyadh678/SimulasiN4.git` (atau gunakan working tree agent), jangan force-push file pengguna jika isinya sudah berubah; inisialisasi React+Vite pada repository tersebut.
2. Jalankan `npm install`, commit `package-lock.json`, buat `scripts/validate-content.mjs`, `npm run test`, `npm run build`.
3. Di `vite.config.ts`, gunakan base kondisional agar GitHub Pages & Vercel sama-sama berfungsi:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/SimulasiN4/' : '/',
});
```

4. Gunakan `HashRouter` agar direct browser reload pada `/#/ujian/5` tetap bekerja.
5. Tambahkan `.github/workflows/deploy.yml`:

```yaml
name: Deploy Simulasi N4 (GitHub Pages)
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run test
      - run: npm run build
        env:
          GITHUB_PAGES: 'true'
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

6. Di GitHub `Settings → Pages → Build and deployment → Source: GitHub Actions`. Push ke `main`; cek Actions sampai hijau. Kemudian **buka secara langsung** `https://fayyadh678.github.io/SimulasiN4/` dan tes screenshot/console/network termasuk `/SimulasiN4/audio/...` dan `/SimulasiN4/images/...`; jangan menganggap URL otomatis live sebelum sukses.
7. Jika tidak punya kredensial/izin push, sediakan perubahan siap commit dan panduan grant akses; jangan membuat klaim deploy sudah dilakukan.

### Vercel (opsi kedua)
1. Import **repo GitHub yang sama** `fayyadh678/SimulasiN4`, framework Vite, Build Command `npm run build`, Output Directory `dist`. Di Vercel **jangan aktifkan** variabel `GITHUB_PAGES` (atau set bukan `'true'`), sehingga base `/`.
2. Deploy dan tes lima simulasi pada URL yang benar-benar diberikan Vercel, bukan domain tebakan. Sesudah dihubungkan, commit baru dapat auto-deploy.
3. `HashRouter` menghindari masalah refresh direct route; cek semua 125 SVG dan 50 audio di jaringan deployment Vercel.

Dokumentasi resmi: <https://vite.dev/guide/static-deploy.html>, <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>.

## 10. Automated content QA sebelum deploy

Buat unit/test/integrity script yang memverifikasi semua kondisi berikut. Jika ada yang tidak lolos, **gagalkan `npm run test` / CI**:

- Array dataset tepat `5` set, nama dan id unik, masing-masing `70` soal dengan nomor `1..70`, id unik lintas 350 soal.
- Distribusi `vocabulary:20, grammar:15 (13 MCQ + 2 essay), reading:15, story_image:5, match_image:5, listening:10` **untuk setiap set**.
- Total keseluruhan tepat `340 MCQ + 10 essay`; MCQ selalu memiliki A-D berbeda, `answer` ada di A-D; penjelasan tidak kosong. Essay memiliki prompt, contoh jawaban, rubrik nonkosong.
- Per set tepat 5 `passages`, setiap passage dipakai 3 pertanyaan, total 15 reading; setiap story mempunyai 4 panel; matching punya 4 opsi dengan scene; setiap listening punya transcript Jepang dengan minimal dua utterance, audio_src dan `max_plays=2`.
- Tidak ada `prompt` identik lintas 350 soal. Jangan mengulang/menyalin pertanyaan dari set sebelumnya di proyek lama.
- 125 SVG asset paths dan 50 MP3 asset paths benar-benar tersedia di repo, file tidak kosong, SVG valid, MP3 bisa dimainkan (CI dapat pakai ffprobe jika tersedia). Pastikan ukuran asset wajar agar loading di HP baik.
- UI state test: pilih set 4 tidak memulai timer; setelah klik Mulai hanya set 4 yang timer jalan; keluar ke beranda set 1/2/3/5 tetap untouched; refresh set 4 tidak reset; auto-finish waktu habis; penilaian hanya set 4; esai tidak diberi skor otomatis palsu.
- Kunci dan transkrip tak muncul di UI sebelum selesai; sesudah selesai pembahasan tersedia; penilaian rubrik esai mengubah skor set yang relevan saja.
- Manual QA pada 360px/768px/1280px; beranda lima kartu, detail, reading, image/MCQ/essay/audio, selesai, hasil, review; tidak ada layout patah/asset 404/console error.
- GitHub Pages dan Vercel menggunakan base path yang sesuai; cek deep link hash dan penayangan audio/image pada URL publik.

## 11. Serah terima kepada pemilik

Setelah implementasi: berikan link repo, URL live **yang sudah terverifikasi**, ringkasan fitur lima simulasi, bukti lulus validasi 350 soal dan 125 SVG + 50 MP3, ringkasan `npm run test` dan `npm run build`, cara redeploy, dan keterbatasan evaluasi esai mandiri. Jika belum bisa push karena hak akses, katakan secara jujur sehingga pemilik dapat memberikan izin. **Jangan menunda isi soal**: semuanya telah disediakan sesudah heading berikut.

---

## 12. Dataset lengkap — 5 × 70 soal, copy to `src/data/simulations.json`

Berikut JSON final sumber data. **Semua lima set ada dalam SATU blok JSON.** Agent boleh membaca dan mem-parsing blok ini secara otomatis. Jangan terpotong atau mengambil sebagian soal saja.

```json
[
  {
    "id": "n4-1",
    "title": "Simulasi N4 1",
    "version": "v3-set-1",
    "questions": [
      {
        "id": "S1-Q01",
        "number": 1,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「受付」の読み方はどれですか。",
        "options": {
          "A": "じゅけつ",
          "B": "うけつけ",
          "C": "うけつき",
          "D": "うけづけ"
        },
        "answer": "B",
        "explanation": "受付 dibaca うけつけ, yaitu meja/petugas penerima."
      },
      {
        "id": "S1-Q02",
        "number": 2,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「利用」の読み方はどれですか。",
        "options": {
          "A": "りよう",
          "B": "りょよう",
          "C": "りゆう",
          "D": "りゅうよう"
        },
        "answer": "A",
        "explanation": "利用 adalah りよう, memakai layanan/fasilitas."
      },
      {
        "id": "S1-Q03",
        "number": 3,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「必要」の読み方はどれですか。",
        "options": {
          "A": "ひっよう",
          "B": "ひつよう",
          "C": "ひつおう",
          "D": "ひちよう"
        },
        "answer": "B",
        "explanation": "必要 dibaca ひつよう, perlu."
      },
      {
        "id": "S1-Q04",
        "number": 4,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「原因」の読み方はどれですか。",
        "options": {
          "A": "げんにん",
          "B": "がんいん",
          "C": "げんいん",
          "D": "げにん"
        },
        "answer": "C",
        "explanation": "原因 dibaca げんいん, penyebab."
      },
      {
        "id": "S1-Q05",
        "number": 5,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「会議は二時に始まります」の「会議」はどう読みますか。",
        "options": {
          "A": "かいぎ",
          "B": "かいご",
          "C": "かいき",
          "D": "かぎい"
        },
        "answer": "A",
        "explanation": "会議 adalah かいぎ, rapat."
      },
      {
        "id": "S1-Q06",
        "number": 6,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「故障」の読み方はどれですか。",
        "options": {
          "A": "こそう",
          "B": "こじょう",
          "C": "こうしょう",
          "D": "こしょう"
        },
        "answer": "D",
        "explanation": "故障 dibaca こしょう, kerusakan mesin."
      },
      {
        "id": "S1-Q07",
        "number": 7,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「準備」の読み方はどれですか。",
        "options": {
          "A": "じゅんぴ",
          "B": "じゅんひ",
          "C": "じゅんび",
          "D": "しゅんび"
        },
        "answer": "C",
        "explanation": "準備 dibaca じゅんび, persiapan."
      },
      {
        "id": "S1-Q08",
        "number": 8,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「残念」の読み方はどれですか。",
        "options": {
          "A": "ざんね",
          "B": "ざんねん",
          "C": "さんねん",
          "D": "ざんれん"
        },
        "answer": "B",
        "explanation": "残念 dibaca ざんねん, sayang/disayangkan."
      },
      {
        "id": "S1-Q09",
        "number": 9,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「やくそく」を漢字で書くとどれですか。",
        "options": {
          "A": "役速",
          "B": "約速",
          "C": "約束",
          "D": "薬束"
        },
        "answer": "C",
        "explanation": "やくそく ditulis 約束, janji."
      },
      {
        "id": "S1-Q10",
        "number": 10,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「ちゅうい」を漢字で書くとどれですか。",
        "options": {
          "A": "中意",
          "B": "注意",
          "C": "主意",
          "D": "注易"
        },
        "answer": "B",
        "explanation": "ちゅうい ditulis 注意, perhatian/peringatan."
      },
      {
        "id": "S1-Q11",
        "number": 11,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「へんじ」を漢字で書くとどれですか。",
        "options": {
          "A": "返字",
          "B": "返事",
          "C": "返時",
          "D": "変事"
        },
        "answer": "B",
        "explanation": "へんじ ditulis 返事, balasan."
      },
      {
        "id": "S1-Q12",
        "number": 12,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「けいかく」を漢字で書くとどれですか。",
        "options": {
          "A": "経画",
          "B": "係画",
          "C": "計書",
          "D": "計画"
        },
        "answer": "D",
        "explanation": "けいかく ditulis 計画, rencana."
      },
      {
        "id": "S1-Q13",
        "number": 13,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "あの店は人気があるので、昼はいつも＿＿います。",
        "options": {
          "A": "ならんで",
          "B": "はこんで",
          "C": "あいて",
          "D": "こんで"
        },
        "answer": "D",
        "explanation": "混んでいます berarti sedang ramai/penuh; subjeknya toko, bukan antreannya."
      },
      {
        "id": "S1-Q14",
        "number": 14,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "駅に着いたら、電話で＿＿ください。",
        "options": {
          "A": "集めて",
          "B": "続けて",
          "C": "捨てて",
          "D": "知らせて"
        },
        "answer": "D",
        "explanation": "知らせる berarti memberi kabar saat sudah tiba."
      },
      {
        "id": "S1-Q15",
        "number": 15,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "お金が足りないので、買うのを＿＿ました。",
        "options": {
          "A": "届け",
          "B": "決め",
          "C": "始め",
          "D": "やめ"
        },
        "answer": "D",
        "explanation": "やめる adalah membatalkan/tidak jadi membeli."
      },
      {
        "id": "S1-Q16",
        "number": 16,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "この道は夜になると暗いので、＿＿をつけて歩いてください。",
        "options": {
          "A": "ライト",
          "B": "電気",
          "C": "光",
          "D": "電池"
        },
        "answer": "A",
        "explanation": "ライトをつける = menyalakan lampu/senter; pilihan lain kurang tepat dalam konteks berjalan."
      },
      {
        "id": "S1-Q17",
        "number": 17,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「もう少し待ってください」に近い意味はどれですか。",
        "options": {
          "A": "ずっと走ってください",
          "B": "ちょっと待ってください",
          "C": "すぐ帰ってください",
          "D": "先に入ってください"
        },
        "answer": "B",
        "explanation": "もう少し待って ≈ tunggu sebentar lagi."
      },
      {
        "id": "S1-Q18",
        "number": 18,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「田中さんに伝えてください」に近い意味はどれですか。",
        "options": {
          "A": "田中さんに習ってください",
          "B": "田中さんに知らせてください",
          "C": "田中さんに借りてください",
          "D": "田中さんを迎えてください"
        },
        "answer": "B",
        "explanation": "伝える di sini = menyampaikan/memberi tahu."
      },
      {
        "id": "S1-Q19",
        "number": 19,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「今日は都合が悪いです」に近い意味はどれですか。",
        "options": {
          "A": "今日は天気が悪いです",
          "B": "今日は道が分かりません",
          "C": "今日は具合が悪いです",
          "D": "今日は時間が合いません"
        },
        "answer": "D",
        "explanation": "都合が悪い berarti tidak cocok dengan jadwal/keadaan, bukan selalu sedang sakit."
      },
      {
        "id": "S1-Q20",
        "number": 20,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「家から会社まで一時間かかります」に近い意味はどれですか。",
        "options": {
          "A": "会社は一時間で閉まります",
          "B": "会社に一時間います",
          "C": "一時間後に起きます",
          "D": "通勤に一時間必要です"
        },
        "answer": "D",
        "explanation": "かかる dalam kalimat ini menyatakan lama perjalanan."
      },
      {
        "id": "S1-Q21",
        "number": 21,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "私は道が分からなかったので、駅員に＿＿もらいました。",
        "options": {
          "A": "教えた",
          "B": "教える",
          "C": "教え",
          "D": "教えて"
        },
        "answer": "D",
        "explanation": "～てもらう: menerima bantuan orang lain; bentuk て dari 教える."
      },
      {
        "id": "S1-Q22",
        "number": 22,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この漢字は難しくて、何度練習しても＿＿覚えられません。",
        "options": {
          "A": "ぜひ",
          "B": "たくさん",
          "C": "きっと",
          "D": "なかなか"
        },
        "answer": "D",
        "explanation": "なかなか＋negatif menyatakan 'sulit untuk berhasil' meski sudah berusaha."
      },
      {
        "id": "S1-Q23",
        "number": 23,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "明日は早く出る＿＿、今晩かばんを準備します。",
        "options": {
          "A": "ように",
          "B": "ために",
          "C": "あいだに",
          "D": "ところに"
        },
        "answer": "B",
        "explanation": "～ために menyatakan tujuan yang dikehendaki pelaku yang sama."
      },
      {
        "id": "S1-Q24",
        "number": 24,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "父がテレビを見ている＿＿、私は夕食を作っていました。",
        "options": {
          "A": "から",
          "B": "まで",
          "C": "あいだ",
          "D": "ため"
        },
        "answer": "C",
        "explanation": "～ている間 menunjukkan dua peristiwa berlangsung bersamaan."
      },
      {
        "id": "S1-Q25",
        "number": 25,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "先生に作文を＿＿あとで、間違いを直しました。",
        "options": {
          "A": "見るもらった",
          "B": "見てもらった",
          "C": "見られた",
          "D": "見てあげた"
        },
        "answer": "B",
        "explanation": "Saya meminta guru mengecek作文; ～てもらう cocok."
      },
      {
        "id": "S1-Q26",
        "number": 26,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この図書館では大きな声で話して＿＿。",
        "options": {
          "A": "もいいです",
          "B": "はいけません",
          "C": "ことがあります",
          "D": "しまいます"
        },
        "answer": "B",
        "explanation": "～てはいけません: larangan, sesuai aturan perpustakaan."
      },
      {
        "id": "S1-Q27",
        "number": 27,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "バスに乗り遅れた＿＿、約束の時間に間に合いませんでした。",
        "options": {
          "A": "ので",
          "B": "のに",
          "C": "ように",
          "D": "ために"
        },
        "answer": "A",
        "explanation": "ので memberi alasan keterlambatan; ために tidak cocok dalam konstruksi ini."
      },
      {
        "id": "S1-Q28",
        "number": 28,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "窓を＿＿まま、出かけてしまいました。",
        "options": {
          "A": "開いて",
          "B": "開ける",
          "C": "開けて",
          "D": "開けた"
        },
        "answer": "D",
        "explanation": "～たまま: membiarkan jendela dalam keadaan sudah dibuka."
      },
      {
        "id": "S1-Q29",
        "number": 29,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "母に頼まれたので、帰りに牛乳を買って＿＿。",
        "options": {
          "A": "きました",
          "B": "みました",
          "C": "いました",
          "D": "おきました"
        },
        "answer": "A",
        "explanation": "買ってきました = pergi membeli lalu kembali membawa barang."
      },
      {
        "id": "S1-Q30",
        "number": 30,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この店は駅から近い＿＿、値段も安いです。",
        "options": {
          "A": "ほど",
          "B": "し",
          "C": "なら",
          "D": "ため"
        },
        "answer": "B",
        "explanation": "～し、～し menyebutkan beberapa alasan/kelebihan."
      },
      {
        "id": "S1-Q31",
        "number": 31,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この道をまっすぐ＿＿、右に郵便局があります。",
        "options": {
          "A": "行くと",
          "B": "行くので",
          "C": "行っても",
          "D": "行けばなら"
        },
        "answer": "A",
        "explanation": "～と menunjukkan hasil yang lazim saat mengikuti petunjuk jalan."
      },
      {
        "id": "S1-Q32",
        "number": 32,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "雨が＿＿かもしれないので、かさを持っていきます。",
        "options": {
          "A": "降ったら",
          "B": "降って",
          "C": "降る",
          "D": "降り"
        },
        "answer": "C",
        "explanation": "～かもしれない menerima bentuk kamus 降る."
      },
      {
        "id": "S1-Q33",
        "number": 33,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "彼は日本語が話せる＿＿、漢字を読むのはまだ苦手です。",
        "options": {
          "A": "ために",
          "B": "ように",
          "C": "のに",
          "D": "ことに"
        },
        "answer": "C",
        "explanation": "～のに menyatakan kontras yang tidak sesuai harapan."
      },
      {
        "id": "S1-Q34",
        "number": 34,
        "category": "grammar",
        "kind": "essay",
        "prompt": "友だちの約束を急に変更したいです。「理由」「新しい時間」「謝る言葉」を入れて、日本語で二～三文のメッセージを書いてください。",
        "sample_answer": "ごめんなさい。今日は家族の用事があるので、行けなくなりました。明日の午後三時に会いませんか。",
        "rubric": "Permintaan maaf (0.25), alasan masuk akal (0.25), ajakan waktu pengganti (0.25), tata bahasa dapat dipahami (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S1-Q35",
        "number": 35,
        "category": "grammar",
        "kind": "essay",
        "prompt": "来週の試験のために、今日から何をするつもりですか。理由を入れて日本語で二～三文書いてください。",
        "sample_answer": "今日から毎晩漢字を三十分復習するつもりです。最近、漢字をよく忘れてしまうからです。",
        "rubric": "Niat ～つもり (0.25), rencana belajar spesifik (0.25), alasan relevan (0.25), Jepang mudah dipahami (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S1-Q36",
        "number": 36,
        "category": "reading",
        "kind": "mcq",
        "prompt": "日曜日の午後六時に本を借りられますか。",
        "options": {
          "A": "いいえ、日曜日は休みです",
          "B": "いいえ、午後五時までです",
          "C": "はい、午後七時までです",
          "D": "はい、月曜日までです"
        },
        "answer": "B",
        "explanation": "日曜日は17時までなので18時は閉館後。",
        "passage_id": "S1-R1"
      },
      {
        "id": "S1-Q37",
        "number": 37,
        "category": "reading",
        "kind": "mcq",
        "prompt": "六冊の本を同時に借りたい人はどうしますか。",
        "options": {
          "A": "一度に六冊借りられます",
          "B": "二日待てば六冊借りられます",
          "C": "土曜日なら六冊借りられます",
          "D": "まず五冊まで借ります"
        },
        "answer": "D",
        "explanation": "一人5冊が上限で、曜日による例外なし。",
        "passage_id": "S1-R1"
      },
      {
        "id": "S1-Q38",
        "number": 38,
        "category": "reading",
        "kind": "mcq",
        "prompt": "本の返却日が月曜日だったら、いつ返せばいいですか。",
        "options": {
          "A": "月曜日",
          "B": "日曜日だけ",
          "C": "金曜日",
          "D": "火曜日"
        },
        "answer": "D",
        "explanation": "休館日は月曜日、その翌日火曜日に返却。",
        "passage_id": "S1-R1"
      },
      {
        "id": "S1-Q39",
        "number": 39,
        "category": "reading",
        "kind": "mcq",
        "prompt": "参加したい人はいつまでに何をしますか。",
        "options": {
          "A": "金曜日までに電話する",
          "B": "土曜日にメールする",
          "C": "土曜日に会場へ行く",
          "D": "金曜日に材料を買う"
        },
        "answer": "A",
        "explanation": "申し込み期限は金曜日、方法は電話。",
        "passage_id": "S1-R2"
      },
      {
        "id": "S1-Q40",
        "number": 40,
        "category": "reading",
        "kind": "mcq",
        "prompt": "参加者が持っていくものはどれですか。",
        "options": {
          "A": "昼ご飯と水",
          "B": "材料と包丁",
          "C": "料理の本と写真",
          "D": "エプロンとタオル"
        },
        "answer": "D",
        "explanation": "持参はエプロンとタオル、材料は会場提供。",
        "passage_id": "S1-R2"
      },
      {
        "id": "S1-Q41",
        "number": 41,
        "category": "reading",
        "kind": "mcq",
        "prompt": "教室の時間はどのぐらいですか。",
        "options": {
          "A": "三時間",
          "B": "四時間",
          "C": "二時間",
          "D": "一時間"
        },
        "answer": "A",
        "explanation": "10時〜13時で3時間。",
        "passage_id": "S1-R2"
      },
      {
        "id": "S1-Q42",
        "number": 42,
        "category": "reading",
        "kind": "mcq",
        "prompt": "山へ行かなかった理由は何ですか。",
        "options": {
          "A": "山が遠かったから",
          "B": "友だちが病気だったから",
          "C": "午後の予定があったから",
          "D": "朝の雨が強かったから"
        },
        "answer": "D",
        "explanation": "中止の直接の理由は朝の強い雨。",
        "passage_id": "S1-R3"
      },
      {
        "id": "S1-Q43",
        "number": 43,
        "category": "reading",
        "kind": "mcq",
        "prompt": "二人は結局何をしましたか。",
        "options": {
          "A": "買い物に行った",
          "B": "山に登った",
          "C": "映画を見た",
          "D": "料理を作った"
        },
        "answer": "D",
        "explanation": "結局家で料理を作った。",
        "passage_id": "S1-R3"
      },
      {
        "id": "S1-Q44",
        "number": 44,
        "category": "reading",
        "kind": "mcq",
        "prompt": "午後、二人はどうしましたか。",
        "options": {
          "A": "雨がやんだので出かけた",
          "B": "別々に帰った",
          "C": "家にいた",
          "D": "映画館へ行った"
        },
        "answer": "C",
        "explanation": "午後も出かけなかった。",
        "passage_id": "S1-R3"
      },
      {
        "id": "S1-Q45",
        "number": 45,
        "category": "reading",
        "kind": "mcq",
        "prompt": "かばんについて正しいのはどれですか。",
        "options": {
          "A": "色が赤に変わった",
          "B": "今日発送した",
          "C": "もう到着した",
          "D": "まだ発送されていない"
        },
        "answer": "B",
        "explanation": "本日発送しましたと明記。",
        "passage_id": "S1-R4"
      },
      {
        "id": "S1-Q46",
        "number": 46,
        "category": "reading",
        "kind": "mcq",
        "prompt": "配達が遅れるかもしれない理由は何ですか。",
        "options": {
          "A": "商品が売り切れた",
          "B": "住所を間違えた",
          "C": "店が休みだった",
          "D": "台風の影響"
        },
        "answer": "D",
        "explanation": "台風により通常より1日程度遅れる可能性。",
        "passage_id": "S1-R4"
      },
      {
        "id": "S1-Q47",
        "number": 47,
        "category": "reading",
        "kind": "mcq",
        "prompt": "今から住所を変えられますか。",
        "options": {
          "A": "送料を払えばできる",
          "B": "電話ならできる",
          "C": "発送後なのでできない",
          "D": "台風が終わればできる"
        },
        "answer": "C",
        "explanation": "発送後の住所変更は不可。",
        "passage_id": "S1-R4"
      },
      {
        "id": "S1-Q48",
        "number": 48,
        "category": "reading",
        "kind": "mcq",
        "prompt": "発表する学生は最初にどこに行きますか。",
        "options": {
          "A": "三階の教室",
          "B": "二階の受付",
          "C": "一階の食堂",
          "D": "学校の門"
        },
        "answer": "B",
        "explanation": "参加学生は13:30までに2階受付集合。",
        "passage_id": "S1-R5"
      },
      {
        "id": "S1-Q49",
        "number": 49,
        "category": "reading",
        "kind": "mcq",
        "prompt": "見学する人は何をしますか。",
        "options": {
          "A": "原稿を読む",
          "B": "全員受付に集まる",
          "C": "直接三階に行ってよい",
          "D": "一時半までに来る必要がある"
        },
        "answer": "C",
        "explanation": "見学者は直接3階に行ける。",
        "passage_id": "S1-R5"
      },
      {
        "id": "S1-Q50",
        "number": 50,
        "category": "reading",
        "kind": "mcq",
        "prompt": "発表する学生について正しいのはどれですか。",
        "options": {
          "A": "二時間話し続ける",
          "B": "三階に一時集合する",
          "C": "原稿を見てはいけない",
          "D": "できれば前を見て話す"
        },
        "answer": "D",
        "explanation": "原稿可。ただし顔を上げて話すことが推奨。",
        "passage_id": "S1-R5"
      },
      {
        "id": "S1-Q51",
        "number": 51,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "女の人が会社に忘れたものは何ですか。",
        "options": {
          "A": "手袋",
          "B": "かばん",
          "C": "時計",
          "D": "かさ"
        },
        "answer": "D",
        "explanation": "Panel 2 meletakkan payung, panel 3 pulang tanpa mengambilnya.",
        "title": "忘れた傘",
        "panels": [
          "朝、女性がかさを持って家を出る",
          "会社の入口でかさ立てに置く",
          "夜、女性がかさを忘れて手ぶらで帰る",
          "外で雨が降り、女性が濡れて困る"
        ],
        "asset": "images/set-1/stories/q51.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S1-Q52",
        "number": 52,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "男の人は切符を買ったあと、最初に何をしましたか。",
        "options": {
          "A": "電車に乗った",
          "B": "路線図を見た",
          "C": "改札を通った",
          "D": "家に帰った"
        },
        "answer": "C",
        "explanation": "Setelah membeli tiket, melewati gerbang tiket.",
        "title": "切符の買い方",
        "panels": [
          "男性が駅で行き先を路線図で探す",
          "券売機で切符を買う",
          "改札口に切符を入れて通る",
          "ホームで電車を待つ"
        ],
        "asset": "images/set-1/stories/q52.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S1-Q53",
        "number": 53,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "女の人は最後に何をしましたか。",
        "options": {
          "A": "電話をかけた",
          "B": "買い物した",
          "C": "火を消した",
          "D": "水を飲んだ"
        },
        "answer": "C",
        "explanation": "Adegan terakhir mematikan kompor.",
        "title": "料理の失敗",
        "panels": [
          "女性がなべに水を入れて火をつける",
          "電話が鳴り、女性が別の部屋へ行く",
          "なべの水が少なくなって煙が出る",
          "女性が戻って火を消す"
        ],
        "asset": "images/set-1/stories/q53.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S1-Q54",
        "number": 54,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "男の人が店へ行った理由は何ですか。",
        "options": {
          "A": "道を聞くから",
          "B": "タイヤが壊れたから",
          "C": "新しい自転車を買うから",
          "D": "鍵をなくしたから"
        },
        "answer": "B",
        "explanation": "Ban bocor sehingga mencari bengkel.",
        "title": "自転車の修理",
        "panels": [
          "男性が自転車で出かける",
          "道路で後輪がパンクしていることに気づく",
          "自転車を押して自転車屋へ行く",
          "店員がタイヤを直し、男性が笑顔になる"
        ],
        "asset": "images/set-1/stories/q54.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S1-Q55",
        "number": 55,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "二人はどこで昼ご飯を食べましたか。",
        "options": {
          "A": "電車の中",
          "B": "学校の屋上",
          "C": "公園のベンチ",
          "D": "建物の中"
        },
        "answer": "D",
        "explanation": "Karena hujan makan di dalam bangunan.",
        "title": "昼休みの予定",
        "panels": [
          "二人が公園で昼食を食べようとする",
          "急に雨が降り始める",
          "二人が屋根のある建物へ走る",
          "建物の中で弁当を食べる"
        ],
        "asset": "images/set-1/stories/q55.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S1-Q56",
        "number": 56,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "男の人は左手で傘を持ちながら、右手でかばんを持っています。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar D",
          "C": "Gambar B",
          "D": "Gambar A"
        },
        "answer": "D",
        "explanation": "Sisi tangan + jenis objek dan orang harus cocok.",
        "image_options": {
          "A": {
            "scene": "Pria payung di tangan kiri, tas di tangan kanan",
            "src": "images/set-1/matching/q56-a.svg"
          },
          "B": {
            "scene": "Pria payung di tangan kanan, tas di tangan kiri",
            "src": "images/set-1/matching/q56-b.svg"
          },
          "C": {
            "scene": "Pria memegang dua tas, tanpa payung",
            "src": "images/set-1/matching/q56-c.svg"
          },
          "D": {
            "scene": "Perempuan payung di tangan kiri dan tas kanan",
            "src": "images/set-1/matching/q56-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S1-Q57",
        "number": 57,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "テーブルの下に猫がいて、上にはコップが二つあります。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar A",
          "C": "Gambar D",
          "D": "Gambar B"
        },
        "answer": "A",
        "explanation": "Kucing di bawah meja dan 2 gelas di atas.",
        "image_options": {
          "A": {
            "scene": "Kucing di atas meja, 2 gelas di bawah",
            "src": "images/set-1/matching/q57-a.svg"
          },
          "B": {
            "scene": "Kucing di bawah meja, 1 gelas di atas",
            "src": "images/set-1/matching/q57-b.svg"
          },
          "C": {
            "scene": "Kucing di bawah meja, 2 gelas di atas",
            "src": "images/set-1/matching/q57-c.svg"
          },
          "D": {
            "scene": "Anjing di bawah meja, 2 gelas di atas",
            "src": "images/set-1/matching/q57-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S1-Q58",
        "number": 58,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "時計は九時十五分を指しています。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar B",
          "C": "Gambar A",
          "D": "Gambar C"
        },
        "answer": "B",
        "explanation": "Jam 9 lewat 15 menit.",
        "image_options": {
          "A": {
            "scene": "Jam analog menunjukkan 9:45",
            "src": "images/set-1/matching/q58-a.svg"
          },
          "B": {
            "scene": "Jam analog menunjukkan 9:15",
            "src": "images/set-1/matching/q58-b.svg"
          },
          "C": {
            "scene": "Jam analog menunjukkan 3:09",
            "src": "images/set-1/matching/q58-c.svg"
          },
          "D": {
            "scene": "Jam analog menunjukkan 8:15",
            "src": "images/set-1/matching/q58-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S1-Q59",
        "number": 59,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "バス停で三人が並んでいて、一番前の人が帽子をかぶっています。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar B",
          "C": "Gambar A",
          "D": "Gambar D"
        },
        "answer": "C",
        "explanation": "Tiga orang mengantre, paling depan bertopi.",
        "image_options": {
          "A": {
            "scene": "3 orang antre, paling depan memakai topi",
            "src": "images/set-1/matching/q59-a.svg"
          },
          "B": {
            "scene": "3 orang antre, paling belakang bertopi",
            "src": "images/set-1/matching/q59-b.svg"
          },
          "C": {
            "scene": "2 orang antre, paling depan bertopi",
            "src": "images/set-1/matching/q59-c.svg"
          },
          "D": {
            "scene": "3 orang duduk, orang tengah bertopi",
            "src": "images/set-1/matching/q59-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S1-Q60",
        "number": 60,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "女の人は電車を降りたあと、階段を上っています。",
        "options": {
          "A": "Gambar B",
          "B": "Gambar A",
          "C": "Gambar C",
          "D": "Gambar D"
        },
        "answer": "D",
        "explanation": "Urutan turun kereta lalu naik tangga.",
        "image_options": {
          "A": {
            "scene": "Wanita naik kereta lalu duduk",
            "src": "images/set-1/matching/q60-a.svg"
          },
          "B": {
            "scene": "Wanita turun kereta lalu menuruni tangga",
            "src": "images/set-1/matching/q60-b.svg"
          },
          "C": {
            "scene": "Wanita keluar bus lalu naik tangga",
            "src": "images/set-1/matching/q60-c.svg"
          },
          "D": {
            "scene": "Wanita keluar kereta dan menaiki tangga",
            "src": "images/set-1/matching/q60-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S1-Q61",
        "number": 61,
        "category": "listening",
        "kind": "mcq",
        "prompt": "会議は何時からですか。",
        "options": {
          "A": "午後二時",
          "B": "午後四時",
          "C": "午後五時",
          "D": "午後三時"
        },
        "answer": "B",
        "explanation": "Karena kepala bagian terlambat, mulai pukul 16:00.",
        "transcript": "女：会議は三時からでしたよね。\n男：いいえ、部長が遅れるので四時からになりました。会議室は同じです。",
        "audio_src": "audio/set-1/q61.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q62",
        "number": 62,
        "category": "listening",
        "kind": "mcq",
        "prompt": "今日、二つのシャツの値段はどうですか。",
        "options": {
          "A": "どちらも三千円",
          "B": "同じ値段",
          "C": "青のほうが高い",
          "D": "赤のほうが高い"
        },
        "answer": "B",
        "explanation": "Merah 3000−500=2500, biru 2500.",
        "transcript": "男：この赤いシャツは三千円ですね。青いのは？\n女：青いのは二千五百円です。でも今日は赤いほうが五百円引きです。",
        "audio_src": "audio/set-1/q62.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q63",
        "number": 63,
        "category": "listening",
        "kind": "mcq",
        "prompt": "歩いて行くと、どのぐらいかかりますか。",
        "options": {
          "A": "三十分",
          "B": "七分",
          "C": "十分",
          "D": "二十分"
        },
        "answer": "D",
        "explanation": "Jalan kaki sekitar 20 menit.",
        "transcript": "女：図書館までどのぐらいかかりますか。\n男：歩くと二十分ぐらいですが、自転車なら七分です。雨ですから歩いたほうがいいかもしれません。",
        "audio_src": "audio/set-1/q63.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q64",
        "number": 64,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人はどこにいますか。",
        "options": {
          "A": "学校の食堂",
          "B": "郵便局の向かいの大きいカフェ",
          "C": "郵便局の隣の小さいカフェ",
          "D": "駅の中の店"
        },
        "answer": "C",
        "explanation": "Kafe kecil dekat kantor pos.",
        "transcript": "男：駅前のカフェで待っています。\n女：駅前には二つありますよ。\n男：郵便局のとなりの小さいほうです。",
        "audio_src": "audio/set-1/q64.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q65",
        "number": 65,
        "category": "listening",
        "kind": "mcq",
        "prompt": "遠足で気をつけることは何ですか。",
        "options": {
          "A": "ごみを持ち帰る",
          "B": "お菓子を買わない",
          "C": "早く帰る",
          "D": "水を飲まない"
        },
        "answer": "A",
        "explanation": "Makanan ringan boleh, sampah wajib dibawa pulang.",
        "transcript": "女：明日の遠足にお菓子を持って行ってもいいですか。\n男：いいですよ。でもごみは必ず持って帰ってください。",
        "audio_src": "audio/set-1/q65.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q66",
        "number": 66,
        "category": "listening",
        "kind": "mcq",
        "prompt": "荷物はいつ届きますか。",
        "options": {
          "A": "今日",
          "B": "二日後",
          "C": "一週間後",
          "D": "明日"
        },
        "answer": "B",
        "explanation": "Tujuan luar prefektur membutuhkan 2 hari.",
        "transcript": "男：この荷物を明日までに届けられますか。\n女：市内なら大丈夫ですが、住所は県の外ですね。二日かかります。",
        "audio_src": "audio/set-1/q66.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q67",
        "number": 67,
        "category": "listening",
        "kind": "mcq",
        "prompt": "山田さんは何を頼みましたか。",
        "options": {
          "A": "今すぐ会うこと",
          "B": "今日中の返事",
          "C": "明日の電話",
          "D": "資料のコピー"
        },
        "answer": "B",
        "explanation": "Yamada meminta jawaban hari ini.",
        "transcript": "女：田中さん、さっき電話がありました。\n男：だれからですか。\n女：山田さんです。明日ではなく今日中に返事がほしいそうです。",
        "audio_src": "audio/set-1/q67.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q68",
        "number": 68,
        "category": "listening",
        "kind": "mcq",
        "prompt": "二人は何を注文しますか。",
        "options": {
          "A": "二人ともカレー",
          "B": "女だけカレー",
          "C": "男だけうどん",
          "D": "二人ともうどん"
        },
        "answer": "D",
        "explanation": "Keduanya memutuskan udon.",
        "transcript": "男：昼ご飯、何を食べる？\n女：私はうどんにする。昨日はカレーだったから。\n男：じゃあ、僕も同じのにするよ。",
        "audio_src": "audio/set-1/q68.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q69",
        "number": 69,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人は最後に何に乗りましたか。",
        "options": {
          "A": "自転車",
          "B": "電車",
          "C": "タクシー",
          "D": "バス"
        },
        "answer": "C",
        "explanation": "Akhirnya naik taksi.",
        "transcript": "女：今日はバスで来たんですか。\n男：いいえ、バスが来なかったので、途中まで歩いて、それからタクシーに乗りました。",
        "audio_src": "audio/set-1/q69.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S1-Q70",
        "number": 70,
        "category": "listening",
        "kind": "mcq",
        "prompt": "女の人はいつならテニスができますか。",
        "options": {
          "A": "土曜の夜",
          "B": "日曜の午後二時以降",
          "C": "日曜の朝",
          "D": "日曜の昼前"
        },
        "answer": "B",
        "explanation": "Bisa mulai Minggu setelah jam 14:00.",
        "transcript": "男：今度の日曜、一緒にテニスをしませんか。\n女：午前中は仕事がありますが、午後二時以降なら大丈夫です。",
        "audio_src": "audio/set-1/q70.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      }
    ],
    "passages": [
      {
        "id": "S1-R1",
        "title": "図書館の利用案内",
        "body": "市立図書館は月曜日が休みです。火曜日から金曜日までは午前九時から午後七時まで、土曜日と日曜日は午後五時まで開いています。本は一人五冊まで、二週間借りられます。返す日が休館日のときは、その次の日に返してください。"
      },
      {
        "id": "S1-R2",
        "title": "イベントのお知らせ",
        "body": "町の文化センターでは、来週土曜日に料理教室があります。午前十時に始まり、午後一時に終わります。参加する人は金曜日までに電話で申し込んでください。材料はセンターで用意しますが、エプロンとタオルは自分で持ってきてください。参加費は千円です。"
      },
      {
        "id": "S1-R3",
        "title": "田中さんの日記",
        "body": "昨日は友だちと山に行く予定でした。しかし朝、雨が強く降っていたので、山に行くのをやめました。友だちは映画を見たかったのですが、私は人が多い場所を避けたかったので、二人で家で料理を作りました。午後には雨がやみましたが、もう出かけませんでした。"
      },
      {
        "id": "S1-R4",
        "title": "店からのメール",
        "body": "山本様 ご注文ありがとうございます。青いかばんは本日発送しました。通常は二日後に届きますが、今週は台風の影響で一日ほど遅れるかもしれません。お急ぎの場合は、発送番号を使って配送状況をご確認ください。なお、住所の変更は発送後にはできません。"
      },
      {
        "id": "S1-R5",
        "title": "学校の掲示",
        "body": "日本語クラスの発表会は水曜日の午後二時から四時まで、三階の大きい教室で行います。参加する学生は一時半までに二階の受付に集まってください。見に来る人は直接三階へ行ってもかまいません。発表する学生は原稿を読むことができますが、できれば顔を上げて話してください。"
      }
    ]
  },
  {
    "id": "n4-2",
    "title": "Simulasi N4 2",
    "version": "v3-set-2",
    "questions": [
      {
        "id": "S2-Q01",
        "number": 1,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「連絡」の読み方はどれですか。",
        "options": {
          "A": "れんろく",
          "B": "れんがく",
          "C": "れんらく",
          "D": "れいらく"
        },
        "answer": "C",
        "explanation": "連絡 dibaca れんらく, menghubungi."
      },
      {
        "id": "S2-Q02",
        "number": 2,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「場合」の読み方はどれですか。",
        "options": {
          "A": "ばあい",
          "B": "ばしょ",
          "C": "ばごう",
          "D": "じょうあい"
        },
        "answer": "A",
        "explanation": "場合 dibaca ばあい, keadaan/kasus."
      },
      {
        "id": "S2-Q03",
        "number": 3,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「反対」の読み方はどれですか。",
        "options": {
          "A": "はんたい",
          "B": "はんだい",
          "C": "はんてい",
          "D": "ほんたい"
        },
        "answer": "A",
        "explanation": "反対 dibaca はんたい, sebaliknya/menentang."
      },
      {
        "id": "S2-Q04",
        "number": 4,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「安全」の読み方はどれですか。",
        "options": {
          "A": "あんぜん",
          "B": "あんせん",
          "C": "あんねん",
          "D": "あんぜい"
        },
        "answer": "A",
        "explanation": "安全 dibaca あんぜん, aman."
      },
      {
        "id": "S2-Q05",
        "number": 5,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「予定」の読み方はどれですか。",
        "options": {
          "A": "よっでい",
          "B": "よてい",
          "C": "よだい",
          "D": "ようてい"
        },
        "answer": "B",
        "explanation": "予定 dibaca よてい, jadwal/rencana."
      },
      {
        "id": "S2-Q06",
        "number": 6,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「相談」の読み方はどれですか。",
        "options": {
          "A": "しょうだん",
          "B": "そうだん",
          "C": "そうたん",
          "D": "そうなん"
        },
        "answer": "B",
        "explanation": "相談 dibaca そうだん, konsultasi."
      },
      {
        "id": "S2-Q07",
        "number": 7,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「確か」の読み方はどれですか。",
        "options": {
          "A": "かくしか",
          "B": "たしか",
          "C": "たしが",
          "D": "たじか"
        },
        "answer": "B",
        "explanation": "確か dibaca たしか, seingat saya/pasti."
      },
      {
        "id": "S2-Q08",
        "number": 8,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「季節」の読み方はどれですか。",
        "options": {
          "A": "きせち",
          "B": "きせつ",
          "C": "きぜつ",
          "D": "きせい"
        },
        "answer": "B",
        "explanation": "季節 dibaca きせつ, musim."
      },
      {
        "id": "S2-Q09",
        "number": 9,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「ちこく」を漢字で書くとどれですか。",
        "options": {
          "A": "遅刻",
          "B": "地刻",
          "C": "知刻",
          "D": "遅国"
        },
        "answer": "A",
        "explanation": "ちこく adalah 遅刻, terlambat."
      },
      {
        "id": "S2-Q10",
        "number": 10,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「しゅっぱつ」を漢字で書くとどれですか。",
        "options": {
          "A": "出泊",
          "B": "出初",
          "C": "出活",
          "D": "出発"
        },
        "answer": "D",
        "explanation": "しゅっぱつ ditulis 出発, berangkat."
      },
      {
        "id": "S2-Q11",
        "number": 11,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「むり」を漢字で書くとどれですか。",
        "options": {
          "A": "不理",
          "B": "無理",
          "C": "無利",
          "D": "未理"
        },
        "answer": "B",
        "explanation": "むり adalah 無理, tidak mungkin/terlalu berat."
      },
      {
        "id": "S2-Q12",
        "number": 12,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「せいかつ」を漢字で書くとどれですか。",
        "options": {
          "A": "成活",
          "B": "生活",
          "C": "生話",
          "D": "正活"
        },
        "answer": "B",
        "explanation": "せいかつ = 生活, kehidupan sehari-hari."
      },
      {
        "id": "S2-Q13",
        "number": 13,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "この荷物は重すぎるので、一人では＿＿ません。",
        "options": {
          "A": "はしれ",
          "B": "ならべ",
          "C": "すすめ",
          "D": "はこべ"
        },
        "answer": "D",
        "explanation": "運べません = tidak bisa mengangkut/membawa barang ini."
      },
      {
        "id": "S2-Q14",
        "number": 14,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "友だちに借りた本を、明日＿＿つもりです。",
        "options": {
          "A": "帰る",
          "B": "直す",
          "C": "返す",
          "D": "払う"
        },
        "answer": "C",
        "explanation": "返す dipakai untuk mengembalikan barang pinjaman."
      },
      {
        "id": "S2-Q15",
        "number": 15,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "電車が止まっているので、別の行き方を＿＿ましょう。",
        "options": {
          "A": "比べ",
          "B": "直し",
          "C": "探し",
          "D": "閉め"
        },
        "answer": "C",
        "explanation": "探す berarti mencari rute alternatif."
      },
      {
        "id": "S2-Q16",
        "number": 16,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "名前が間違っています。ここを＿＿ください。",
        "options": {
          "A": "直して",
          "B": "忘れて",
          "C": "消して",
          "D": "見せて"
        },
        "answer": "A",
        "explanation": "直す berarti memperbaiki kesalahan penulisan."
      },
      {
        "id": "S2-Q17",
        "number": 17,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「電車が遅れています」に近い意味はどれですか。",
        "options": {
          "A": "電車が早く来ました",
          "B": "電車がもうなくなりました",
          "C": "電車はまだ予定の時間に来ていません",
          "D": "電車を乗り間違えました"
        },
        "answer": "C",
        "explanation": "遅れる = tiba/berjalan melewati jadwal."
      },
      {
        "id": "S2-Q18",
        "number": 18,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「なるべく早く来てください」に近い意味はどれですか。",
        "options": {
          "A": "できるだけ早く来てください",
          "B": "一人で来てください",
          "C": "必ず明日来てください",
          "D": "急がなくてもいいです"
        },
        "answer": "A",
        "explanation": "なるべく = sebisa mungkin."
      },
      {
        "id": "S2-Q19",
        "number": 19,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「この仕事を手伝ってください」に近い意味はどれですか。",
        "options": {
          "A": "この仕事を忘れてください",
          "B": "この仕事を選んでください",
          "C": "この仕事を始めてください",
          "D": "一緒にこの仕事をしてください"
        },
        "answer": "D",
        "explanation": "手伝う = membantu melakukan pekerjaan."
      },
      {
        "id": "S2-Q20",
        "number": 20,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「午後は予定が入っています」に近い意味はどれですか。",
        "options": {
          "A": "午後は帰りません",
          "B": "午後から雨が降ります",
          "C": "午後は約束などがあります",
          "D": "午後はひまです"
        },
        "answer": "C",
        "explanation": "予定が入る berarti sudah ada agenda."
      },
      {
        "id": "S2-Q21",
        "number": 21,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "昨日、友だちから借りた本を＿＿しまいました。",
        "options": {
          "A": "なくし",
          "B": "なくす",
          "C": "なくした",
          "D": "なくして"
        },
        "answer": "D",
        "explanation": "なくしてしまう = terlanjur kehilangan; penyesalan."
      },
      {
        "id": "S2-Q22",
        "number": 22,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "忙しくても、毎日三十分は日本語を＿＿つもりです。",
        "options": {
          "A": "勉強しよう",
          "B": "勉強する",
          "C": "勉強した",
          "D": "勉強して"
        },
        "answer": "B",
        "explanation": "つもりだ menerima bentuk kamus untuk niat masa depan."
      },
      {
        "id": "S2-Q23",
        "number": 23,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "会議が始まる＿＿、資料を十部コピーしてください。",
        "options": {
          "A": "まで",
          "B": "あいだ",
          "C": "うち",
          "D": "までに"
        },
        "answer": "D",
        "explanation": "～までに = tenggat sebelum rapat mulai, bukan durasi menunggu."
      },
      {
        "id": "S2-Q24",
        "number": 24,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "駅に着いた＿＿、私に連絡してください。",
        "options": {
          "A": "なら",
          "B": "ら",
          "C": "ので",
          "D": "たら"
        },
        "answer": "D",
        "explanation": "～たら menandai setelah sampai; 着いたら."
      },
      {
        "id": "S2-Q25",
        "number": 25,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この仕事は一人ではできないので、先輩に＿＿ことにしました。",
        "options": {
          "A": "手伝ってもらう",
          "B": "手伝わせる",
          "C": "手伝われる",
          "D": "手伝ってあげる"
        },
        "answer": "A",
        "explanation": "Minta bantuan senior: ～てもらう."
      },
      {
        "id": "S2-Q26",
        "number": 26,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "説明を聞いた＿＿、使い方が分かりませんでした。",
        "options": {
          "A": "ために",
          "B": "のに",
          "C": "と",
          "D": "ので"
        },
        "answer": "B",
        "explanation": "～のに: sudah dijelaskan tetapi belum paham."
      },
      {
        "id": "S2-Q27",
        "number": 27,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "祖母は目が悪いので、大きい字で＿＿あげます。",
        "options": {
          "A": "書いて",
          "B": "書き",
          "C": "書かせて",
          "D": "書く"
        },
        "answer": "A",
        "explanation": "～てあげる = menulis untuk membantu nenek."
      },
      {
        "id": "S2-Q28",
        "number": 28,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "このかばんは旅行＿＿便利だと思います。",
        "options": {
          "A": "が",
          "B": "で",
          "C": "に",
          "D": "へ"
        },
        "answer": "C",
        "explanation": "～に便利: cocok/berguna untuk keperluan tertentu."
      },
      {
        "id": "S2-Q29",
        "number": 29,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "日本に行ったら、富士山に登って＿＿です。",
        "options": {
          "A": "みたい",
          "B": "みます",
          "C": "しまう",
          "D": "おく"
        },
        "answer": "A",
        "explanation": "～てみたいです menyatakan keinginan mencoba."
      },
      {
        "id": "S2-Q30",
        "number": 30,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "電車が出る＿＿にホームへ行きましょう。",
        "options": {
          "A": "時",
          "B": "後",
          "C": "前",
          "D": "間"
        },
        "answer": "C",
        "explanation": "出る前に = sebelum keberangkatan."
      },
      {
        "id": "S2-Q31",
        "number": 31,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "あした雨が＿＿、遠足は来週になります。",
        "options": {
          "A": "降りながら",
          "B": "降るように",
          "C": "降るので",
          "D": "降ったら"
        },
        "answer": "D",
        "explanation": "Conditional ～たら cocok untuk keputusan jika hujan."
      },
      {
        "id": "S2-Q32",
        "number": 32,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "私は兄＿＿背が高くありません。",
        "options": {
          "A": "まで",
          "B": "より",
          "C": "ほど",
          "D": "しか"
        },
        "answer": "C",
        "explanation": "AはBほど～ない: tidak setinggi B."
      },
      {
        "id": "S2-Q33",
        "number": 33,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "子どもが寝ているので、テレビの音を小さく＿＿ください。",
        "options": {
          "A": "なって",
          "B": "して",
          "C": "あって",
          "D": "させて"
        },
        "answer": "B",
        "explanation": "～くする perubahan sengaja pada kata sifat い."
      },
      {
        "id": "S2-Q34",
        "number": 34,
        "category": "grammar",
        "kind": "essay",
        "prompt": "日本の図書館で本を返すのが一日遅くなりました。係の人に「おわび」「理由」「どうすればいいか聞く」を入れて二～三文で言ってください。",
        "sample_answer": "すみません。本を一日遅く返してしまいました。昨日は熱があったのですが、どうすればいいでしょうか。",
        "rubric": "Minta maaf (0.25), keterlambatan (0.25), menanyakan langkah selanjutnya (0.25), bahasa sopan (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S2-Q35",
        "number": 35,
        "category": "grammar",
        "kind": "essay",
        "prompt": "日本語を勉強していて、できるようになったことと、まだ難しいことをそれぞれ一つ、二～三文で書いてください。",
        "sample_answer": "短いニュースなら少し聞き取れるようになりました。でも、漢字を早く読むのはまだ難しいです。",
        "rubric": "Kemajuan (0.25), kesulitan (0.25), kontras dan tata bahasa (0.25), keterbacaan (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S2-Q36",
        "number": 36,
        "category": "reading",
        "kind": "mcq",
        "prompt": "日曜日の午後六時にプールを使えますか。",
        "options": {
          "A": "会員だけ使える",
          "B": "使えない",
          "C": "子どもだけ使える",
          "D": "使える"
        },
        "answer": "B",
        "explanation": "日曜日の閉館は16時。",
        "passage_id": "S2-R1"
      },
      {
        "id": "S2-Q37",
        "number": 37,
        "category": "reading",
        "kind": "mcq",
        "prompt": "初めて来た大人が払うお金はいくらですか。",
        "options": {
          "A": "千円",
          "B": "カード代だけ五百円",
          "C": "無料",
          "D": "プール代五百円"
        },
        "answer": "D",
        "explanation": "カード無料、プール1回500円。",
        "passage_id": "S2-R1"
      },
      {
        "id": "S2-Q38",
        "number": 38,
        "category": "reading",
        "kind": "mcq",
        "prompt": "小学生が利用する場合はどうですか。",
        "options": {
          "A": "日曜日だけ利用可",
          "B": "会員カードは不要",
          "C": "いつでも無料",
          "D": "一人では入れない"
        },
        "answer": "D",
        "explanation": "小学生だけでの利用不可。",
        "passage_id": "S2-R1"
      },
      {
        "id": "S2-Q39",
        "number": 39,
        "category": "reading",
        "kind": "mcq",
        "prompt": "大学に行く人はどの電車を使いますか。",
        "options": {
          "A": "急行電車",
          "B": "一番線の急行電車",
          "C": "二番線の普通電車",
          "D": "どの電車でもよい"
        },
        "answer": "C",
        "explanation": "普通電車を使う必要がある。",
        "passage_id": "S2-R2"
      },
      {
        "id": "S2-Q40",
        "number": 40,
        "category": "reading",
        "kind": "mcq",
        "prompt": "電車からバスに乗り換える場所はどこですか。",
        "options": {
          "A": "最初の駅の北口",
          "B": "二番線ホーム",
          "C": "大学の前",
          "D": "三つ目の駅の南口"
        },
        "answer": "D",
        "explanation": "三つ目の駅で降り南口からバス。",
        "passage_id": "S2-R2"
      },
      {
        "id": "S2-Q41",
        "number": 41,
        "category": "reading",
        "kind": "mcq",
        "prompt": "九時に授業がある学生への助言は何ですか。",
        "options": {
          "A": "急行に乗る",
          "B": "バスを使わない",
          "C": "八時に起きる",
          "D": "いつもより早く出る"
        },
        "answer": "D",
        "explanation": "8時頃は道路が混むので早く出る。",
        "passage_id": "S2-R2"
      },
      {
        "id": "S2-Q42",
        "number": 42,
        "category": "reading",
        "kind": "mcq",
        "prompt": "打ち合わせが始まるのは何時ですか。",
        "options": {
          "A": "十時",
          "B": "十一時半",
          "C": "十一時",
          "D": "九時"
        },
        "answer": "A",
        "explanation": "開始10時、終了11時半。",
        "passage_id": "S2-R3"
      },
      {
        "id": "S2-Q43",
        "number": 43,
        "category": "reading",
        "kind": "mcq",
        "prompt": "紙の資料が必要な理由は何ですか。",
        "options": {
          "A": "プロジェクターが壊れた",
          "B": "部長が来ない",
          "C": "印刷機が新しい",
          "D": "会議室が狭い"
        },
        "answer": "A",
        "explanation": "機器が故障しているため紙資料。",
        "passage_id": "S2-R3"
      },
      {
        "id": "S2-Q44",
        "number": 44,
        "category": "reading",
        "kind": "mcq",
        "prompt": "部長について正しいのはどれですか。",
        "options": {
          "A": "午後六時に来る",
          "B": "参加しない",
          "C": "始めから出席する",
          "D": "十一時ごろ参加する"
        },
        "answer": "D",
        "explanation": "部長参加11時頃。",
        "passage_id": "S2-R3"
      },
      {
        "id": "S2-Q45",
        "number": 45,
        "category": "reading",
        "kind": "mcq",
        "prompt": "海に行く予定を変えた理由は何ですか。",
        "options": {
          "A": "天気が悪くなった",
          "B": "お金がなかった",
          "C": "友だちが熱を出した",
          "D": "本が届いた"
        },
        "answer": "C",
        "explanation": "友人の発熱が理由。",
        "passage_id": "S2-R4"
      },
      {
        "id": "S2-Q46",
        "number": 46,
        "category": "reading",
        "kind": "mcq",
        "prompt": "日曜日にしたことは何ですか。",
        "options": {
          "A": "家で読書した",
          "B": "病院で働いた",
          "C": "一人で海に行った",
          "D": "友人と買い物した"
        },
        "answer": "A",
        "explanation": "家で本を読んだ。",
        "passage_id": "S2-R4"
      },
      {
        "id": "S2-Q47",
        "number": 47,
        "category": "reading",
        "kind": "mcq",
        "prompt": "夕方、話し手はどう感じましたか。",
        "options": {
          "A": "寂しくなった",
          "B": "怒った",
          "C": "急いだ",
          "D": "安心した"
        },
        "answer": "D",
        "explanation": "友人が元気になったと聞いて安心。",
        "passage_id": "S2-R4"
      },
      {
        "id": "S2-Q48",
        "number": 48,
        "category": "reading",
        "kind": "mcq",
        "prompt": "予約人数は何人ですか。",
        "options": {
          "A": "二人",
          "B": "四人",
          "C": "三人",
          "D": "五人"
        },
        "answer": "B",
        "explanation": "四人で予約。",
        "passage_id": "S2-R5"
      },
      {
        "id": "S2-Q49",
        "number": 49,
        "category": "reading",
        "kind": "mcq",
        "prompt": "最終的に何時の席を希望していますか。",
        "options": {
          "A": "午後六時",
          "B": "午後六時半",
          "C": "午後七時半",
          "D": "午後七時"
        },
        "answer": "B",
        "explanation": "変更後18:30。",
        "passage_id": "S2-R5"
      },
      {
        "id": "S2-Q50",
        "number": 50,
        "category": "reading",
        "kind": "mcq",
        "prompt": "窓側の席について何が分かりますか。",
        "options": {
          "A": "六時半から空いている",
          "B": "必ず窓側になる",
          "C": "七時まで使われている",
          "D": "窓側しか空いていない"
        },
        "answer": "C",
        "explanation": "窓側は19時まで埋まっている。",
        "passage_id": "S2-R5"
      },
      {
        "id": "S2-Q51",
        "number": 51,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "店員は財布を見つけてから何をしましたか。",
        "options": {
          "A": "店を閉めた",
          "B": "男の人に電話した",
          "C": "警察に行った",
          "D": "財布を売った"
        },
        "answer": "B",
        "explanation": "Petugas menelepon pelanggan sesudah menemukan dompet.",
        "title": "落とした財布",
        "panels": [
          "男性がカフェで支払いをする",
          "財布をいすの上に置いて帰る",
          "店員が財布を見つけて電話する",
          "男性が店に戻って財布を受け取る"
        ],
        "asset": "images/set-2/stories/q51.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S2-Q52",
        "number": 52,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "女の人はいつケーキを受け取りましたか。",
        "options": {
          "A": "予約した日",
          "B": "一週間後の月曜日",
          "C": "誕生日の日",
          "D": "店員の休日"
        },
        "answer": "C",
        "explanation": "Ambil pada hari ulang tahun sebagaimana ditunjukkan.",
        "title": "ケーキの注文",
        "panels": [
          "女性がケーキ店でケーキを予約する",
          "店員が注文票に名前と日付を書く",
          "誕生日の日に女性が店へ来る",
          "女性が予約したケーキを受け取る"
        ],
        "asset": "images/set-2/stories/q52.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S2-Q53",
        "number": 53,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "洗濯物が濡れたのはなぜですか。",
        "options": {
          "A": "雨が降ったから",
          "B": "風で落ちたから",
          "C": "洗濯機が壊れたから",
          "D": "犬が水をかけたから"
        },
        "answer": "A",
        "explanation": "Pakaian basah karena hujan.",
        "title": "雨の日の洗濯",
        "panels": [
          "朝、男性が庭に洗濯物を干す",
          "男性が仕事へ出かける",
          "昼、空が暗くなって雨が降り始める",
          "男性が戻ると洗濯物が濡れている"
        ],
        "asset": "images/set-2/stories/q53.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S2-Q54",
        "number": 54,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "二人は最後にどこで会いましたか。",
        "options": {
          "A": "映画館の前",
          "B": "駅前の入口",
          "C": "時計台の下",
          "D": "公園の池"
        },
        "answer": "C",
        "explanation": "Pertemuan dialihkan ke menara jam.",
        "title": "集合場所の変更",
        "panels": [
          "友だちが駅前で会うとメッセージする",
          "駅前が工事中で入れない",
          "友だちが近くの時計台へ行くとメッセージする",
          "二人が時計台の下で会う"
        ],
        "asset": "images/set-2/stories/q54.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S2-Q55",
        "number": 55,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "学生は本をどこに返しましたか。",
        "options": {
          "A": "受付の机",
          "B": "返却ポスト",
          "C": "教室",
          "D": "郵便局"
        },
        "answer": "B",
        "explanation": "Karena loket tutup, memasukkan ke kotak pengembalian.",
        "title": "図書館での返却",
        "panels": [
          "学生が図書館で本を借りる",
          "二週間後、学生が本を返そうとする",
          "返却窓口の前に「本日休み」の札がある",
          "学生が返却ポストに本を入れる"
        ],
        "asset": "images/set-2/stories/q55.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S2-Q56",
        "number": 56,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "テーブルには赤い本が青い本の右に置いてあります。",
        "options": {
          "A": "Gambar A",
          "B": "Gambar D",
          "C": "Gambar C",
          "D": "Gambar B"
        },
        "answer": "D",
        "explanation": "Merah berada di kanan biru.",
        "image_options": {
          "A": {
            "scene": "Buku merah kiri buku biru",
            "src": "images/set-2/matching/q56-a.svg"
          },
          "B": {
            "scene": "Buku merah kanan buku biru",
            "src": "images/set-2/matching/q56-b.svg"
          },
          "C": {
            "scene": "Buku merah di bawah buku biru",
            "src": "images/set-2/matching/q56-c.svg"
          },
          "D": {
            "scene": "Hanya buku biru di atas meja",
            "src": "images/set-2/matching/q56-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S2-Q57",
        "number": 57,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "女の子は犬を散歩させながら、電話で話しています。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar B",
          "C": "Gambar D",
          "D": "Gambar A"
        },
        "answer": "D",
        "explanation": "Gadis mengajak anjing jalan sambil telepon.",
        "image_options": {
          "A": {
            "scene": "Gadis berjalan dengan anjing sambil menelepon",
            "src": "images/set-2/matching/q57-a.svg"
          },
          "B": {
            "scene": "Gadis membawa kucing sambil menelepon",
            "src": "images/set-2/matching/q57-b.svg"
          },
          "C": {
            "scene": "Gadis duduk dengan anjing tanpa ponsel",
            "src": "images/set-2/matching/q57-c.svg"
          },
          "D": {
            "scene": "Pria membawa anjing dan ponsel",
            "src": "images/set-2/matching/q57-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S2-Q58",
        "number": 58,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "店員はお客さんに二枚のチケットを渡しています。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar D",
          "C": "Gambar B",
          "D": "Gambar A"
        },
        "answer": "A",
        "explanation": "Dua tiket diserahkan petugas ke pembeli.",
        "image_options": {
          "A": {
            "scene": "Kasir menerima tiga tiket dari pelanggan",
            "src": "images/set-2/matching/q58-a.svg"
          },
          "B": {
            "scene": "Kasir menyerahkan satu tiket",
            "src": "images/set-2/matching/q58-b.svg"
          },
          "C": {
            "scene": "Petugas menyerahkan dua tiket ke pelanggan",
            "src": "images/set-2/matching/q58-c.svg"
          },
          "D": {
            "scene": "Pelanggan memberikan dua tiket kepada petugas",
            "src": "images/set-2/matching/q58-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S2-Q59",
        "number": 59,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "机の右にはいすがあり、机の左にはごみ箱があります。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar A",
          "C": "Gambar B",
          "D": "Gambar C"
        },
        "answer": "C",
        "explanation": "Objek di kiri dan kanan meja tepat.",
        "image_options": {
          "A": {
            "scene": "Kursi kiri meja, tempat sampah kanan",
            "src": "images/set-2/matching/q59-a.svg"
          },
          "B": {
            "scene": "Kursi kanan meja, tempat sampah kiri",
            "src": "images/set-2/matching/q59-b.svg"
          },
          "C": {
            "scene": "Kursi dan sampah keduanya kanan",
            "src": "images/set-2/matching/q59-c.svg"
          },
          "D": {
            "scene": "Sampah di atas meja, kursi di belakang",
            "src": "images/set-2/matching/q59-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S2-Q60",
        "number": 60,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "傘を持っている人は一人だけで、ほかの二人は帽子をかぶっています。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar A",
          "C": "Gambar B",
          "D": "Gambar C"
        },
        "answer": "A",
        "explanation": "Satu payung, dua orang lainnya bertopi.",
        "image_options": {
          "A": {
            "scene": "3 orang, 2 payung dan 1 topi",
            "src": "images/set-2/matching/q60-a.svg"
          },
          "B": {
            "scene": "3 orang, 1 payung dan 1 topi",
            "src": "images/set-2/matching/q60-b.svg"
          },
          "C": {
            "scene": "2 orang, keduanya payung",
            "src": "images/set-2/matching/q60-c.svg"
          },
          "D": {
            "scene": "3 orang, 1 payung dan 2 topi",
            "src": "images/set-2/matching/q60-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S2-Q61",
        "number": 61,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人はまず何をしますか。",
        "options": {
          "A": "電話する",
          "B": "番号を書く",
          "C": "料金を払う",
          "D": "本を返す"
        },
        "answer": "B",
        "explanation": "Petugas meminta menulis nomor dahulu.",
        "transcript": "男：予約した本が入ったと聞いたんですが。\n女：お名前は？\n男：鈴木です。\n女：では、こちらの紙に番号を書いてお待ちください。",
        "audio_src": "audio/set-2/q61.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q62",
        "number": 62,
        "category": "listening",
        "kind": "mcq",
        "prompt": "映画の本編はいつ始まりますか。",
        "options": {
          "A": "五時十五分",
          "B": "四時四十五分",
          "C": "五時",
          "D": "五時半"
        },
        "answer": "A",
        "explanation": "Cerita utama mulai 17:15.",
        "transcript": "女：映画は五時からよね。\n男：そうだけど、予告があるから、本編は五時十五分からだよ。",
        "audio_src": "audio/set-2/q62.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q63",
        "number": 63,
        "category": "listening",
        "kind": "mcq",
        "prompt": "大学へ行くには、バスを降りたあと何をしますか。",
        "options": {
          "A": "タクシーに乗る",
          "B": "十分歩く",
          "C": "電車に乗る",
          "D": "別のバスを待つ"
        },
        "answer": "B",
        "explanation": "Masih perlu berjalan 10 menit.",
        "transcript": "男：このバスは大学まで行きますか。\n女：大学の手前までです。最後の停留所から十分歩かなければなりません。",
        "audio_src": "audio/set-2/q63.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q64",
        "number": 64,
        "category": "listening",
        "kind": "mcq",
        "prompt": "レポートをメールで送る人は何に気をつけますか。",
        "options": {
          "A": "明日送る",
          "B": "紙にも書く",
          "C": "ファイル名に名前を入れる",
          "D": "件名を消す"
        },
        "answer": "C",
        "explanation": "Nama harus disertakan dalam nama file.",
        "transcript": "女：今日中にレポートを出すんですよね。\n男：はい。メールでもいいですが、ファイル名に名前を入れてください。",
        "audio_src": "audio/set-2/q64.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q65",
        "number": 65,
        "category": "listening",
        "kind": "mcq",
        "prompt": "買えなかったものは何ですか。",
        "options": {
          "A": "パン",
          "B": "牛乳",
          "C": "豆乳",
          "D": "たまご"
        },
        "answer": "B",
        "explanation": "Susu habis, diganti susu kedelai.",
        "transcript": "男：牛乳は買ってきた？\n女：売り切れだったので、豆乳を買ったよ。パンはあったよ。",
        "audio_src": "audio/set-2/q65.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q66",
        "number": 66,
        "category": "listening",
        "kind": "mcq",
        "prompt": "店が閉まっている理由は何ですか。",
        "options": {
          "A": "今日は日曜日だから",
          "B": "工事中だから",
          "C": "店員が病気だから",
          "D": "引っ越した"
        },
        "answer": "B",
        "explanation": "Renovasi sampai bulan depan.",
        "transcript": "女：駅前の店が閉まっていましたね。\n男：店をやめたのではなく、来月まで工事中だそうですよ。",
        "audio_src": "audio/set-2/q66.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q67",
        "number": 67,
        "category": "listening",
        "kind": "mcq",
        "prompt": "二人が決めた集合時間はいつですか。",
        "options": {
          "A": "十時二十分",
          "B": "十時",
          "C": "十時十分",
          "D": "九時五十分"
        },
        "answer": "C",
        "explanation": "Dipindah ke 10:10.",
        "transcript": "男：明日十時に集合しましょう。\n女：電車が九時五十分に着くので、十時十分でもいいですか。\n男：分かりました。",
        "audio_src": "audio/set-2/q67.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q68",
        "number": 68,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人はどうしますか。",
        "options": {
          "A": "駅まで雨の中を走る",
          "B": "傘を借りずに行く",
          "C": "タクシーに乗る",
          "D": "傘を借りる"
        },
        "answer": "B",
        "explanation": "Menolak payung karena rute beratap.",
        "transcript": "女：雨が強いですね。かさを貸しましょうか。\n男：ありがとうございます。でも、駅までは屋根の下を歩けるので大丈夫です。",
        "audio_src": "audio/set-2/q68.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q69",
        "number": 69,
        "category": "listening",
        "kind": "mcq",
        "prompt": "辛いものが苦手な人はどうできますか。",
        "options": {
          "A": "水を持って帰る",
          "B": "辛くしないように頼む",
          "C": "あとで返す",
          "D": "注文しない"
        },
        "answer": "B",
        "explanation": "Bisa minta versi tidak pedas.",
        "transcript": "男：この料理は辛いですか。\n女：少し辛いですが、注文するときに辛くしないように頼めます。",
        "audio_src": "audio/set-2/q69.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S2-Q70",
        "number": 70,
        "category": "listening",
        "kind": "mcq",
        "prompt": "二人は何をプレゼントすることにしましたか。",
        "options": {
          "A": "服",
          "B": "食器",
          "C": "花",
          "D": "料理の本"
        },
        "answer": "D",
        "explanation": "Keputusan terakhir buku masak.",
        "transcript": "女：お母さんの誕生日に花を買う？\n男：花もいいけど、母は料理が好きだから、料理の本にしよう。",
        "audio_src": "audio/set-2/q70.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      }
    ],
    "passages": [
      {
        "id": "S2-R1",
        "title": "スポーツセンター",
        "body": "スポーツセンターのプールは火曜日から日曜日まで利用できます。平日は午後八時までですが、日曜日は午後四時までです。初めて使う人は、入口で会員カードを作ってください。カードは無料ですが、プールの利用には一回五百円かかります。小学生だけで入ることはできません。"
      },
      {
        "id": "S2-R2",
        "title": "電車の案内",
        "body": "駅から大学まで行くには、二番線の普通電車に乗って三つ目の駅で降り、南口からバスに乗ってください。急行電車は大学の近くの駅に止まりません。バスは十五分に一本あります。午前八時ごろは道路が混むので、授業が九時に始まる人は少し早く家を出たほうがいいです。"
      },
      {
        "id": "S2-R3",
        "title": "会社の連絡",
        "body": "佐藤さんへ 明日の打ち合わせは午前十時から十一時半に変更になりました。場所はいつもの三階会議室ですが、プロジェクターが故障しているので、資料を紙で十五部準備してください。部長は十一時ごろから参加します。変更があれば今日の午後六時までに知らせてください。"
      },
      {
        "id": "S2-R4",
        "title": "留学生の週末",
        "body": "週末は晴れると聞いたので、日曜日に海に行こうと思っていました。ところが土曜日の夜、友だちが熱を出しました。私は一人で行く気になれず、日曜日は家で本を読みました。夕方、友だちから少し元気になったという連絡があって安心しました。"
      },
      {
        "id": "S2-R5",
        "title": "レストランの予約",
        "body": "四人で予約した鈴木です。土曜日の午後七時からの予約を、午後六時半に変更したいと電話しました。店の人は六時半なら席があると言いましたが、窓側の席は七時まで使われているそうです。私は窓側でなくてもいいと答えました。"
      }
    ]
  },
  {
    "id": "n4-3",
    "title": "Simulasi N4 3",
    "version": "v3-set-3",
    "questions": [
      {
        "id": "S3-Q01",
        "number": 1,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「説明」の読み方はどれですか。",
        "options": {
          "A": "せいめい",
          "B": "せつめい",
          "C": "せちめい",
          "D": "せつみょう"
        },
        "answer": "B",
        "explanation": "説明 = せつめい, penjelasan."
      },
      {
        "id": "S3-Q02",
        "number": 2,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「経験」の読み方はどれですか。",
        "options": {
          "A": "けんげん",
          "B": "けいけん",
          "C": "けんけい",
          "D": "けいげん"
        },
        "answer": "B",
        "explanation": "経験 dibaca けいけん, pengalaman."
      },
      {
        "id": "S3-Q03",
        "number": 3,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「約半分」の「半分」の読み方はどれですか。",
        "options": {
          "A": "はんぷん",
          "B": "はんぶん",
          "C": "はんふん",
          "D": "ばんぶん"
        },
        "answer": "B",
        "explanation": "半分 = はんぶん, separuh."
      },
      {
        "id": "S3-Q04",
        "number": 4,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「商品」の読み方はどれですか。",
        "options": {
          "A": "しょうびん",
          "B": "しょひん",
          "C": "しょうひん",
          "D": "しょうほん"
        },
        "answer": "C",
        "explanation": "商品 = しょうひん, produk/dagangan."
      },
      {
        "id": "S3-Q05",
        "number": 5,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「利用者」の読み方はどれですか。",
        "options": {
          "A": "りようしゃ",
          "B": "りようもの",
          "C": "りようじゃ",
          "D": "りゅうようしゃ"
        },
        "answer": "A",
        "explanation": "利用者 = りようしゃ, pengguna fasilitas."
      },
      {
        "id": "S3-Q06",
        "number": 6,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「案内」の読み方はどれですか。",
        "options": {
          "A": "あんだい",
          "B": "あんに",
          "C": "あんない",
          "D": "あない"
        },
        "answer": "C",
        "explanation": "案内 = あんない, panduan/petunjuk."
      },
      {
        "id": "S3-Q07",
        "number": 7,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「失敗」の読み方はどれですか。",
        "options": {
          "A": "しつはい",
          "B": "しゅっぱい",
          "C": "しっばい",
          "D": "しっぱい"
        },
        "answer": "D",
        "explanation": "失敗 = しっぱい, kegagalan; pastikan hanya satu pilihan identik."
      },
      {
        "id": "S3-Q08",
        "number": 8,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「予約」の読み方はどれですか。",
        "options": {
          "A": "よやく",
          "B": "ようやく",
          "C": "よかく",
          "D": "よっやく"
        },
        "answer": "A",
        "explanation": "予約 = よやく, reservasi."
      },
      {
        "id": "S3-Q09",
        "number": 9,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「しょうたい」を漢字で書くとどれですか。",
        "options": {
          "A": "正体",
          "B": "招待",
          "C": "将体",
          "D": "召体"
        },
        "answer": "B",
        "explanation": "しょうたい sebagai mengundang tamu ditulis 招待."
      },
      {
        "id": "S3-Q10",
        "number": 10,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「さいきん」を漢字で書くとどれですか。",
        "options": {
          "A": "細近",
          "B": "最今",
          "C": "再近",
          "D": "最近"
        },
        "answer": "D",
        "explanation": "さいきん = 最近, belakangan ini."
      },
      {
        "id": "S3-Q11",
        "number": 11,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「せんたく」を漢字で書くとどれですか。",
        "options": {
          "A": "先濯",
          "B": "線択",
          "C": "洗濯",
          "D": "洗択"
        },
        "answer": "C",
        "explanation": "せんたく = 洗濯 ketika berarti mencuci pakaian."
      },
      {
        "id": "S3-Q12",
        "number": 12,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「ちず」を漢字で書くとどれですか。",
        "options": {
          "A": "地図",
          "B": "知図",
          "C": "池図",
          "D": "地頭"
        },
        "answer": "A",
        "explanation": "ちず = 地図, peta."
      },
      {
        "id": "S3-Q13",
        "number": 13,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "会場が分からなければ、受付で＿＿ください。",
        "options": {
          "A": "見て",
          "B": "聞いて",
          "C": "言って",
          "D": "話して"
        },
        "answer": "B",
        "explanation": "聞く dipakai untuk meminta informasi di resepsionis."
      },
      {
        "id": "S3-Q14",
        "number": 14,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "雨で試合が＿＿になったので、家に帰りました。",
        "options": {
          "A": "決心",
          "B": "最初",
          "C": "途中",
          "D": "中止"
        },
        "answer": "D",
        "explanation": "中止 berarti dibatalkan/ditiadakan."
      },
      {
        "id": "S3-Q15",
        "number": 15,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "あの人はいつも約束の時間を＿＿ます。",
        "options": {
          "A": "こたえ",
          "B": "まもり",
          "C": "つづけ",
          "D": "かぞえ"
        },
        "answer": "B",
        "explanation": "時間を守る = menaati jadwal/tepat waktu."
      },
      {
        "id": "S3-Q16",
        "number": 16,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "この道は工事中です。向こうから＿＿ください。",
        "options": {
          "A": "渡って",
          "B": "集まって",
          "C": "入って",
          "D": "回って"
        },
        "answer": "D",
        "explanation": "回ってください = lewat memutar/alternatif karena konstruksi."
      },
      {
        "id": "S3-Q17",
        "number": 17,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「先生にほめられました」に近い意味はどれですか。",
        "options": {
          "A": "先生が私をよく言いました",
          "B": "先生にしかられました",
          "C": "先生に質問しました",
          "D": "先生が私をほめました"
        },
        "answer": "D",
        "explanation": "Bentuk pasif ほめられる: guru memuji saya."
      },
      {
        "id": "S3-Q18",
        "number": 18,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「その話を初めて聞きました」に近い意味はどれですか。",
        "options": {
          "A": "前にも聞きました",
          "B": "今まで聞いたことがありませんでした",
          "C": "だれにも話しません",
          "D": "もう忘れました"
        },
        "answer": "B",
        "explanation": "初めて = pertama kali."
      },
      {
        "id": "S3-Q19",
        "number": 19,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「試験の前に復習します」に近い意味はどれですか。",
        "options": {
          "A": "新しい本を買います",
          "B": "試験の後に寝ます",
          "C": "勉強したことをもう一度確認します",
          "D": "問題を出します"
        },
        "answer": "C",
        "explanation": "復習 = mengulang materi yang sudah dipelajari."
      },
      {
        "id": "S3-Q20",
        "number": 20,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「山田さんは出かけたばかりです」に近い意味はどれですか。",
        "options": {
          "A": "これから出かけます",
          "B": "少し前に家を出ました",
          "C": "旅行をやめました",
          "D": "ずっと外にいました"
        },
        "answer": "B",
        "explanation": "たばかり: baru saja selesai melakukan tindakan."
      },
      {
        "id": "S3-Q21",
        "number": 21,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "毎日練習すれば、少しずつ上手に＿＿と思います。",
        "options": {
          "A": "なろう",
          "B": "なって",
          "C": "なった",
          "D": "なる"
        },
        "answer": "D",
        "explanation": "と思う + bentuk biasa masa depan, なる."
      },
      {
        "id": "S3-Q22",
        "number": 22,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この店のラーメンはおいしい＿＿、少し高いです。",
        "options": {
          "A": "ように",
          "B": "から",
          "C": "けれども",
          "D": "ので"
        },
        "answer": "C",
        "explanation": "けれども menghubungkan dua fakta bertentangan."
      },
      {
        "id": "S3-Q23",
        "number": 23,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "頭が痛いなら、今日は無理を＿＿ほうがいいです。",
        "options": {
          "A": "した",
          "B": "しない",
          "C": "する",
          "D": "して"
        },
        "answer": "B",
        "explanation": "～ないほうがいい: menyarankan agar tidak memaksakan diri."
      },
      {
        "id": "S3-Q24",
        "number": 24,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "鍵を家に忘れた＿＿、部屋に入れません。",
        "options": {
          "A": "ので",
          "B": "のに",
          "C": "ような",
          "D": "ための"
        },
        "answer": "A",
        "explanation": "～ので sebab akibat yang jelas."
      },
      {
        "id": "S3-Q25",
        "number": 25,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "予定が変わったら、すぐ知らせて＿＿。",
        "options": {
          "A": "おきます",
          "B": "います",
          "C": "しまう",
          "D": "ください"
        },
        "answer": "D",
        "explanation": "～てください permintaan langsung yang sopan."
      },
      {
        "id": "S3-Q26",
        "number": 26,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "彼女は料理が上手で、ケーキ＿＿作れます。",
        "options": {
          "A": "しか",
          "B": "だけ",
          "C": "ほど",
          "D": "まで"
        },
        "answer": "D",
        "explanation": "～まで mengungkap 'bahkan kue juga' sebagai perluasan kemampuan."
      },
      {
        "id": "S3-Q27",
        "number": 27,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "レポートは金曜日＿＿出してください。",
        "options": {
          "A": "ほど",
          "B": "まで",
          "C": "までに",
          "D": "ごろ"
        },
        "answer": "C",
        "explanation": "Deadline menggunakan までに."
      },
      {
        "id": "S3-Q28",
        "number": 28,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この写真を見る＿＿、去年の旅行を思い出します。",
        "options": {
          "A": "なら",
          "B": "と",
          "C": "ため",
          "D": "ので"
        },
        "answer": "B",
        "explanation": "～と untuk respons kebiasaan/hasil otomatis."
      },
      {
        "id": "S3-Q29",
        "number": 29,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "私が駅に着いたとき、電車はもう＿＿いました。",
        "options": {
          "A": "出て",
          "B": "出",
          "C": "出た",
          "D": "出る"
        },
        "answer": "A",
        "explanation": "出ていました = kereta sudah pergi, keadaan hasil."
      },
      {
        "id": "S3-Q30",
        "number": 30,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "先生の話はゆっくりだったので、ほとんど＿＿。",
        "options": {
          "A": "分かれました",
          "B": "分かりました",
          "C": "分かりません",
          "D": "分かろう"
        },
        "answer": "B",
        "explanation": "ほとんど dengan positif berarti hampir semua dipahami."
      },
      {
        "id": "S3-Q31",
        "number": 31,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "母は毎日私に野菜を＿＿ように言います。",
        "options": {
          "A": "食べる",
          "B": "食べて",
          "C": "食べれば",
          "D": "食べた"
        },
        "answer": "A",
        "explanation": "～ように言う mengutip nasihat/perintah tidak langsung."
      },
      {
        "id": "S3-Q32",
        "number": 32,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "今日は早く寝る＿＿にしています。",
        "options": {
          "A": "もの",
          "B": "ところ",
          "C": "ため",
          "D": "こと"
        },
        "answer": "D",
        "explanation": "～ことにしています: kebiasaan/aturan yang ditentukan sendiri."
      },
      {
        "id": "S3-Q33",
        "number": 33,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "もう少し静かに＿＿くれませんか。",
        "options": {
          "A": "した",
          "B": "する",
          "C": "して",
          "D": "し"
        },
        "answer": "C",
        "explanation": "～てくれませんか permintaan lebih halus."
      },
      {
        "id": "S3-Q34",
        "number": 34,
        "category": "grammar",
        "kind": "essay",
        "prompt": "友だちから「明日一緒に映画を見ませんか」とメッセージが来ました。行けない理由と、別の日の提案を二～三文で返してください。",
        "sample_answer": "誘ってくれてありがとう。でも、明日はアルバイトがあるので、行けません。日曜日ならどうですか。",
        "rubric": "Tanggapan ajakan (0.25), alasan (0.25), usulan alternatif (0.25), sopan dan jelas (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S3-Q35",
        "number": 35,
        "category": "grammar",
        "kind": "essay",
        "prompt": "住んでいる町の交通について、便利な点と不便な点を比べて二～三文書いてください。",
        "sample_answer": "私の町はバスが多いので便利です。しかし、夕方は道が混むため、時間がかかります。",
        "rubric": "Manfaat spesifik (0.25), kelemahan spesifik (0.25), perbandingan sebab akibat (0.25), bahasa cukup akurat (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S3-Q36",
        "number": 36,
        "category": "reading",
        "kind": "mcq",
        "prompt": "土曜日の午後三時に診察してもらえますか。",
        "options": {
          "A": "子どもだけ",
          "B": "予約した人だけ",
          "C": "いいえ",
          "D": "はい"
        },
        "answer": "C",
        "explanation": "土曜午後は休診。",
        "passage_id": "S3-R1"
      },
      {
        "id": "S3-Q37",
        "number": 37,
        "category": "reading",
        "kind": "mcq",
        "prompt": "予約をしている人はどうしますか。",
        "options": {
          "A": "電話しないと入れない",
          "B": "名前を書く必要がある",
          "C": "直接診察室に入る",
          "D": "料金を先に払う"
        },
        "answer": "B",
        "explanation": "予約ありでも受付で名前を書く。",
        "passage_id": "S3-R1"
      },
      {
        "id": "S3-Q38",
        "number": 38,
        "category": "reading",
        "kind": "mcq",
        "prompt": "熱が高い人はまず何をするべきですか。",
        "options": {
          "A": "病院へ走る",
          "B": "土曜日の午後に行く",
          "C": "電話で相談する",
          "D": "薬を買う"
        },
        "answer": "C",
        "explanation": "来る前に電話相談。",
        "passage_id": "S3-R1"
      },
      {
        "id": "S3-Q39",
        "number": 39,
        "category": "reading",
        "kind": "mcq",
        "prompt": "ごみ箱を減らした目的は何ですか。",
        "options": {
          "A": "係員を減らす",
          "B": "週末だけ開ける",
          "C": "ごみを持ち帰ってもらう",
          "D": "公園を広くする"
        },
        "answer": "C",
        "explanation": "住民にゴミを持ち帰ってもらうため。",
        "passage_id": "S3-R2"
      },
      {
        "id": "S3-Q40",
        "number": 40,
        "category": "reading",
        "kind": "mcq",
        "prompt": "初めの週に起こった問題はどれですか。",
        "options": {
          "A": "公園が閉まった",
          "B": "ごみ箱が増えた",
          "C": "ごみが地面に残った",
          "D": "案内が全部なくなった"
        },
        "answer": "C",
        "explanation": "地面に放置されるごみがあった。",
        "passage_id": "S3-R2"
      },
      {
        "id": "S3-Q41",
        "number": 41,
        "category": "reading",
        "kind": "mcq",
        "prompt": "町が新しくすることは何ですか。",
        "options": {
          "A": "料金を取る",
          "B": "ごみ箱を全部戻す",
          "C": "公園に入れなくする",
          "D": "案内紙を増やして週末に説明する"
        },
        "answer": "D",
        "explanation": "紙の案内と週末の説明で対処。",
        "passage_id": "S3-R2"
      },
      {
        "id": "S3-Q42",
        "number": 42,
        "category": "reading",
        "kind": "mcq",
        "prompt": "遠足の日はいつになりましたか。",
        "options": {
          "A": "木曜日",
          "B": "水曜日",
          "C": "土曜日",
          "D": "金曜日"
        },
        "answer": "D",
        "explanation": "木曜から金曜へ変更。",
        "passage_id": "S3-R3"
      },
      {
        "id": "S3-Q43",
        "number": 43,
        "category": "reading",
        "kind": "mcq",
        "prompt": "中止になるのはどんな場合ですか。",
        "options": {
          "A": "昼ご飯がない",
          "B": "風が強い",
          "C": "少し雨が降る",
          "D": "バスが空いている"
        },
        "answer": "B",
        "explanation": "雨でも実施、強風なら中止。",
        "passage_id": "S3-R3"
      },
      {
        "id": "S3-Q44",
        "number": 44,
        "category": "reading",
        "kind": "mcq",
        "prompt": "何時までにどこへ行きますか。",
        "options": {
          "A": "九時に校門",
          "B": "八時十五分に駅",
          "C": "八時に教室",
          "D": "八時十五分に校門"
        },
        "answer": "D",
        "explanation": "8:15に学校の門へ集合。",
        "passage_id": "S3-R3"
      },
      {
        "id": "S3-Q45",
        "number": 45,
        "category": "reading",
        "kind": "mcq",
        "prompt": "火曜日に千円買い物したら何ポイントですか。",
        "options": {
          "A": "十ポイント",
          "B": "百ポイント",
          "C": "二十ポイント",
          "D": "五ポイント"
        },
        "answer": "C",
        "explanation": "100円=1pt →1000円=10pt、火曜は2倍で20pt。",
        "passage_id": "S3-R4"
      },
      {
        "id": "S3-Q46",
        "number": 46,
        "category": "reading",
        "kind": "mcq",
        "prompt": "五百ポイントで何ができますか。",
        "options": {
          "A": "千円分の支払い",
          "B": "五百ポイントを現金でもらう",
          "C": "送料を無料にする",
          "D": "五百円分の支払い"
        },
        "answer": "D",
        "explanation": "500pt=500円相当の買い物。",
        "passage_id": "S3-R4"
      },
      {
        "id": "S3-Q47",
        "number": 47,
        "category": "reading",
        "kind": "mcq",
        "prompt": "ポイントを使いたいとき、いつ言いますか。",
        "options": {
          "A": "次の日",
          "B": "レジで支払いの前",
          "C": "支払いが終わってから",
          "D": "店を出たあと"
        },
        "answer": "B",
        "explanation": "会計前に申告する。",
        "passage_id": "S3-R4"
      },
      {
        "id": "S3-Q48",
        "number": 48,
        "category": "reading",
        "kind": "mcq",
        "prompt": "新しい家から駅まで何分ですか。",
        "options": {
          "A": "十五分",
          "B": "五分",
          "C": "十分",
          "D": "二十分"
        },
        "answer": "B",
        "explanation": "新居は徒歩5分。",
        "passage_id": "S3-R5"
      },
      {
        "id": "S3-Q49",
        "number": 49,
        "category": "reading",
        "kind": "mcq",
        "prompt": "友だちが売ったものは何ですか。",
        "options": {
          "A": "ベッド",
          "B": "自転車",
          "C": "大きな机",
          "D": "本棚"
        },
        "answer": "C",
        "explanation": "部屋が小さくなり大きな机を売った。",
        "passage_id": "S3-R5"
      },
      {
        "id": "S3-Q50",
        "number": 50,
        "category": "reading",
        "kind": "mcq",
        "prompt": "引っ越したあと何がよくなりましたか。",
        "options": {
          "A": "家賃が必ず安い",
          "B": "机の数",
          "C": "通学の便利さ",
          "D": "部屋の広さ"
        },
        "answer": "C",
        "explanation": "駅に近く通学が楽になった。",
        "passage_id": "S3-R5"
      },
      {
        "id": "S3-Q51",
        "number": 51,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "社員が印刷する前にしたことは何ですか。",
        "options": {
          "A": "紙を補充した",
          "B": "机を捨てた",
          "C": "会議を中止した",
          "D": "パソコンを買った"
        },
        "answer": "A",
        "explanation": "Kertas dimasukkan sebelum dokumen dicetak.",
        "title": "会議の準備",
        "panels": [
          "社員が会議室の机をならべる",
          "資料を印刷しようとする",
          "プリンターに紙がないことに気づく",
          "社員が紙を補充して印刷する"
        ],
        "asset": "images/set-3/stories/q51.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S3-Q52",
        "number": 52,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "学生はなぜ学校に電話しましたか。",
        "options": {
          "A": "かばんを忘れたから",
          "B": "熱があったから",
          "C": "電車が遅れたから",
          "D": "テストが終わったから"
        },
        "answer": "B",
        "explanation": "Menghubungi sekolah karena demam.",
        "title": "熱のある朝",
        "panels": [
          "学生が朝起き、体温計で熱を測る",
          "体温計が高い数字を示す",
          "学生が学校へ休む連絡をする",
          "学生が布団に入って休む"
        ],
        "asset": "images/set-3/stories/q52.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S3-Q53",
        "number": 53,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "配達員は荷物を渡せなかったので、何をしましたか。",
        "options": {
          "A": "紙をポストに入れた",
          "B": "隣の家に預けた",
          "C": "荷物を道に置いた",
          "D": "電話を壊した"
        },
        "answer": "A",
        "explanation": "Kartu notifikasi ketidakhadiran dimasukkan ke kotak pos.",
        "title": "荷物の配達",
        "panels": [
          "配達員が家のベルを押す",
          "家に誰もいなくてドアが開かない",
          "配達員が不在連絡票をポストに入れる",
          "夜、家の人が連絡票を見る"
        ],
        "asset": "images/set-3/stories/q53.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S3-Q54",
        "number": 54,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "女の人が買わなかったものは何ですか。",
        "options": {
          "A": "何も買わなかった",
          "B": "野菜",
          "C": "牛乳",
          "D": "パン"
        },
        "answer": "C",
        "explanation": "Uang kurang, akhirnya hanya roti dibeli.",
        "title": "夜の買い物",
        "panels": [
          "女性が買うものをメモする",
          "スーパーで牛乳とパンを買う",
          "レジで財布を開くとお金が足りない",
          "女性がパンだけ買って帰る"
        ],
        "asset": "images/set-3/stories/q54.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S3-Q55",
        "number": 55,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "旅行者はどうやって出口が分かりましたか。",
        "options": {
          "A": "友だちに電話したから",
          "B": "本を読んだから",
          "C": "看板を作ったから",
          "D": "駅員に聞いたから"
        },
        "answer": "D",
        "explanation": "Petugas stasiun menunjukkan pintu keluar.",
        "title": "駅での案内",
        "panels": [
          "旅行者が地図を見ながら困っている",
          "旅行者が駅員に道を聞く",
          "駅員が出口番号を指さして説明する",
          "旅行者が教えられた出口から外へ出る"
        ],
        "asset": "images/set-3/stories/q55.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S3-Q56",
        "number": 56,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "男の人は電車の窓の近くに立っていて、座っていません。",
        "options": {
          "A": "Gambar B",
          "B": "Gambar C",
          "C": "Gambar D",
          "D": "Gambar A"
        },
        "answer": "D",
        "explanation": "Berdiri di dalam kereta dekat jendela.",
        "image_options": {
          "A": {
            "scene": "Pria berdiri dekat jendela kereta",
            "src": "images/set-3/matching/q56-a.svg"
          },
          "B": {
            "scene": "Pria duduk dekat jendela kereta",
            "src": "images/set-3/matching/q56-b.svg"
          },
          "C": {
            "scene": "Pria berdiri di luar kereta",
            "src": "images/set-3/matching/q56-c.svg"
          },
          "D": {
            "scene": "Wanita berdiri di pintu kereta",
            "src": "images/set-3/matching/q56-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S3-Q57",
        "number": 57,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "冷蔵庫の中には卵が六つありますが、牛乳はありません。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar A",
          "C": "Gambar B",
          "D": "Gambar C"
        },
        "answer": "C",
        "explanation": "Persis enam telur tanpa susu.",
        "image_options": {
          "A": {
            "scene": "4 telur dan susu",
            "src": "images/set-3/matching/q57-a.svg"
          },
          "B": {
            "scene": "6 telur tanpa susu",
            "src": "images/set-3/matching/q57-b.svg"
          },
          "C": {
            "scene": "6 telur dan susu",
            "src": "images/set-3/matching/q57-c.svg"
          },
          "D": {
            "scene": "8 telur tanpa susu",
            "src": "images/set-3/matching/q57-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S3-Q58",
        "number": 58,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "小さいかばんが大きいかばんの上に置いてあります。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar C",
          "C": "Gambar A",
          "D": "Gambar B"
        },
        "answer": "B",
        "explanation": "Tas kecil berada di atas tas besar.",
        "image_options": {
          "A": {
            "scene": "Tas besar di atas tas kecil",
            "src": "images/set-3/matching/q58-a.svg"
          },
          "B": {
            "scene": "Dua tas bersebelahan",
            "src": "images/set-3/matching/q58-b.svg"
          },
          "C": {
            "scene": "Tas kecil di atas tas besar",
            "src": "images/set-3/matching/q58-c.svg"
          },
          "D": {
            "scene": "Satu tas besar di atas kursi",
            "src": "images/set-3/matching/q58-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S3-Q59",
        "number": 59,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "女の人は店を出る前に、入り口で靴をはいています。",
        "options": {
          "A": "Gambar A",
          "B": "Gambar C",
          "C": "Gambar D",
          "D": "Gambar B"
        },
        "answer": "D",
        "explanation": "Memakai sepatu di pintu keluar.",
        "image_options": {
          "A": {
            "scene": "Wanita melepaskan sepatu di meja",
            "src": "images/set-3/matching/q59-a.svg"
          },
          "B": {
            "scene": "Wanita memakai sepatu di pintu sebelum keluar",
            "src": "images/set-3/matching/q59-b.svg"
          },
          "C": {
            "scene": "Pria memakai sepatu di pintu",
            "src": "images/set-3/matching/q59-c.svg"
          },
          "D": {
            "scene": "Wanita menenteng sepatu di luar",
            "src": "images/set-3/matching/q59-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S3-Q60",
        "number": 60,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "橋の向こうに学校が見え、その手前に川があります。",
        "options": {
          "A": "Gambar B",
          "B": "Gambar D",
          "C": "Gambar C",
          "D": "Gambar A"
        },
        "answer": "D",
        "explanation": "Posisi sungai di depan, sekolah di seberang jembatan.",
        "image_options": {
          "A": {
            "scene": "Sungai di depan, jembatan melintang, sekolah di seberang",
            "src": "images/set-3/matching/q60-a.svg"
          },
          "B": {
            "scene": "Sekolah di depan sungai, jembatan di belakang",
            "src": "images/set-3/matching/q60-b.svg"
          },
          "C": {
            "scene": "Jembatan di gunung tanpa sungai",
            "src": "images/set-3/matching/q60-c.svg"
          },
          "D": {
            "scene": "Sekolah di sisi dekat sungai tanpa jembatan",
            "src": "images/set-3/matching/q60-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S3-Q61",
        "number": 61,
        "category": "listening",
        "kind": "mcq",
        "prompt": "手続きをする窓口は何時までですか。",
        "options": {
          "A": "午後五時半",
          "B": "午後四時半",
          "C": "午後五時",
          "D": "午後四時"
        },
        "answer": "D",
        "explanation": "Loket layanan tutup 16:00 meskipun gedung 17:00.",
        "transcript": "女：市役所は四時半まででしたよね。\n男：窓口は四時までですよ。建物は五時まで開いていますが。",
        "audio_src": "audio/set-3/q61.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q62",
        "number": 62,
        "category": "listening",
        "kind": "mcq",
        "prompt": "面接で必要ないものは何ですか。",
        "options": {
          "A": "ネクタイ",
          "B": "黒いスーツ",
          "C": "上着",
          "D": "靴"
        },
        "answer": "A",
        "explanation": "Dasi tidak wajib.",
        "transcript": "男：明日の面接、黒いスーツでいいですか。\n女：はい。でもネクタイは必要ありません。上着は着てください。",
        "audio_src": "audio/set-3/q62.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q63",
        "number": 63,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人は何で帰りますか。",
        "options": {
          "A": "バス",
          "B": "自転車",
          "C": "歩いて",
          "D": "電車"
        },
        "answer": "D",
        "explanation": "Datang bersepeda namun pulang kereta.",
        "transcript": "女：家まで何で帰る？\n男：自転車で来たけど、急に雨が降ってきたから、電車で帰るつもり。",
        "audio_src": "audio/set-3/q63.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q64",
        "number": 64,
        "category": "listening",
        "kind": "mcq",
        "prompt": "授業はどこでありますか。",
        "options": {
          "A": "体育館",
          "B": "一階の一番奥",
          "C": "二階の入口",
          "D": "三階の右側"
        },
        "answer": "B",
        "explanation": "Kelas lantai satu paling belakang.",
        "transcript": "男：今日の授業は二階ですよね。\n女：いいえ。二階は工事中だから、一階の一番奥の教室です。",
        "audio_src": "audio/set-3/q64.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q65",
        "number": 65,
        "category": "listening",
        "kind": "mcq",
        "prompt": "一日に何回飲みますか。",
        "options": {
          "A": "一回",
          "B": "二回",
          "C": "四回",
          "D": "三回"
        },
        "answer": "B",
        "explanation": "Pagi dan malam masing-masing sekali.",
        "transcript": "女：この薬は一日何回飲みますか。\n男：朝と夜の食後に一回ずつです。昼は飲まなくてもいいです。",
        "audio_src": "audio/set-3/q65.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q66",
        "number": 66,
        "category": "listening",
        "kind": "mcq",
        "prompt": "十一時に注文できるものはどれですか。",
        "options": {
          "A": "カレー",
          "B": "ジュース",
          "C": "サンドイッチ",
          "D": "定食"
        },
        "answer": "B",
        "explanation": "Jam 11 hanya minuman.",
        "transcript": "男：もう注文できますか。\n女：今は飲み物だけです。食事は十一時半からです。",
        "audio_src": "audio/set-3/q66.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q67",
        "number": 67,
        "category": "listening",
        "kind": "mcq",
        "prompt": "今、資料は何枚必要ですか。",
        "options": {
          "A": "二十枚",
          "B": "十枚",
          "C": "十五枚",
          "D": "五枚"
        },
        "answer": "C",
        "explanation": "Jumlah dikurangi 5 →15.",
        "transcript": "女：資料は全部で二十枚必要でしたね。\n男：実は五人来られなくなったので、十五枚で大丈夫です。",
        "audio_src": "audio/set-3/q67.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q68",
        "number": 68,
        "category": "listening",
        "kind": "mcq",
        "prompt": "今日できる申し込み方法はどれですか。",
        "options": {
          "A": "オンライン",
          "B": "どちらも",
          "C": "どちらもできない",
          "D": "学校の窓口"
        },
        "answer": "A",
        "explanation": "Hari ini hanya pendaftaran daring.",
        "transcript": "男：試験の申し込みは今日まで？\n女：オンラインなら今日まで、学校の窓口なら昨日まででした。",
        "audio_src": "audio/set-3/q68.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q69",
        "number": 69,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人はこれから最初に何をしますか。",
        "options": {
          "A": "授業に行く",
          "B": "漢字を見直す",
          "C": "メールを送る",
          "D": "先生に電話する"
        },
        "answer": "B",
        "explanation": "Cek kanji sebelum kirim.",
        "transcript": "女：先生へのメールを送る前に、漢字の間違いを確認した？\n男：まだです。じゃあ、今見直してから送ります。",
        "audio_src": "audio/set-3/q69.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S3-Q70",
        "number": 70,
        "category": "listening",
        "kind": "mcq",
        "prompt": "山田さんについて正しいのはどれですか。",
        "options": {
          "A": "まだ入院している",
          "B": "今日は働いている",
          "C": "今日も休んでいる",
          "D": "昨日は旅行した"
        },
        "answer": "B",
        "explanation": "Hari ini sudah bekerja.",
        "transcript": "男：山田さん、昨日は来ませんでしたね。\n女：熱があったそうですが、今日はもう元気に働いていますよ。",
        "audio_src": "audio/set-3/q70.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      }
    ],
    "passages": [
      {
        "id": "S3-R1",
        "title": "病院からのお知らせ",
        "body": "内科の診察は月曜日から土曜日までです。受付は午前八時半から十一時半まで、午後は二時から五時までです。ただし水曜日と土曜日の午後は休診です。予約した人も受付で名前を書いてください。熱が高い人は、来る前に電話で相談してください。"
      },
      {
        "id": "S3-R2",
        "title": "新聞記事",
        "body": "町の公園で今月からごみ箱が少なくなりました。ごみを持って帰る人を増やし、公園をきれいにするためです。しかし、最初の週にはごみが地面に残されることもありました。町では案内の紙を増やし、週末は係の人が説明することにしました。"
      },
      {
        "id": "S3-R3",
        "title": "学校のメール",
        "body": "来週の遠足は木曜日から金曜日に変更になりました。天気予報では木曜日に強い風が吹くそうです。朝八時十五分に学校の門に集合してください。雨でも行きますが、強い風の場合は中止です。昼ご飯と飲み物を持ってきてください。"
      },
      {
        "id": "S3-R4",
        "title": "スーパーのポイント",
        "body": "近所のスーパーでは、買い物百円につき一ポイントがたまります。五百ポイントで五百円分の買い物ができます。ただしポイントは支払いの後では使えません。使いたい人はレジで支払う前に伝えてください。毎週火曜日はポイントが二倍になります。"
      },
      {
        "id": "S3-R5",
        "title": "友人の引っ越し",
        "body": "友だちの家は駅から歩いて二十分のところにありましたが、先月引っ越しました。新しい家は駅に近く、歩いて五分です。ただ、前の家より部屋が小さいので、大きな机を売ったそうです。友だちは通学が楽になったと喜んでいます。"
      }
    ]
  },
  {
    "id": "n4-4",
    "title": "Simulasi N4 4",
    "version": "v3-set-4",
    "questions": [
      {
        "id": "S4-Q01",
        "number": 1,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「確認」の読み方はどれですか。",
        "options": {
          "A": "かくねん",
          "B": "がくにん",
          "C": "かくじん",
          "D": "かくにん"
        },
        "answer": "D",
        "explanation": "確認 = かくにん, pengecekan/konfirmasi."
      },
      {
        "id": "S4-Q02",
        "number": 2,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「到着」の読み方はどれですか。",
        "options": {
          "A": "とうちょく",
          "B": "とうじゃく",
          "C": "とうちゃく",
          "D": "どうちゃく"
        },
        "answer": "C",
        "explanation": "到着 = とうちゃく, kedatangan."
      },
      {
        "id": "S4-Q03",
        "number": 3,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「方法」の読み方はどれですか。",
        "options": {
          "A": "ほうほう",
          "B": "ほうほ",
          "C": "ほうぼ",
          "D": "ほうぼう"
        },
        "answer": "A",
        "explanation": "方法 = ほうほう, metode."
      },
      {
        "id": "S4-Q04",
        "number": 4,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「受付時間」の「時間」の読み方はどれですか。",
        "options": {
          "A": "じかん",
          "B": "じけん",
          "C": "じげん",
          "D": "しかん"
        },
        "answer": "A",
        "explanation": "時間 = じかん, waktu."
      },
      {
        "id": "S4-Q05",
        "number": 5,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「自由」の読み方はどれですか。",
        "options": {
          "A": "じゅよう",
          "B": "じよう",
          "C": "じゅゆう",
          "D": "じゆう"
        },
        "answer": "D",
        "explanation": "自由 = じゆう, bebas."
      },
      {
        "id": "S4-Q06",
        "number": 6,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「父は車を運転します」の「運転」はどう読みますか。",
        "options": {
          "A": "うんてん",
          "B": "うんでん",
          "C": "うんてい",
          "D": "うんだん"
        },
        "answer": "A",
        "explanation": "運転 = うんてん, mengemudi."
      },
      {
        "id": "S4-Q07",
        "number": 7,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「景色」の読み方はどれですか。",
        "options": {
          "A": "けいしき",
          "B": "けいしょく",
          "C": "けじき",
          "D": "けしき"
        },
        "answer": "D",
        "explanation": "景色 = けしき, pemandangan."
      },
      {
        "id": "S4-Q08",
        "number": 8,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「番号」の読み方はどれですか。",
        "options": {
          "A": "ばんごう",
          "B": "はんごう",
          "C": "ばんこう",
          "D": "ばんこ"
        },
        "answer": "A",
        "explanation": "番号 = ばんごう, nomor."
      },
      {
        "id": "S4-Q09",
        "number": 9,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「きけん」を漢字で書くとどれですか。",
        "options": {
          "A": "機険",
          "B": "気険",
          "C": "危険",
          "D": "危検"
        },
        "answer": "C",
        "explanation": "きけん = 危険, berbahaya."
      },
      {
        "id": "S4-Q10",
        "number": 10,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「しゅうり」を漢字で書くとどれですか。",
        "options": {
          "A": "集理",
          "B": "修利",
          "C": "終理",
          "D": "修理"
        },
        "answer": "D",
        "explanation": "しゅうり = 修理, reparasi."
      },
      {
        "id": "S4-Q11",
        "number": 11,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「かいじょう」を漢字で書くとどれですか。",
        "options": {
          "A": "開状",
          "B": "開上",
          "C": "会上",
          "D": "会場"
        },
        "answer": "D",
        "explanation": "かいじょう = 会場, tempat acara."
      },
      {
        "id": "S4-Q12",
        "number": 12,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「けっか」を漢字で書くとどれですか。",
        "options": {
          "A": "結果",
          "B": "結菓",
          "C": "決果",
          "D": "血果"
        },
        "answer": "A",
        "explanation": "けっか = 結果, hasil."
      },
      {
        "id": "S4-Q13",
        "number": 13,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "電気を消したかどうか、出る前に＿＿ください。",
        "options": {
          "A": "確認して",
          "B": "関係して",
          "C": "経験して",
          "D": "感動して"
        },
        "answer": "A",
        "explanation": "確認する = mengecek kembali."
      },
      {
        "id": "S4-Q14",
        "number": 14,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "受付では、先にこの紙に名前を＿＿ください。",
        "options": {
          "A": "書いて",
          "B": "並べて",
          "C": "払って",
          "D": "直して"
        },
        "answer": "A",
        "explanation": "Nama harus ditulis pada formulir."
      },
      {
        "id": "S4-Q15",
        "number": 15,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "バスが満員だったので、次のバスを＿＿ました。",
        "options": {
          "A": "借り",
          "B": "待ち",
          "C": "鳴らし",
          "D": "直し"
        },
        "answer": "B",
        "explanation": "次のバスを待つ = menunggu bus berikutnya."
      },
      {
        "id": "S4-Q16",
        "number": 16,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "この料理は少し辛いですが、とても＿＿です。",
        "options": {
          "A": "うまい",
          "B": "ねむい",
          "C": "さむい",
          "D": "にがい"
        },
        "answer": "A",
        "explanation": "うまい secara informal berarti enak."
      },
      {
        "id": "S4-Q17",
        "number": 17,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「けっこうです」と言って断りました。意味はどれですか。",
        "options": {
          "A": "もう必要ありません",
          "B": "ぜひお願いします",
          "C": "もっとください",
          "D": "時間がありません"
        },
        "answer": "A",
        "explanation": "Dalam konteks menolak, けっこうです = tidak perlu/terima kasih."
      },
      {
        "id": "S4-Q18",
        "number": 18,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「説明が足りません」に近い意味はどれですか。",
        "options": {
          "A": "説明が難しすぎます",
          "B": "説明が長すぎます",
          "C": "もっと説明が必要です",
          "D": "説明を全部忘れました"
        },
        "answer": "C",
        "explanation": "足りない = kurang."
      },
      {
        "id": "S4-Q19",
        "number": 19,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「よろしければ、お入りください」に近い意味はどれですか。",
        "options": {
          "A": "必ず入ってください",
          "B": "入る前に電話してください",
          "C": "いやなら帰ってください",
          "D": "よかったら中に入ってください"
        },
        "answer": "D",
        "explanation": "よろしければ = jika berkenan."
      },
      {
        "id": "S4-Q20",
        "number": 20,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「遅くとも五時までに来てください」に近い意味はどれですか。",
        "options": {
          "A": "五時から働いてください",
          "B": "五時より前に必ず来てください",
          "C": "五時を過ぎてから来てください",
          "D": "五時ちょうどに出てください"
        },
        "answer": "B",
        "explanation": "遅くとも五時までに = paling lambat jam lima."
      },
      {
        "id": "S4-Q21",
        "number": 21,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "出発する前に、忘れ物がないか＿＿おきます。",
        "options": {
          "A": "確認し",
          "B": "確認して",
          "C": "確認する",
          "D": "確認した"
        },
        "answer": "B",
        "explanation": "～ておく persiapan sebelum berangkat."
      },
      {
        "id": "S4-Q22",
        "number": 22,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "昨日寝る前に、明日の天気を＿＿おきました。",
        "options": {
          "A": "調べて",
          "B": "調べよう",
          "C": "調べた",
          "D": "調べる"
        },
        "answer": "A",
        "explanation": "調べておく = mencari informasi untuk persiapan."
      },
      {
        "id": "S4-Q23",
        "number": 23,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "田中さんは日本に三年間住んでいた＿＿があります。",
        "options": {
          "A": "ところ",
          "B": "はず",
          "C": "もの",
          "D": "こと"
        },
        "answer": "D",
        "explanation": "～たことがある pengalaman; 住んでいたことがあります."
      },
      {
        "id": "S4-Q24",
        "number": 24,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "こちらのボタンを＿＿と、ドアが開きます。",
        "options": {
          "A": "押して",
          "B": "押そう",
          "C": "押した",
          "D": "押す"
        },
        "answer": "D",
        "explanation": "～と menunjukkan hasil otomatis dari menekan tombol."
      },
      {
        "id": "S4-Q25",
        "number": 25,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "先生が来る＿＿、この問題を終わらせてください。",
        "options": {
          "A": "あいだ",
          "B": "まで",
          "C": "途中",
          "D": "までに"
        },
        "answer": "D",
        "explanation": "Tugas harus selesai paling lambat sebelum guru datang."
      },
      {
        "id": "S4-Q26",
        "number": 26,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "春になって、だんだん暖かく＿＿きました。",
        "options": {
          "A": "なった",
          "B": "なる",
          "C": "なり",
          "D": "なって"
        },
        "answer": "D",
        "explanation": "～てきた perubahan bertahap sampai saat ini."
      },
      {
        "id": "S4-Q27",
        "number": 27,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "電車が遅れた＿＿、試験には間に合いました。",
        "options": {
          "A": "けれど",
          "B": "から",
          "C": "ので",
          "D": "ため"
        },
        "answer": "A",
        "explanation": "けれど menegaskan kontras: terlambat namun tetap sempat."
      },
      {
        "id": "S4-Q28",
        "number": 28,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "ここに車を＿＿はいけません。",
        "options": {
          "A": "止める",
          "B": "止め",
          "C": "止めて",
          "D": "止めた"
        },
        "answer": "C",
        "explanation": "～てはいけません menyatakan larangan parkir."
      },
      {
        "id": "S4-Q29",
        "number": 29,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "今、雨が＿＿そうです。空が真っ暗です。",
        "options": {
          "A": "降った",
          "B": "降り",
          "C": "降る",
          "D": "降って"
        },
        "answer": "B",
        "explanation": "～そうです (tampaknya akan hujan) memakai akar ます: 降りそう."
      },
      {
        "id": "S4-Q30",
        "number": 30,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "寒いときは、お湯を＿＿飲んでください。",
        "options": {
          "A": "わかし",
          "B": "わかした",
          "C": "わかす",
          "D": "わかして"
        },
        "answer": "D",
        "explanation": "Air perlu direbus sebelum diminum; て-form untuk urutan."
      },
      {
        "id": "S4-Q31",
        "number": 31,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この仕事は今日中に＿＿なければなりません。",
        "options": {
          "A": "終わらせた",
          "B": "終わらせ",
          "C": "終わらせて",
          "D": "終わらせる"
        },
        "answer": "B",
        "explanation": "～なければなりません: akar negatif dari 終わらせる."
      },
      {
        "id": "S4-Q32",
        "number": 32,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "風邪が治る＿＿、運動を休みます。",
        "options": {
          "A": "あいだに",
          "B": "まで",
          "C": "ごろ",
          "D": "までに"
        },
        "answer": "B",
        "explanation": "～まで menunjuk jangka waktu hingga sembuh."
      },
      {
        "id": "S4-Q33",
        "number": 33,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "駅の近くに新しい本屋が＿＿そうです。",
        "options": {
          "A": "できる",
          "B": "できて",
          "C": "でき",
          "D": "できた"
        },
        "answer": "D",
        "explanation": "～そうです (katanya) memakai bentuk biasa できた, berbeda dengan tampaknya ～そう."
      },
      {
        "id": "S4-Q34",
        "number": 34,
        "category": "grammar",
        "kind": "essay",
        "prompt": "アルバイト先の店長に、電車が遅れて五分遅刻しそうだと連絡します。おわびと到着予定を入れ、二～三文で書いてください。",
        "sample_answer": "申し訳ありません。電車が遅れているので、五分ぐらい遅刻しそうです。十時五分ごろ着く予定です。",
        "rubric": "Sopan dan meminta maaf (0.25), sebab (0.25), estimasi kedatangan (0.25), pola ～そう/～予定 dan mudah dipahami (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S4-Q35",
        "number": 35,
        "category": "grammar",
        "kind": "essay",
        "prompt": "旅行中、ホテルの部屋のエアコンが動きません。受付に問題を説明し、お願いを二～三文で書いてください。",
        "sample_answer": "すみません。部屋のエアコンが動かなくなりました。確認していただけませんか。",
        "rubric": "Masalah jelas (0.25), konteks ruangan (0.25), permintaan bantuan (0.25), sopan dan masuk akal (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S4-Q36",
        "number": 36,
        "category": "reading",
        "kind": "mcq",
        "prompt": "好きな席に座りたい人はどうするとよいですか。",
        "options": {
          "A": "子どもと行く",
          "B": "二時半ごろ早く行く",
          "C": "三時過ぎに行く",
          "D": "前日に電話する"
        },
        "answer": "B",
        "explanation": "先着順のため早く行くと選べる。",
        "passage_id": "S4-R1"
      },
      {
        "id": "S4-Q37",
        "number": 37,
        "category": "reading",
        "kind": "mcq",
        "prompt": "入るときに必要なものは何ですか。",
        "options": {
          "A": "写真",
          "B": "ノート",
          "C": "チケット",
          "D": "学生証"
        },
        "answer": "C",
        "explanation": "入口でチケットを提示。",
        "passage_id": "S4-R1"
      },
      {
        "id": "S4-Q38",
        "number": 38,
        "category": "reading",
        "kind": "mcq",
        "prompt": "会場でしてはいけないことはどれですか。",
        "options": {
          "A": "二時半に入る",
          "B": "小さい子どもと入る",
          "C": "写真を撮る",
          "D": "静かに音楽を聞く"
        },
        "answer": "C",
        "explanation": "録音・撮影は禁止。",
        "passage_id": "S4-R1"
      },
      {
        "id": "S4-Q39",
        "number": 39,
        "category": "reading",
        "kind": "mcq",
        "prompt": "忘れ物を受け取るときに話すことは何ですか。",
        "options": {
          "A": "なくした場所と時",
          "B": "友だちの名前",
          "C": "買った値段",
          "D": "来週の予定"
        },
        "answer": "A",
        "explanation": "紛失した場所・時を説明。",
        "passage_id": "S4-R2"
      },
      {
        "id": "S4-Q40",
        "number": 40,
        "category": "reading",
        "kind": "mcq",
        "prompt": "名前が書いてある物について正しいのはどれですか。",
        "options": {
          "A": "受け取れない",
          "B": "本人確認が必要",
          "C": "三か月持ち帰れない",
          "D": "すぐ誰でも持っていける"
        },
        "answer": "B",
        "explanation": "名前があっても本人確認が必要。",
        "passage_id": "S4-R2"
      },
      {
        "id": "S4-Q41",
        "number": 41,
        "category": "reading",
        "kind": "mcq",
        "prompt": "持ち主が長く来なかった物はどうなりますか。",
        "options": {
          "A": "毎日展示される",
          "B": "すぐ捨てられる",
          "C": "必ず家に送られる",
          "D": "三か月後、規則に従い片づける"
        },
        "answer": "D",
        "explanation": "3か月経過後に学則に従い処理。",
        "passage_id": "S4-R2"
      },
      {
        "id": "S4-Q42",
        "number": 42,
        "category": "reading",
        "kind": "mcq",
        "prompt": "行きに選んだ交通手段は何ですか。",
        "options": {
          "A": "新幹線",
          "B": "バス",
          "C": "車",
          "D": "電車とバス"
        },
        "answer": "A",
        "explanation": "観光時間を確保するため行きは新幹線。",
        "passage_id": "S4-R3"
      },
      {
        "id": "S4-Q43",
        "number": 43,
        "category": "reading",
        "kind": "mcq",
        "prompt": "その理由は何ですか。",
        "options": {
          "A": "バスが走っていないから",
          "B": "一番安いから",
          "C": "京都に長くいられるから",
          "D": "荷物が重いから"
        },
        "answer": "C",
        "explanation": "時間短縮で京都滞在を長くするため。",
        "passage_id": "S4-R3"
      },
      {
        "id": "S4-Q44",
        "number": 44,
        "category": "reading",
        "kind": "mcq",
        "prompt": "帰りは何で帰りますか。",
        "options": {
          "A": "バス",
          "B": "歩き",
          "C": "飛行機",
          "D": "新幹線"
        },
        "answer": "A",
        "explanation": "帰りは時間があるのでバス。",
        "passage_id": "S4-R3"
      },
      {
        "id": "S4-Q45",
        "number": 45,
        "category": "reading",
        "kind": "mcq",
        "prompt": "六時以降に安くなるのはどれですか。",
        "options": {
          "A": "すべての野菜",
          "B": "すべての食品",
          "C": "シールのある一部の野菜",
          "D": "パンと牛乳"
        },
        "answer": "C",
        "explanation": "一部の野菜かつシール付きのみ。",
        "passage_id": "S4-R4"
      },
      {
        "id": "S4-Q46",
        "number": 46,
        "category": "reading",
        "kind": "mcq",
        "prompt": "買い物の前に気をつけることは何ですか。",
        "options": {
          "A": "必ず袋を買う",
          "B": "シールを取る",
          "C": "返品できないのでよく確かめる",
          "D": "八時まで待つ"
        },
        "answer": "C",
        "explanation": "返品不可なので購入前に確認。",
        "passage_id": "S4-R4"
      },
      {
        "id": "S4-Q47",
        "number": 47,
        "category": "reading",
        "kind": "mcq",
        "prompt": "午後八時半に店へ行くとどうなりますか。",
        "options": {
          "A": "野菜だけ買える",
          "B": "半額になる",
          "C": "牛乳を買える",
          "D": "閉まっている"
        },
        "answer": "D",
        "explanation": "20:00閉店。",
        "passage_id": "S4-R4"
      },
      {
        "id": "S4-Q48",
        "number": 48,
        "category": "reading",
        "kind": "mcq",
        "prompt": "誕生日会の場所はどこになりましたか。",
        "options": {
          "A": "学校",
          "B": "公園",
          "C": "近くのカフェ",
          "D": "駅"
        },
        "answer": "C",
        "explanation": "雨の可能性でカフェに変更。",
        "passage_id": "S4-R5"
      },
      {
        "id": "S4-Q49",
        "number": 49,
        "category": "reading",
        "kind": "mcq",
        "prompt": "参加したい人はいつまでに返事しますか。",
        "options": {
          "A": "木曜日",
          "B": "土曜日",
          "C": "水曜日",
          "D": "金曜日"
        },
        "answer": "A",
        "explanation": "木曜日が回答期限。",
        "passage_id": "S4-R5"
      },
      {
        "id": "S4-Q50",
        "number": 50,
        "category": "reading",
        "kind": "mcq",
        "prompt": "参加する人が自分で注文するものは何ですか。",
        "options": {
          "A": "飲み物",
          "B": "食べ物",
          "C": "席",
          "D": "ケーキ"
        },
        "answer": "A",
        "explanation": "飲み物は各自注文。",
        "passage_id": "S4-R5"
      },
      {
        "id": "S4-Q51",
        "number": 51,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "鍵はどこにありましたか。",
        "options": {
          "A": "会社の机の上",
          "B": "駅のホーム",
          "C": "かばんの底",
          "D": "玄関の中"
        },
        "answer": "A",
        "explanation": "Kunci tertinggal di meja kantor.",
        "title": "なくした鍵",
        "panels": [
          "女性が帰宅してかばんを探す",
          "玄関の鍵が見つからず困る",
          "女性が会社の机を思い出す",
          "女性が会社に戻り机の上から鍵を取る"
        ],
        "asset": "images/set-4/stories/q51.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S4-Q52",
        "number": 52,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "男の人は最後に何をしましたか。",
        "options": {
          "A": "次のバスを待った",
          "B": "バスを止めた",
          "C": "家に帰った",
          "D": "タクシーに乗った"
        },
        "answer": "A",
        "explanation": "Ketinggalan bus lalu menunggu berikutnya.",
        "title": "バスの乗り遅れ",
        "panels": [
          "男の人が時計を見ると七時四十五分",
          "男の人がバス停へ走る",
          "バスがちょうど出発する",
          "男の人が次のバスを待つ"
        ],
        "asset": "images/set-4/stories/q52.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S4-Q53",
        "number": 53,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "子どもは最初に何をしましたか。",
        "options": {
          "A": "花を切った",
          "B": "トマトを買った",
          "C": "種をまいた",
          "D": "水を飲んだ"
        },
        "answer": "C",
        "explanation": "Menabur benih merupakan tindakan pertama.",
        "title": "野菜の栽培",
        "panels": [
          "子どもが小さい鉢に種をまく",
          "毎朝じょうろで水をやる",
          "小さな芽が出て葉が大きくなる",
          "子どもが赤いトマトを取る"
        ],
        "asset": "images/set-4/stories/q53.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S4-Q54",
        "number": 54,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "二人はどうして別の時間の券を買いましたか。",
        "options": {
          "A": "映画館が休みだったから",
          "B": "お金が多すぎたから",
          "C": "最初の回が満席だったから",
          "D": "映画を間違えたから"
        },
        "answer": "C",
        "explanation": "Sesi awal sold out.",
        "title": "映画のチケット",
        "panels": [
          "二人が映画の時間をスマホで調べる",
          "映画館に着いて券売機の列に並ぶ",
          "買いたい回の席が全部売り切れている",
          "二人が次の回の券を買う"
        ],
        "asset": "images/set-4/stories/q54.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S4-Q55",
        "number": 55,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "配達員は雨が降ったとき何をしましたか。",
        "options": {
          "A": "弁当を食べた",
          "B": "雨具を着た",
          "C": "傘を忘れて帰った",
          "D": "自転車を捨てた"
        },
        "answer": "B",
        "explanation": "Memakai jas hujan saat hujan.",
        "title": "弁当の配達",
        "panels": [
          "店員が弁当二つを袋に入れる",
          "配達員が自転車で出発する",
          "道で雨が降るので雨具を着る",
          "配達員が濡れない袋を客に渡す"
        ],
        "asset": "images/set-4/stories/q55.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S4-Q56",
        "number": 56,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "黒い靴をはいた男の人が、白い自転車を押しています。",
        "options": {
          "A": "Gambar B",
          "B": "Gambar D",
          "C": "Gambar A",
          "D": "Gambar C"
        },
        "answer": "B",
        "explanation": "Jenis sepatu, orang, warna sepeda, dan aksi cocok.",
        "image_options": {
          "A": {
            "scene": "Pria sepatu putih menaiki sepeda hitam",
            "src": "images/set-4/matching/q56-a.svg"
          },
          "B": {
            "scene": "Wanita sepatu hitam mendorong sepeda putih",
            "src": "images/set-4/matching/q56-b.svg"
          },
          "C": {
            "scene": "Pria sepatu hitam mengayuh sepeda putih",
            "src": "images/set-4/matching/q56-c.svg"
          },
          "D": {
            "scene": "Pria sepatu hitam mendorong sepeda putih",
            "src": "images/set-4/matching/q56-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S4-Q57",
        "number": 57,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "カレンダーでは十五日が金曜日になっています。",
        "options": {
          "A": "Gambar A",
          "B": "Gambar B",
          "C": "Gambar C",
          "D": "Gambar D"
        },
        "answer": "A",
        "explanation": "15 jatuh hari Jumat.",
        "image_options": {
          "A": {
            "scene": "Kalender dengan tanggal 15 di kolom Jumat",
            "src": "images/set-4/matching/q57-a.svg"
          },
          "B": {
            "scene": "Kalender dengan tanggal 15 di kolom Minggu",
            "src": "images/set-4/matching/q57-b.svg"
          },
          "C": {
            "scene": "Kalender dengan tanggal 15 di kolom Senin",
            "src": "images/set-4/matching/q57-c.svg"
          },
          "D": {
            "scene": "Kalender dengan tanggal 5 di kolom Jumat",
            "src": "images/set-4/matching/q57-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S4-Q58",
        "number": 58,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "料理をしている人の後ろで、子どもが皿を洗っています。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar D",
          "C": "Gambar A",
          "D": "Gambar B"
        },
        "answer": "D",
        "explanation": "Anak di belakang yang sedang cuci piring.",
        "image_options": {
          "A": {
            "scene": "Anak memasak di depan, dewasa cuci piring",
            "src": "images/set-4/matching/q58-a.svg"
          },
          "B": {
            "scene": "Dewasa memasak, anak mencuci piring di belakang",
            "src": "images/set-4/matching/q58-b.svg"
          },
          "C": {
            "scene": "Anak berdiri di belakang tanpa mencuci",
            "src": "images/set-4/matching/q58-c.svg"
          },
          "D": {
            "scene": "Dua orang sedang makan di restoran",
            "src": "images/set-4/matching/q58-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S4-Q59",
        "number": 59,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "バスは右へ曲がろうとしていて、自転車はまっすぐ進んでいます。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar D",
          "C": "Gambar A",
          "D": "Gambar B"
        },
        "answer": "A",
        "explanation": "Arah bus ke kanan, sepeda lurus.",
        "image_options": {
          "A": {
            "scene": "Bus lurus, sepeda belok kanan",
            "src": "images/set-4/matching/q59-a.svg"
          },
          "B": {
            "scene": "Bus belok kiri, sepeda lurus",
            "src": "images/set-4/matching/q59-b.svg"
          },
          "C": {
            "scene": "Bus berbelok kanan, sepeda lurus",
            "src": "images/set-4/matching/q59-c.svg"
          },
          "D": {
            "scene": "Bus belok kanan, sepeda belok kanan",
            "src": "images/set-4/matching/q59-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S4-Q60",
        "number": 60,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "二階の窓は開いていますが、一階の窓は全部閉まっています。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar A",
          "C": "Gambar B",
          "D": "Gambar C"
        },
        "answer": "B",
        "explanation": "Lantai 2 terbuka, lantai 1 tertutup.",
        "image_options": {
          "A": {
            "scene": "Lantai dua jendela terbuka, lantai satu semua tertutup",
            "src": "images/set-4/matching/q60-a.svg"
          },
          "B": {
            "scene": "Lantai satu terbuka, dua tertutup",
            "src": "images/set-4/matching/q60-b.svg"
          },
          "C": {
            "scene": "Semua jendela terbuka",
            "src": "images/set-4/matching/q60-c.svg"
          },
          "D": {
            "scene": "Semua jendela tertutup",
            "src": "images/set-4/matching/q60-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S4-Q61",
        "number": 61,
        "category": "listening",
        "kind": "mcq",
        "prompt": "何時までにチェックインしますか。",
        "options": {
          "A": "午後七時",
          "B": "午後五時",
          "C": "午後六時",
          "D": "午後八時"
        },
        "answer": "C",
        "explanation": "Batas paling lambat 18:00.",
        "transcript": "男：飛行機は七時出発でしたよね。\n女：はい。チェックインは一時間前までに済ませてください。",
        "audio_src": "audio/set-4/q61.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q62",
        "number": 62,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人がお願いしたことは何ですか。",
        "options": {
          "A": "紙に印刷する",
          "B": "写真を撮り直す",
          "C": "写真を別の形式で送る",
          "D": "写真を消す"
        },
        "answer": "C",
        "explanation": "Minta format file berbeda.",
        "transcript": "女：写真をメールで送りました。\n男：ありがとうございます。でも開けないので、別の形式で送ってもらえますか。",
        "audio_src": "audio/set-4/q62.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q63",
        "number": 63,
        "category": "listening",
        "kind": "mcq",
        "prompt": "二つ目の信号でどちらへ曲がりますか。",
        "options": {
          "A": "まっすぐ",
          "B": "右",
          "C": "戻る",
          "D": "左"
        },
        "answer": "D",
        "explanation": "Belok kiri di lampu kedua.",
        "transcript": "男：すみません、この道は美術館へ行きますか。\n女：まっすぐ行って二つ目の信号を左です。右へ曲がると銀行ですよ。",
        "audio_src": "audio/set-4/q63.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q64",
        "number": 64,
        "category": "listening",
        "kind": "mcq",
        "prompt": "出張は何曜日からになりましたか。",
        "options": {
          "A": "火曜日",
          "B": "水曜日",
          "C": "金曜日",
          "D": "月曜日"
        },
        "answer": "B",
        "explanation": "Mulai diganti Rabu.",
        "transcript": "女：来週の出張は火曜日からでしたね。\n男：水曜日からに変わりました。帰る日は同じ金曜日です。",
        "audio_src": "audio/set-4/q64.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q65",
        "number": 65,
        "category": "listening",
        "kind": "mcq",
        "prompt": "ケーキを食べたのは誰ですか。",
        "options": {
          "A": "お母さん",
          "B": "お父さん",
          "C": "お兄さん",
          "D": "弟"
        },
        "answer": "B",
        "explanation": "Ayah yang makan, bukan kakak laki-laki.",
        "transcript": "男：冷蔵庫の中にケーキがないね。\n女：お兄さんが食べたんじゃない？\n男：聞いたら、お父さんが食べたそうだよ。",
        "audio_src": "audio/set-4/q65.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q66",
        "number": 66,
        "category": "listening",
        "kind": "mcq",
        "prompt": "靴を交換するために必要なものは何ですか。",
        "options": {
          "A": "ポイントカード",
          "B": "レシート",
          "C": "古いかばん",
          "D": "身分証"
        },
        "answer": "B",
        "explanation": "Harus ada kuitansi.",
        "transcript": "女：昨日買った靴、少し小さかったので交換したいんです。\n男：レシートがあれば大丈夫です。",
        "audio_src": "audio/set-4/q66.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q67",
        "number": 67,
        "category": "listening",
        "kind": "mcq",
        "prompt": "電話することにした時間はいつですか。",
        "options": {
          "A": "九時",
          "B": "十時半",
          "C": "十時",
          "D": "十一時半"
        },
        "answer": "B",
        "explanation": "Disepakati 10:30.",
        "transcript": "男：明日、九時から一時間会議があります。\n女：では、十時半に電話してもいいですか。\n男：はい、大丈夫です。",
        "audio_src": "audio/set-4/q67.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q68",
        "number": 68,
        "category": "listening",
        "kind": "mcq",
        "prompt": "女の人が持ってくるものは何ですか。",
        "options": {
          "A": "資料十枚",
          "B": "プリンター",
          "C": "ノート",
          "D": "筆記用具"
        },
        "answer": "D",
        "explanation": "Alat tulis saja, buku catatan disediakan.",
        "transcript": "女：明日、何か持っていくものはありますか。\n男：ノートは用意するので、筆記用具だけ持ってきてください。",
        "audio_src": "audio/set-4/q68.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q69",
        "number": 69,
        "category": "listening",
        "kind": "mcq",
        "prompt": "近い出口はどちらですか。",
        "options": {
          "A": "北口",
          "B": "西口",
          "C": "南口",
          "D": "東口"
        },
        "answer": "A",
        "explanation": "Pintu utara lebih dekat.",
        "transcript": "男：会場は駅の南口から歩いて三分ですか。\n女：北口ですよ。南口からだと十五分ぐらいかかります。",
        "audio_src": "audio/set-4/q69.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S4-Q70",
        "number": 70,
        "category": "listening",
        "kind": "mcq",
        "prompt": "荷物の中には何がありますか。",
        "options": {
          "A": "かさ",
          "B": "冬の服",
          "C": "本",
          "D": "食べ物"
        },
        "answer": "B",
        "explanation": "Isinya pakaian musim dingin.",
        "transcript": "女：この荷物は軽いですね。\n男：中身は本ではなく、冬の服だけですから。",
        "audio_src": "audio/set-4/q70.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      }
    ],
    "passages": [
      {
        "id": "S4-R1",
        "title": "コンサートの案内",
        "body": "音楽クラブのコンサートは日曜日の午後三時に始まります。会場のドアは二時半に開きますが、座席は先に来た人から選べます。入口でチケットを見せてください。小さい子どもも入れますが、コンサート中は静かにしてください。録音や写真撮影はできません。"
      },
      {
        "id": "S4-R2",
        "title": "学校の忘れ物",
        "body": "一階の事務室では、校内で見つかった忘れ物を預かっています。受け取るときは、どこで、いつなくしたかを説明してください。名前が書いてあっても、本人の確認が必要です。三か月たっても持ち主が来なかった物は、学校の決まりに従って片づけます。"
      },
      {
        "id": "S4-R3",
        "title": "旅行の相談",
        "body": "私たちは京都へ旅行します。新幹線なら一時間半ですが、バスなら三時間かかります。バスは安いので、最初はバスにしようと思いました。しかし、京都にいる時間が短いため、少し高くても新幹線で行くことにしました。帰りは時間があるのでバスに乗ります。"
      },
      {
        "id": "S4-R4",
        "title": "食品店の張り紙",
        "body": "この店では、夕方六時から野菜の一部が三割引きになります。割引きのシールがある商品だけが対象です。パンと牛乳は割引きになりません。商品は返品できませんので、買う前によく確かめてください。店は午後八時に閉まります。"
      },
      {
        "id": "S4-R5",
        "title": "友人からの招待",
        "body": "山田さんの誕生日会は次の土曜日、午後五時からです。はじめは公園で行う予定でしたが、雨が降るかもしれないので、近くのカフェに変わりました。参加する人は木曜日までに連絡してください。食べ物は用意しますが、飲み物は各自で注文してください。"
      }
    ]
  },
  {
    "id": "n4-5",
    "title": "Simulasi N4 5",
    "version": "v3-set-5",
    "questions": [
      {
        "id": "S5-Q01",
        "number": 1,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「報告」の読み方はどれですか。",
        "options": {
          "A": "ほうこく",
          "B": "ほうごく",
          "C": "ほこく",
          "D": "ぼうこく"
        },
        "answer": "A",
        "explanation": "報告 = ほうこく, laporan."
      },
      {
        "id": "S5-Q02",
        "number": 2,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「目的」の読み方はどれですか。",
        "options": {
          "A": "もくてき",
          "B": "ぼくてき",
          "C": "もくでき",
          "D": "もってき"
        },
        "answer": "A",
        "explanation": "目的 = もくてき, tujuan."
      },
      {
        "id": "S5-Q03",
        "number": 3,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「理由」の読み方はどれですか。",
        "options": {
          "A": "りょうゆ",
          "B": "りゆう",
          "C": "りゅう",
          "D": "りよ"
        },
        "answer": "B",
        "explanation": "理由 = りゆう, alasan."
      },
      {
        "id": "S5-Q04",
        "number": 4,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「条件」の読み方はどれですか。",
        "options": {
          "A": "じょうげん",
          "B": "じょうこん",
          "C": "じょうけん",
          "D": "しょうけん"
        },
        "answer": "C",
        "explanation": "条件 = じょうけん, syarat."
      },
      {
        "id": "S5-Q05",
        "number": 5,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「配達」の読み方はどれですか。",
        "options": {
          "A": "はいたつ",
          "B": "はいだつ",
          "C": "はいたち",
          "D": "はだつ"
        },
        "answer": "A",
        "explanation": "配達 = はいたつ, pengantaran."
      },
      {
        "id": "S5-Q06",
        "number": 6,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「国際」の読み方はどれですか。",
        "options": {
          "A": "こくざい",
          "B": "くにさい",
          "C": "こっさい",
          "D": "こくさい"
        },
        "answer": "D",
        "explanation": "国際 = こくさい, internasional."
      },
      {
        "id": "S5-Q07",
        "number": 7,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「温度」の読み方はどれですか。",
        "options": {
          "A": "おんと",
          "B": "あんど",
          "C": "おんたく",
          "D": "おんど"
        },
        "answer": "D",
        "explanation": "温度 = おんど, suhu."
      },
      {
        "id": "S5-Q08",
        "number": 8,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「注意書き」の「書き」の読み方はどれですか。",
        "options": {
          "A": "しょき",
          "B": "かぎ",
          "C": "かき",
          "D": "がき"
        },
        "answer": "C",
        "explanation": "書き pada 注意書き dibaca かき, tulisan/catatan."
      },
      {
        "id": "S5-Q09",
        "number": 9,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「たいふう」を漢字で書くとどれですか。",
        "options": {
          "A": "台風",
          "B": "代風",
          "C": "台封",
          "D": "大風"
        },
        "answer": "A",
        "explanation": "たいふう = 台風, topan."
      },
      {
        "id": "S5-Q10",
        "number": 10,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「れきし」を漢字で書くとどれですか。",
        "options": {
          "A": "暦史",
          "B": "歴史",
          "C": "歴司",
          "D": "暦士"
        },
        "answer": "B",
        "explanation": "れきし = 歴史, sejarah."
      },
      {
        "id": "S5-Q11",
        "number": 11,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「かんけい」を漢字で書くとどれですか。",
        "options": {
          "A": "感係",
          "B": "間係",
          "C": "関計",
          "D": "関係"
        },
        "answer": "D",
        "explanation": "かんけい = 関係, hubungan."
      },
      {
        "id": "S5-Q12",
        "number": 12,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「はっぴょう」を漢字で書くとどれですか。",
        "options": {
          "A": "発表",
          "B": "発評",
          "C": "初表",
          "D": "発票"
        },
        "answer": "A",
        "explanation": "はっぴょう = 発表, presentasi/pengumuman."
      },
      {
        "id": "S5-Q13",
        "number": 13,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "この店では現金だけでなく、カードも＿＿ます。",
        "options": {
          "A": "買え",
          "B": "もらえ",
          "C": "払え",
          "D": "使え"
        },
        "answer": "D",
        "explanation": "カードも使えます = kartu juga bisa dipakai."
      },
      {
        "id": "S5-Q14",
        "number": 14,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "会議の時間が変わったので、みんなに＿＿ました。",
        "options": {
          "A": "調べ",
          "B": "比べ",
          "C": "伝え",
          "D": "たずね"
        },
        "answer": "C",
        "explanation": "伝える = menyampaikan perubahan ke orang-orang."
      },
      {
        "id": "S5-Q15",
        "number": 15,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "出発まであと十分しかありません。急いで＿＿ください。",
        "options": {
          "A": "集めて",
          "B": "切って",
          "C": "準備して",
          "D": "続けて"
        },
        "answer": "C",
        "explanation": "Persiapan diperlukan karena waktu menuju keberangkatan tinggal sedikit."
      },
      {
        "id": "S5-Q16",
        "number": 16,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "この紙は必要なので、＿＿ずに取っておいてください。",
        "options": {
          "A": "閉め",
          "B": "破ら",
          "C": "押さ",
          "D": "捨て"
        },
        "answer": "D",
        "explanation": "捨てずに = jangan membuang; simpan dokumen penting."
      },
      {
        "id": "S5-Q17",
        "number": 17,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「また後で連絡します」に近い意味はどれですか。",
        "options": {
          "A": "明日必ず会います",
          "B": "あとでまた知らせます",
          "C": "今すぐ電話を切ります",
          "D": "昨日連絡しました"
        },
        "answer": "B",
        "explanation": "後で連絡する = menghubungi lagi nanti."
      },
      {
        "id": "S5-Q18",
        "number": 18,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「予定より早く終わりました」に近い意味はどれですか。",
        "options": {
          "A": "予定がなくなりました",
          "B": "決めた時間より前に終わりました",
          "C": "まだ始まっていません",
          "D": "いつもより遅く終わりました"
        },
        "answer": "B",
        "explanation": "予定より早い = lebih awal dari rencana."
      },
      {
        "id": "S5-Q19",
        "number": 19,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「おそらく雨が降るでしょう」に近い意味はどれですか。",
        "options": {
          "A": "たぶん雨になると思います",
          "B": "ぜったいに降りません",
          "C": "雨はもうやみました",
          "D": "雨でも出かけます"
        },
        "answer": "A",
        "explanation": "おそらく = kemungkinan besar/mungkin."
      },
      {
        "id": "S5-Q20",
        "number": 20,
        "category": "vocabulary",
        "kind": "mcq",
        "prompt": "「この部屋は使用中です」に近い意味はどれですか。",
        "options": {
          "A": "今だれかが使っています",
          "B": "いつでも空いています",
          "C": "もう使えません",
          "D": "今掃除しています"
        },
        "answer": "A",
        "explanation": "使用中 = sedang dipakai."
      },
      {
        "id": "S5-Q21",
        "number": 21,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "急げば最終バスに＿＿かもしれません。",
        "options": {
          "A": "間に合った",
          "B": "間に合おう",
          "C": "間に合う",
          "D": "間に合って"
        },
        "answer": "C",
        "explanation": "～かもしれない digunakan dengan bentuk kamus."
      },
      {
        "id": "S5-Q22",
        "number": 22,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "机の上に置いたはずの鍵が、どこを探しても＿＿。",
        "options": {
          "A": "見つけません",
          "B": "見つかりません",
          "C": "見せません",
          "D": "見られません"
        },
        "answer": "B",
        "explanation": "見つからない = tidak ditemukan (intransitif)."
      },
      {
        "id": "S5-Q23",
        "number": 23,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "雨がやんだ＿＿、散歩に出かけました。",
        "options": {
          "A": "のに",
          "B": "ように",
          "C": "なら",
          "D": "ので"
        },
        "answer": "D",
        "explanation": "Karena hujan berhenti, keluar jalan-jalan."
      },
      {
        "id": "S5-Q24",
        "number": 24,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "先生の説明を聞いてから、もう一度＿＿みました。",
        "options": {
          "A": "やる",
          "B": "やり",
          "C": "やった",
          "D": "やって"
        },
        "answer": "D",
        "explanation": "～てみる = mencoba melakukan."
      },
      {
        "id": "S5-Q25",
        "number": 25,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "時間がなかったので、朝ご飯を＿＿学校へ行きました。",
        "options": {
          "A": "食べずに",
          "B": "食べないは",
          "C": "食べないでに",
          "D": "食べなく"
        },
        "answer": "A",
        "explanation": "～ずに menyatakan melakukan tindakan tanpa melakukan yang lain."
      },
      {
        "id": "S5-Q26",
        "number": 26,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "母は夕飯を作り＿＿、私と話しています。",
        "options": {
          "A": "のに",
          "B": "ながら",
          "C": "ために",
          "D": "までに"
        },
        "answer": "B",
        "explanation": "～ながら = dua aktivitas bersama oleh pelaku sama."
      },
      {
        "id": "S5-Q27",
        "number": 27,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "この店は安いだけでなく、サービスもいい＿＿。",
        "options": {
          "A": "です",
          "B": "に",
          "C": "ので",
          "D": "なら"
        },
        "answer": "A",
        "explanation": "～だけでなく～も: kelebihan tambahan, kalimat berakhir です."
      },
      {
        "id": "S5-Q28",
        "number": 28,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "日本へ行く＿＿、パスポートが必要です。",
        "options": {
          "A": "には",
          "B": "ながら",
          "C": "のため",
          "D": "のに"
        },
        "answer": "A",
        "explanation": "～には menyatakan syarat untuk tujuan/tindakan pergi ke Jepang."
      },
      {
        "id": "S5-Q29",
        "number": 29,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "駅に着くころには、雨が＿＿かもしれません。",
        "options": {
          "A": "やんで",
          "B": "やむ",
          "C": "やんだ",
          "D": "やんでいる"
        },
        "answer": "D",
        "explanation": "～ている bentuk keadaan selesai di masa depan (hujan sudah berhenti)."
      },
      {
        "id": "S5-Q30",
        "number": 30,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "名前を書いた＿＿、受付に出してください。",
        "options": {
          "A": "ほど",
          "B": "あとで",
          "C": "まえに",
          "D": "ながら"
        },
        "answer": "B",
        "explanation": "Urutan: setelah menulis nama, serahkan ke loket."
      },
      {
        "id": "S5-Q31",
        "number": 31,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "分からない言葉があったら、辞書で＿＿みましょう。",
        "options": {
          "A": "調べる",
          "B": "調べ",
          "C": "調べて",
          "D": "調べた"
        },
        "answer": "C",
        "explanation": "～てみる bentuk percobaan."
      },
      {
        "id": "S5-Q32",
        "number": 32,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "山田さんは来る＿＿でしたが、急に来られなくなりました。",
        "options": {
          "A": "ところ",
          "B": "ため",
          "C": "ほう",
          "D": "予定"
        },
        "answer": "D",
        "explanation": "～予定でした = semula dijadwalkan, tetapi batal."
      },
      {
        "id": "S5-Q33",
        "number": 33,
        "category": "grammar",
        "kind": "mcq",
        "prompt": "もう少し練習＿＿、この曲が弾けるようになるでしょう。",
        "options": {
          "A": "するとで",
          "B": "しながら",
          "C": "したらに",
          "D": "すれば"
        },
        "answer": "D",
        "explanation": "～ば bentuk syarat yang cocok untuk hasil perkembangan."
      },
      {
        "id": "S5-Q34",
        "number": 34,
        "category": "grammar",
        "kind": "essay",
        "prompt": "友だちが傘を忘れて困っています。できることを一つ提案し、その理由を添えて二～三文書いてください。",
        "sample_answer": "私の傘を一緒に使いませんか。駅まで同じ道を行くので、大丈夫ですよ。",
        "rubric": "Usulan bantuan (0.25), alasan (0.25), Jepang natural (0.25), 2–3 kalimat mudah dipahami (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S5-Q35",
        "number": 35,
        "category": "grammar",
        "kind": "essay",
        "prompt": "試験の日に寝坊しないために、前の日から準備しておくことを二つ、日本語で二～三文書いてください。",
        "sample_answer": "前の晩にかばんと受験票を用意しておきます。それから、目覚まし時計を二つセットして、早く寝ます。",
        "rubric": "Persiapan pertama (0.25), persiapan kedua (0.25), tujuan relevan (0.25), ～ておく atau ungkapan rencana tepat (0.25).",
        "points": 1,
        "max_characters": 350
      },
      {
        "id": "S5-Q36",
        "number": 36,
        "category": "reading",
        "kind": "mcq",
        "prompt": "来月の回収場所はどこですか。",
        "options": {
          "A": "小学校",
          "B": "公民館の前",
          "C": "図書館",
          "D": "駅前の広場"
        },
        "answer": "D",
        "explanation": "来月のみ駅前広場に変更。",
        "passage_id": "S5-R1"
      },
      {
        "id": "S5-Q37",
        "number": 37,
        "category": "reading",
        "kind": "mcq",
        "prompt": "受け取れないものはどれですか。",
        "options": {
          "A": "読める本",
          "B": "きれいな服",
          "C": "破れた本",
          "D": "使えるコート"
        },
        "answer": "C",
        "explanation": "破れた本は不可。",
        "passage_id": "S5-R1"
      },
      {
        "id": "S5-Q38",
        "number": 38,
        "category": "reading",
        "kind": "mcq",
        "prompt": "集めたものはどうなりますか。",
        "options": {
          "A": "全部捨てる",
          "B": "お金を払って売られる",
          "C": "来年返す",
          "D": "必要な人に無料で配る"
        },
        "answer": "D",
        "explanation": "必要な人へ無料で渡す。",
        "passage_id": "S5-R1"
      },
      {
        "id": "S5-Q39",
        "number": 39,
        "category": "reading",
        "kind": "mcq",
        "prompt": "午後一時に着いたらどうできますか。",
        "options": {
          "A": "荷物を無料で預けられる",
          "B": "朝食を食べられる",
          "C": "すぐ部屋を使える",
          "D": "自転車を無料で借りられる"
        },
        "answer": "A",
        "explanation": "部屋は15時からだが荷物預かりは午前から可能。",
        "passage_id": "S5-R2"
      },
      {
        "id": "S5-Q40",
        "number": 40,
        "category": "reading",
        "kind": "mcq",
        "prompt": "朝九時半に朝食を食べられますか。",
        "options": {
          "A": "食べられない",
          "B": "自転車を返せば食べられる",
          "C": "食べられる",
          "D": "部屋でだけ食べられる"
        },
        "answer": "A",
        "explanation": "朝食は7〜9時まで。",
        "passage_id": "S5-R2"
      },
      {
        "id": "S5-Q41",
        "number": 41,
        "category": "reading",
        "kind": "mcq",
        "prompt": "自転車を借りた人はいつまでに返しますか。",
        "options": {
          "A": "次の日の朝",
          "B": "午後三時",
          "C": "午後九時",
          "D": "午前十時"
        },
        "answer": "C",
        "explanation": "返却期限21時。",
        "passage_id": "S5-R2"
      },
      {
        "id": "S5-Q42",
        "number": 42,
        "category": "reading",
        "kind": "mcq",
        "prompt": "研修はどこで行いますか。",
        "options": {
          "A": "店の二階",
          "B": "駅の会議室",
          "C": "一階のレジ",
          "D": "公民館"
        },
        "answer": "A",
        "explanation": "二階で研修。",
        "passage_id": "S5-R3"
      },
      {
        "id": "S5-Q43",
        "number": 43,
        "category": "reading",
        "kind": "mcq",
        "prompt": "研修に持ってくるものは何ですか。",
        "options": {
          "A": "黒い靴",
          "B": "名札",
          "C": "制服",
          "D": "エプロン"
        },
        "answer": "A",
        "explanation": "制服は当日支給、黒靴持参。",
        "passage_id": "S5-R3"
      },
      {
        "id": "S5-Q44",
        "number": 44,
        "category": "reading",
        "kind": "mcq",
        "prompt": "参加できない人はどうしますか。",
        "options": {
          "A": "前日の夕方までに電話",
          "B": "当日の夜にメール",
          "C": "次の日に店へ行く",
          "D": "何もしなくてよい"
        },
        "answer": "A",
        "explanation": "前日夕方までに店長へ電話。",
        "passage_id": "S5-R3"
      },
      {
        "id": "S5-Q45",
        "number": 45,
        "category": "reading",
        "kind": "mcq",
        "prompt": "遅く帰る理由は何ですか。",
        "options": {
          "A": "電車が止まった",
          "B": "発表の準備をする",
          "C": "映画を見る",
          "D": "アルバイトがある"
        },
        "answer": "B",
        "explanation": "ゼミ友と発表準備。",
        "passage_id": "S5-R4"
      },
      {
        "id": "S5-Q46",
        "number": 46,
        "category": "reading",
        "kind": "mcq",
        "prompt": "帰宅予定はいつごろですか。",
        "options": {
          "A": "八時",
          "B": "六時",
          "C": "七時",
          "D": "九時"
        },
        "answer": "A",
        "explanation": "8時頃に帰宅見込み。",
        "passage_id": "S5-R4"
      },
      {
        "id": "S5-Q47",
        "number": 47,
        "category": "reading",
        "kind": "mcq",
        "prompt": "母親へのお願いは何ですか。",
        "options": {
          "A": "夕食を二人分作ってほしい",
          "B": "先生に連絡してほしい",
          "C": "自分の夕食は作らなくてよい",
          "D": "駅まで来てほしい"
        },
        "answer": "C",
        "explanation": "夕食は学校で食べるので不要。",
        "passage_id": "S5-R4"
      },
      {
        "id": "S5-Q48",
        "number": 48,
        "category": "reading",
        "kind": "mcq",
        "prompt": "朝市が今週行われない理由は何ですか。",
        "options": {
          "A": "野菜が高い",
          "B": "雨が降った",
          "C": "学校が休み",
          "D": "パンがない"
        },
        "answer": "B",
        "explanation": "雨によって来週へ延期。",
        "passage_id": "S5-R5"
      },
      {
        "id": "S5-Q49",
        "number": 49,
        "category": "reading",
        "kind": "mcq",
        "prompt": "来週の場所はどこですか。",
        "options": {
          "A": "公園",
          "B": "学校の校庭",
          "C": "図書館",
          "D": "駅のホーム"
        },
        "answer": "B",
        "explanation": "学校の校庭で開催。",
        "passage_id": "S5-R5"
      },
      {
        "id": "S5-Q50",
        "number": 50,
        "category": "reading",
        "kind": "mcq",
        "prompt": "来週、野菜以外に何が売られますか。",
        "options": {
          "A": "家具",
          "B": "服",
          "C": "本",
          "D": "パン"
        },
        "answer": "D",
        "explanation": "地元製パンの販売予定。",
        "passage_id": "S5-R5"
      },
      {
        "id": "S5-Q51",
        "number": 51,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "女の人はなぜ駅に戻りましたか。",
        "options": {
          "A": "友だちに会うため",
          "B": "電車を待つため",
          "C": "忘れた傘を取るため",
          "D": "出る出口を間違えたため"
        },
        "answer": "D",
        "explanation": "Ternyata tujuan ada di sisi pintu selatan.",
        "title": "道を間違えた日",
        "panels": [
          "女性が駅の北口から出る",
          "地図を見ると目的地は南口側と分かる",
          "女性が駅の中を通って反対側へ行く",
          "女性が南口近くの店に着く"
        ],
        "asset": "images/set-5/stories/q51.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S5-Q52",
        "number": 52,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "学生はコピーがうまくできなかったあと、何をしましたか。",
        "options": {
          "A": "店を出た",
          "B": "画面の設定を直した",
          "C": "資料を捨てた",
          "D": "先生に電話した"
        },
        "answer": "B",
        "explanation": "Mengubah setting mesin setelah hasil kosong.",
        "title": "コピー機のトラブル",
        "panels": [
          "学生がコンビニで資料をコピーする",
          "コピー機から真っ白な紙が出る",
          "学生が画面で設定を直す",
          "次にきれいに文字のあるコピーが出る"
        ],
        "asset": "images/set-5/stories/q52.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S5-Q53",
        "number": 53,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "親子が公園を出たのはいつですか。",
        "options": {
          "A": "午後五時ごろ",
          "B": "昼十二時",
          "C": "朝九時",
          "D": "夜十時"
        },
        "answer": "A",
        "explanation": "Jam menunjukkan 5 sore.",
        "title": "公園の約束",
        "panels": [
          "親子が公園に来る",
          "子どもが遊具で遊ぶ",
          "時計が五時を示し、親が帰ろうと伝える",
          "親子が公園を出て歩いて帰る"
        ],
        "asset": "images/set-5/stories/q53.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S5-Q54",
        "number": 54,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "時計が止まったあと、男の人は何をしましたか。",
        "options": {
          "A": "時計を捨てた",
          "B": "電池を交換した",
          "C": "時計を洗った",
          "D": "時間を書いた"
        },
        "answer": "B",
        "explanation": "Mengganti baterai agar jam berfungsi kembali.",
        "title": "なくなった電池",
        "panels": [
          "男性が目覚まし時計をセットする",
          "翌朝、時計が止まっている",
          "男性が電池を新しくする",
          "時計の針が動き始める"
        ],
        "asset": "images/set-5/stories/q54.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S5-Q55",
        "number": 55,
        "category": "story_image",
        "kind": "mcq",
        "prompt": "旅行者はどうしてカフェに入りましたか。",
        "options": {
          "A": "昼寝するため",
          "B": "充電するため",
          "C": "道を教えるため",
          "D": "写真を売るため"
        },
        "answer": "B",
        "explanation": "Baterai rendah sehingga mampir mengisi daya.",
        "title": "旅行の写真",
        "panels": [
          "旅行者が湖の前で写真を撮る",
          "スマホに電池が少ない表示が出る",
          "旅行者がカフェで充電する",
          "旅行者が夕方、また写真を撮る"
        ],
        "asset": "images/set-5/stories/q55.svg",
        "image_alt": "四つの場面を順番に描いた絵",
        "image_instructions": "Empat panel tanpa teks penanda jawaban, gunakan urutan kiri→kanan; panel bernomor 1–4 dengan visual jelas."
      },
      {
        "id": "S5-Q56",
        "number": 56,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "女の人は本を棚に戻してから、図書館を出ます。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar D",
          "C": "Gambar B",
          "D": "Gambar A"
        },
        "answer": "C",
        "explanation": "Urutan mengembalikan buku lalu keluar.",
        "image_options": {
          "A": {
            "scene": "Wanita membawa buku keluar perpustakaan",
            "src": "images/set-5/matching/q56-a.svg"
          },
          "B": {
            "scene": "Wanita mengembalikan buku ke rak lalu keluar",
            "src": "images/set-5/matching/q56-b.svg"
          },
          "C": {
            "scene": "Wanita meminjam buku lalu duduk",
            "src": "images/set-5/matching/q56-c.svg"
          },
          "D": {
            "scene": "Petugas menumpuk buku di meja",
            "src": "images/set-5/matching/q56-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S5-Q57",
        "number": 57,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "傘が二本あります。短い傘は長い傘の左にあります。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar A",
          "C": "Gambar C",
          "D": "Gambar B"
        },
        "answer": "C",
        "explanation": "Payung pendek di kiri yang panjang.",
        "image_options": {
          "A": {
            "scene": "Payung pendek di kanan payung panjang",
            "src": "images/set-5/matching/q57-a.svg"
          },
          "B": {
            "scene": "Dua payung panjang berdampingan",
            "src": "images/set-5/matching/q57-b.svg"
          },
          "C": {
            "scene": "Payung pendek di kiri payung panjang",
            "src": "images/set-5/matching/q57-c.svg"
          },
          "D": {
            "scene": "Payung panjang di kiri payung pendek",
            "src": "images/set-5/matching/q57-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S5-Q58",
        "number": 58,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "男の子は自分の前にあるケーキを食べずに、飲み物だけ飲んでいます。",
        "options": {
          "A": "Gambar B",
          "B": "Gambar D",
          "C": "Gambar A",
          "D": "Gambar C"
        },
        "answer": "B",
        "explanation": "Kue tidak dimakan, hanya minum.",
        "image_options": {
          "A": {
            "scene": "Anak laki-laki makan kue dan minum",
            "src": "images/set-5/matching/q58-a.svg"
          },
          "B": {
            "scene": "Anak perempuan hanya minum, kue di depan",
            "src": "images/set-5/matching/q58-b.svg"
          },
          "C": {
            "scene": "Anak laki-laki makan kue tanpa minum",
            "src": "images/set-5/matching/q58-c.svg"
          },
          "D": {
            "scene": "Anak laki-laki hanya minum, kue utuh di depannya",
            "src": "images/set-5/matching/q58-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S5-Q59",
        "number": 59,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "切符を買う人が四人並んでいて、最後の人は大きい荷物を持っています。",
        "options": {
          "A": "Gambar D",
          "B": "Gambar A",
          "C": "Gambar B",
          "D": "Gambar C"
        },
        "answer": "B",
        "explanation": "Empat antre dan orang terakhir koper besar.",
        "image_options": {
          "A": {
            "scene": "4 orang antre tiket, terakhir memegang koper besar",
            "src": "images/set-5/matching/q59-a.svg"
          },
          "B": {
            "scene": "4 orang antre tiket, paling depan membawa koper",
            "src": "images/set-5/matching/q59-b.svg"
          },
          "C": {
            "scene": "3 orang antre tiket, terakhir bawa koper",
            "src": "images/set-5/matching/q59-c.svg"
          },
          "D": {
            "scene": "4 orang antre, tidak ada koper",
            "src": "images/set-5/matching/q59-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S5-Q60",
        "number": 60,
        "category": "match_image",
        "kind": "mcq",
        "prompt": "窓の外では雪が降っていますが、部屋の中では子どもが半そでを着ています。",
        "options": {
          "A": "Gambar C",
          "B": "Gambar B",
          "C": "Gambar D",
          "D": "Gambar A"
        },
        "answer": "B",
        "explanation": "Salju di luar, anak memakai kaus lengan pendek di dalam.",
        "image_options": {
          "A": {
            "scene": "Di luar hujan, anak lengan panjang",
            "src": "images/set-5/matching/q60-a.svg"
          },
          "B": {
            "scene": "Di luar salju, anak berbaju lengan pendek di dalam",
            "src": "images/set-5/matching/q60-b.svg"
          },
          "C": {
            "scene": "Di luar salju, anak memakai mantel tebal di dalam",
            "src": "images/set-5/matching/q60-c.svg"
          },
          "D": {
            "scene": "Di luar cerah, anak berbaju lengan pendek",
            "src": "images/set-5/matching/q60-d.svg"
          }
        },
        "image_alt": "選択肢の状況を描いた絵",
        "image_instructions": "Ilustrasikan semua 4 opsi secara spesifik, hindari teks Jepang pada gambar yang membocorkan kunci. Gunakan satu gaya SVG konsisten."
      },
      {
        "id": "S5-Q61",
        "number": 61,
        "category": "listening",
        "kind": "mcq",
        "prompt": "打ち合わせは何時からですか。",
        "options": {
          "A": "一時",
          "B": "三時",
          "C": "二時",
          "D": "四時"
        },
        "answer": "B",
        "explanation": "Mulai pukul 15:00 demi lengkap peserta.",
        "transcript": "女：今日の打ち合わせ、二時に始めませんか。\n男：三時なら全員そろうので、三時にしましょう。",
        "audio_src": "audio/set-5/q61.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q62",
        "number": 62,
        "category": "listening",
        "kind": "mcq",
        "prompt": "何が壊れていますか。",
        "options": {
          "A": "キーボード",
          "B": "電池",
          "C": "画面",
          "D": "マウス"
        },
        "answer": "A",
        "explanation": "Keyboard tidak berfungsi sementara layar masih terlihat.",
        "transcript": "男：そのパソコン、まだ使えますか。\n女：画面は見えますが、キーボードが動きません。修理を頼みました。",
        "audio_src": "audio/set-5/q62.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q63",
        "number": 63,
        "category": "listening",
        "kind": "mcq",
        "prompt": "今までに何冊読みましたか。",
        "options": {
          "A": "十二冊",
          "B": "十冊",
          "C": "八冊",
          "D": "二冊"
        },
        "answer": "C",
        "explanation": "Saat ini delapan, dua lagi rencana.",
        "transcript": "女：日本語の本、十冊読みましたか。\n男：まだ八冊です。週末にあと二冊読むつもりです。",
        "audio_src": "audio/set-5/q63.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q64",
        "number": 64,
        "category": "listening",
        "kind": "mcq",
        "prompt": "朝食はいくらですか。",
        "options": {
          "A": "千円",
          "B": "八百円",
          "C": "五百円",
          "D": "無料"
        },
        "answer": "B",
        "explanation": "Sarapan tambahan 800 yen.",
        "transcript": "男：すみません、ホテルの朝食は無料ですか。\n女：宿泊料金には入っていません。一人八百円です。",
        "audio_src": "audio/set-5/q64.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q65",
        "number": 65,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人はなぜ今日行けませんか。",
        "options": {
          "A": "お金がないから",
          "B": "仕事が長引くから",
          "C": "病院の予定があるから",
          "D": "駅が遠いから"
        },
        "answer": "C",
        "explanation": "Hari ini ada jadwal ke rumah sakit.",
        "transcript": "女：仕事が終わったら飲みに行きませんか。\n男：すみません。今日は病院に行く予定があるので、明日なら。",
        "audio_src": "audio/set-5/q65.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q66",
        "number": 66,
        "category": "listening",
        "kind": "mcq",
        "prompt": "空に雲が増えるのはいつですか。",
        "options": {
          "A": "夜中から",
          "B": "今朝から",
          "C": "夕方から",
          "D": "昼から"
        },
        "answer": "A",
        "explanation": "Akan bertambah mulai tengah malam.",
        "transcript": "男：今夜は星がよく見えそうですね。\n女：ええ。でも夜中から雲が増えるそうです。",
        "audio_src": "audio/set-5/q66.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q67",
        "number": 67,
        "category": "listening",
        "kind": "mcq",
        "prompt": "男の人はどうすることにしましたか。",
        "options": {
          "A": "歩いて行く",
          "B": "タクシーに乗る",
          "C": "駅に戻る",
          "D": "バスを十分待つ"
        },
        "answer": "A",
        "explanation": "Lebih cepat berjalan 7 menit.",
        "transcript": "女：次のバスは十分後に来ますよ。\n男：歩けば七分だから、歩こうと思います。",
        "audio_src": "audio/set-5/q67.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q68",
        "number": 68,
        "category": "listening",
        "kind": "mcq",
        "prompt": "二つ目のケーキは何になりましたか。",
        "options": {
          "A": "抹茶",
          "B": "いちご",
          "C": "チーズ",
          "D": "チョコレート"
        },
        "answer": "C",
        "explanation": "Stroberi habis, mengganti menjadi keju.",
        "transcript": "男：ケーキを二つください。チョコレート一つと、いちご一つ。\n女：すみません、いちごは売り切れで、チーズケーキならあります。\n男：じゃあ、それにします。",
        "audio_src": "audio/set-5/q68.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q69",
        "number": 69,
        "category": "listening",
        "kind": "mcq",
        "prompt": "駅に集まらない人は誰ですか。",
        "options": {
          "A": "学生",
          "B": "友だち",
          "C": "全員",
          "D": "先生"
        },
        "answer": "D",
        "explanation": "Guru berangkat langsung ke lokasi.",
        "transcript": "女：明日の集合、九時ですよね。\n男：はい。ただし先生は先に会場へ行くので、私たちだけで駅に集まります。",
        "audio_src": "audio/set-5/q69.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      },
      {
        "id": "S5-Q70",
        "number": 70,
        "category": "listening",
        "kind": "mcq",
        "prompt": "新しい本屋はどこにありますか。",
        "options": {
          "A": "市役所の前の向かい側",
          "B": "公園の中",
          "C": "駅前",
          "D": "学校の後ろ"
        },
        "answer": "A",
        "explanation": "Toko buku pindah ke seberang kantor kota.",
        "transcript": "男：あの本屋は駅前から引っ越しましたか。\n女：はい。新しい店は市役所の向かいです。以前より広くなりました。",
        "audio_src": "audio/set-5/q70.mp3",
        "voice_locale": "ja-JP",
        "audio_cast": [
          "speaker_a",
          "speaker_b"
        ],
        "max_plays": 2
      }
    ],
    "passages": [
      {
        "id": "S5-R1",
        "title": "町のリサイクル",
        "body": "毎月第二日曜日、公民館の前で古い服や本を集めています。朝九時から正午までです。汚れた服と破れた本は受け取れません。集めた物は必要な人に無料で渡します。来月だけは公民館の工事があるため、駅前の広場で行います。"
      },
      {
        "id": "S5-R2",
        "title": "ホテルの案内",
        "body": "チェックインは午後三時からですが、荷物は午前中から無料で預けられます。チェックアウトは午前十時です。朝食は七時から九時まで一階のレストランで食べられます。自転車は一日三百円で借りられますが、夜九時までに返してください。"
      },
      {
        "id": "S5-R3",
        "title": "お店の研修",
        "body": "新しくアルバイトを始める人は、来週月曜日の午後一時から三時まで研修を受けてください。場所は店の二階です。制服は当日渡しますので、黒い靴だけ持ってきてください。どうしても来られない人は、前日の夕方までに店長へ電話してください。"
      },
      {
        "id": "S5-R4",
        "title": "家族へのメール",
        "body": "お母さんへ。今日の帰りはいつもより遅くなります。ゼミの友だちと発表の準備をすることになりました。八時ごろには家に着くと思います。夕食は学校で食べるので、私の分は作らなくても大丈夫です。終わったらまた連絡します。"
      },
      {
        "id": "S5-R5",
        "title": "朝市のニュース",
        "body": "日曜日の朝市は、雨のため来週に延期されました。時間はいつもと同じ午前八時から十一時までです。ただし来週は公園が別のイベントで使われるため、駅から歩いて十分の学校の校庭で開きます。野菜のほか、地元で作ったパンも売る予定です。"
      }
    ]
  }
]
```

---

**AKHIR MASTER SPEC.** Implementasikan website lengkap dengan **5 simulasi × 70 soal** di **`fayyadh678/SimulasiN4`**, dengan audio dan gambar nyata serta deployment online, lalu verifikasi semua checklist sebelum melaporkan sukses. 
