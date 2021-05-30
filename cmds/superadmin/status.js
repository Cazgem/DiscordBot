const Commando = require('discord.js-commando')
const config = require('../../config')
const discord = new Commando.CommandoClient({
    owner: '83055939267067904',
    commandPrefix: config.prefix
})

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'status',
            group: 'superadmin',
            memberName: 'status',
            description: 'Changes Bot Status',
            argsType: 'single',
            format: '<BOT_STATUS>'
        })
    }

    async run(message, args, client) {
        console.log(args)
        client.user.setPresence({
            activity: {
                name: args,
                type: 0
            }
        })
    }
};