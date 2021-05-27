const ownerId = '83055939267067904'
const channelId = '847341643027709992'

module.exports = discord = {
    commands: 'eval',
    description: 'Evaluate Command as JS Script.',
    permissions: 'ADMINISTRATOR',
    execute(message, args) {
        const { member, channel, content } = message
        if (member.id === ownerId && channel.id === channelId) {

            // Split Message Out
            let split = content.split(' ')
            if (split.length < 2) {
                channel.send('Please Provide a Message')
                return
            }
            split.shift()
            text = split.join(' ')
            console.log(text)
            const result = eval(
                text
            )
            channel.send(result)
        }
    }

}