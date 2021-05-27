const command = require('../../command.js')
module.exports = {
    commands: ['derp'],
    // description: 'Derp!',
    callback: (message, arguments, text) => {
        message.channel.send('Derp.');
    }
};