const Router = require('koa-router')
const router = new Router()
const movies = require('./controllers/MovieController')
const shows = require('./controllers/ShowController')
const genres = require('./controllers/GenreController')
const { dd } = require('koatools')

router.get('/movies', movies.search)
router.get('/import-movie/:id/id', movies.import)

router.get('/shows', shows.search)
router.get('/import-show/:id/id', shows.import)

router.get('/genres', genres.get)


module.exports = router