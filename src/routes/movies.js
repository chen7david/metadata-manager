const Router = require('koa-router')
const router = new Router()
const controller = require('./../controllers/MovieController')
const { paramLoader, paramGetter } = require('./../middleware/LoaderMiddleware')
const { dd } = require('koatools')

router.param('id', paramGetter('Movie'))
router.param('movieId', paramLoader('Movie'))

/* MOVIES */
router.get('/tmdb-movies', controller.searchTmdb)
router.get('/tmdb-movies/:movieId', controller.import)
router.get('/movies', controller.index)
router.get('/movies/:id', controller.view)
router.delete('/movies/:id', controller.delete)

module.exports = router