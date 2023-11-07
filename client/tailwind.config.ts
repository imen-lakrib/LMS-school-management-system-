import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],
        Josefin: ["var(--font-Josefin)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "400px": "400px", //xs
        "800px": "800px",   //sm
        "1000px": "1000px",   //md
        "1100px": "1100px",   //lg
        "1200px": "1200px",   //xl
        "1300px": "1300px",   //xlg
        "1500px": "1500px"   //xs
      },
    },
  },
  plugins: [],
};
export default config;
