const Router = require('koa-router')
const router = new Router()
const controller = require('../controllers/MetaController')
const { dd } = require('koatools')

/* META */
router.get('/genres', controller.genres)
router.get('/trending', controller.trending)
router.get('/fix', controller.getMissingImages)

module.exports = router