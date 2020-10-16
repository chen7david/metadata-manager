const { dd } = require('koatools')
const { Movie } = require('./../models')
const schema = require('./../middleware/ValidationSchema')
module.exports = {

    index: async (ctx) => {
        const { year, search } = ctx.request.query
        const movies = await Movie.query()
        ctx.body = ctx.cargo.setPayload(movies)
    },

    searchTmdb: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year })
        ctx.body = ctx.cargo.setPayload(movies)
    },

    import: async (ctx) => {
        try {
            const { movieId } = ctx.params
            if(ctx.state.movie) return ctx.body = ctx.cargo.setPayload(ctx.state.movie)
                .setDetail('duplicate', 'movie id')
            const match = await ctx.tmdb.movies().getById(movieId)
            const { error, value } = schema.createMovie.validate(match)
            if(error) throw(error)
            const movie = await Movie.query().insert(value)
            ctx.body = ctx.cargo.setPayload(movie)
        } catch (err) {
            throw(err)
        }
    },

    view: async (ctx) => {
        ctx.body = ctx.cargo.setPayload(movie)
    },

    create: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year})
        ctx.body = ctx.cargo.setPayload(movies)
    },

    update: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year})
        ctx.body = ctx.cargo.setPayload(movies)
    },

    delete: async (ctx) => {
        const deleted = await ctx.state.movie.$query().delete()
        ctx.body = ctx.cargo.setPayload({deleted})
    },
}