const { Movie } = require('./../models')

module.exports = {
    
    search: async (ctx) => {

        const { type, window, search, year, source } = ctx.request.query
        let payload = null

        if(type){
            
            if(type == 'genres'){
                
                const { genres } = await ctx.$tmdb.movies().genres().get()
                payload = genres

            }else if(type == 'trending'){
                
                const { results } = await ctx.$tmdb.movies().trending(window).get()
                payload = results

            }

        }else if(search && source){
            
            /* Search External Sources */
            let data = { results: [] }
            // Add your list of cources here ...
            if(source == 'tmdb') data = await ctx.$tmdb.movies().search(search, {year}).get()

            const { results } = data
            payload = results

        }else if(search) {
           
            /* Search Local Sources */
            const query = Movie.query().where('keyphrase', 'like', `%${search}%`)
            if(year) query.andWhere('release_date', 'like', `%${year}%`)
            payload = await query.orderBy('release_date', 'desc')

        }else {
            
            /* Return All */
            payload = await Movie.query()

        }
        
        return ctx.body = ctx.cargo.setPayload(payload)
    },

    view: async (ctx) => {
        
        const { id } = ctx.params
        const { source } = ctx.request.query
        let data = null

        if(source){
            
            /* Search External Sources */
            // Add your list of cources here ...
            if(source == 'tmdb') data = await ctx.$tmdb.movies().withId(id).get()
            
        }else{
            
        }

        return ctx.body = ctx.cargo.setPayload(data)
    },

    create: async (ctx) => {
        const content = ctx.request.body

        ctx.body = ctx.cargo.setPayload(content)
    },

}
