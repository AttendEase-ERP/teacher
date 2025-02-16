import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#605CFF",
        secondary: "#FF69B4",
        accent: "#2FE5A7",
        neutral: "#FFFFFF",
        background: "#1A202C",
        grey: "#364153",
        border: "#2C3240",
      },

      fontSize: {
        DisplayLarge: "32px",
        DisplayMedium: "30px",
        DisplaySmall: "28px",
        HeadingLarge: "26px",
        HeadingMedium: "24px",
        HeadingSmall: "22px",
        TitleLarge: "20px",
        TitleMedium: "18px",
        TitleSmall: "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;
