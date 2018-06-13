const Koa = require('koa')
const Router = require('koa-router')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const Logger = require('koa-logger')
const Respond = require('koa-respond')
const BodyLogger = require('./middlewares/body-logger')
const Compress = require('koa-compress')
const app = new Koa()
const router = new Router()

app.use(Helmet())

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
  app.use(BodyLogger())
}

app.use(Respond())
app.use(Compress())

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
