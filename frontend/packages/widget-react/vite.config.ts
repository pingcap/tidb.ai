import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import injectCss from 'vite-plugin-css-injected-by-js';

const overriding = [
  'components/remark-content/style.scss',
  'components/code-theme/style.scss',
];

const overridingPackages: string[] = [];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
  ].concat(process.env.NODE_ENV === 'development' ? [] : [injectCss()]),
  build: {
    lib: {
      entry: 'src/library.tsx',
      formats: ['cjs'],
      fileName: () => 'widget.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  publicDir: '../../app/public',
  resolve: {
    conditions: ['tidbai-widget'],
    alias: [
      ...overriding.map(override => ({
        find: path.join('@', override),
        replacement: path.resolve(__dirname, `src/overrides`, override),
      })),
      ...overridingPackages.map(override => ({
        find: override,
        replacement: path.resolve(__dirname, `src/overrides`, override),
      })),
      {
        find: '@',
        replacement: path.resolve(__dirname, '../../app/src'),
      },
    ],
  },
  define: {
    'process.env.BASE_URL': process.env.NODE_ENV === 'development' ? '"https://tidbai-dev.htapdb.com"' : '""',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.NEXT_PUBLIC_DISABLE_DEBUG_PANEL': 'false',
    'process.env.NEXT_PUBLIC_MOCKING_CHAT': 'false',
    'process.env.NEXT_PUBLIC_IS_WIDGET': 'true',
    'process.env.__NEXT_ROUTER_BASEPATH': '""',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'https://tidbai-dev.htapdb.com',
    },
  },
});
