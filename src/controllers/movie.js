

module.exports = {
    
    search: async (ctx) => {
        const { type, window, search, year, source } = ctx.request.query
        if(type){
            if(type == 'genres'){
                const { genres } = await ctx.$tmdb.movies().genres().get()
                return ctx.body = ctx.cargo.setPayload(genres)
            }else if(type == 'trending'){
                const { results } = await ctx.$tmdb.movies().trending(window).get()
                return ctx.body = ctx.cargo.setPayload(results)
            }
        }else if(search && source){
            /* Search External Sources */
            const { results } = await ctx.$tmdb.movies().search(search, {year}).get()
            ctx.body = ctx.cargo.setPayload(results)
        }else if(search) {
            /* Search Local Sources */
            ctx.body = ctx.cargo.setPayload([])
        }else {
            /* Return All */
            ctx.body = ctx.cargo.setPayload([])
        }
    }
}
