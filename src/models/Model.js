const knexfile = require('./../../knexfile').development
const knex = require('knex')(knexfile)
const OM = require('koatools').BaseModel
const { Model } = require('objection')
const { deburr } = require('lodash')
Model.knex(knex)

class BaseModel extends OM(Model) {
 
    async $beforeInsert(context){
        await super.$beforeInsert(context)
        if(this.keyphrase) this.keyphrase = deburr(this.keyphrase.toLowerCase())
        if(this.id) this.tmdb_id = this.id
    }
 
    $formatJson(json) {
        json = super.$formatJson(json)  
        delete json.tmdb_id   
        delete json.imdb_id    
        delete json.created_at
        delete json.deleted_at
        return json
    } 
}

module.exports = BaseModel