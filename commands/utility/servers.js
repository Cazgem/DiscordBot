const Discord = require('discord.js');
const discord = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: 'servers',
    description: 'Display info about servers.',
    permissions: 'ADMINISTRATOR',
    execute(message, args, discord) {
        discord.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    },
};