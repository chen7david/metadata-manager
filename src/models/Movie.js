const Model = require('./Model')

class Movie extends Model {
    
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