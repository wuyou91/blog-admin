export default {
  API_BASE: process.env.NODE_ENV === 'development'
    ? 'http://10.10.60.65:1003'
    : 'http://www.yancx.com',
};
