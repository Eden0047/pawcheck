/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F0",
        coral: "#FF6B6B",
        teal: "#4ECDC4",
        softgreen: "#A8E6CF",
        softyellow: "#FFE66D",
        nearblack: "#2D3436",
        muted: "#636E72",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)"],
        inter: ["var(--font-inter)"],
      },
      keyframes: {
        pawFade: {
          "0%": { opacity: "0.55", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.4)" },
        },
        petBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ctaPulse: {
          "0%, 100%": { boxShadow: "0 8px 24px rgba(255,107,107,.35)" },
          "50%": { boxShadow: "0 8px 36px rgba(255,107,107,.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        resultIn: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pawFade: "pawFade 1.1s forwards",
        petBounce: "petBounce 1.4s ease-in-out infinite",
        ctaPulse: "ctaPulse 2s ease-in-out infinite",
        shimmer: "shimmer 1.4s infinite",
        resultIn: "resultIn 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
