import { EducationItem, ExperienceItem } from "@/types/portfolio";

export const formalEducation: EducationItem[] = [
  {
    id: "edu-um",
    institution: "Universitas Negeri Malang",
    major: "Teknik Informatika",
    period: "2025 - Sekarang",
  },
  {
    id: "edu-smk",
    institution: "SMKN 1 Bandung Tulungagung",
    major: "Teknik Komputer dan Jaringan",
    period: "2022 - 2025",
  },
];

export const experiencesList: ExperienceItem[] = [
  {
    id: "exp-gsa",
    period: "Oktober 2026 - Present",
    badgeType: "Milestone",
    role: "Google Student Ambassador",
    description:
      "Advocated for Google technologies across campus and social media, leading interactive sessions to help students leverage Google tools for academic growth.",
    isCurrent: true,
  },
  {
    id: "exp-kominfo",
    period: "November 2025",
    badgeType: "Internship",
    role: "Staff Muda - Kominfo",
    organization: "HMDTEI · Universitas Negeri Malang",
    description:
      "Responsible for visual documentation, event video editing, and designing promotional content for the student association's official social media.",
    tools: ["Figma", "Canva", "Alight Motion", "Capcut"],
    mediaUrls: [
      {
        src: "/images/experiences/kominfo-certificate.jpg",
        alt: "Sertifikat Staff Muda Divisi Kominfo HMDTEI Universitas Negeri Malang",
        caption: "Sertifikat Staff Muda Divisi Kominfo — HMDTEI Universitas Negeri Malang",
      },
      {
        src: "/images/experiences/kominfo-team.jpg",
        alt: "Dokumentasi Kegiatan Tim Kominfo HMDTEI Universitas Negeri Malang",
        caption: "Dokumentasi Kegiatan Bersama Tim Kominfo HMDTEI UM",
      },
    ],
  },
  {
    id: "exp-designer",
    period: "Dec 2023 – July 2024",
    badgeType: "Part Time",
    role: "Designer Grafis & Video Editor",
    organization: "PT. Loga Dante Koa Sejahtera · Bekasi",
    description:
      "Creating visual designs and producing engaging video content to enhance audience interaction and brand presence.",
    tools: ["Figma", "Canva", "Alight Motion", "Capcut"],
  },
  {
    id: "exp-nbc",
    period: "Jun 2024 – Okt 2024",
    badgeType: "Internship",
    role: "Digital Marketing & Video Editor",
    organization: "NBC Group · Durenan, Trenggalek",
    description:
      "Editing promotional videos and publishing content across various social media platforms to expand audience reach.",
    tools: ["Excel", "Alight Motion", "Capcut"],
    mediaUrls: [
      {
        src: "/images/experiences/nbc-certificate.jpg",
        alt: "Sertifikat Praktik Kerja Lapangan NBC Group Durenan SMKN 1 Bandung Tulungagung",
        caption:
          "Sertifikat Praktik Kerja Lapangan — NBC Group (Durenan, Trenggalek)",
      },
      {
        src: "/images/experiences/nbc-documentation.jpg",
        alt: "Dokumentasi Kegiatan Praktik Kerja Lapangan di NBC Group Durenan",
        caption: "Dokumentasi Kegiatan Praktik Kerja Lapangan di NBC Group",
      },
    ],
  },
];
