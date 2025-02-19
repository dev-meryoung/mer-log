import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nanumSquareRound: ['var(--font-nanumSquareRound)', 'sans-serif'],
        recipekorea: ['var(--font-recipekorea)', 'sans-serif'],
      },
      colors: {
        primary: '#233067',
        secondary: '#38427b',
        background: {
          light: '#f5f5f5',
          dark: '#212121',
        },
        text: {
          light: '#333',
          dark: '#f5f5f5',
        },
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '800px',
          lg: '1024px',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
