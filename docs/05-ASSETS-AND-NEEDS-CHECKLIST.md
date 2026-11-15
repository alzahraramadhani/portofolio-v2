# 05 — Checklist Kebutuhan Aset, Data & Konfirmasi dari Zahra

Dokumen ini merinci **hal-hal apa saja yang dibutuhkan dari kamu (Zahra)** agar proses pembuatan website portofolio ini berjalan mulus, akurat, dan siap *online* 100%.

> 💡 **Tenang saja:** Kamu **tidak harus** mengumpulkan semuanya sekaligus sebelum kita mulai *ngoding*. Kita sudah bisa langsung membangun seluruh kode dan struktur websitenya terlebih dahulu menggunakan *placeholder* yang rapi, lalu mengganti file foto/CV/teks kapan saja saat file aslinya siap!

---

## 📦 A. File Aset & Dokumen yang Dibutuhkan

Silakan siapkan dan masukkan file-file berikut ke dalam folder proyek nanti (atau kirimkan path-nya):

- [ ] **1. Foto Profil Asli (`profile.jpg` / `profile.png` / `profile.webp`)**
  - Foto potret yang dipakai pada Profile Card di Home & About Page (jaket denim dengan latar tirai hijau tua, rasio potret sekitar `3:4`, resolusi disarankan minimal `800 x 1060 px` agar tajam di layar Retina).
- [ ] **2. File CV Terbaru dalam Format PDF (`CV-Al-Zahra-Ramadhani.pdf`)**
  - Akan dihubungkan ke tombol **`Download CV ↗`** pada bagian Hero di Home Page.
- [ ] **3. Foto Dokumentasi pada Bagian Experience (`Staff Muda - Kominfo`)**
  - Gambar 1: Scan/foto **Sertifikat Staff Muda Divisi Kominfo HMDTEI UM**.
  - Gambar 2: **Foto kegiatan/tim** bersama anggota Kominfo.
  - *(Opsional)* Jika ada foto dokumentasi untuk *Google Student Ambassador* atau *PT. Loga Dante Koa Sejahtera*, boleh sekalian disiapkan.
- [ ] **4. Foto/Screenshot Project *(Menyusul nanti)***
  - Sesuai instruksi kamu, untuk saat ini seluruh kotak gambar project **dibuat warna putih polos (`#FFFFFF`)** dengan teks *dummy* terlebih dahulu.

---

## 🔑 B. Kredensial & Integrasi Layanan (Untuk Fitur Live)

- [ ] **1. GitHub Personal Access Token (`GITHUB_TOKEN`) — *Penting untuk Live GitHub Sync***
  - **Untuk apa?** Agar website bisa mengambil daftar **Pinned Repositories** dan **Kalender Kontribusi GitHub** akun `alzahraramadhani` secara *real-time* melalui GitHub GraphQL API tanpa terkena batas limit pengunjung.
  - **Cara membuat (hanya 1 menit & 100% aman karena *read-only*):**
    1. Buka GitHub -> **Settings** -> **Developer settings** -> **Personal access tokens** -> **Tokens (classic)** *(atau Fine-grained tokens)*.
    2. Klik **Generate new token (classic)**, beri nama `Portfolio V2 Read`, atur Expiration (`No expiration` atau `1 year`).
    3. Cukup centang `read:user` (atau bahkan biarkan tanpa centang write apa pun karena hanya membaca profil publik).
    4. Simpan kode token `ghp_...` tersebut untuk kita masukkan ke file `.env.local` (file ini rahasia dan tidak akan ter-upload ke GitHub publik).
- [ ] **2. Atur Pinned Repositories di Profil GitHub Kamu**
  - Pastikan di halaman `https://github.com/alzahraramadhani/` kamu sudah memilih **Customize your pins** (3 sampai 6 repo terbaikmu) supaya repo-repo itulah yang otomatis muncul di bagian *Pinned Repositories* halaman About!
- [ ] **3. Tujuan Pengiriman Pesan dari Contact Form ("Let's build together.")**
  - Pilih salah satu cara yang paling kamu sukai ketika ada orang menekan tombol **`Send Message`**:
    - **Opsi 1 (Rekomendasi — Web3Forms / Resend):** Pesan langsung masuk ke inbox email kamu (`alzahra.workhub@gmail.com`). Gratis, tinggal daftar pakai email untuk dapat *Access Key*.
    - **Opsi 2 (Supabase Database):** Pesan tersimpan ke tabel di proyek Supabase kamu.
    - **Opsi 3 (Mailto sementara):** Membuka aplikasi email pengirim menuju `alzahra.workhub@gmail.com` sebelum API email dipasang.

