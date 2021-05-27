module.exports = {
    commands: 'ban',
    description: 'Tag a member and ban them.',
    guildOnly: true,
    permissions: ['BAN_MEMBERS'],
    async execute(message, args, discord) {
        const offender = (await message.guild.member(message.mentions.users.first())) || message.guild.members.cache.get(args[0]) //returns mentioned user
        if (offender) {
            let banReason = args.join(" ").slice(args[0].length + 1);
            offender.ban(`${banReason}`)
        } else {
            message.channel.send(`No user found: ${offender}`);
        }
    }
};