const router = require('koa-router')()
const controller = require('./../controllers').movie
const { validateBody } = require('koatools')
const { createMovie } = require('./../middleware').ValidationSchema

/* ROUTES */
router.get('/movies', controller.index)
router.post('/movies', validateBody(createMovie), controller.create)
router.get('/movies/:id', controller.view)

module.exports = router