/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        neon: {
          cyan: '#00f5ff',
          pink: '#ff00ff',
          purple: '#bf00ff',
          blue: '#0066ff',
          green: '#00ff88',
          yellow: '#ffff00',
          red: '#ff3366',
        },
        dark: {
          900: '#0a0a1a',
          800: '#12122a',
          700: '#1a1a3a',
          600: '#252550',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'pulse-glow': 'pulseGlow 1.5s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'win-glow': 'winGlow 0.8s ease-in-out 3',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 245, 255, 0.5), 0 0 10px rgba(0, 245, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.8), 0 0 40px rgba(0, 245, 255, 0.5)',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        winGlow: {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 255, 136, 1), 0 0 60px rgba(0, 255, 136, 0.7)',
            transform: 'scale(1.05)',
          },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 245, 255, 0.5), 0 0 20px rgba(0, 245, 255, 0.3)',
        'neon-pink': '0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3)',
        'neon-green': '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
        'neon-red': '0 0 10px rgba(255, 51, 102, 0.5), 0 0 20px rgba(255, 51, 102, 0.3)',
      },
    },
  },
  plugins: [],
};
