const Model = require('./Model')

class Genre extends Model {

    static get relationMappings(){
        
        const Show = require('./Show')
        const Movie = require('./Movie')

        return {
            movies:{
                relation: Model.ManyToManyRelation,
                modelClass: Movie,
                join:{
                    from:'genres.id',
                    to:'movies.id',
                    through:{
                        from: 'movie_genres.movie_id',
                        to: 'movie_genres.genre_id'
                    }
                }
            },
            shows:{
                relation: Model.ManyToManyRelation,
                modelClass: Show,
                join:{
                    from:'genres.id',
                    to:'shows.id',
                    through:{
                        from:'show_genres.show_id',
                        to:'show_genres.genre_id'
                    }
                }
            }
        }
    }
}

module.exports = Genre