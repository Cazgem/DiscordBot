const channels = ['636266161821974541', '847324366420443156']
const Commando = require('discord.js-commando')
const config = require('../../config')
const discord = new Commando.CommandoClient({
    owner: '83055939267067904',
    commandPrefix: config.prefix
})

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'admin',
            memberName: 'poll',
            description: 'Create a Poll',
            argsType: 'single',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            format: '<PROMPT>\n<EMOJI = OPTION1>\n<EMOJI = OPTION2>\n<EMOJI = OPTION3>\n'
        })
    }

    async run(message, args, discord) {
        const { channel } = message
        if (channels.includes(channel.id)) {
            const eachLine = args.split('\n')
            for (const line of eachLine) {
                if (line.includes('=')) {
                    const split = line.split('=')
                    const emoji = split[0].trim()
                    message.react(emoji)
                }
            }
        }
    }
};