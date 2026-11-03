/**
 * FUNGSI  : Vite untuk prototipe; alias @ -> src
 * DIPAKAI : npm run dev/build
 * STATUS  : aktif
 */
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: '/Re-Shinrive-Arena/',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: true, port: 5173 },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
