import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5178,
    proxy: { '/api': process.env.LIFE_INDEX_API || 'http://localhost:8787' },
  },
})
