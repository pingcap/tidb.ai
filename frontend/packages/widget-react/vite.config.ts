import * as path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import injectCss from 'vite-plugin-css-injected-by-js';

const overriding = [
  'components/chat/internal',
  'components/chat/style.css',
];

const overridingPackages = [
  'next/headers',
];

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
    'process.env.BASE_URL': '""',
    'process.env.NEXT_PUBLIC_BASE_URL': '""',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.NEXT_PUBLIC_DISABLE_DEBUG_PANEL': 'false',
  },
  server: {
    proxy: {
      '/api': 'https://tidbai-dev.htapdb.com',
    },
  },
});
