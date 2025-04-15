import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')

  // Use the API_BASE_URL environment variable, or fallback to the default
  const apiBaseUrl = env.VITE_API_BASE_URL || 'http://localhost:4000'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
