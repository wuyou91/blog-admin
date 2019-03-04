export default {
  api_URL: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
};
