import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Support deploying to hosts that set a base path via env var (e.g. preview environments).
  base: process.env.BASE_URL || '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
