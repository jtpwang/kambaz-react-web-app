import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 載入環境變數
  const env = loadEnv(mode, process.cwd(), '')
  
  // 使用 API_BASE_URL 環境變數，或回退到預設值
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
