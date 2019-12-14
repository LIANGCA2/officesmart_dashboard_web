const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const globalStyles = [
  '@/assets/styles/base.scss',
  '@/assets/styles/variables.scss',
  '@/assets/styles/common.scss',
  '@/assets/styles/iconfont.scss',
  '@/assets/styles/animate.scss'
]

const defaultPlugins = [
  new CompressionWebpackPlugin({
    test: /\.js$|\.html$|\.css$/,
    threshold: 10240,
    minRatio: 0.8
  })
]

const productionPlugins = [
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    },
    sourceMap: process.env.VUE_APP_PRODUCTION_SOURCE_MAP === 'TRUE',
    parallel: true
  })
]

module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  devServer: {
    proxy: require('./configurations/default.js').proxy
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: globalStyles.reduce((data, path) => { return `${data} @import "${path}";` }, '')
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      config.optimization.minimize(true)
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      [...defaultPlugins, ...productionPlugins].forEach(plugin => config.plugins.push(plugin))
    } else {
      defaultPlugins.forEach(plugin => config.plugins.push(plugin))
    }
  },
  pwa: {
    name: 'cs_dashboard_web',
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
