/**
 * FUNGSI  : Vite untuk prototipe; alias @ -> src
 * DIPAKAI : npm run dev/build
 * MEMAKAI : -
 * STATUS  : kerangka, belum diisi
 */
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: true, port: 5173 }
});
