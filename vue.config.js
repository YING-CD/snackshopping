/*
 * @Description: 配置信息
 * @Author: yingzi
 * @Date: 2020-11-04 11:16:51
 * @LastEditTime: 2020-11-24 15:48:50
 * @LastEditors: yingzi
 */
module.exports = {
  devServer: {
    before: require('./src/mock/index.js')//引入mock/index.js
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'mock':'@/mock',
        'network': '@/network',
        'store': '@/store',
        'views': '@/views',
      }
    }
  },
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3030/', // 本地后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false,   //配置关闭eslint
}

