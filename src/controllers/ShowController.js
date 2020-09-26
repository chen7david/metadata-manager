const { dd } = require('koatools')
const { Show } = require('./../models')
const schema = require('./../middleware/ValidationSchema')

module.exports = {
    tmdbSearch: async (ctx) => {
        const { search } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search)
        ctx.body = shows
    },

    import: async (ctx) => {
        try {
            const { show_id } = ctx.params
            if(ctx.state.show) return ctx.body = ctx.cargo.setDetail('duplicate', 'show id')
            const match = await ctx.tmdb.shows().getById(show_id)
            const { error, value } = schema.createshow.validate(match)
            if(error) throw(error)
            const data = await Show.transaction(async (trx) => {
                const show = await Show.query(trx).insert(value).returning('*')
                await show.$relatedQuery('genres', trx).relate(match.genres.map(o => o.id))
                return await show.query(trx)
                    .where('id', show.id)
                    .withGraphFetched('genres')
                    .first()
            })    
            ctx.body = ctx.cargo.setPayload(data)
        } catch (err) {
            throw(err)
        }
    },

    create: async (ctx) => {
        const { search, year } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search,{ year})
        ctx.body = shows
    },

    update: async (ctx) => {
        const { search, year } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search,{ year})
        ctx.body = shows
    },

    delete: async (ctx) => {
        const { search, year } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search,{ year})
        ctx.body = shows
    },
}