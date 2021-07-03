const Commando = require('discord.js-commando')
module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pong',
            group: 'misc',
            memberName: 'pong',
            description: 'Pong?',
            argsType: 'single'
        })
    }
    async run(message, args, discord) {
        message.reply('Neat Game!');
    }
};