const Commando = require('discord.js-commando')
const config = require('../../config')
const discord = new Commando.CommandoClient({
    owner: '83055939267067904',
    commandPrefix: config.prefix
})
module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'allserverinfo',
            group: 'admin',
            memberName: 'allserverinfo',
            aliases: ['serversinfo', 'allservers'],
            description: 'Displays Server Information',
            argsType: 'single',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR']
        })
    }

    async run(message, args) {
        discord.guilds.cache.forEach((guild) => {
            message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
        })
    }
};