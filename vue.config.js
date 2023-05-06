module.exports = {
  productionSourceMap: false,
  outputDir: 'blog-admin',
  devServer: {
    port: 7000,
    proxy: {
      '/api': {
        target: 'http://localhost:7003',
        changeOrigin: true
      }
    }
  }
};
