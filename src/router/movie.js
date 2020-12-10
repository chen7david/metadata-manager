const router = require('koa-router')()
const controller = require('./../controllers').movie
const { validateBody } = require('koatools')
const { createMovie } = require('./../middleware').ValidationSchema


router.param('id', controller.paramLoader)

/* ROUTES */
router.get('/movies', controller.index)
router.post('/movies', validateBody(createMovie), controller.create)
router.get('/movies/:_id', controller.view)
router.patch('/movies/:id', validateBody(createMovie), controller.update)
router.delete('/movies/:id', controller.delete)

module.exports = router