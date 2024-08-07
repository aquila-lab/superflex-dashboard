export const ApiErrorTypes = {
  UNAUTHORIZED: 'unauthorized',
  SESSION_LIMIT_EXCEEDED: 'session_limit_exceeded',
  SESSION_EXPIRED: 'session_expired'
};

export const IS_PROD = process.env.REACT_APP_NODE_ENV === 'production';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID ?? '';
export const GOOGLE_OAUTH_REDIRECT_URI =
  process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI ?? 'http://localhost:3000';
export const COOKIE_DOMAIN = process.env.REACT_APP_COOKIE_DOMAIN ?? '';

console.log('IS_PROD', IS_PROD);
console.log('API_BASE_URL', API_BASE_URL);
console.log('GOOGLE_CLIENT_ID', GOOGLE_CLIENT_ID);
console.log('GOOGLE_OAUTH_REDIRECT_URI', GOOGLE_OAUTH_REDIRECT_URI);
console.log('COOKIE_DOMAIN', COOKIE_DOMAIN);
