const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban a User From The Server',
            argsType: 'multiple',
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            format: '<USER_ID>'
        })
    }

    async run(message, args) {
        const { guild } = message
        const offender = (await guild.member(message.mentions.users.first())) || guild.members.cache.get(args[0]) //returns mentioned user
        if (offender) {
            let banReason = args.join(" ").slice(args[0].length + 1);
            offender.ban(`${banReason}`)
        } else {
            message.channel.send(`No user found: ${offender}`);
        }
    }
};