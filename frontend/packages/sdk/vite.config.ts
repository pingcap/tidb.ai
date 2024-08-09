import * as path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import pkg from './package.json';

const overriding: string[] = [];

const overridingPackages = [
  'next/headers',
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    visualizer(),
  ],
  build: {
    lib: {
      entry: 'src/library.ts',
      formats: ['es'],
      fileName: 'sdk',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      external: Object.keys(pkg.dependencies),
    },
  },
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
    'process.env.BASE_URL': 'process.env.TIDBAI_BASE_URL',
    'process.env.NEXT_PUBLIC_BASE_URL': '""',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.NEXT_PUBLIC_DISABLE_DEBUG_PANEL': 'false',
    'process.env.NEXT_PUBLIC_MOCKING_CHAT': 'false',
    'process.env.NEXT_PUBLIC_IS_WIDGET': 'true',
    'process.env.__NEXT_ROUTER_BASEPATH': '""',
  },
  server: {
    proxy: {
      '/api': 'https://tidbai-dev.htapdb.com',
    },
  },
});
