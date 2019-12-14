'use strict'

module.exports = {
  server: {
    port: process.env.PORT || 8080
  },
  proxy: {
    '/api': {
      target: 'http://localhost:7878',
      ws: true,
      changeOrigin: true,
      secure: false
    }
  }
}
