# 03 — Arsitektur Teknis & Integrasi Sistem

Dokumen ini menjelaskan rancangan teknis pembangunan proyek **Zahra Portfolio V2** agar mudah dipelihara, cepat, aman, dan memiliki sinkronisasi *live* dengan GitHub.

---

## 1. Tech Stack Proyek
- **Framework:** Next.js (App Router, versi stabil terbaru)
- **Bahasa:** TypeScript (`strict: true`)
- **Styling:** Tailwind CSS + CSS Variables
- **UI Primitives:** Shadcn UI (`Button`, `Badge`, `Input`, `Textarea`, `Tooltip`, `Sonner` untuk *toast notification*)
- **Sistem Ikon:**
  - `lucide-react` — Ikon UI umum (navigasi, panah `↗`, mail, map pin, copy, send, sun/moon).
  - `react-icons/si` (*Simple Icons*) — Ikon resmi seluruh **18 Tech Stack** (JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, Express, Dart, Flutter, PHP, Laravel, PostgreSQL, Supabase, Vite, Shadcn UI, Git, GitHub) serta ikon sosial media (GitHub, LinkedIn, Instagram).
- **Animasi & Interaksi:** `framer-motion` (transisi kapsul aktif Navbar, efek *reveal* halus saat scroll, transisi filter kategori project).
- **Validasi Form:** `react-hook-form` + `zod`

---

## 2. Struktur Direktori yang Direkomendasikan

```text
c:\PORTOFOLIO V2\
├── docs/                          # Dokumen perancangan (.md) ini
├── public/
│   ├── images/
│   │   ├── profile/               # Foto potret Al Zahra Ramadhani
│   │   ├── experiences/           # Foto sertifikat & dokumentasi kegiatan
│   │   ├── projects/              # (Disiapkan untuk screenshot project nanti)
│   │   └── malang-map-dark.webp   # Gambar peta gelap Malang untuk kartu lokasi
│   └── cv/
│       └── CV-Al-Zahra-Ramadhani.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (Font, Navbar, Footer, Toaster)
│   │   ├── page.tsx               # Home Page (/)
│   │   ├── about/
│   │   │   └── page.tsx           # About Page (/about) — Server Component (GitHub Sync)
│   │   ├── projects/
│   │   │   └── page.tsx           # Projects Page (/projects)
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts       # Endpoint pengiriman pesan Contact Form
│   │   └── globals.css            # Token warna, scrollbar halus, utilitas glow
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── home/
│   │   │   ├── hero-section.tsx
│   │   │   ├── home-profile-card.tsx
│   │   │   ├── featured-projects-section.tsx
│   │   │   ├── experience-education-section.tsx
│   │   │   └── contact-section.tsx
│   │   ├── about/
│   │   │   ├── about-profile-card.tsx
│   │   │   ├── tech-stack-categories.tsx
│   │   │   ├── github-activity-section.tsx
│   │   │   ├── contribution-heatmap.tsx
│   │   │   ├── pinned-repo-card.tsx
│   │   │   └── hiring-cta-banner.tsx
│   │   ├── projects/
│   │   │   ├── projects-catalog.tsx
│   │   │   └── pagination-bar.tsx
│   │   ├── shared/
│   │   │   ├── project-card.tsx
│   │   │   └── tech-badge.tsx
│   │   └── ui/                    # Komponen Shadcn UI
│   ├── data/
│   │   ├── site-config.ts         # Link sosmed, email, metadata SEO
│   │   ├── tech-stack.ts          # 18 Tech Stack Home + pengelompokan About
│   │   ├── experiences.ts         # Data Experience, Milestones, & Formal Education
│   │   └── projects.ts            # Data dummy Featured & All Projects
│   ├── lib/
│   │   ├── github.ts              # Fetcher GraphQL + Fallback REST untuk GitHub
│   │   └── utils.ts               # Helper cn() Tailwind
│   └── types/
│       └── portfolio.ts           # Definisi seluruh TypeScript Interfaces
└── .env.local                     # Variabel rahasia (GITHUB_TOKEN, API Email)
```

---

## 3. Arsitektur Integrasi Live GitHub (`@alzahraramadhani`)

Untuk memenuhi permintaan agar **GitHub Contribution Activity** dan **Pinned Repositories** terhubung secara *live* sesuai tampilan profil GitHub asli:

### 3.1 Mengapa Menggunakan GitHub GraphQL API v4?
REST API biasa (`api.github.com/users/.../repos`) **tidak menyediakan** daftar *Pinned Repositories* maupun matriks kalender kontribusi 365 hari. Dengan **GitHub GraphQL API (`https://api.github.com/graphql`)**, kita dapat mengambil **keduanya sekaligus dalam 1 request ringan** di sisi server Next.js!

