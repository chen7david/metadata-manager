const { dd } = require('koatools')
module.exports = {
    search: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year})
        ctx.body = movies
    }
}