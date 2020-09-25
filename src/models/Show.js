const Model = require('./Model')

class Show extends Model {

    async $beforeInsert(context){
        await super.$beforeInsert(context)
        this.keyphrase = this.name
    }

    static get relationMappings(){
        
        const Season = require('./Season')
        const Genre = require('./Genre')

        return {
            
            seasons:{
                relation: Model.HasManyRelation,
                modelClass: Season,
                join:{
                    from:'shows.id',
                    to:'seasons.show_id'
                }
            },

            genres:{
                relation: Model.ManyToManyRelation,
                modelClass: Genre,
                join:{
                    from:'shows.id',
                    to:'genres.id',
                    through:{
                        from:'show_genres.show_id',
                        to:'show_genres.genre_id'
                    }
                }
            }
        }
    }
}

module.exports = Show