const { dd } = require('koatools')
module.exports = {
    search: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year })
        ctx.body = movies
    },

    import: async (ctx) => {
        const { id } = ctx.params
        // const movies = await ctx.tmdb.movies().search(search,{ year})
        ctx.body = ctx.params
    },

    create: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year})
        ctx.body = movies
    },

    update: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year})
        ctx.body = movies
    },

    delete: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year})
        ctx.body = movies
    },
}