const { UniqueViolationError } = require('objection')
const { ValidationError } = require('@hapi/joi')
const { dd } = require('koatools')

module.exports = async (err, ctx, next) => {
    err.id = ctx.cargo.serial
    /* VALIDATION EXCEPTION MUTATOR */
    if(err instanceof ValidationError) {
        const { details, _original } = err
        ctx.cargo.setOriginal(_original)
        err.status = 422
        for (let detail of details) {
            const { type, context: { label, key, limit, valids } } = detail
            let ref = valids ? valids[0].key : null
            ctx.cargo.loadDetails(type, { label, limit, ref }, key)
        }
    }
 
    /* DATABASE EXCEPTION MUTATOR */
    if(err instanceof UniqueViolationError) {
        err.status = 422
        let key = err.columns.pop()
        ctx.cargo.loadDetails('duplicate', key, key)
    }
 
    /* DEFAULT EXCEPTION MUTATOR */
    if(!ctx.cargo.details){
        ctx.cargo.setDetail('unknown', ctx.cargo.serial)
        ctx.cargo.persistDetail()
        ctx.app.emit('error', err, ctx)
    }
 
    return ctx.cargo
}