const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            description: 'Kicks a User From The Server',
            argsType: 'multiple',
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS'],
            format: '<USER_ID>'
        })
    }

    async run(message, args) {
        const { guild } = message
        const offender = (await guild.member(message.mentions.users.first())) || guild.members.cache.get(args[0]) //returns mentioned user
        console.log(offender)
        if (offender) {
            let reason = args.join(" ").slice(args[0].length + 1);
            offender.kick(`${reason}`)
        } else {
            message.channel.send(`No user found: ${offender}`);
        }
    }
};