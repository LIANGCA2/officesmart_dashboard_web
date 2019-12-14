'use strict'

module.exports = {
  proxy: {
    '/api': {
      target: 'http://localhost:7878',
      ws: true,
      changeOrigin: true,
      secure: false
    }
  }
}
