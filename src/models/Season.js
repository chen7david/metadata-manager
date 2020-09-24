const Model = require('./Model')

class Season extends Model {

    static get relationMappings(){ 

        const Show = require('./Show')
        const Episode = require('./Episode')

        return {

            show:{
                relation: Model.BelongsToOneRelation,
                modelClass: Show,
                join:{
                    from:'seasons.show_id',
                    to:'shows.id'
                }
            },

            episodes:{
                relation: Model.HasManyRelation,
                modelClass: Episode,
                join:{
                    from:'seasons.id',
                    to:'episodes.season_id'
                }
            }
        }
    }
}

module.exports = Season