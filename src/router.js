const Router = require('koa-router')
const router = new Router()
const movies = require('./controllers/MovieController')
const shows = require('./controllers/ShowController')
const meta = require('./controllers/MetaController')
const { paramLoader } = require('./middleware/LoaderMiddleware')
const { dd } = require('koatools')

router.param('movie_id', paramLoader({
    model:'Movie', 
    required: false
}))

router.param('movieId', paramLoader({
    model:'Movie', 
    required: true
}))

/* MOVIES */
router.get('/tmdb-movies', movies.tmdbSearch)
router.get('/movies', movies.index)
router.get('/import-movie/:movie_id/id', movies.import)
router.get('/movie/:movieId/id', movies.view)
router.delete('/movie/:movieId/id', movies.delete)

/* TV SHOWS */
router.get('/tmdb-shows', shows.tmdbSearch)
router.get('/import-show/:id/id', shows.import)

/* META */
router.get('/genres', meta.genres)
router.get('/trending', meta.trending)


module.exports = router