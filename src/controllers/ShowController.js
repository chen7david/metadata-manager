const { dd } = require('koatools')
const { Show, Episode } = require('./../models')
const schema = require('./../middleware/ValidationSchema')

module.exports = {

    index: async (ctx) => {
        const { year, name } = ctx.request.query
        const shows = await Show.query()
        ctx.body = ctx.cargo.setPayload(shows)
    },

    searchTmdb: async (ctx) => {
        const { search } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search)
        ctx.body = ctx.cargo.setPayload(shows)
    },

    import: async (ctx) => {
        try {
            const { showId } = ctx.params
            if(ctx.state.show) return ctx.body = ctx.cargo.setDetail('duplicate', 'show id')
            const match = await ctx.tmdb.shows().eager().getById(showId)
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
        const show = await Show.query()
        .where('id', ctx.state.show.id )
        .withGraphFetched('seasons.[episodes]')
        .first()
        ctx.body = ctx.cargo.setPayload(show)
    },

    update: async (ctx) => {
        const { search, year } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search,{ year})
        ctx.body = ctx.cargo.setPayload(shows)
    },

    updateSeason: async (ctx) => {
        const { id, seasonNumber } = ctx.params
        const show = await ctx.tmdb.shows().seasons([seasonNumber]).getById(id)
        try {
            for(episode of show.seasons[0].episodes){
                delete episode.crew
                delete episode.guest_stars
                await Episode.query().update(episode).where('id', episode.id)
            }
                
        } catch (err) {
            dd({err})
        }
        ctx.body = ctx.cargo.setPayload(show)
    },

    delete: async (ctx) => {
        const deleted = await ctx.state.show.$query().delete()
        ctx.body = ctx.cargo.setPayload({deleted})
    },
}