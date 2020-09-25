const { dd } = require('koatools')
const { Movie } = require('./../models')
const schema = require('./../middleware/ValidationSchema')
module.exports = {

    search: async (ctx) => {
        const { search, year } = ctx.request.query
        const movies = await ctx.tmdb.movies().search(search,{ year })
        ctx.body = ctx.cargo.setPayload(movies)
    },

    import: async (ctx, next) => {
        try {
            const { id } = ctx.params
            const match = await ctx.tmdb.movies().getById(id)
            const { error, value } = schema.createMovie.validate(match)
            if(error) throw(error)
            const movie = await Movie.query().insert(value).returning('*')
            ctx.body = ctx.cargo.setPayload(match)
        } catch (err) {
            dd(err)
            next(err)
            // ctx.body = ctx.cargo
        }
    },

    get: async (ctx) => {
        try {
            const { id } = ctx.params
            const movie = await ctx.tmdb.movies().getById(id)
            ctx.body = ctx.cargo.setPayload(movie)
        } catch (err) {
            ctx.body = ctx.cargo
        }
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