---

## ✍️ C. Konten Teks yang Perlu Kamu Cek / Lengkapi

- [ ] **1. Teks Deskripsi Lengkap di Halaman About (`About Page.jpg`)**
  - Di desain Figma `About Page.jpg`, teks deskripsi profil masih berupa pengulangan paragraf yang sama sebanyak 2 kali. Apakah kamu sudah punya teks perkenalan 2 paragraf khusus untuk halaman About, atau ingin memakai draf bahasa Inggris yang sudah disiapkan di [`04-DATA-SCHEMA-AND-CONTENT.md`](./04-DATA-SCHEMA-AND-CONTENT.md) dulu?
- [ ] **2. Kelengkapan Daftar Experience & Milestones**
  - Karena tombol `View More` di bagian Experience dihapus dan semua pengalaman akan bisa di-*scroll* langsung di sebelah kanan:
    - Apakah daftar pengalamannya hanya **3 item** yang terlihat di gambar Figma (*Google Student Ambassador*, *Staff Muda - Kominfo*, *Designer Grafis & Video Editor*), atau ada tambahan pengalaman/kepanitiaan/pencapaian lain yang ingin dimasukkan sekalian?
- [ ] **3. Isi Kartu Kategori "Tech Stack & Tools" di Halaman About**
  - Di halaman Home, kita sudah memasukkan **18 Tech Stack** pilihanmu (`JavaScript`, `TypeScript`, `React`, `Next.js`, `Tailwind CSS`, `Node.js`, `Express.js`, `Dart`, `Flutter`, `PHP`, `Laravel`, `SQL`, `PostgreSQL`, `Supabase`, `Vite`, `Shadcn UI`, `Git`, `GitHub`).
  - Di gambar `About Page.jpg`, kartu `Frontend`, `Backend`, dan `Mobile & Tools` masih menampilkan teks bawaan template Figma (seperti *MongoDB, Prisma ORM, Firebase, Docker, Linux CLI*).
  - **Rencana default kita:** Menyelaraskan isi ke-3 kartu di halaman About tersebut menggunakan **18 Tech Stack asli milikmu** (ditambah tools yang memang kamu pakai di Experience seperti `Figma`, `Canva`, `Postman` bila perlu). Beri tahu jika ada tambahan lain!

---

## 🎨 D. Status Hasil Wawancara Desain (/grill-me)

Semua poin keputusan arsitektur dan UI/UX telah disepakati:
1. **Tipografi Utama:** Seluruh website menggunakan font **`Inter`** secara konsisten.
2. **Mode Tampilan:** **Pure Dark Mode Only** (eksklusif tema gelap presisi sesuai desain Figma, tombol pengatur tema dihilangkan agar antarmuka bersih).
3. **Formulir Kontak:** Integrasi pengiriman pesan otomatis langsung ke email **`alzahra.workhub@gmail.com`** (via Web3Forms / Resend API).
4. **Tech Stack Halaman About:** Mengelompokkan **18 Tech Stack asli** ditambah tools pendukung yang kamu gunakan (`Figma`, `Postman`).
5. **Daftar Experience:** 3 pengalaman asli dari Figma + **3 pengalaman dummy realistis tambahan** agar efek *sticky scroll* di sisi kanan berjalan optimal dan visualnya penuh (dapat kamu edit kapan saja di `src/data/experiences.ts`).
6. **Bio About Page:** Menggunakan **draf 2 paragraf profesional bahasa Inggris** yang menonjolkan peranmu sebagai Junior Software Engineer, mahasiswi Informatika UM, dan Google Student Ambassador.
7. **Foto Profil:** Menunggu kamu meletakkan file foto potret master ke folder `public/images/profile/`.
8. **Live GitHub Sync:** Sistem disiapkan dengan **fetcher otomatis (public fallback)** sehingga langsung aktif menarik kontribusi & repo dari `github.com/alzahraramadhani`, dengan opsi penambahan `GITHUB_TOKEN` di `.env.local` kapan pun kamu siap.

