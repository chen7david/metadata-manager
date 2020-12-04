const Model = require('./Model')
const { dd } = require('koatools')

class Season extends Model {

    async $beforeDelete(context){
        await super.$beforeDelete(context)
        const episodes = await this.$relatedQuery('episodes')
        for(let episode of episodes){
            await episode.$query().delete()
        } 
    }

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