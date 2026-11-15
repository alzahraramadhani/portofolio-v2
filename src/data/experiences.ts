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
  },
  {
    id: "exp-dummy-1",
    period: "Agt 2024 – Nov 2024",
    badgeType: "Internship",
    role: "Frontend Developer Intern",
    organization: "Tech Nova Studio · Malang",
    description:
      "Developed responsive client web portals and internal dashboards using Next.js, Tailwind CSS, and REST API integration with high accessibility standards.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
  },
  {
    id: "exp-dummy-2",
    period: "Jan 2024 – Des 2024",
    badgeType: "Organization",
    role: "Divisi Web & IT Development",
    organization: "Informatics Student Association · UM",
    description:
      "Collaborated in managing campus competition landing pages, automated participant registration flows, and maintained web server availability.",
    tools: ["React", "PHP", "Laravel", "PostgreSQL", "Git"],
  },
  {
    id: "exp-dummy-3",
    period: "Mei 2024 – Jun 2024",
    badgeType: "Milestone",
    role: "Mobile App Project Lead",
    organization: "National Tech Hackathon 2024",
    description:
      "Led a team of 3 in conceptualizing and prototyping a Flutter-based smart waste management mobile app with Supabase real-time backend.",
    tools: ["Flutter", "Dart", "Supabase", "Figma"],
  },
];
