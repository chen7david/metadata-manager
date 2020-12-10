const fs = require('fs')
const p = require('path')
const axios = require('axios')

module.exports = {
    requireAll: (path) => {
        const files = fs.readdirSync(path)
        const payload = {}
        for(let file of files) if(file.includes('.js') && file != 'index.js') {
            const [name] = file.split('.')
            payload[name] = require(`${path}/${file}`)
        }
        return payload
    },

    exist: (path) => fs.existsSync(path),

    remove: (dest) =>  fs.promises.unlink(dest).then(() => true)
        .catch((err) =>{ console.log(err); return false }),

    async mkdir: (path) => fs.promises.mkdir(path, { recursive: true })
            .then(() => true).catch(() => false),
            
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
    },
}