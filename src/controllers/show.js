

module.exports = {
    
    search: async (ctx) => {

        const { type, window, search, year, source } = ctx.request.query
        let payload = null

        if(type){

            if(type == 'genres'){
                
                const { genres } = await ctx.$tmdb.shows().genres().get()
                payload = genres

            }else if(type == 'trending'){
                
                const { results } = await ctx.$tmdb.shows().trending(window).get()
                payload = results

            }
            
        }else if(search && source){
            
            /* Search External Sources */
            let data = { results: [] }
            // Add your list of cources here ...
            if(source == 'tmdb') data = await ctx.$tmdb.shows().search(search, {year}).get()
            const { results } = data
            payload = results

        }else if(search) {
            
            /* Search Local Sources */
            payload = []

        }else {
            
            /* Return All */
            payload = []
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
            if(source == 'tmdb') data = await ctx.$tmdb.shows().withId(id).get()
            
        }else{
            
        }

        return ctx.body = ctx.cargo.setPayload(data)
    },

    seasons: async (ctx) => {
        
        const { id } = ctx.params
        const { source, seasons } = ctx.request.query
        let data = null

        if(source){
            
            /* Search External Sources */
            // Add your list of cources here ...
            if(source == 'tmdb') data = await ctx.$tmdb.shows().withId(id).seasons().get()
            
        }else{
            
        }

        return ctx.body = ctx.cargo.setPayload(data)
    },
}
