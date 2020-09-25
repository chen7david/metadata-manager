
module.exports = {

    paramLoader: (params) => async (id, ctx, next) => {
        const models = require('./../models')
        let model = models[params.model]
        const object = await model.query()
            .where('id', id)
            .first()

        if(!object && params.required) return ctx.body = ctx.cargo.setDetail('invalid', 'id')
        ctx.state[params.model.toLowerCase()]= object
        return next()
    }
}