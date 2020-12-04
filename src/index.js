const Koa = require('koa')
const app = new Koa()
const url = require('url')
const router = require('./router')
const bodyparser = require('koa-bodyparser')
const { server, api } = require('config')
const { koatmdb } = require('tmdb-agent')
const { cargo, dd } = require('koatools')

/* MIDDLEWARE */
app.use(bodyparser())
app.use(koatmdb({
    apiKey: api.tmdb.apikey,
    timeout: 18000
}))

/* ROUTES */
// app.use(router.routes())

app.listen(server.port, () => {
    console.log('server running at: ' + url.format(server))
})