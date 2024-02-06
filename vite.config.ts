import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    emptyOutDir: true,
    lib: {
      entry: './demo/index.ts',
      fileName: 'index',
      formats: ['es', 'cjs'],
      name: 'webComponent',
    },
    manifest: false,
    minify: 'esbuild',
    outDir: './dist',
    reportCompressedSize: true,
    sourcemap: false,
    target: 'es2015',
    write: true,
  },
  publicDir: false,
})
