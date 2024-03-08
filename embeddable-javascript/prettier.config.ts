// prettier.config.js
import type { Config } from 'prettier';

const config: Config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'tw'],
  singleQuote: true,
};

export default config;
