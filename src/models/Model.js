const knexfile = require('../../knexfile').development
const knex = require('knex')(knexfile)
const p = require('path')
const fs = require('fs')
const OM = require('koatools').BaseModel
const { deburr } = require('lodash')
const { tmdb:{ imgsizes } } = require('confyg')
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
        if(this.poster_path) await this.removePoster(this.poster_path)
        if(this.backdrop_path) await this.removeBackdrop(this.backdrop_path)
        // if(this.still_path) await this.removeStill(this.still_path)
        // if(this.profile_path) await this.removeProfile(this.profile_path)
        // if(this.logo_path) await this.removeLogo(this.logo_path)   
    }

    imagepath(size, name){
        return p.join(__dirname, './../../public/image', `${size}`, name)
    }

    async removeImage(size, name){
        let filePath = this.imagepath(size, name)
        if(this.exist(filePath)) await this.remove(filePath)
    }

    async removePoster(name){
        for(let size of [...imgsizes.poster, 'original']){
            await this.removeImage(size, name)
        }
    }

    async removeBackdrop(name){
        for(let size of [...imgsizes.backdrop, 'original']){
            await this.removeImage(size, name)
        }
    }

    exist(path){
        return fs.existsSync(path)
    }

    async remove(dest){
        return fs.promises.unlink(dest).then(() => true)
        .catch((err) =>{ console.log(err); return false })
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