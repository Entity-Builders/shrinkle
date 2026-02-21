// Base URL for displaying short links to users (e.g., "shrinkle.app/abc12")
export const REDIRECT_BASE_URL =
  import.meta.env.VITE_REDIRECT_BASE_URL ||
  'http://localhost:54321/functions/v1/shrinkle-redirect';

// Supabase Edge Function URL for resolving redirects
export const EDGE_FUNCTION_REDIRECT = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shrinkle-redirect`
  : 'http://localhost:54321/functions/v1/shrinkle-redirect';
