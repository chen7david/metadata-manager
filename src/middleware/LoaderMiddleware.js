const models = require('./../models')

module.exports = {

    paramGetter: (params) => async (id, ctx, next) => {
        const object = await models[params.model].query()
            .where('id', id)
            .first()

        if(!object) return ctx.body = ctx.cargo.setDetail('invalid', 'id')
        ctx.state[params.model.toLowerCase()]= object
        return next()
    },

    paramLoader: (params) => async (id, ctx, next) => {
        const object = await models[params.model].query()
            .where('id', id)
            .first()
        if(object) ctx.state[params.model.toLowerCase()]= object
        return next()
    }
}