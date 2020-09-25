const Model = require('./Model')

class Episode extends Model {

    async $beforeInsert(context){
        await super.$beforeInsert(context)
        this.keyphrase = this.normalize(this.name)
    }
    
    static get relationMappings(){ 

        const Season = require('./Season')

        return {
            season:{
                relation: Model.BelongsToOneRelation,
                modelClass: Season,
                join:{
                    from:'episodes.season_id',
                    to:'seasons.id'
                }
            }
        }
    }
}

module.exports = Episode