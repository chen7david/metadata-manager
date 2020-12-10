const { Movie } = require('./../models')
const { deburr } = require('lodash')
const { dd, validateBody } = require('koatools')

module.exports = {

    paramLoader:  async (id, ctx, next) => {
        const { source } = ctx.request.query
        if(source) return next()
        const movie = await Movie.query().where('id', id).first()
        if(!movie) return ctx.body = ctx.cargo.setDetail('invalid', 'movie-id')
        ctx.state.movie = movie
        return next()
    },
    
    index: async (ctx) => {

        const { 
            search,
            year,
            source,
            type,
            window,
            pages,
            limit 
        } = ctx.request.query

        let payload = null

        if(type){
            
            if(type == 'genres'){
                
                const { genres } = await ctx.$tmdb.movies().genres().get()
                payload = genres

            }else if(type == 'trending'){
                
                const { results } = await ctx.$tmdb.movies().trending(window).get()
                payload = results

            }

        }else if(search){

            const { results } = data
            payload = results

        }else if(search) {
            let keyphrase = deburr(search).toLowerCase()
            /* Search Local Sources */
            const query = Movie.query().where('keyphrase', 'like', `%${keyphrase}%`)
            if(year) query.andWhere('release_date', 'like', `%${year}%`)
            payload = await query.orderBy('release_date', 'desc')

            if(source){
                /* Search External Sources */
                let data = { results: [] }
                // Add your list of cources here ...
                if(source == 'tmdb') data = await ctx.$tmdb.movies().search(search, {year}).get()
                const { results } = data
                payload = results
            }else{
                /* Search Local Sources */
                const query = Movie.query().where('keyphrase', 'like', `%${search}%`)
                if(year) query.andWhere('release_date', 'like', `%${year}%`)
                payload = await query.orderBy('release_date', 'desc')
            }

        }else {
            
            /* Return All */
            payload = await Movie.query().orderBy('release_date', 'desc')
        }
        
        return ctx.body = ctx.cargo.setPayload(payload)
    },

    view: async (ctx) => {
        
        const { id } = ctx.params
        const { source, download } = ctx.request.query

        let data = null

        if(source){
            
            /* Search External Sources */
            // Add your list of sources here ...
            if(source == 'tmdb') data = await ctx.$tmdb.movies().withId(id).get()
            
        }else if(download){
            // create directory
        }else {
            data = ctx.state.movie
        }
        console.log({data, source, id})
        return ctx.body = ctx.cargo.setPayload(data)
    },

    create: async (ctx) => {
        const item = await Movie.query().insert(ctx.request.body).returning('*')
        ctx.body = ctx.cargo.setPayload(item)
    },

    update: async (ctx) => {
        const item = await ctx.state.movie.$query().patch(ctx.request.body)
        ctx.body = ctx.cargo.setDetail('updated', 'movie').setPayload(item)
    },

    delete: async (ctx) => {
        await ctx.state.movie.$query().delete()
        ctx.body = ctx.cargo.setDetail('deleted', 'movie')
    },
}
