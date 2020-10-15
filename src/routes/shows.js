const Router = require('koa-router')
const router = new Router()
const controller = require('../controllers/ShowController')
const { paramLoader, paramGetter } = require('../middleware/LoaderMiddleware')
const { dd } = require('koatools')

router.param('id', paramGetter('Show'))
router.param('showId', paramLoader('Show'))

/* MOVIES */
router.get('/tmdb-shows', controller.searchTmdb)
router.get('/tmdb-shows/:showId', controller.import)
router.get('/shows', controller.index)
router.get('/shows/:id', controller.view)
router.delete('/shows/:id', controller.delete)

module.exports = router