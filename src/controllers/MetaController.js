const { dd } = require('koatools')
const { Genre, Movie, Show, Season, Episode } = require('../models')

module.exports = {
    
    genres: async (ctx) => {
        const { type } = ctx.request.query
        let genres = [] 
        if(type == 'movies') genres = await ctx.tmdb.movies().genres() 
        if(type == 'shows') genres = await ctx.tmdb.shows().genres() 
        if(!type) genres = await Genre.query()
        ctx.body = genres    
    },

    trending: async (ctx) => {
        const { type, window } = ctx.request.query
        let trending = [] 
        if(type == 'movies') trending = await ctx.tmdb.movies().trending(window) 
        if(type == 'shows') trending = await ctx.tmdb.shows().trending(window) 
        if(type == 'people') trending = await ctx.tmdb.shows().trending(window) 
        ctx.body = trending 
    },

    getMissingImages: async (ctx) => {
        const movies = await Movie.getMissingImages()
        const shows = await Show.getMissingImages()
        const seasons = await Season.getMissingImages()
        const episodes = await Episode.getMissingImages()
        ctx.body = ctx.cargo.setPayload({
            movies,
            shows,
            seasons,
            episodes,
            total: movies + shows + seasons + episodes
        })
    },
}