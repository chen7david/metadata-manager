const knexfile = require('../../knexfile').development
const knex = require('knex')(knexfile)
const OM = require('koatools').BaseModel
const { deburr } = require('lodash')
const { Model } = require('objection')

Model.knex(knex)

class BaseModel extends OM(Model) {
 
    async $beforeInsert(context){
        await super.$beforeInsert(context)
    }

    async $afterInsert(context){
        await super.$afterInsert(context)
        if(this.genres) await this.$relatedQuery('genres').relate(this.genres.map(o => o.id))
    }

    async $beforeDelete(context){
        await super.$beforeInsert(context) 
    }

    normalize(name){
        return deburr(name.toLowerCase())
    }
 
    $formatJson(json) {
        json = super.$formatJson(json)   
        delete json.imdb_id    
        delete json.created_at
        delete json.deleted_at
        delete json.updated_at
        return json
    }
}

module.exports = BaseModel