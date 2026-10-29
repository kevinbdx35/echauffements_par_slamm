import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      // Couleur d'accent unique du site : changer ici suffit pour tout le site.
      // Arrondis : cartes rounded-xl, médias dans une carte rounded-lg,
      // miniatures rounded-md, pastilles et boutons rounded-full.
      colors: {
        accent: colors.red,
      },
    },
  },
  plugins: [],
};
