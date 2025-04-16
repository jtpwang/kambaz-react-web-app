console.log('BaseURL:', import.meta.env.VITE_API_BASE_URL);
// API base URL setting
export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Client base URL setting
export const CLIENT_BASE = import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173';

// Development environment detection
export const isDevelopment = import.meta.env.DEV;

// Production environment detection
export const isProduction = import.meta.env.PROD;

console.log('API Base URL:', API_BASE);
console.log('Environment:', isDevelopment ? 'Development' : 'Production');
