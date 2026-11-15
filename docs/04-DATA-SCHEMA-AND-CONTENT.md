# 04 — Skema Data TypeScript & Konten Awal (Seed Content)

Dokumen ini menyimpan seluruh struktur data TypeScript beserta isi konten awal yang diekstrak dari desain Figma dan instruksi langsung dari Zahra. Saat proses coding dimulai, data di bawah ini tinggal disalin ke dalam `src/types/portfolio.ts` dan `src/data/*.ts`.

---

## 1. Definisi TypeScript Interfaces (`src/types/portfolio.ts`)

```typescript
export type ProjectCategory = "website" | "mobile" | "ui-ux";

export interface SocialLink {
  id: "github" | "linkedin" | "instagram" | "email";
  label: string;
  handle: string;
  href: string;
  isExternal: boolean; // false untuk Email di About Card karena mengarah ke /#contact
}

export interface TechStackItem {
  id: string;
  name: string;
  iconKey: string; // Referensi komponen ikon (Simple Icons / Lucide)
  category: "frontend" | "backend" | "mobile-tools";
  showOnHomeProfile: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryBadge: string; // Contoh: "React Component System", "Developer Tools"
  year: string;
  description: string;
  techTags: string[];
  thumbnailUrl?: string; // Kosongkan dulu -> otomatis merender kotak putih (#FFFFFF)
  projectUrl?: string;
  featured: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  major: string;
  period: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  badgeType: "Milestone" | "Internship" | "Part Time" | "Full Time" | "Organization";
  role: string;
  organization?: string;
  location?: string;
  description: string;
  tools?: string[];
  mediaUrls?: {
    src: string;
    alt: string;
  }[];
  isCurrent?: boolean; // Menampilkan efek titik menyala (glowing dot) di timeline
}

export interface GitHubPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  visibility: "Public" | "Private";
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
}
```

---

## 2. Profil, Bio & Link Sosial Media Resmi (`src/data/site-config.ts`)

### 2.1 Identitas Utama
- **Brand Navbar:** `Zahra Portfolio.`
- **Nama Lengkap:** `Al Zahra Ramadhani`
- **Role Utama:** `Junior Software Engineer`
- **Lokasi Utama:** `Malang, Jawa Timur, Indonesia`
- **Zona Waktu & Status:** `UTC+7 (WIB) Available`
- **Email Langsung (di Contact Card):** `alzahra.workhub@gmail.com`

### 2.2 Teks Hero & Bio
- **Hero Headline:** `Crafting Digital Experiences`
- **Hero Subtitle:**
  > *"Junior Software Engineer crafting clean, accessible, and high-performance web & mobile software. Built with React, Next.js, Flutter, and Tailwind."*
- **Bio Singkat (Home Profile Card):**
  > *"A passionate junior creator crafting clean, accessible, and engaging web & mobile apps. Blending rigorous component architecture with delight-driven interaction design."*
- **Bio Lengkap (About Profile Card — *Draft sementara menunggu teks final dari Zahra*):**
  - *Paragraf 1:* *"A passionate junior software engineer dedicated to crafting clean, accessible, and engaging web & mobile applications. Currently pursuing Informatics Engineering at Universitas Negeri Malang while actively contributing to developer communities as a Google Student Ambassador."*
  - *Paragraf 2:* *"I enjoy bridging rigorous frontend & backend architecture with expressive interface aesthetics—working across TypeScript, Next.js, Flutter, Laravel, and PostgreSQL to deliver reliable digital products."*

### 2.3 Link Sosial Media & Aksi Kontak
| Platform | Tampilan Handle (Contact Card) | URL Tujuan | Perilaku Klik |
| :--- | :--- | :--- | :--- |
| **GitHub** | `github.com/alzahraramadhani` | `https://github.com/alzahraramadhani/` | Buka tab baru (`_blank`) |
| **LinkedIn** | `linkedin.com/in/al-zahra-ramadhani` | `https://www.linkedin.com/in/al-zahra-ramadhani/` | Buka tab baru (`_blank`) |
| **Instagram** | `@jjahrav` | `https://www.instagram.com/jjahrav/` | Buka tab baru (`_blank`) |
| **Email (di About Card)** | Ikon Surat (`Mail`) | `/#contact` | Navigasi internal ke bagian Contact di bawah Home Page |
| **Direct Mail (di Contact Card)** | `alzahra.workhub@gmail.com` | Copy teks ke clipboard | Menyalin alamat email + muncul notifikasi *Copied!* |

