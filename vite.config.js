import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.claude/**'],
    },
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
