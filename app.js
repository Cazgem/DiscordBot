const config = require('./config.js');
const Discord = require('discord.js');
const mongo = require('./mongo');
const fs = require('fs');
const prefix = '=';
const discord = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const chalk = require('chalk');

discord.commands = new Discord.Collection();
discord.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    // console.log(`/${folder}`);
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        console.log(file);
        const command = require(`./commands/${folder}/${file}`);
        discord.commands.set(command.name, command);
    }
}

discord.on('ready', async () => {
    console.log(chalk.yellow('I am ready for Discord!'));
    console.log(chalk.yellow('Prefix Set as ' + prefix));
    await mongo().then(mongoose => {
        try {

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
});
const BannedWords = ["fuck", "swear1"];
discord.on('message', message => {
    if (BannedWords.some(word => message.toString().toLowerCase().includes(word))) { message.delete().catch(e => console.error("Couldn't delete message.")); message.reply(`Language!`) };
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = discord.commands.get(commandName)
        || discord.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (command === 'reactionrole') {
        discord.commands.get('reactionrole').execute(message, args, Discord, client)
    }
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    const { cooldowns } = discord;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, discord);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});
discord.login(config.discord.token);
discord.on('guildMemberAdd', (member) => {
    // code..
});