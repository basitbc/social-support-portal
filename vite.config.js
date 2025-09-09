import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
   test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.js',
    css: true,
    include: ['src/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
})