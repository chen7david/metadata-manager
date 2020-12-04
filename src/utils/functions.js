const fs = require('fs')

module.exports = {
    requireAll: (path) => {
        const files = fs.readdirSync(path)
        const payload = {}
        for(let file of files) if(file.includes('.js') && file != 'index.js') {
            const [name] = file.split('.')
            payload[name] = require(`${path}/${file}`)
        }
        return payload
    }
}