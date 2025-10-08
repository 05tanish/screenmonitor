import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      // Example: forward any request starting with `/api` to backend
      '/api': {
        target: 'http://localhost:5001', // your backend server
        changeOrigin: true,              // avoids CORS issues
        secure: false,                   // set false if backend is http
      },
    },
  },
});
