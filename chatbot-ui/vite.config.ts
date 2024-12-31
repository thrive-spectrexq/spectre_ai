import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/chat': {
        target: 'https://gemini.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/chat/, '/v1/chat'),
      },
    },
  },
});