---

## 3. Daftar 18 Tech Stack Wajib & Pemetaan Kategori (`src/data/tech-stack.ts`)

Seluruh **18 item** di bawah ini **tampil pada Profile Card di Home Page**, sekaligus dikelompokkan secara rapi ke dalam 3 kartu kategori pada halaman **About (`Tech Stack & Tools`)**:

| No | Nama Tampilan | Icon Reference (`react-icons/si` / `lucide`) | Tampil di Home Card? | Kategori di Halaman About |
| :-: | :--- | :--- | :-: | :--- |
| 1 | **JavaScript** | `SiJavascript` | ✅ Ya | Frontend |
| 2 | **TypeScript** | `SiTypescript` | ✅ Ya | Frontend |
| 3 | **React** | `SiReact` | ✅ Ya | Frontend |
| 4 | **Next.js** | `SiNextdotjs` | ✅ Ya | Frontend |
| 5 | **Tailwind CSS** | `SiTailwindcss` | ✅ Ya | Frontend |
| 6 | **Shadcn UI** | `SiShadcnui` | ✅ Ya | Frontend |
| 7 | **Vite** | `SiVite` | ✅ Ya | Frontend |
| 8 | **Node.js** | `SiNodedotjs` | ✅ Ya | Backend |
| 9 | **Express.js** | `SiExpress` | ✅ Ya | Backend |
| 10 | **PHP** | `SiPhp` | ✅ Ya | Backend |
| 11 | **Laravel** | `SiLaravel` | ✅ Ya | Backend |
| 12 | **SQL** | `Database` (Lucide) / `SiMysql` | ✅ Ya | Backend |
| 13 | **PostgreSQL** | `SiPostgresql` | ✅ Ya | Backend |
| 14 | **Supabase** | `SiSupabase` | ✅ Ya | Backend |
| 15 | **Dart** | `SiDart` | ✅ Ya | Mobile & Tools |
| 16 | **Flutter** | `SiFlutter` | ✅ Ya | Mobile & Tools |
| 17 | **Git** | `SiGit` | ✅ Ya | Mobile & Tools |
| 18 | **GitHub** | `SiGithub` | ✅ Ya | Mobile & Tools |

> *Catatan:* Pada halaman `/about` bagian `Mobile & Tools`, dapat ditambahkan pula tools pendukung desain seperti `Figma` jika diinginkan oleh Zahra (tetap menjaga Home Profile Card fokus pada 18 item di atas).

---

## 4. Data Pendidikan & Pengalaman (`src/data/experiences.ts`)

### 4.1 Formal Education (Kolom Kiri — Sticky)
1. **Universitas Negeri Malang**
   - Jurusan: `Teknik Informatika`
   - Periode: `2025 - Sekarang`
2. **SMKN 1 Bandung Tulungagung**
   - Jurusan: `Teknik Komputer dan Jaringan`
   - Periode: `2022 - 2025`

### 4.2 Experience & Milestones (Kolom Kanan — Scrollable Timeline)
1. **Google Student Ambassador** *(Titik aktif / menyala)*
   - Periode: `Oktober 2026 - Present`
   - Badge: `Milestone`
   - Deskripsi: *"Advocated for Google technologies across campus and social media, leading interactive sessions to help students leverage Google tools for academic growth."*
2. **Staff Muda - Kominfo**
   - Organisasi: `HMDTEI · Universitas Negeri Malang`
   - Periode: `November 2025`
   - Badge: `Internship`
   - Deskripsi: *"Responsible for visual documentation, event video editing, and designing promotional content for the student association's official social media."*
   - Tools: `["Figma", "Canva", "Alight Motion", "Capcut"]`
   - Lampiran Foto: 2 gambar (Sertifikat Staff Muda Divisi Kominfo & Foto Dokumentasi Tim).
