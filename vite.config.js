import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to repo name for GitHub Pages user/org site with subpath
  base: '/fqde/',
  server: {
    port: 5173,
    strictPort: true,
  },
})
