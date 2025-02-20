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
        ibmPlexSansKR: ['var(--font-ibmPlexSansKR)', 'sans-serif'],
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
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            h1: {
              marginBottom: '0.5em',
              lineHeight: '1.2',
            },
            h2: {
              marginBottom: '0.5em',
              lineHeight: '1.3',
            },
            h3: {
              marginBottom: '0.5em',
              lineHeight: '1.4',
            },
            img: {
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
            blockquote: {
              fontStyle: 'italic',
              color: theme('colors.gray.500'),
              borderLeft: `4px solid ${theme('colors.secondary')}`,
              padding: '0 1rem',
              margin: '1.5rem 0',
              'p::before': { content: 'none' },
              'p::after': { content: 'none' },
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
