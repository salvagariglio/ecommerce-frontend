import tailwindPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const postcssConfig = {
  plugins: {
    // el plugin oficial de Tailwind para PostCSS v4
    '@tailwindcss/postcss': {},
    // autoprefixer para vendor prefixes
    autoprefixer: {},
  },
};

export default postcssConfig;
