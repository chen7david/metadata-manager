

module.exports = {
    
    search: async (ctx) => {
        const { search, year, source } = ctx.request.query
        if(search && source){
            /* Search External Sources */
            const { results } = await ctx.$tmdb.shows().search(search, {year}).get()
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
