

module.exports = {
    
    search: async (ctx) => {
        const { search, year, source } = ctx.request.query
        if(search && source){
            const { results } = ctx.$tmdb.movies.search(search, {year}).get()
        }
    }
}
