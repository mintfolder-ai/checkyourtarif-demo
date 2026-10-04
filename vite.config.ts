import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLEFILE=1 inlines everything into one self-contained index.html
// (used for the shareable Artifact link). Default build stays multi-file.
const singleFile = process.env.SINGLEFILE === '1'

export default defineConfig({
  base: './',
  plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
  build: {
    target: 'es2020',
  },
})
