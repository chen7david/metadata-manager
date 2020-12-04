const router = require('koa-router')()
const controller = require('./../controllers').movie

/* ROUTES */
router.get('/movies', controller.search)

module.exports = router