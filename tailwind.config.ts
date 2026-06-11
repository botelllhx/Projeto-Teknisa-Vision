import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Design tokens — Teknisa.
 * Base BRANCA (light é o padrão), azul Teknisa protagonista dos destaques,
 * texto preto/azul. Cor de marca real extraída do Teknisa Vision: #040486.
 *
 * Dois sistemas convivem de propósito:
 *  - Tokens semânticos via CSS vars (primary, secondary, muted, …) — estilo shadcn,
 *    permitem dark mode por `class` e são o que Hero/Navbar consomem.
 *  - Escala `teknisa` (50–900) — azuis nomeados para uso direto nas próximas seções.
 */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        // Títulos em Google Sans (OFL desde nov/2025). Inter segue no corpo.
        display: ["Google Sans", "system-ui", "sans-serif"],
        // Assinatura serif EXCLUSIVA do wordmark "TeknisAI" (§6 IA). Não usar em mais nada.
        wordmark: ["Averia Serif Libre", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        /** Azul Teknisa — escala derivada da cor de marca #040486 (≈ token 800). */
        teknisa: {
          50: "#eef1ff",
          100: "#e0e4ff",
          200: "#c6ccff",
          300: "#a3a9ff",
          400: "#7c7ff9",
          500: "#5a59ef",
          600: "#403cd6",
          700: "#2a26ab",
          800: "#040486",
          900: "#070652",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        /** Marquee de logos — track duplicado 2× desliza -50% em loop contínuo. */
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        /** Órbita (§9, base Magic UI): gira no anel mantendo o ícone "em pé". As CSS
            vars --angle e --radius vêm inline em cada item. */
        orbit: {
          "0%": {
            transform:
              "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
          },
          "100%": {
            transform:
              "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg - 360deg))",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        orbit: "orbit calc(var(--duration) * 1s) linear infinite",
      },
      /** `ease-expo-out` — easing assinatura usada em transições do mega-menu. */
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
