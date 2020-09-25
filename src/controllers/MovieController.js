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
            const exists = await Movie.query().where('tmdb_id', id).first()
            if(exists) return ctx.body = ctx.cargo.setDetail('duplicate', 'movie id')
            const match = await ctx.tmdb.movies().getById(id)
            const { error, value } = schema.createMovie.validate(match)
            if(error) throw(error)
            const trx = await Movie.transaction(async (trx) => {
                const movie = await Movie.query(trx).insert(value).returning('*')
                await movie.$relatedQuery('genres', trx).relate(match.genres.map(o => o.id))
                return await Movie.query(trx)
                    .where('id', movie.id)
                    .withGraphFetched('genres')
                    .first()
            })            
            ctx.body = ctx.cargo.setPayload(trx)
        } catch (err) {
            throw(err)
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