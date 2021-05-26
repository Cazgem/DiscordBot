module.exports = {
    name: 'kick',
    description: 'Tag a member and kick them (but not really).',
    guildOnly: true,
    permissions: ['KICK_MEMBERS'],
    async execute(message, args, discord) {
        const offender = (await message.guild.member(message.mentions.users.first())) || message.guild.members.cache.get(args[0]) //returns mentioned user
        if (offender) {
            let banReason = args.join(" ").slice(args[0].length + 1);
            offender.kick(`${banReason}`)
        } else {
            message.channel.send(`No user found: ${offender}`);
        }
    }
};