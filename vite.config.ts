import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './' ensures assets are linked relatively, which is crucial for GitHub Pages
  // to work regardless of the repository name.
  base: './', 
})