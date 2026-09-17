import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // @ts-ignore: Vite espera un objeto, pero mkcert necesita que sea true
    https: true
  },
  plugins: [
    react(),
    mkcert()
  ],
})