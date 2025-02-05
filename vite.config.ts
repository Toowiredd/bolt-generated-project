import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3456
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: 'src/server.ts',
      output: {
        format: 'esm'
      }
    }
  },
  optimizeDeps: {
    exclude: ['fsevents']
  }
});
