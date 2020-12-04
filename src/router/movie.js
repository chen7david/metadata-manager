const router = require('koa-router')()
const controller = require('./../controllers').movie

/* ROUTES */
router.get('/movies', controller.search)
router.post('/movies', controller.create)
router.get('/movies/:id', controller.view)

module.exports = router