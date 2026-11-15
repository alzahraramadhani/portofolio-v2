# 02 — Spesifikasi UI/UX & Design System

Dokumen ini merangkum seluruh aturan visual yang diekstrak secara presisi dari file desain Figma (`Home page.jpg`, `About Page.jpg`, dan `Project Page.jpg`).

---

## 1. Karakteristik Estetika Utama
- **Tema Visual:** *Modern Dark Developer Portfolio* dengan sentuhan *subtle indigo/periwinkle ambient glow* dan permukaan kartu *matte-glass* bertingkat.
- **Kontras Utama:** Tombol aksi primer dan tab aktif menggunakan kapsul putih bersih (`#FFFFFF`) di atas kanvas gelap pekat (`#131315`), menciptakan hierarki visual yang tajam dan bersih ala *Linear / Vercel / Raycast*.

---

## 2. Palet Warna (Color Tokens)

Hasil *pixel sampling* langsung dari gambar desain:

### 2.1 Background & Surface
| Token Semantic | Kode HEX / Nilai CSS | Penggunaan |
| :--- | :--- | :--- |
| `--bg-canvas` | `#131315` | Warna latar belakang utama seluruh halaman |
| `--bg-section-deep` | `#0E0E10` | Kontainer besar bagian *Contact ("Let's build together")* |
| `--bg-card-primary` | `#18181A` | Kartu utama (Timeline Experience, Contact Form, GitHub Container, Tech Category Card) |
| `--bg-card-elevated` | `#201F24` | Kartu Project (*Featured Projects* & *All Projects*) dan sub-kartu Pinned Repo |
| `--bg-input` | `#111113` | Latar dalam kolom input & textarea pada Contact Form |
| `--bg-pill-subtle` | `#242429` | Badge tech stack, badge tipe pengalaman (`Milestone`, `Internship`), pill tahun edukasi |
| `--bg-navbar-glass` | `rgba(22, 22, 24, 0.78)` | Kapsul navigasi tengah dengan `backdrop-filter: blur(16px)` |

### 2.2 Accent & Glow (Indigo / Periwinkle)
| Token Semantic | Kode HEX / Nilai CSS | Penggunaan |
| :--- | :--- | :--- |
| `--accent-periwinkle` | `#8E8FBB` | Teks jabatan (`Junior Software Engineer`), tanggal pada timeline (`Oktober 2026 - Present`), label kategori project |
| `--accent-lavender-bright` | `#C1C1FF` | Titik aktif (*glowing dot*) pada urutan teratas timeline Experience |
| `--accent-indigo-deep` | `#2A2A8E` | Warna tengah kalender GitHub & inti efek *ambient radial glow* |
| `--glow-hero-top` | `radial-gradient(ellipse 60% 35% at 50% 0%, rgba(56, 56, 148, 0.32), transparent 75%)` | Cahaya lembut ungu-kebiruan di belakang Hero & atas Profile Card |
| `--glow-card-edge` | `radial-gradient(circle at 50% 0%, rgba(142, 143, 187, 0.16), transparent 60%)` | Pantulan cahaya halus di tepi atas Profile Card |

### 2.3 Text & Borders
| Token Semantic | Kode HEX / Nilai CSS | Penggunaan |
| :--- | :--- | :--- |
| `--text-primary` | `#FFFFFF` | Judul utama, nama, judul kartu, teks aktif |
| `--text-metallic` | `linear-gradient(180deg, #A1A1AA 0%, #71717A 100%)` | Kata kedua Hero (`Experiences`) |
| `--text-secondary` | `#A1A1AA` (`zinc-400`) | Deskripsi paragraf, subjudul section, bio |
| `--text-muted` | `#71717A` (`zinc-500`) | Placeholder input, tahun/metadata sekunder, teks hak cipta |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Garis tepi standar pada semua kartu dan kapsul |
| `--border-hover` | `rgba(193, 193, 255, 0.28)` | Garis tepi kartu saat di-*hover* kursor |

### 2.4 Skala Warna Kalender Kontribusi GitHub (Custom 5-Level Scale)
Agar sesuai 100% dengan `About Page.jpg` (bukan hijau standar GitHub, melainkan skema Indigo-Putih):
- **Level 0 (0 kontribusi):** `#1E1E24` (kotak gelap samar)
- **Level 1 (Rendah):** `#252554` (indigo gelap)
- **Level 2 (Sedang):** `#2A2A8E` (indigo medium)
- **Level 3 (Tinggi):** `#8E8FBB` (periwinkle lembut)
- **Level 4 (Sangat Tinggi):** `#FFFFFF` (putih bersih menyala)

---

## 3. Tipografi (Typography)

Seluruh website secara konsisten menggunakan font **`Inter`** (`next/font/google` dengan variabel CSS dan fallback sans-serif sistem). Font ini memberikan keterbacaan tinggi, geometri modern, dan proporsi yang selaras dengan desain Figma.

| Elemen | Ukuran Desktop | Ukuran Mobile | Ketebalan & Spasi |
| :--- | :--- | :--- | :--- |
| **Hero Title (`h1`)** | `64px` (`text-6xl`) | `40px` (`text-4xl`) | `font-bold`, `tracking-tight` (`-0.03em`), `leading-[1.08]` |
| **Page Title (`All Projects.`)** | `56px` (`text-5xl`–`6xl`) | `36px` (`text-4xl`) | `font-bold`, `tracking-tight` |
| **Section Heading (`h2`)** | `36px`–`40px` (`text-4xl`) | `28px` (`text-3xl`) | `font-bold`, `tracking-tight`, `leading-tight` |
| **Profile Name** | `28px`–`32px` (`text-3xl`) | `24px` (`text-2xl`) | `font-bold` |
| **Card Title (`h3`)** | `20px`–`22px` (`text-xl`) | `18px` (`text-lg`) | `font-semibold` |
| **Body Copy** | `15px`–`16px` (`text-sm`/`base`) | `14px` (`text-sm`) | `font-normal`, `leading-relaxed` (`1.65`) |
| **Tech / Tag Pill** | `12px`–`13px` (`text-xs`) | `12px` (`text-xs`) | `font-medium` |
| **Section Micro-Label** | `11px`–`12px` (`text-xs`) | `11px` (`text-xs`) | `uppercase`, `tracking-[0.12em]`, `font-medium` |

