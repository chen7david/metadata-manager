const { dd } = require('koatools')
const { Genre } = require('../models')

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
}