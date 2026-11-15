# Zahra Portfolio V2

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

<p align="center">
  <strong>Modern Dark-Themed Developer Portfolio</strong><br/>
  Crafted with precision for <strong>Al Zahra Ramadhani</strong> — Junior Software Engineer & Google Student Ambassador.
</p>

[Live GitHub Repository](https://github.com/alzahraramadhani/portofolio-v2) • [Explore Pages](#-halaman--arsitektur-fitur) • [Getting Started](#-getting-started) • [Auto Sync](#-fitur-auto-commit--auto-push-ke-github)

</div>

---

## 🌟 Highlight & Fitur Utama

- **🎨 Pure Dark Aesthetic & Design System:**
  - Dirancang presisi mengikuti desain Figma dengan palet warna kanvas gelap (`#131315`), permukaan bertingkat (`#18181A`, `#201F24`), dan aksen ungu indigo / periwinkle (`#8E8FBB`, `#2A2A8E`).
  - Menggunakan font tunggal **Inter** secara konsisten di seluruh elemen antarmuka.
- **⚡ 18 Core Tech Stack Badges (Home Profile Card):**
  - Menampilkan 18 teknologi utama lengkap dengan ikon: `JavaScript`, `TypeScript`, `React`, `Next.js`, `Tailwind CSS`, `Node.js`, `Express.js`, `Dart`, `Flutter`, `PHP`, `Laravel`, `SQL`, `PostgreSQL`, `Supabase`, `Vite`, `Shadcn UI`, `Git`, dan `GitHub`.
- **📌 Sticky Experience & Education Timeline:**
  - Layout 2 kolom interaktif: **Kolom Kiri (Formal Education) tetap diam (*sticky*)**, sementara **Kolom Kanan (daftar riwayat pengalaman) ikut bergulir (*scrollable*)**.
  - Dilengkapi **Lightbox Modal Zoom** untuk memperbesar foto sertifikat dan dokumentasi kegiatan.
- **🐙 Live GitHub Sync (Contribution Activity & Pinned Repos):**
  - Sinkronisasi data *real-time* ke akun GitHub [`@alzahraramadhani`](https://github.com/alzahraramadhani) menggunakan **GitHub GraphQL API / Public Fallback Fetcher** dengan strategi *Incremental Static Regeneration* (ISR setiap 15 menit).
  - Menampilkan matriks kalender kontribusi 52 minggu x 7 hari dengan palet warna kustom Indigo-Putih dan kartu *Pinned Repositories*.
- **📂 Katalog Projects Berfilter & Paginasi (`/projects`):**
  - Filter kategori instan (`All Projects`, `Web Applications`, `Mobile Apps`, `UI/UX Design`) dengan paginasi interaktif (6 item per halaman).
- **📬 Contact Section ("Let's build together."):**
  - Formulir tervalidasi dengan endpoint server Next.js `/api/contact` yang siap mengirim pesan langsung ke `alzahra.workhub@gmail.com` via Web3Forms / Resend.
  - Kartu Direct Mail dengan fitur *One-Click Copy to Clipboard*.
  - Kartu lokasi Kota Malang dengan indikator status waktu nyata `● UTC+7 (WIB) Available`.

---

## 🧭 Halaman & Arsitektur Fitur

| Rute | Halaman | Deskripsi |
| :--- | :--- | :--- |
| `/` | **Home Page** | Hero, Profile Card (18 Tech Stack), Featured Projects (2x2), Sticky Experience Timeline, dan Contact Section. |
| `/about` | **About Page** | Profil naratif lengkap, 4 tautan sosial media, 3 kategori Tech Stack & Tools, Kalender Kontribusi & Pinned Repos GitHub *live*, serta Collaboration Banner. |
| `/projects` | **Projects Page** | Katalog lengkap semua karya dengan filter kategori dan paginasi interaktif. |
| `/api/contact` | **Contact API** | Serverless route handler untuk memvalidasi dan meneruskan pesan formulir kontak. |

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Komponen & Utilitas UI:** [Shadcn UI](https://ui.shadcn.com/), `clsx`, `tailwind-merge`, `class-variance-authority`
- **Ikonografi:** [React Icons (Simple Icons)](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)
- **Notifikasi:** [Sonner](https://sonner.emilkowal.ski/)
- **Testing:** [Vitest](https://vitest.dev/) & React Testing Library (11 unit/integration tests)

---

## 🚀 Getting Started

### 1. Kloning Repositori
```bash
git clone https://github.com/alzahraramadhani/portofolio-v2.git
cd portofolio-v2
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables (Opsional)
Salin berkas `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Isi variabel berikut sesuai kebutuhan:
```env
GITHUB_USERNAME="alzahraramadhani"
GITHUB_TOKEN=""          # Opsional: GitHub Personal Access Token untuk kuota API lebih tinggi
WEB3FORMS_ACCESS_KEY=""  # Opsional: Untuk pengiriman pesan contact form ke inbox Gmail
```
*(Catatan: Tanpa token GitHub sekalipun, data kontribusi dan repositori tetap otomatis tampil menggunakan public fallback fetcher).*

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser kamu.

### 5. Build untuk Produksi
```bash
npm run build
npm run start
```

### 6. Menjalankan Pengujian Otomatis
```bash
npm test
npm run typecheck
```

---

## 🔄 Fitur Auto Commit & Auto Push ke GitHub

Agar setiap perubahan kode yang kamu buat bisa **langsung otomatis ter-commit dan ter-push ke GitHub**, repositori ini telah dilengkapi dengan skrip otomatis:

### Cara Menjalankan Auto-Sync:
Jalankan perintah ini di terminal terpisah saat kamu sedang mengedit kode:
```bash
npm run auto-sync
```
atau menggunakan skrip PowerShell:
```powershell
.\scripts\auto-sync.ps1
```

**Cara Kerja Auto-Sync:**
1. Skrip akan memantau folder proyek secara *real-time*.
2. Setiap kali ada file yang kamu simpan (*save*), skrip menunggu jeda debounce singkat (5 detik) untuk memastikan kamu selesai mengetik.
3. Skrip otomatis menjalankan:
   ```bash
   git add .
   git commit -m "auto: update portfolio changes [YYYY-MM-DD HH:mm:ss]"
   git push origin main
   ```
4. Perubahanmu langsung muncul di GitHub secara aman dan otomatis tanpa perlu mengetik perintah git manual!

---

## 📁 Struktur Direktori

```text
portofolio-v2/
├── docs/                        # Dokumen PRD, Desain Sistem, dan Referensi Figma
├── public/
│   ├── cv/                      # Berkas CV (CV-Al-Zahra-Ramadhani.pdf)
│   ├── images/
│   │   ├── experiences/         # Gambar sertifikat & dokumentasi kegiatan
│   │   └── profile/             # Foto potret profil
├── scripts/
│   ├── auto-sync.js             # Skrip Node.js auto-commit & push cross-platform
│   └── auto-sync.ps1            # Skrip PowerShell auto-commit & push
├── src/
│   ├── app/
│   │   ├── about/page.tsx       # Halaman /about
│   │   ├── api/contact/route.ts # API Route formulir kontak
│   │   ├── projects/page.tsx    # Halaman /projects
│   │   ├── globals.css          # Desain sistem & utilitas glow
│   │   ├── layout.tsx           # Layout root (Inter font, Navbar, Footer)
│   │   └── page.tsx             # Halaman utama (/)
│   ├── components/
│   │   ├── about/               # Komponen About & Live GitHub
│   │   ├── home/                # Komponen Home (Hero, Sticky Experience, Contact, dll.)
│   │   ├── layout/              # Navbar & Footer
│   │   ├── projects/            # Katalog Projects & Pagination
│   │   └── shared/              # Project Card & Tech Badge
│   ├── data/                    # Konfigurasi situs, 18 tech stack, pengalaman, & proyek
│   ├── lib/                     # Fetcher Live GitHub & utilitas Tailwind
│   └── types/                   # Definisi antarmuka TypeScript
├── tailwind.config.ts
└── tsconfig.json
```

---

## 👤 Author

**Al Zahra Ramadhani**
- **GitHub:** [@alzahraramadhani](https://github.com/alzahraramadhani)
- **LinkedIn:** [Al Zahra Ramadhani](https://www.linkedin.com/in/al-zahra-ramadhani/)
- **Instagram:** [@jjahrav](https://www.instagram.com/jjahrav/)
- **Email:** [alzahra.workhub@gmail.com](mailto:alzahra.workhub@gmail.com)

---

<div align="center">
  <sub>Didesain dengan cinta dan dibangun dengan Next.js & Tailwind CSS. © 2026 Al Zahra Ramadhani.</sub>
</div>
