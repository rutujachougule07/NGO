/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF9F2',
          100: '#FFF2E3', // Soft warm container tint
          200: '#FDE2C4',
          300: '#FBCDA0',
          400: '#F8A863',
          500: '#F58220', // Vibrant divine marigold saffron
          600: '#E87A1E', // Signature brand button color from emblem
          700: '#D2640C',
          800: '#A34805',
          900: '#6E2D03',
          950: '#381602', // Deep copper mahogany heading text
        },
        forest: {
          950: '#381602',
          900: '#6E2D03',
          850: '#8A3B04',
          800: '#A34805',
          700: '#E87A1E', // Mapped to primary saffron
          600: '#F58220',
          500: '#F8A863',
          400: '#FBCDA0',
          300: '#FDE2C4',
          200: '#FFF2E3',
          100: '#FFF5EB',
          50: '#FFF9F2',
        },
        sage: {
          50: '#FFF9F2',
          100: '#FFF2E3', // Soft warm container background
          200: '#FCE2C8',
          300: '#FBCDA0',
          400: '#F8A863',
          500: '#D2640C',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FDFBF7', // Warm ivory page background
          200: '#FFF7ED',
          300: '#FFEDD5',
          400: '#FED7AA',
        },
        maroon: {
          950: '#320610',
          900: '#4D0A1A',
          800: '#681326',
          700: '#851C33',
          100: '#FDECEF',
          50: '#FDF4F6',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 51, 35, 0.05), 0 2px 6px -1px rgba(22, 51, 35, 0.03)',
        'soft-lg': '0 12px 32px -4px rgba(22, 51, 35, 0.07), 0 4px 12px -2px rgba(22, 51, 35, 0.04)',
        'soft-xl': '0 20px 45px -8px rgba(22, 51, 35, 0.10), 0 6px 16px -4px rgba(22, 51, 35, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
