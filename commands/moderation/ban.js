module.exports = {
    name: 'ban',
    description: 'Tag a member and ban them.',
    guildOnly: true,
    permissions: ['KICK_MEMBERS'],
    execute(message) {
        const content = message.content.replace(`=ban `, ``)
        console.log(content)
        const targetMember = discord.users.cache.find(user => user.id === `${content}`)
        targetMember.ban()
        message.channel.send(`${taggedUser.username} has been Banned!`);
    },
};