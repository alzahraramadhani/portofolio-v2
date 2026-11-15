import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        canvas: "#131315",
        "section-deep": "#0E0E10",
        "card-primary": "#18181A",
        "card-elevated": "#201F24",
        "input-bg": "#111113",
        "pill-subtle": "#242429",
        periwinkle: "#8E8FBB",
        "lavender-bright": "#C1C1FF",
        "indigo-deep": "#2A2A8E",
      },
      backgroundImage: {
        "glow-hero":
          "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(56, 56, 148, 0.34), transparent 75%)",
        "glow-card-top":
          "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(124, 126, 204, 0.24), transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
