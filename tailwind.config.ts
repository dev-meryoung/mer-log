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
        sans: ['var(--font-pretendard)', 'sans-serif'],
      },
      colors: {
        primary: '#233067',
        secondary: '#575e9b',
        background: {
          light: '#f5f5f5',
          dark: '#212121',
        },
        text: {
          light: '#333',
          dark: '#f5f5f5',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