3. **Designer Grafis & Video Editor**
   - Perusahaan: `PT. Loga Dante Koa Sejahtera · Bekasi`
   - Periode: `Dec 2023 – July 2024`
   - Badge: `Part Time`
   - Deskripsi: *"Creating visual designs and producing engaging video content to enhance audience interaction and brand presence."*
4. **Frontend Developer Intern (Dummy 1 — Siap Direvisi)**
   - Perusahaan / Mitra: `Tech Nova Studio · Malang`
   - Periode: `Agt 2024 – Nov 2024`
   - Badge: `Internship`
   - Deskripsi: *"Developed responsive client web portals and internal dashboards using Next.js, Tailwind CSS, and REST API integration with high accessibility standards."*
   - Tools: `["Next.js", "TypeScript", "Tailwind CSS", "REST API"]`
5. **Divisi Web & IT Development (Dummy 2 — Siap Direvisi)**
   - Organisasi: `Informatics Student Association · UM`
   - Periode: `Jan 2024 – Des 2024`
   - Badge: `Organization`
   - Deskripsi: *"Collaborated in managing campus competition landing pages, automated participant registration flows, and maintained web server availability."*
   - Tools: `["React", "PHP", "Laravel", "PostgreSQL", "Git"]`
6. **Mobile App Project Lead (Dummy 3 — Siap Direvisi)**
   - Proyek / Kegiatan: `National Tech Hackathon 2024`
   - Periode: `Mei 2024 – Jun 2024`
   - Badge: `Milestone`
   - Deskripsi: *"Led a team of 3 in conceptualizing and prototyping a Flutter-based smart waste management mobile app with Supabase real-time backend."*
   - Tools: `["Flutter", "Dart", "Supabase", "Figma"]`

---

## 5. Data Dummy Projects (`src/data/projects.ts`)

Sesuai permintaan, seluruh kartu project saat ini memakai **thumbnail kotak putih (`thumbnailUrl: undefined`)** dan **teks dummy** yang diambil dari contoh desain Figma (ditambah item dummy pelengkap agar fitur filter & paginasi di `/projects` langsung dapat diuji):

| No | Judul Dummy | Kategori Filter | Sub-Badge & Tahun | Tech Tags | Featured (Home)? |
| :-: | :--- | :--- | :--- | :--- | :-: |
| 1 | `OrbitUI Design Architecture` | `website` | `React Component System · 2024` | `React`, `Tailwind`, `Framer` | ✅ Ya |
| 2 | `Zenith Telemetry Console` | `website` | `Developer Tools · 2024` | `TypeScript`, `WebSockets`, `Next.js` | ✅ Ya |
| 3 | `Lumina Habit & Wellness App` | `mobile` | `Mobile First & Figma · 2024` | `Flutter`, `Dart`, `Supabase` | ✅ Ya |
| 4 | `DevPulse Documentation Core` | `website` | `Static Site Generator · 2025` | `Next.js`, `MDX`, `Tailwind CSS` | ✅ Ya |
| 5 | `FinTrack Personal Ledger UI` | `ui-ux` | `Design System & Prototype · 2025` | `Figma`, `UI/UX`, `Design Tokens` | Tidak (Tampil di `/projects`) |
| 6 | `EduSync Campus Portal API` | `website` | `Fullstack Web App · 2025` | `Laravel`, `PHP`, `PostgreSQL` | Tidak (Tampil di `/projects`) |
| 7 | `KopiMalang Order Companion` | `mobile` | `Cross-Platform App · 2025` | `Flutter`, `Dart`, `REST API` | Tidak (Halaman 2 `/projects`) |
| 8 | `Pulse Design Kit v2` | `ui-ux` | `Mobile & Web UI Kit · 2025` | `Figma`, `Shadcn UI` | Tidak (Halaman 2 `/projects`) |

