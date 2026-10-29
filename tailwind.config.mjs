import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const token = name => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      // Couleurs définies dans src/styles/global.css (thème sombre et clair).
      // Arrondis : médias rounded-xl, miniatures rounded-md, pastilles et boutons rounded-full.
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        faint: token('faint'),
        accent: {
          ...colors.red,
          DEFAULT: token('accent'),
          strong: token('accent-strong'),
        },
      },
      fontFamily: {
        sans: ['"Archivo Variable"', '"Arial Narrow"', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
};
