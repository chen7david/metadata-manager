const { dd } = require('koatools')

module.exports = {
    search: async (ctx) => {
        const { search } = ctx.request.query
        const shows = await ctx.tmdb.shows().search(search)
        ctx.body = shows
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