import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        flagStatus: resolve(__dirname, 'flag-status.html'),
        experimentResults: resolve(__dirname, 'experiment-results.html'),
        lupineSuggestion: resolve(__dirname, 'lupine-suggestion.html'),
        // Add more widgets here as we create them
      },
    },
  },
})
