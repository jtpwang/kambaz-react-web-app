console.log('BaseURL:', import.meta.env.VITE_API_BASE_URL);
// API 基礎 URL 設定
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// 用戶端 URL 設定
export const CLIENT_BASE = import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173';

// 開發環境偵測
export const isDevelopment = import.meta.env.DEV;

// 生產環境偵測
export const isProduction = import.meta.env.PROD;

console.log('API 基礎 URL:', API_BASE);
console.log('環境狀態:', isDevelopment ? '開發環境' : '生產環境');
