

module.exports = {
    
    search: async (ctx) => {
        const { type, search, year, source } = ctx.request.query
        if(type){

        }else if(search && source){
            /* Search External Sources */
            const { results } = await ctx.$tmdb.shows().search(search, {year}).get()
            return ctx.body = ctx.cargo.setPayload(results)
        }else if(search) {
            /* Search Local Sources */
            return ctx.body = ctx.cargo.setPayload([])
        }else {
            /* Return All */
            return ctx.body = ctx.cargo.setPayload([])
        }
    }
}
