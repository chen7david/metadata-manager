const knexfile = require('./../../knexfile').development
const knex = require('knex')(knexfile)
const OM = require('koatools').BaseModel
const { Model } = require('objection')
const { deburr } = require('lodash')
const { dd } = require('koatools')
Model.knex(knex)

class BaseModel extends OM(Model) {
 
    async $beforeInsert(context){
        await super.$beforeInsert(context)
        // if(this.id) this.tmdb_id = this.id
        // delete this.id
    }

    async $beforeDelete(context){
        await super.$beforeInsert(context)
        if(this.backdrop_path && this.backdrop_path.length > 0) this.tmdb_id = this.id
    }
 
    $formatJson(json) {
        json = super.$formatJson(json)  
        delete json.tmdb_id   
        delete json.imdb_id    
        delete json.created_at
        delete json.deleted_at
        delete json.updated_at
        return json
    }

    normalize(name){
        return deburr(name.toLowerCase())
    }

}

module.exports = BaseModel