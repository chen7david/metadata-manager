const router = require('koa-router')()
const controller = require('../controllers').show

/* ROUTES */
router.get('/shows', controller.search)

module.exports = router