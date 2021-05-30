const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'v3',
            group: 'fun',
            memberName: 'v3',
            description: 'Victoria 3 When?',
            argsType: 'multiple',
        })
    }

    async run(message, args) {
        message.channel.send('https://vic3when.com');
    }
};