const Router = require('koa-router')
const router = new Router()
const movies = require('./controllers/MovieController')
const shows = require('./controllers/ShowController')
const { dd } = require('koatools')

router.get('/movies', movies.search)
router.get('/import-movie/:id/id', movies.import)

router.get('/shows', shows.search)
router.get('/import-show/:id/id', shows.import)


module.exports = router