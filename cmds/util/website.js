const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'website',
            description: 'Website Link',
            aliases: ['web', 'www'],
            group: 'utility',
            memberName: 'website',
        })
    }

    async run(message, args) {
        message.channel.send('https://gamesinasnap.com');
    }
};