import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/mania/api': {
        changeOrigin: true,
        target: 'http://1.116.195.211',
      }
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: true,
    outDir: 'build/mania',
    emptyOutDir: true,
  },
})
