const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'moderation',
            memberName: 'userinfo',
            description: 'Displays User Information',
            aliases: ['user'],
            argsType: 'multiple',
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            format: '<USER_ID>'
        })
    }

    async run(message, args) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
};