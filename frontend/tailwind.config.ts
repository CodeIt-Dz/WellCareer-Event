import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import nextuiConfig from "./nextui.config";

const config: Config = {
  darkMode: "class",
  plugins: [nextui(nextuiConfig), require("tailwindcss-animate")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Axiforma: ["Axiforma", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at 30% 50%, rgba(0, 123, 255, 0.3), transparent), radial-gradient(circle at 100% 30%, rgba(123, 0, 255, 0.3), transparent), radial-gradient(circle at 50% 90%, rgba(0, 255, 200, 0.2), transparent)",
      },
      backgroundColor: {
        fallback: "#f0f4ff", // Fallback color for non-supporting browsers
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primaryColorSoft: "var(--primary-color-soft)",
        primaryColor: "var(--primary-color)",
        primaryBackground: "var(--primary-background)",
        grey: "#4C535F",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#591FCE",
          foreground: "#F3EFFB",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
};
export default config;