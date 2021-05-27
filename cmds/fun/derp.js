const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'derp',
            group: 'fun',
            memberName: 'derp',
            description: 'Derps a User',
            argsType: 'single',
        })
    }

    async run(message, args) {
        message.reply('Derp!')
    }
};