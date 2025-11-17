/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(235, 73%, 12%)",
        foreground: "hsl(0, 0%, 100%)",
        card: "hsl(235, 65%, 18%)",
        "card-foreground": "hsl(0, 0%, 100%)",
        primary: "hsl(235, 73%, 34%)",
        "primary-foreground": "hsl(0, 0%, 100%)",
        "primary-glow": "hsl(235, 80%, 55%)",
        secondary: "hsl(235, 65%, 18%)",
        "secondary-foreground": "hsl(0, 0%, 100%)",
        "secondary-glow": "hsl(230, 75%, 45%)",
        muted: "hsl(235, 60%, 25%)",
        "muted-foreground": "hsl(220, 20%, 75%)",
        accent: "hsl(220, 85%, 60%)",
        "accent-foreground": "hsl(0, 0%, 100%)",
        destructive: "hsl(0, 62%, 30%)",
        "destructive-foreground": "hsl(0, 85%, 97%)",
        border: "hsl(235, 60%, 25%)",
        input: "hsl(235, 60%, 25%)",
        ring: "hsl(235, 80%, 55%)",
      },
      backgroundImage: {
        "gradient-card": "linear-gradient(135deg, hsl(235, 65%, 18%) 0%, hsl(235, 60%, 22%) 100%)",
        "gradient-hero": "radial-gradient(ellipse at center, hsl(235, 80%, 55% / 0.1) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px hsl(235 80% 55% / 0.4)",
        "glow-sm": "0 0 20px hsl(235 80% 55% / 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          from: { boxShadow: "0 0 20px hsl(235 80% 55% / 0.4)" },
          to: { boxShadow: "0 0 40px hsl(235 80% 55% / 0.8)" },
        },
      },
    },
  },
  plugins: [],
}