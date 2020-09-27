const { dd } = require('koatools')
const { Show } = require('./../models')
const schema = require('./../middleware/ValidationSchema')

module.exports = {

    index: async (ctx) => {
        const { year, name } = ctx.request.query
        const shows = await Show.query()
        await Show.getRecordsWithMissingFiles()
        ctx.body = ctx.cargo.setPayload(shows)
    },

    tmdbSearch: async (ctx) => {
        const { search } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search)
        ctx.body = shows
    },

    import: async (ctx) => {
        try {
            const { show_id } = ctx.params
            if(ctx.state.show) return ctx.body = ctx.cargo.setDetail('duplicate', 'show id')
            const match = await ctx.tmdb.shows().eager().getById(show_id)
            const { error, value } = schema.createShow.validate(match)
            if(error) throw(error)
            const show = await Show.query().insert(value)

            for(let item of match.seasons){
                const { error, value } = schema.createSeason.validate(item)
                if(error) throw(error)
                const season = await show.$relatedQuery('seasons').insert(value)
                for(let episode of item.episodes){
                    const { error, value } = schema.createEpisode.validate(episode)
                    if(error) throw(error)
                    await season.$relatedQuery('episodes').insert(value)
                }
            }
            
            const result = await Show.query() .where('id', show.id)
                        .withGraphFetched('seasons.[episodes]')
                        .first()
            ctx.body = ctx.cargo.setPayload(result)
        } catch (err) {
            throw(err)
        }
    },

    view: async (ctx) => {
        ctx.body = ctx.cargo.setPayload(ctx.state.show)
    },

    update: async (ctx) => {
        const { search, year } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search,{ year})
        ctx.body = shows
    },

    delete: async (ctx) => {
        const deleted = await ctx.state.show.$query().delete()
        ctx.body = ctx.cargo.setPayload({deleted})
    },
}