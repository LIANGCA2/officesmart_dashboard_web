'use strict'

const glob = require('glob')

const files = glob.sync('configurations/*.js', {})
let configuration = {}

files.forEach(file => {
  if (file.endsWith('index.js')) return
  if (!file.endsWith(`${process.env.NODE_ENV}.js`)) return
  configuration = Object.assign(require('./default.js'), require('.' + file.substring(file.lastIndexOf('/'))))
})

module.exports = configuration
