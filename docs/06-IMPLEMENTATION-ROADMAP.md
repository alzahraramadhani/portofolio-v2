# 06 — Roadmap Implementasi Bertahap (Implementation Plan)

Dokumen ini menjadi panduan eksekusi langkah demi langkah bagi AI Agent / Developer ketika mulai membangun kode aplikasi **Zahra Portfolio V2**.

---

## Fase 1: Inisialisasi Proyek & Fondasi Design System
1. Inisialisasi proyek **Next.js (App Router) + TypeScript + Tailwind CSS** di workspace `c:\PORTOFOLIO V2` (memindahkan 3 file referensi `.jpg` ke `docs/design-references/` agar root proyek rapi).
2. Instalasi *dependencies* utama:
   - Komponen UI & Utilitas: `shadcn/ui` (`clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`)
   - Ikon Tech Stack & Sosmed: `react-icons`
   - Animasi: `framer-motion`
   - Form & Notifikasi: `react-hook-form`, `zod`, `@hookform/resolvers`, `sonner`
3. Konfigurasi font utama **`Inter`** (`next/font/google`) di `src/app/layout.tsx` untuk seluruh elemen teks website.
4. Konfigurasi token warna gelap (`#131315`, `#18181A`, `#201F24`, `#8E8FBB`, `#2A2A8E`), utilitas *ambient radial glow*, serta `scroll-smooth scroll-pt-28` di `src/app/globals.css`.

---

## Fase 2: Data Layer & Komponen Global
1. Membuat seluruh *TypeScript interfaces* di `src/types/portfolio.ts` mengacu pada [`04-DATA-SCHEMA-AND-CONTENT.md`](./04-DATA-SCHEMA-AND-CONTENT.md).
2. Mengisi file data statis/seed di `src/data/`:
   - `site-config.ts` (Link GitHub, LinkedIn, Instagram, Email, Lokasi Malang)
   - `tech-stack.ts` (18 Tech Stack lengkap beserta ikon dan kategori)
   - `experiences.ts` (Universitas Negeri Malang, SMKN 1 Bandung Tulungagung, Google Student Ambassador, Staff Muda - Kominfo, Designer Grafis & Video Editor)
   - `projects.ts` (Data *dummy* project dengan konfigurasi *white placeholder*)
3. Membangun **Navbar Global (`navbar.tsx`)** dengan *active pill indicator* (`Home`, `About`, `Project`, `Experiences`), menu responsif mobile, dan tombol `Let's Talk` (`/#contact`).
4. Membangun **Footer Global (`footer.tsx`)** dengan tombol interaktif `Back to Top ↑`.

---

## Fase 3: Pembangunan Home Page (`/`)
1. **Hero Section:** Tipografi dua warna (`Crafting Digital` + `Experiences`), efek *indigo radial glow*, tombol `Explore Projects ↓` dan `Download CV ↗`.
2. **Home Profile Card:** Layout kaca gelap dengan bingkai foto potret, deskripsi singkat, render **18 badge Tech Stack**, dan tombol `View More →` menuju `/about`.
3. **Featured Projects Section:** Filter tab kategori (`All Projects`, `Mobile`, `Website`, `UI/UX Design`), grid `2x2` kartu project dengan kotak thumbnail putih (`#FFFFFF`) & teks *dummy*, serta tombol `View More →` menuju `/projects`.
4. **Experience, Education & Milestones Section:**
   - Implementasi layout 2 kolom tanpa tombol `View More`.
   - **Kolom Kiri Sticky (`lg:sticky lg:top-28 self-start`):** Judul section + kartu *Formal Education*.
   - **Kolom Kanan Scrollable:** Garis vertikal timeline dengan titik *glow* aktif, kartu pengalaman, badge tools, dan galeri thumbnail sertifikat/dokumentasi.
5. **Contact Section (`#contact`):**
   - Kiri: Formulir *Let's build together* dengan validasi Zod & state *loading/toast*.
   - Kanan: Kartu Direct Mail (dengan fitur *Copy Email*), LinkedIn, GitHub, Instagram, serta kartu lokasi Malang dengan status `UTC+7 (WIB) Available`.

---

## Fase 4: Pembangunan About Page (`/about`) & Live GitHub Integration
1. **About Profile Card:** Deskripsi multi-paragraf dan 4 tombol bundar Sosial Media:
   - GitHub -> `https://github.com/alzahraramadhani/`
   - LinkedIn -> `https://www.linkedin.com/in/al-zahra-ramadhani/`
   - Instagram -> `https://www.instagram.com/jjahrav/`
   - Email -> `/#contact`
2. **Tech Stack & Tools Categorized Cards:** 3 kartu (`Frontend`, `Backend`, `Mobile & Tools`).
3. **Service `src/lib/github.ts`:**
   - Implementasi pemanggilan **GitHub GraphQL API** untuk akun `alzahraramadhani` dengan *ISR caching* (`revalidate: 900`) + *graceful fallback* tanpa token.
4. **GitHub Contribution Activity & Pinned Repositories UI:**
   - Render matriks kalender kontribusi 52 minggu dengan palet kustom Indigo-Putih + *tooltip* jumlah kontribusi harian.
   - Render grid kartu **Pinned Repositories** asli dari GitHub (nama, deskripsi, bahasa + titik warna, *stars*, *forks*) + link `VIEW ALL ON GITHUB →`.
5. **Collaboration CTA Banner:** Tombol `Start Conversation` menuju `/#contact`.

---

## Fase 5: Pembangunan Projects Page (`/projects`)
1. Header `All Projects.` beserta efek cahaya latar.
2. Filter kategori interaktif (`All Projects`, `Web Applications`, `Mobile Apps`, `UI/UX Design`).
3. Grid 6 kartu per halaman (thumbnail putih `#FFFFFF` + teks *dummy*) terintegrasi dengan komponen **Pagination (`< Prev 1 2 3 Next >`)**.

---

## Fase 6: Verifikasi Kualitas, Responsivitas & Siap Deploy
1. Uji coba perilaku **Sticky Scroll** pada section Experience di berbagai ukuran layar desktop & pastikan tumpukan vertikal nyaman di layar HP.
2. Uji coba seluruh tautan eksternal (GitHub, LinkedIn, Instagram) dan navigasi lintas halaman (`/about` -> klik ikon Email -> mendarat tepat di `#contact` Home Page).
3. Pemeriksaan `next build` & TypeScript type-check (`tsc --noEmit`) tanpa error.
4. Penyiapan panduan *deployment* ke **Vercel** beserta pengaturan Environment Variables (`GITHUB_TOKEN`, dll.).

