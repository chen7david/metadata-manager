

module.exports = {
    
    search: async (ctx) => {
        const { type, window, search, year, source } = ctx.request.query
        if(type){
            if(type == 'genres'){
                const { genres } = await ctx.$tmdb.shows().genres().get()
                return ctx.body = ctx.cargo.setPayload(genres)
            }else if(type == 'trending'){
                const { results } = await ctx.$tmdb.shows().trending(window).get()
                return ctx.body = ctx.cargo.setPayload(results)
            }
        }else if(search && source){
            /* Search External Sources */
            let data = { results: [] }
            // Add your list of cources here ...
            if(source == 'tmdb') data = await ctx.$tmdb.shows().search(search, {year}).get()
            const { results } = data
            return ctx.body = ctx.cargo.setPayload(results)
        }else if(search) {
            /* Search Local Sources */
            ctx.body = ctx.cargo.setPayload([])
        }else {
            /* Return All */
            ctx.body = ctx.cargo.setPayload([])
        }
    }
}
