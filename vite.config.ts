import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,                  // lets you write tests without importing "describe", "test" etc
    environment: 'jsdom',           // simulates the DOM for React Testing Library
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, '**/e2e/**'], // skip end-to-end or Playwright tests if you add them
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
