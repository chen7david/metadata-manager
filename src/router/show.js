const router = require('koa-router')()
const controller = require('../controllers').show

/* ROUTES */
router.get('/shows', controller.search)
router.get('/shows/:id', controller.view)
router.get('/shows/:id/seasons', controller.seasons)

module.exports = router