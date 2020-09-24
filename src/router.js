const Router = require('koa-router')
const router = new Router()
const movies = require('./controllers/MovieController')
const { dd } = require('koatools')

router.get('/movies', movies.search)




module.exports = router