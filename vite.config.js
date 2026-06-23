import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    allowedHosts: [
      'c620-59-153-226-202.ngrok-free.app',
      '.ngrok-free.app'
    ]
  }
})
