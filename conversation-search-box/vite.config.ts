import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // https://vitejs.dev/config/server-options#server-proxy
  server: {
    proxy: {
      // '/api/auth/session': {
      //   target: 'https://tidb.ai/api/auth/session',
      //   changeOrigin: true,
      // },
      '/api': {
        target: 'https://tidb.ai',
        changeOrigin: true,
      },
      // '/api': {
      //   target: 'http://127.0.0.1:3000',
      //   changeOrigin: true,
      //   // rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    },
  },
})
