module.exports = {
    commands: 'server',
    description: 'Display info about this server.',
    permissions: 'ADMINISTRATOR',
    execute(message) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    },
};