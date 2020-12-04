const Model = require('./Model')
const { dd } = require('koatools')
class Show extends Model {

    async $beforeInsert(context){
        await super.$beforeInsert(context)
        this.keyphrase = this.normalize(this.name)
    }

    async $beforeUpdate(context){
        await super.$beforeInsert(context)
        this.keyphrase = this.normalize(this.name)
    }

    async $afterFind(context){
        await super.$afterFind(context)
        this.genres = await this.$relatedQuery('genres')
    }

    async $beforeDelete(context){
        await super.$beforeDelete(context)
        const seasons = await this.$relatedQuery('seasons')
        for(let season of seasons){
            await season.$query().delete()
        } 
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