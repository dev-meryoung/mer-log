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
        darkActive: '#171717',
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
            p: {
              marginBottom: '0.8em',
              lineHeight: '1.6',
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
            code: {
              backgroundColor: theme('colors.gray.200'),
              color: theme('colors.text.light'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: theme('colors.gray.200'),
              color: theme('colors.text.light'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.text.dark'),
            a: {
              color: theme('colors.secondary'),
              '&:hover': {
                color: theme('colors.primary'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.primary'),
              color: theme('colors.gray.300'),
            },
            h1: {
              color: theme('colors.text.dark'),
            },
            h2: {
              color: theme('colors.text.dark'),
            },
            h3: {
              color: theme('colors.text.dark'),
            },
            strong: { color: theme('colors.text.dark') },
            code: {
              backgroundColor: theme('colors.gray.500'),
              color: theme('colors.text.dark'),
            },
            pre: {
              backgroundColor: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
