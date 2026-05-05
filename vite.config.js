import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages needs /cookalong/ for production; local dev should use / so http://localhost:.../ works.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/cookalong/' : '/',
}))
