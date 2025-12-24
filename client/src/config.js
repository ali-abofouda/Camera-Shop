// Set VITE_API_URL in Vercel environment variables to your Railway backend URL
export const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';
