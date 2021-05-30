const mongo = require('../../mongo.js');
const welcomeSchema = require('../../schemas/welcome-schema')
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setwelcome',
            group: 'admin',
            memberName: 'setwelcome',
            description: 'Write Welcome Message.',
            argsType: 'multiple',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
        })
    }

    async run(message, args) {
        const cache = {}

        const { member, channel, content, guild } = message

        // Split Message Out
        let split = content.split(' ')
        if (split.length < 2) {
            channel.send('Please Provide a Welcome Message')
            return
        }
        split.shift()
        text = split.join(' ')
        console.log(text)
        cache[guild.id] = [channel.id, text]
        await mongo().then(async (mongoose) => {
            try {
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id,
                }, {
                    _id: guild.id,
                    channelId: channel.id,
                    text,
                }, {
                    upsert: true
                })
                cache[guild.id] = [channel.id, text]
            } finally {
                mongoose.connection.close()
            }
        })
        message.delete()
    }
};