const Router = require('koa-router')
const router = new Router()
const controller = require('../controllers/MetaController')

/* META */
router.get('/genres', controller.genres)
router.get('/trending', controller.trending)
router.get('/fix-metadata', controller.getMissingImages)

module.exports = router