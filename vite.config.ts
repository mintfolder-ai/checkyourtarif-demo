import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLEFILE=1 inlines everything into one self-contained index.html
// (used for the shareable Artifact link). Default build stays multi-file.
const singleFile = process.env.SINGLEFILE === '1'

// Base path per host:
//  - Vercel / Netlify / custom domain (served at root):   '/'  (default)
//  - GitHub Pages project site (served at /<repo>/):       set BASE_PATH=/checkyourtarif-demo/
export default defineConfig(() => ({
  base: process.env.BASE_PATH ?? (singleFile ? './' : '/'),
  plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
  build: {
    // Broad compatibility: transpile down so older iOS Safari works too.
    target: ['es2019', 'safari12.1', 'chrome80', 'firefox78'],
  },
}))
