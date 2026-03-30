import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#fdf9f5", // Base
          low: "#f7f3ef",    // Depth
          highest: "#e6e2de",// Focus
        },
        tertiary: {
          DEFAULT: "#745a27", // Golden Light
          container: "#b1935a",
        },
        primary: {
          DEFAULT: "#795653", // Dusty Rose (inferred from ambient shadow spec)
        },
        accent: {
          sage: "#8a9a8a", // Muted floral Sage
        },
        "on-surface": "#1a1a1a", // Deep Charcoal
      },
      fontFamily: {
        serif: ["var(--font-noto-serif)", "serif"],
        sans: ["var(--font-plus-jakarta)", "sans-serif"],
        script: ["var(--font-alex-brush)", "cursive"],
      },
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        ambient: "0 12px 32px rgba(121, 86, 83, 0.08)",
      },
      backgroundImage: {
        'golden-gradient': 'linear-gradient(to right, #745a27, #b1935a)',
      },
    },
  },
  plugins: [],
};
export default config;
