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
        brand: {
          dark: "#080D1A",
          darker: "#040710",
          card: "#0E1525",
          yellow: "#FFD600",
          "yellow-hover": "#F5CC00",
          blue: "#1E3A8A",
          "blue-mid": "#2563EB",
          "blue-light": "#60A5FA",
          border: "#1E2D4A",
        },
        whatsapp: "#25D366",
        "whatsapp-hover": "#20B858",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "slide-in": "slide-in 0.4s ease-out forwards",
      },
      keyframes: {
        "pulse-ring": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(37, 211, 102, 0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(30,58,138,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,214,0,0.08) 0%, transparent 50%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(14,21,37,1) 0%, rgba(8,13,26,1) 100%)",
        "yellow-glow":
          "radial-gradient(ellipse at center, rgba(255,214,0,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
