const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
const { server, tmdb: {apiKey}} = require('config')
const url = require('url')
const { tmdb } = require('tmdb-agent')
const handler = require('./middleware/ErrorMutationHandler')
const app = new Koa()
const {
    ErrorHandler, 
    ErrorLogger, 
    NotFoundHandler, 
    cargo,
} = require('koatools')

/* MIDDLEWARE */
app.use(bodyParser())
app.use(cargo())
app.use(tmdb({apiKey}))
app.use(ErrorHandler(handler))
app.on('error', ErrorLogger)

/* ROUTES */
app.use(router.movies.routes())
app.use(router.shows.routes())
app.use(router.meta.routes())
app.use(NotFoundHandler)

/* SERVER */
app.listen(server.port, () => {
    console.log(url.format(server))
})