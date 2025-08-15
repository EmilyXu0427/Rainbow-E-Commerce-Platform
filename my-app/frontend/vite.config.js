

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// this is important to convert backend call route to 3000 port not 5173
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/order': 'http://localhost:3000',
      '/cart': 'http://localhost:3000',
      '/products': 'http://localhost:3000',
    },
  },
});
