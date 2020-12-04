const Koa = require('koa')
const app = new Koa()
const url = require('url')
const cors = require('kcors')
const router = require('./router')
const bodyparser = require('koa-bodyparser')
const { server, api } = require('config')
const { koatmdb } = require('tmdb-agent')
const handler = require('./middleware/ErrorMutationHandler')
const {
    cargo, 
    ErrorHandler, 
    ErrorLogger, 
    NotFoundHandler, 
} = require('koatools')

/* MIDDLEWARE */
app.use(cors())
app.use(ErrorHandler(handler))
app.on('error', ErrorLogger)
app.use(bodyparser())
app.use(cargo())
app.use(koatmdb({
    apiKey: api.tmdb.apikey,
    timeout: 18000
}))

/* ROUTES */
app.use(router.movie.routes())
app.use(router.show.routes())

app.listen(server.port, () => {
    console.log('server running at: ' + url.format(server))
})