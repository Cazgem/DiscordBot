module.exports = {
    name: 'website',
    description: 'Website Link',
    aliases: ['web', 'www'],
    execute(message, args) {
        message.channel.send('https://gamesinasnap.com');
    },
};