---

## 4. Layout, Grid & Radius Sudut

- **Container Maksimum:**
  - Navbar luar: `max-w-7xl` (`1280px`) dengan padding horizontal `px-6 lg:px-12`.
  - Konten utama (Cards, Grid Project, Experience, About): `max-w-[1120px]` terpusat (`mx-auto px-5 sm:px-8`).
  - Profile Card (Home & About): `max-w-[920px]` terpusat agar tampil fokus dan proporsional seperti di desain Figma.
- **Border Radius:**
  - Kontainer besar (Profile Card, Contact Wrapper, GitHub Wrapper): `24px` (`rounded-3xl`).
  - Kartu sedang (Project Card, Timeline Card, Tech Category Card): `18px`–`20px` (`rounded-2xl`).
  - Thumbnail putih di dalam Project Card & Foto Potret Profil: `14px`–`16px` (`rounded-xl` / `rounded-2xl`).
  - Tombol utama, Filter Tab, Navbar tengah: `9999px` (`rounded-full`).
  - Badge Tech Stack: `8px` (`rounded-lg`) atau kapsul lembut (`rounded-md` dengan padding `px-2.5 py-1`).

---

## 5. Spesifikasi Khusus Komponen Kritis

### 5.1 Profile Card (Perbandingan Varian Home vs About)
| Aspek | Varian Home (`/`) | Varian About (`/about`) |
| :--- | :--- | :--- |
| **Foto Kiri** | Potret rasio `~3:4` (`w-full md:w-[260px]`), bingkai abu lembut `border-2 border-white/20 rounded-2xl` | Sama persis |
| **Header Kanan** | Nama + `Junior Software Engineer` + garis pemisah tipis | Sama persis |
| **Deskripsi** | 1 paragraf ringkas | 2 paragraf mendalam |
| **Bagian Bawah** | Subjudul `Tech Stack` + **18 badge teknologi** (flex-wrap) + tombol `View More →` | Subjudul `Social Media` + **4 tombol ikon bundar** (GitHub, LinkedIn, Instagram, Email -> `/#contact`) |

> **Catatan Tata Letak 18 Tech Stack di Home Profile Card:**
> Karena jumlah badge meningkat dari 6 menjadi **18 item**, susunan menggunakan `flex flex-wrap gap-2` dengan ukuran pill yang *compact* (`px-2.5 py-1 text-xs bg-white/[0.04] border border-white/[0.08] rounded-md`) sehingga 18 item tersusun rapi dalam ~3–4 baris tanpa membuat kartu terlalu memanjang secara berlebihan, tetap seimbang dengan tinggi foto profil di sebelah kiri.

### 5.2 Mekanisme Sticky Scroll pada Section `Experience, Education & Milestones`
Ini adalah perilaku interaktif khusus yang diminta pada Home Page:

```css
/* Aturan Penting: Jangan pernah memasang overflow: hidden / overflow-x: hidden pada elemen induk (<main> atau <section>), gunakan overflow-x: clip jika perlu! */
```

- **Struktur Grid:**
  ```tsx
  <section id="experiences" className="relative mx-auto max-w-[1120px] px-6 py-24">
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
      {/* KOLOM KIRI — DIAM (STICKY) SAAT DI-SCROLL */}
      <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-8">
        {/* Heading Experience, Education & Milestones + Deskripsi */}
        {/* Daftar Kartu FORMAL EDUCATION */}
      </div>

      {/* KOLOM KANAN — IKUT TER-SCROLL */}
      <div className="lg:col-span-7 relative pl-6 md:pl-8">
        {/* Garis vertikal timeline di sisi kiri (absolute left-0 top-2 bottom-2 w-px bg-white/10) */}
        {/* Daftar penuh kartu Experience & Milestone tanpa tombol View More */}
      </div>
    </div>
  </section>
  ```
- **Cara Kerja:**
  1. Ketika pengunjung menggulir masuk ke section `#experiences`, kolom kiri berhenti dan menempel rapi `112px` (`top-28`, tepat di bawah Navbar) di layar.
  2. Selama pengunjung terus menggulir ke bawah, kartu *Google Student Ambassador*, *Staff Muda - Kominfo*, *Designer Grafis & Video Editor*, dan item berikutnya bergerak naik melewati layar di sisi kanan.
  3. Begitu kartu paling akhir pada kolom kanan selesai melewati batas bawah kolom kiri, kedua kolom secara alami bergerak naik bersama menuju section *Let's build together (Contact)*.

### 5.3 Thumbnail Putih pada Kartu Project
- Kotak thumbnail menggunakan:
  `className="w-full aspect-[16/10] rounded-xl bg-white overflow-hidden relative"`
- Dirancang modular: komponen `<ProjectCard />` sudah mendukung properti opsional `thumbnailUrl?: string`. Selama `thumbnailUrl` kosong (`undefined`), komponen menampilkan bidang putih bersih (`#FFFFFF`) sesuai permintaan Zahra. Saat foto project sudah siap nanti, cukup mengisi path gambar di file data tanpa perlu mengubah kode UI sama sekali.

