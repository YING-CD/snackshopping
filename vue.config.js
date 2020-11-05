module.exports = {
  devServer: {
    before: require('./src/mock/index.js')//引入mock/index.js
  },
  configureWebpack: {
    resolve: {
      alias: {
        'mock':'@/mock',
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  lintOnSave: false,   //配置关闭eslint
 
}

