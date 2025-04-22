import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Add server.proxy section
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // replace with your backend port if different
    },
  },
})
