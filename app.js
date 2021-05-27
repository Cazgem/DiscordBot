const config = require('./config.js');
const Commando = require('discord.js-commando')
// const Discord = require('discord.js');
const mongo = require('./mongo');
const path = require('path')
const fs = require('fs');
const prefix = '=';
// const discord = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const chalk = require('chalk');
const welcomeSchema = require('./schemas/welcome-schema.js');
const messageCount = require('./utilities/message-counter')
const discord = new Commando.CommandoClient({
    owner: '83055939267067904',
    commandPrefix: config.prefix
})
// discord.commands = new Discord.Collection();
// discord.cooldowns = new Discord.Collection();

// const commandFolders = fs.readdirSync('./commands');
const cache = {}
// for (const folder of commandFolders) {
//     // console.log(`/${folder}`);
//     const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
//     for (const file of commandFiles) {
//         console.log(file);
//         const command = require(`./commands/${folder}/${file}`);
//         discord.commands.set(command.name, command);
//     }
// }

discord.on('ready', async () => {
    console.log(chalk.yellow('I am ready for Discord!'));
    console.log(chalk.yellow('Prefix Set as ' + prefix));
    messageCount(discord)
    console.log(chalk.yellow('Message Count Ready'))
    await mongo().then(mongoose => {
        try {
            console.log(chalk.green('Connected to MongoDB!'));
        } finally {
            mongoose.connection.close()
        }
    })
    discord.user.setPresence({
        activity: {
            name: 'Victoria 3',
            type: 0
        }
    })
    discord.registry
        .registerGroups([
            ['misc', 'micsellanious commands'],
            ['fun', 'fun commands'],
            ['moderation', 'Moderation Commands']
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'cmds'))
});
const _join = async (data, member) => {
    const { guild } = member
    const channelId = data[0]
    const text = data[1]
    const channel = guild.channels.cache.get(channelId)
    channel.send(text.replace(/<@>/g, `<@${member.id}>`))
}
const onJoin = async member => {
    const { guild } = member
    let data = cache[guild.id]

    if (!data) {
        console.log('FETCHING FROM DATABASE')
        await mongo().then(async mongoose => {
            try {
                const result = await welcomeSchema.findOne({
                    _id: guild.id
                })
                cache[guild.id] = [result.channelId, result.text]
                let data = cache[guild.id]
                _join(data, member)
            } finally {
                mongoose.connection.close()
            }
        })
    } else {
        _join(data, member)
    }
}
const BannedWords = [" fuck ", "swear1"];
discord.on('message', message => {
    if (message.channel.type === 'dm') return;
    if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) {
        message.delete().catch(e => console.error("Couldn't delete message."));
        const data = [];
        data.push('Hello!');
        data.push(`Your Recent Message:\n`);
        data.push(`${message.content}`);
        data.push(`\nWas removed for use of explicit language/terminology.`);
        return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                // message.reply('it seems like I can\'t DM you!');
            });
    };
    // if (!message.content.startsWith(prefix) || message.author.bot) return;

    // const args = message.content.slice(prefix.length).trim().split(/ +/);
    // const commandName = args.shift().toLowerCase();
    // if (commandName === 'welcome') {
    //     onJoin(message.member)
    // }
    // const command = discord.commands.get(commandName)
    //     || discord.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // if (!command) return;
    // if (command === 'reactionrole') {
    //     discord.commands.get('reactionrole').execute(message, args, Discord, client)
    // }
    // if (command.guildOnly && message.channel.type === 'dm') {
    //     return message.reply('I can\'t execute that command inside DMs!');
    // }

    // if (command.permissions) {
    //     const authorPerms = message.channel.permissionsFor(message.author);
    //     if (!authorPerms || !authorPerms.has(command.permissions)) {
    //         return message.reply('You can not do this!');
    //     }
    // }

    // if (command.args && !args.length) {
    //     let reply = `You didn't provide any arguments, ${message.author}!`;

    //     if (command.usage) {
    //         reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    //     }

    //     return message.channel.send(reply);
    // }

    // const { cooldowns } = discord;

    // if (!cooldowns.has(command.name)) {
    //     cooldowns.set(command.name, new Discord.Collection());
    // }

    // const now = Date.now();
    // const timestamps = cooldowns.get(command.name);
    // const cooldownAmount = (command.cooldown || 3) * 1000;

    // if (timestamps.has(message.author.id)) {
    //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    //     if (now < expirationTime) {
    //         const timeLeft = (expirationTime - now) / 1000;
    //         return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    //     }
    // }

    // timestamps.set(message.author.id, now);
    // setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // try {
    //     command.execute(message, args, discord);
    // } catch (error) {
    //     console.error(error);
    //     message.reply('there was an error trying to execute that command!');
    // }
});
discord.login(config.discord.token);
discord.on('guildMemberAdd', (member) => {
    onJoin(member)
});