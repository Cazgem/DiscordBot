const mongo = require('../mongo')

module.exports = client => {
    client.on('message', message => {
        const { author } = message
        const { id } = author
        console.log('AUTHOR: ', author)
    })
}