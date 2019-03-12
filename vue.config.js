module.exports = {
  devServer: {
    port: 1000,
    proxy: {
      '/api': {
        target: 'http://localhost:1003',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
