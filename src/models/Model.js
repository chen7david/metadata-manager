const { directory, tmdb: {imageURL, sizes} } = require('config')
const knexfile = require('./../../knexfile').development
const knex = require('knex')(knexfile)
const OM = require('koatools').BaseModel
const { Model } = require('objection')
const { deburr, padStart } = require('lodash')
const path = require('path')
const axios = require('axios')
const fs = require('fs')
const { dd } = require('koatools')


Model.knex(knex)

class BaseModel extends OM(Model) {
 
    async $beforeInsert(context){
        await super.$beforeInsert(context)
    }

    async $afterInsert(context){
        await super.$afterInsert(context)
        try {
            if(this.poster_path) await this.savePoster(this.poster_path)
            if(this.backdrop_path) await this.saveBackdrop(this.backdrop_path)
            // if(this.still_path) await this.saveStill(this.still_path)
            if(this.profile_path) await this.saveProfile(this.profile_path)
            if(this.logo_path) await this.saveLogo(this.logo_path)
            if(this.genres && this.genres.length > 0){
                await this.$relatedQuery('genres').relate(this.genres.map(o => o.id))
            }
        } catch (err) {
            if(this.poster_path) await this.removePoster(this.poster_path)
            if(this.backdrop_path) await this.removeBackdrop(this.backdrop_path)
            // if(this.still_path) await this.removeStill(this.still_path)
            if(this.profile_path) await this.removeProfile(this.profile_path)
            if(this.logo_path) await this.removeLogo(this.logo_path) 
            throw(err)
        }
    }

    async $beforeDelete(context){
        await super.$beforeInsert(context)
        if(this.poster_path) await this.removePoster(this.poster_path)
        if(this.backdrop_path) await this.removeBackdrop(this.backdrop_path)
        // if(this.still_path) await this.removeStill(this.still_path)
        if(this.profile_path) await this.removeProfile(this.profile_path)
        if(this.logo_path) await this.removeLogo(this.logo_path)   
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

    clean(string){
        return string
            .replace(/:/g,' -')
            .replace(/\//g,' ')
            .replace(/\s\s+/g, ' ')
    }

    normalize(name){
        return deburr(name.toLowerCase())
    }

    getImageURL(size, name){
        return imageURL.concat(size, name)
    }

    getImagePath(size, name){
        return path.join(this.getImageDirectoryPath(), size, name)
    }

    getImageDirectoryPath(){
        return path.resolve(__dirname, '../../', directory.public, directory.image)
    }

    static async getMissingImages(){
        let missing = 0
        const items = await this.query()
        let self = new this()

        for(let item of items){
            const {poster_path, backdrop_path, still_path} = item
            if(poster_path){
                for(let size of sizes.poster){
                    const dest = self.getImagePath(size, poster_path)
                    if(!self.exist(dest)) {
                        await self.saveImage(size,poster_path)
                        missing++
                    }
                }
            }
            if(backdrop_path){
                for(let size of sizes.backdrop){
                    const dest = self.getImagePath(size, backdrop_path)
                    if(!self.exist(dest)) {
                        await self.saveImage(size,poster_path)
                        missing++
                    }
                }
            }
            // if(still_path){
            //     for(let size of sizes.still){
            //         const dest = self.getImagePath(size, still_path)
            //         if(!self.exist(dest)) {
            //             await self.saveImage(size,poster_path)
            //             missing++
            //         }
            //     }
            // }
        }

        return missing
    }

    async savePoster(path){
        for(let size of sizes.poster){
            await this.saveImage(size, path)
        }
    }

    async saveBackdrop(path){
        for(let size of sizes.backdrop){
            await this.saveImage(size, path)
        }
    }

    // async saveStill(path){
    //     for(let size of sizes.still){
    //         await this.saveImage(size, path)
    //     }
    // }

    async saveLogo(path){
        for(let size of sizes.logo){
            await this.saveImage(size, path)
        }
    }

    async saveProfile(path){
        for(let size of sizes.profile){
            await this.saveImage(size, path)
        }
    }

    async removePoster(path){
        for(let size of sizes.poster){
            await this.removeImage(size, path)
        }
    }

    async removeBackdrop(path){
        for(let size of sizes.backdrop){
            await this.removeImage(size, path)
        }
    }

    // async removeStill(path){
    //     for(let size of sizes.still){
    //         await this.removeImage(size, path)
    //     }
    // }

    async removeLogo(path){
        for(let size of sizes.logo){
            await this.removeImage(size, path)
        }
    }

    async removeProfile(path){
        for(let size of sizes.profile){
            await this.removeImage(size, path)
        }
    }
    
    async saveImage(size, imagePath){
        let dest = path.join(this.getImageDirectoryPath(), size)
        let filePath = path.join(dest, imagePath)
        this.mkdir(dest)
        await this.download(filePath, this.getImageURL(size, imagePath))
    }

    async removeImage(size, imagePath){
        let filePath = this.getImagePath(size, imagePath)
        if(this.exist(filePath)) this.rm(filePath)
    }

    async download(dest, url){
        try {
            const { data } = await axios.get(url, {responseType: 'stream'})
            const file = fs.createWriteStream(dest)

            return new Promise((resolve, reject) => {
                file.on('error', (err) => reject(err))
                data.pipe(file)
                file.on('finish', () => resolve(true))
            })
        } catch (err) {
            fs.unlink(dest, (err) => err ? err : true)
        }
    }

    exist(path){
        return fs.existsSync(path)
    }

    mkdir(path, config = { recursive: true }){
        if(!this.exist(path)) fs.mkdirSync(path, config)
    }

    rm(dest){
        return fs.unlink(dest, (err) => err ? err : true) 
    }
}

module.exports = BaseModel