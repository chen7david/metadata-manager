const { dd } = require('koatools')
const { Genre } = require('./../models')

module.exports = {
    get: async (ctx) => {
        const { search } = ctx.request.query
        // const genres = await ctx.tmdb.shows().trending('week')
        const genres = await Genre.query()
        ctx.body = genres
    },

    import: async (ctx) => {
        const { id } = ctx.params
        const show = await ctx.tmdb.shows().eager().getById(id)
        ctx.body = show
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