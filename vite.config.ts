import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vite.dev/config/](https://vite.dev/config/)
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_REMOTE_SERVER': JSON.stringify('https://kambaz-node-server-app-zi9z.onrender.com')
  }
})