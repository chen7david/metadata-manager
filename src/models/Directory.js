const { Genre } = require('.')
const {dd} = require('koatools')
const path = require('path')
const fs = require('fs')

class Directory {
    
    constructor(filename) {
        this.root = path.resolve(__dirname,'../../',filename)
    }

    exist(path){
        return fs.existsSync(path)
    }

    mkdir(path, config = { recursive: true }){
        if(!this.exist(path)) fs.mkdirSync(path, config)
    }

    mkfolder(...route){
        this.mkdir(path.resolve(this.root, ...route))
    }
}

module.exports = Directory