const Model = require('./Model')

class Movie extends Model {
    
    async $beforeInsert(context){
        await super.$beforeInsert(context)
        this.keyphrase = this.normalize(this.title)
    }

    async $beforeUpdate(context){
        await super.$beforeInsert(context)
        if(this.title) this.keyphrase = this.normalize(this.title)
    }

    async $afterFind(context){
        await super.$afterFind(context)
        this.genres = await this.$relatedQuery('genres')
    }

    static get relationMappings(){
        
        const Genre = require('./Genre')

        return {

            genres:{
                relation: Model.ManyToManyRelation,
                modelClass: Genre,
                join:{
                    from:'movies.id',
                    to:'genres.id',
                    through:{
                        from:'movie_genres.movie_id',
                        to:'movie_genres.genre_id'
                    }
                }
            }
        }
    }
}

module.exports = Movie