### 3.2 Alur Data & Strategi Revalidasi (Live Sync + Cepat)
```mermaid
sequenceDiagram
    participant User as Pengunjung (/about)
    participant Next as Next.js Server (ISR Cache)
    participant GH as GitHub GraphQL API

    User->>Next: Buka halaman /about
    alt Cache masih segar (< 15 menit)
        Next-->>User: Render instan kalender & pinned repos (< 50ms)
    else Cache kedaluwarsa (> 15 menit)
        Next->>GH: POST /graphql (Bearer GITHUB_TOKEN)
        GH-->>Next: Data contributionCalendar + pinnedItems terbaru
        Next-->>User: Render data terbaru & perbarui cache otomatis
    end
```

- Menggunakan `fetch('https://api.github.com/graphql', { next: { revalidate: 900 } })` (sinkronisasi otomatis setiap **15 menit**).
- Setiap kali Zahra melakukan `git push` atau mengubah *Pinned Repositories* di GitHub, website akan ter-update secara otomatis tanpa perlu *re-deploy*!

### 3.3 Query GraphQL yang Akan Digunakan (`src/lib/github.ts`)
```graphql
query GetZahraGitHubData($username: String!) {
  user(login: $username) {
    contributionsCollection {
      totalContributions
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          isPrivate
          primaryLanguage {
            name
            color
          }
        }
      }
    }
    repositories(
      first: 6
      privacy: PUBLIC
      isFork: false
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      nodes {
        name
        description
        url
        stargazerCount
        forkCount
        isPrivate
        primaryLanguage {
          name
          color
        }
      }
    }
  }
}
```
> **Keunggulan Query di Atas:**
> Sekaligus mengambil `repositories` terbaru sebagai **cadangan otomatis (*fallback*)** apabila di akun GitHub `alzahraramadhani` belum ada repositori yang di-*pin* (`pinnedItems.nodes.length === 0`), sehingga bagian Pinned Repositories dijamin selalu menampilkan repo asli milik Zahra!

### 3.4 Fallback Tanpa Token (Mode Development Lokal)
Jika pada awal pengembangan `.env.local` belum diisi `GITHUB_TOKEN`, fungsi `getGitHubData()` akan otomatis beralih (*graceful fallback*) ke endpoint publik:
1. Kontribusi: `https://github-contributions-api.jogruber.de/v4/alzahraramadhani?y=last`
2. Repositori: `https://api.github.com/users/alzahraramadhani/repos?sort=updated&per_page=6`
Dengan demikian, aplikasi **tidak akan pernah error/crash** baik dengan maupun tanpa token.

---

## 4. Arsitektur Navigasi Lintas Halaman ke `#contact` & `#experiences`

Terdapat beberapa tombol dari halaman `/about` atau `/projects` yang mengarah ke bagian spesifik di halaman Home (`/`):
- Tombol **Email** di kartu sosial media `/about` -> `<Link href="/#contact">`
- Tombol **`Start Conversation`** di bawah `/about` -> `<Link href="/#contact">`
- Tombol **`Let's Talk`** di Navbar -> `<Link href="/#contact">`
- Menu **`Experiences`** di Navbar -> `<Link href="/#experiences">`

Agar *smooth scrolling* di Next.js App Router berjalan mulus baik saat berpindah dari halaman yang sama maupun dari halaman berbeda (`/about` -> `/#contact`):
- Tambahkan `scroll-smooth` dan `scroll-pt-28` pada elemen `<html>` di `layout.tsx` (sehingga target `#contact` dan `#experiences` tidak tertutup oleh *sticky navbar*).

---

## 5. Penanganan Formulir Kontak ("Let's build together.")

Tersedia **3 opsi integrasi** yang sangat mudah untuk mengirim pesan dari form ke email `alzahra.workhub@gmail.com`:
1. **Opsi A — Web3Forms / Formspree (Paling Praktis, Gratis tanpa domain berbayar):** Cukup memasukkan 1 *Access Key*, setiap pesan yang dikirim pengunjung langsung masuk ke inbox Gmail `alzahra.workhub@gmail.com`.
2. **Opsi B — Resend API (`resend` SDK di `/api/contact`):** Standar industri untuk Next.js, mendukung format email HTML yang rapi.
3. **Opsi C — Supabase Table (`contact_messages`):** Menyimpan setiap pesan yang masuk ke database PostgreSQL Supabase (sangat cocok karena Zahra juga mencantumkan Supabase di tech stack!).

---

## 6. Spesifikasi Variabel Environment (`.env.example`)

```env
# Username GitHub utama untuk sinkronisasi live di halaman /about
GITHUB_USERNAME="alzahraramadhani"

# Personal Access Token GitHub (Fine-grained / Classic tanpa scope write, hanya read public data)
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Konfigurasi pengiriman Contact Form (pilih salah satu sesuai preferensi nanti)
WEB3FORMS_ACCESS_KEY=""
# atau RESEND_API_KEY=""
```

