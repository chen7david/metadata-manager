const Router = require('koa-router')
const router = new Router()
const movies = require('./controllers/MovieController')
const shows = require('./controllers/ShowController')
const meta = require('./controllers/MetaController')
const { dd } = require('koatools')

router.get('/tmdb-movies', movies.search)
router.get('/movies', movies.index)
router.get('/import-movie/:id/id', movies.import)

router.get('/tmdb-shows', shows.search)
router.get('/import-show/:id/id', shows.import)

router.get('/genres', meta.genres)
router.get('/trending', meta.trending)


module.exports = router