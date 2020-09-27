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

router.param('show_id', paramLoader({
    model:'Show', 
    required: false
}))

router.param('showId', paramLoader({
    model:'Show', 
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
router.get('/shows', shows.index)
router.get('/import-show/:show_id/id', shows.import)
// router.get('/show/:showId/id', shows.view)
router.delete('/show/:showId/id', shows.delete)

/* META */
router.get('/genres', meta.genres)
router.get('/trending', meta.trending)


module.exports = router