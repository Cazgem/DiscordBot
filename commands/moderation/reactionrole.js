const Discord = require('discord.js');
const messageSchema = require('../../models/message.js');

module.exports = {
    commands: 'reactionrole',
    description: 'Sets up a reaction role message!',
    requiredPermissions: ['ADMINISTRATOR'],
    async execute(message, args, qwerty, discord) {
        const { guild, mentions } = message;
        const { channels } = mentions;
        const targetChannel = channels.first() || message.channel;
        if (guild.me.hasPermission('MANAGE_MESSAGES')) {
            message.delete();
        }
        if (!guild.me.hasPermission('MANAGE_ROLES')) {
            message.reply('Bot Requires Permission to Manage roles in order to give or remove roles.')
            return
        }
        // TODO: Add Guild ID and Message to own Cache
        // TODO: Save Guild ID, Channel ID, Message ID to Database
        new messageSchema({
            guildId: guild.id,
            channelId: message.id
        })
            .save()
            .catch(() => {
                message.reply('failed to save to database')
                    .then((message) => {
                        message.delete({
                            timeout: 1000 * 10
                        })
                    })
            })
        const channel = '845887531446960129';
        const role1 = message.guild.roles.cache.find(role => role.name === "Role1");
        const role2 = message.guild.roles.cache.find(role => role.name === "Role2");
        const role1Emoji = ':clap:';
        const role2Emoji = ':smile:';
        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Games In A Snap')
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Welcome to the Games in a Snap Discord Server!')
            .setThumbnail('https://polyphony.me/scherzo/wSTFkRM')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        let messageEmbed = await message.channel.send(embed);
        // messageEmbed.react(role1Emoji);
        // messageEmbed.react(role2Emoji);

        // discord.on('messageReactionAdd', async (reaction, ser) => {
        //     if (reaction.message.partial) await reaction.message.fetch();
        //     if (reaction.partial) await reaction.fetch();
        //     if (user.bot) return;
        //     if (!reaction.message.guild) return;
        //     if (reaction.message.channel.id == channel) {
        //         if (reaction.emoji.name === role1Emoji) {
        //             await reaction.message.guild.members.cache.get(user.id).roles.add(role1);
        //         }
        //         if (reaction.emoji.name === role2Emoji) {
        //             await reaction.message.guild.members.cache.get(user.id).roles.add(role2);
        //         }
        //     } else {
        //         return;
        //     }

        // })

        // discord.on('messageReactionRemove', async (reaction, ser) => {
        //     if (reaction.message.partial) await reaction.message.fetch();
        //     if (reaction.partial) await reaction.fetch();
        //     if (user.bot) return;
        //     if (!reaction.message.guild) return;
        //     if (reaction.message.channel.id == channel) {
        //         if (reaction.emoji.name === role1Emoji) {
        //             await reaction.message.guild.members.cache.get(user.id).roles.remove(role1);
        //         }
        //         if (reaction.emoji.name === role2Emoji) {
        //             await reaction.message.guild.members.cache.get(user.id).roles.remove(role2);
        //         }
        //     } else {
        //         return;
        //     }

        // })
    }
}