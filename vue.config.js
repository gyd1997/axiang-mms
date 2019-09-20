module.exports = {
  devServer: {
    port: 8888,
    host: "localhost",
    https: false,
    open: true, // 启动服务自动打开浏览器访问
    proxy: { // 开发环境代理配置
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true, // 开启代理服务器
        pathRewrite: {
          // '^/dev-api': ''
          [ '^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false // 打包时不生成.map文件, 加快打包速度
}