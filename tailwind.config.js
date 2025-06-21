/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c1ff",
          300: "#66a3ff",
          400: "#3384ff",
          500: "#0070F3",
          600: "#0057c1",
          700: "#004191",
          800: "#002a60",
          900: "#001530",
        },
        secondary: {
          50: "#e6faff",
          100: "#ccf5ff",
          200: "#99ebff",
          300: "#66e0ff",
          400: "#33d6ff",
          500: "#00B4D8",
          600: "#0090ad",
          700: "#006c82",
          800: "#004857",
          900: "#00242b",
        },
        accent: {
          50: "#fdedee",
          100: "#fadcdd",
          200: "#f5b9bb",
          300: "#f09599",
          400: "#eb7277",
          500: "#E63946",
          600: "#b82e38",
          700: "#8a222a",
          800: "#5c171c",
          900: "#2e0b0e",
        },
        success: {
          500: "#10B981",
        },
        warning: {
          500: "#F59E0B",
        },
        error: {
          500: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
