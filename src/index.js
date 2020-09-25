const Koa = require('koa')
const cors = require('kcors')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
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
app.use(cors())
app.use(bodyParser())
app.use(cargo())
app.use(tmdb({apiKey, basePath: 'src/image/'}))
app.use(ErrorHandler(handler))
// app.on('error', ErrorLogger)

/* ROUTES */
app.use(router.routes())
app.use(NotFoundHandler)

/* SERVER */
app.listen(server.port, () => {
    console.log(url.format(server))
})