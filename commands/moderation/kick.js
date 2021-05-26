module.exports = {
    name: 'kick',
    description: 'Tag a member and kick them (but not really).',
    guildOnly: true,
    permissions: ['KICK_MEMBERS'],
    execute(message, args, discord) {
        const content = message.content.replace(`=kick `, ``)
        if (content) {
            console.log(content)

            let targetMember = discord.users.fetch(content);
            targetMember.then(function (result1) {
                // console.log(targetMember.id)
                targetMember.id.kick()
                message.channel.send(`${content} has been Kicked!`);
            })
        } else {
            message.channel.send(`You wanted to kick: ${content}`);
        }
    },
};