const Discord = require('discord.js');
const discord = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
module.exports = {
    commands: 'status',
    description: 'change Bot Status.',
    execute(message, args, discord) {
        const content = message.content.replace(`=status `, ``)
        discord.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    },
};