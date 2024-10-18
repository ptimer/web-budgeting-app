import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/web-budgeting-app",
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
})
