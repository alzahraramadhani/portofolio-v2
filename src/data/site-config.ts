import { SocialLink } from "@/types/portfolio";

export const siteConfig = {
  brandName: "Zahra Portfolio",
  fullName: "Al Zahra Ramadhani",
  role: "Junior Software Engineer",
  location: "Malang, Jawa Timur, Indonesia",
  timezoneStatus: "UTC+7 (WIB) Available",
  email: "alzahra.workhub@gmail.com",
  githubUsername: "alzahraramadhani",
  cvUrl: "/cv/CV-Al-Zahra-Ramadhani.pdf",
  profileImage: "/images/profile/zahra-profile.jpg",
  malangMapImage: "/images/malang-map.jpg",
  hero: {
    titleLine1: "Crafting Digital",
    titleLine2: "Experiences",
    subtitle:
      "Junior Software Engineer crafting clean, accessible, and high-performance web & mobile software. Built with React, Next.js, Flutter, and Tailwind.",
  },
  homeBio:
    "A passionate junior creator crafting clean, accessible, and engaging web & mobile apps. Blending rigorous component architecture with delight-driven interaction design.",
  aboutBioParagraphs: [
    "A passionate junior software engineer dedicated to crafting clean, accessible, and engaging web & mobile applications. Currently pursuing Informatics Engineering at Universitas Negeri Malang while actively contributing to developer communities as a Google Student Ambassador.",
    "I enjoy bridging rigorous frontend & backend architecture with expressive interface aesthetics—working across TypeScript, Next.js, Flutter, Laravel, and PostgreSQL to deliver reliable digital products.",
  ],
  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      handle: "github.com/alzahraramadhani",
      href: "https://github.com/alzahraramadhani/",
      isExternal: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "linkedin.com/in/al-zahra-ramadhani",
      href: "https://www.linkedin.com/in/al-zahra-ramadhani/",
      isExternal: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@jjahrav",
      href: "https://www.instagram.com/jjahrav/",
      isExternal: true,
    },
    {
      id: "email",
      label: "Email",
      handle: "alzahra.workhub@gmail.com",
      href: "/#contact",
      isExternal: false,
    },
  ] satisfies SocialLink[],
};
