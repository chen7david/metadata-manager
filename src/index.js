const Koa = require('koa')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const config = require('config')
const url = require('url')
const { tmdb } = require('tmdb-agent')
const handler = require('./middleware/ErrorMutationHandler')
const app = new Koa()
const {
    ErrorHandler, 
    ErrorLogger, 
    NotFoundHandler, 
    cargo
} = require('koatools')

/* MIDDLEWARE */
app.use(cors())
app.use(bodyParser())
app.on('error', ErrorLogger)
app.use(cargo())
app.use(tmdb({apiKey: config.tmdb.apiKey}))
app.use(ErrorHandler(handler))

/* ROUTES */
app.use(router.routes())
app.use(NotFoundHandler)

/* SERVER */
app.listen(config.server.port, () => {
    console.log(url.format(config.server))
})
