/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        wine: {
          50: "#f6eaea",
          100: "#e9d2d2",
          200: "#d5aaaa",
          300: "#c08282",
          400: "#ac5a5a",
          500: "#964141",
          600: "#7c3434",
          700: "#6a2c2c",
          800: "#4a1e1e",
          900: "#2d1414",
        },
        cream: {
          25: "#fdf9f2",
          50: "#f9f2e9",
          100: "#f3e8d9",
          200: "#e6d4b7",
        },
        forest: {
          50: "#e3efeb",
          100: "#c7dfd6",
          200: "#8fbfad",
          300: "#579f84",
          400: "#2f8167",
          500: "#15624f",
          600: "#0f4c3d",
          700: "#0b392e",
          800: "#082721",
          900: "#041511",
          DEFAULT: "#003f2f",
        },
        graphite: {
          50: "#f2f2f2",
          100: "#d9d9d9",
          200: "#bfbfbf",
          300: "#a6a6a6",
          400: "#8c8c8c",
          500: "#737373",
          600: "#595959",
          700: "#404040",
          800: "#2a2a2a",
          900: "#1a1a1a",
        },
        parchment: "#f2f2f2",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 24px 48px -24px rgba(42, 42, 42, 0.25)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
      },
    },
  },
  plugins: [],
};

