const Model = require('./Model')

class Episode extends Model {
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