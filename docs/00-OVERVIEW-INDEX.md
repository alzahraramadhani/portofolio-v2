# 📚 Indeks Dokumentasi Perancangan — Zahra Portfolio V2

Dokumen-dokumen di dalam folder `docs/` ini merupakan **Single Source of Truth (SSOT)** untuk merancang dan membangun website portofolio pribadi **Al Zahra Ramadhani** menggunakan **Next.js (App Router) + TypeScript + Tailwind CSS + Shadcn UI**.

> **Instruksi untuk AI Agent / Developer:**
> Sebelum memulai inisialisasi proyek atau menulis kode komponen, baca urutan dokumen di bawah ini agar seluruh spesifikasi desain Figma **beserta revisi/override khusus dari user** terimplementasi secara akurat.

---

## 🗂️ Daftar Dokumen Pendukung

| No | File Dokumen | Isi & Tujuan Utama | Kapan Dibaca |
| :--- | :--- | :--- | :--- |
| **01** | [`01-PRD.md`](./01-PRD.md) | **Product Requirements Document**: Tujuan produk, alur navigasi antar halaman, spesifikasi fungsional tiap section, dan aturan *override* dari desain Figma. | Tahap awal pemahaman fitur & alur halaman |
| **02** | [`02-DESIGN-SYSTEM.md`](./02-DESIGN-SYSTEM.md) | **UI/UX & Design System**: Palet warna HEX hasil ekstraksi gambar Figma, tipografi, efek *glow*, komponen kartu, serta mekanisme *sticky scroll* pada bagian Experience. | Saat setup `globals.css`, Tailwind config, dan komponen UI |
| **03** | [`03-TECH-ARCHITECTURE.md`](./03-TECH-ARCHITECTURE.md) | **Arsitektur Teknis & Integrasi**: Struktur folder Next.js App Router, query **GitHub GraphQL API** untuk *live* Contribution Activity & Pinned Repos, strategi caching/ISR, dan Contact Form. | Saat setup project, API/Server Component, & `.env` |
| **04** | [`04-DATA-SCHEMA-AND-CONTENT.md`](./04-DATA-SCHEMA-AND-CONTENT.md) | **Skema TypeScript & Seed Data**: Interface TypeScript lengkap, daftar 18 Tech Stack beserta pemetaan kategorinya, link sosial media resmi, data edukasi/pengalaman, dan *dummy* project. | Saat membuat file di `src/types/` dan `src/data/` |
| **05** | [`05-ASSETS-AND-NEEDS-CHECKLIST.md`](./05-ASSETS-AND-NEEDS-CHECKLIST.md) | **Checklist Kebutuhan dari User**: Daftar aset gambar, file CV, token GitHub, teks tambahan, dan konfirmasi UI minor yang dibutuhkan dari Zahra. | Sebelum/selama *development* & finalisasi konten |
| **06** | [`06-IMPLEMENTATION-ROADMAP.md`](./06-IMPLEMENTATION-ROADMAP.md) | **Roadmap Implementasi Bertahap**: Urutan pengerjaan teknis dari Fase 1 (Scaffolding) hingga Fase 6 (QA & Deployment). | Sebagai panduan eksekusi *step-by-step* |

---

## ⚠️ Ringkasan Revisi / Override terhadap Desain Figma (`*.jpg`)

Penting! Terdapat beberapa penyesuaian eksplisit yang diminta oleh Zahra yang **berbeda dari gambar ekspor Figma** (`Home page.jpg`, `About Page.jpg`, `Project Page.jpg`):

1. **Tech Stack pada Profile Card (Home Page)**
   - **Di Gambar Figma:** Hanya menampilkan 6 badge (`HTML`, `CSS`, `JS`, `React`, `Tailwind`, `Figma`).
   - **Spesifikasi Baru (Wajib):** Menampilkan **18 Tech Stack** berikut lengkap dengan ikonnya:
     `JavaScript`, `TypeScript`, `React`, `Next.js`, `Tailwind CSS`, `Node.js`, `Express.js`, `Dart`, `Flutter`, `PHP`, `Laravel`, `SQL`, `PostgreSQL`, `Supabase`, `Vite`, `Shadcn UI`, `Git`, `GitHub`.

2. **Navigasi Profile Card & Link Sosial Media (About Page)**
   - Klik **`View More →`** pada Profile Card di Home Page mengarah ke halaman **`/about`** (`About Page.jpg`).
   - Pada Profile Card di halaman `/about`, deskripsi dibuat lebih lengkap dan dilengkapi 4 tombol ikon Sosial Media:
     - **GitHub:** `https://github.com/alzahraramadhani/`
     - **LinkedIn:** `https://www.linkedin.com/in/al-zahra-ramadhani/`
     - **Instagram:** `https://www.instagram.com/jjahrav/`
     - **Email:** Diarahkan langsung (*redirect + smooth scroll*) ke **section Contact di bagian bawah Home Page (`/#contact`)**.

3. **Integrasi Live GitHub pada Halaman About**
   - Bagian **GitHub Contribution Activity** (kalender kontribusi tahunan) dan **Pinned Repositories** di halaman `/about` **bukan gambar/data statis**, melainkan terhubung langsung secara *live/real-time* (dengan *Incremental Static Regeneration* / auto-sync) ke akun GitHub `alzahraramadhani`.

4. **Featured Projects (Home Page) & Halaman Projects (`/projects`)**
   - Area thumbnail/foto pada setiap kartu project dibuat **kotak putih bersih (`#FFFFFF`)** dan seluruh teks judul/deskripsi diisi **data dummy** terlebih dahulu sampai aset foto project siap.
   - Klik **`View More →`** di bawah Featured Projects mengarah ke halaman **`/projects`** (`Project Page.jpg`).

5. **Section "Experience, Education & Milestones" (Home Page)**
   - **Hapus tombol `View More →`** (serta hapus efek *fade-out* pemotong di bagian bawah timeline).
   - **Sticky Left + Scrollable Right:** Saat halaman di-*scroll* melewati section ini:
     - **Kolom Kiri** (judul *"Experience, Education & Milestones"*, deskripsi singkat, dan daftar *"Formal Education"*) dibuat **diam/menempel (`position: sticky`)**.
     - **Kolom Kanan** (kartu-kartu timeline seperti *Google Student Ambassador*, *Staff Muda - Kominfo*, *Designer Grafis & Video Editor*, dst.) **bergerak ke atas mengikuti scroll** hingga item terakhir selesai, lalu halaman lanjut scroll ke section Contact.

---

## 🖼️ Referensi File Desain di Root Workspace
- `../Home page.jpg` (`2560 x 8610 px`) — Desain penuh halaman utama (`/`)
- `../About Page.jpg` (`2560 x 3930 px`) — Desain penuh halaman profil & GitHub (`/about`)
- `../Project Page.jpg` (`2560 x 4737 px`) — Desain penuh katalog semua project (`/projects`)

