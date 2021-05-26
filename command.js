const { prefix } = require('./config.js');

module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }
    client.on('message'), message => {
        const { content } = message;
        aliases.foreach(alias => {
            const command = `${prefix}${alias}`

            if (content.startsWith(`${command}`) || content === command) {
                console.log(`Running the command ${command}`)
                callback(message)
            }
        })
    }
}