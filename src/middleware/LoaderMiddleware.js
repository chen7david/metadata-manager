const models = require('./../models')
const { dd } = require('koatools')

module.exports = {

    paramGetter: (model) => async (id, ctx, next) => {
        const object = await models[model].query()
            .where('id', id)
            .first()

        if(!object) return ctx.body = ctx.cargo.setDetail('invalid', 'id')
        ctx.state[model.toLowerCase()]= object
        return next()
    },

    paramLoader: (model) => async (id, ctx, next) => {
        const object = await models[model].query()
            .where('id', id)
            .first()
        if(object) ctx.state[model.toLowerCase()]= object
        return next()
    }
}