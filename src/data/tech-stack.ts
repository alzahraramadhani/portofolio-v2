import { TechStackItem } from "@/types/portfolio";

export const techStackItems: TechStackItem[] = [
  // 18 Mandatory Tech Stack items (displayed on Home Profile Card + About Page categories)
  {
    id: "javascript",
    name: "JavaScript",
    iconKey: "javascript",
    category: "frontend",
    showOnHomeProfile: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    iconKey: "typescript",
    category: "frontend",
    showOnHomeProfile: true,
  },
  {
    id: "react",
    name: "React",
    iconKey: "react",
    category: "frontend",
    showOnHomeProfile: true,
  },
  {
    id: "nextjs",
    name: "Next.js",
    iconKey: "nextjs",
    category: "frontend",
    showOnHomeProfile: true,
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    iconKey: "tailwindcss",
    category: "frontend",
    showOnHomeProfile: true,
  },
  {
    id: "nodejs",
    name: "Node.js",
    iconKey: "nodejs",
    category: "backend",
    showOnHomeProfile: true,
  },
  {
    id: "expressjs",
    name: "Express.js",
    iconKey: "expressjs",
    category: "backend",
    showOnHomeProfile: true,
  },
  {
    id: "dart",
    name: "Dart",
    iconKey: "dart",
    category: "mobile-tools",
    showOnHomeProfile: true,
  },
  {
    id: "flutter",
    name: "Flutter",
    iconKey: "flutter",
    category: "mobile-tools",
    showOnHomeProfile: true,
  },
  {
    id: "php",
    name: "PHP",
    iconKey: "php",
    category: "backend",
    showOnHomeProfile: true,
  },
  {
    id: "laravel",
    name: "Laravel",
    iconKey: "laravel",
    category: "backend",
    showOnHomeProfile: true,
  },
  {
    id: "sql",
    name: "SQL",
    iconKey: "sql",
    category: "backend",
    showOnHomeProfile: true,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    iconKey: "postgresql",
    category: "backend",
    showOnHomeProfile: true,
  },
  {
    id: "supabase",
    name: "Supabase",
    iconKey: "supabase",
    category: "backend",
    showOnHomeProfile: true,
  },
  {
    id: "vite",
    name: "Vite",
    iconKey: "vite",
    category: "frontend",
    showOnHomeProfile: true,
  },
  {
    id: "shadcnui",
    name: "Shadcn UI",
    iconKey: "shadcnui",
    category: "frontend",
    showOnHomeProfile: true,
  },
  {
    id: "git",
    name: "Git",
    iconKey: "git",
    category: "mobile-tools",
    showOnHomeProfile: true,
  },
  {
    id: "github",
    name: "GitHub",
    iconKey: "github",
    category: "mobile-tools",
    showOnHomeProfile: true,
  },
  // Additional supporting tools for About Page "Mobile & Tools" card
  {
    id: "figma",
    name: "Figma",
    iconKey: "figma",
    category: "mobile-tools",
    showOnHomeProfile: false,
  },
  {
    id: "postman",
    name: "Postman",
    iconKey: "postman",
    category: "mobile-tools",
    showOnHomeProfile: false,
  },
];

export const homeProfileTechStack = techStackItems.filter(
  (item) => item.showOnHomeProfile
);

export const aboutTechCategories = [
  {
    id: "frontend",
    title: "Frontend",
    items: techStackItems.filter((item) => item.category === "frontend"),
  },
  {
    id: "backend",
    title: "Backend",
    items: techStackItems.filter((item) => item.category === "backend"),
  },
  {
    id: "mobile-tools",
    title: "Mobile & Tools",
    items: techStackItems.filter((item) => item.category === "mobile-tools"),
  },
] as const;
