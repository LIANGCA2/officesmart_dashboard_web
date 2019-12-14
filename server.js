'use strict'

const configuration = require('./configurations')
const Express = require('express')
const path = require('path')
const proxy = require('http-proxy-middleware')
const staticResourcePath = path.join(__dirname, '../dist')

const app = new Express()
Object.keys(configuration.proxy || {}).forEach(target => {
  app.use(target, proxy(configuration.proxy[target]))
})

app.use('/', require('connect-history-api-fallback')())
  .use('/', Express.static(staticResourcePath))
  .listen(configuration.server.port)

console.log(`Your application is running here: http://localhost:${configuration.server.port}`)
