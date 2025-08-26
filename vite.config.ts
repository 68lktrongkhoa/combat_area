import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  define: {
    // Vite replaces this with the value of process.env.API_KEY at build time.
    // This makes the environment variable available on the client side.
    'process.env.API_KEY': JSON.stringify('AIzaSyDyOuoCHVg_3j92Eqlsw75pTRzUbt0ByLI')
  }
})

    