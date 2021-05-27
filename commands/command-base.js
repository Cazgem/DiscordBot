const prefix = '=';

const validatePermissions = (permissions) => {
    const validPermissions = [

    ]
    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permisison node "${permission}"`)
        }
    }
}
module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You Do Not Have Permission to Run This Command!',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    //enforce array
    if (typeof commands === 'string') {
        commands = [commands]
    }
    console.log(`Registering Command "${commands[0]}"`)
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
    }
    client.on('message', message => {
        const { member, content, guild } = message

        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        return
                    }
                }
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.replt(`You must have the "${requiredRole}" tole to use this command.`)
                        return
                    }
                }
                const arguments = content.split(/[ ]+/)

                arguments.shift()

                if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                    message.reply(`Incorrect Syntax! Use ${prefix}${alias} ${expectedArgs}`)
                    return
                }
                callback(message, arguments, arguments.join(' '))

                return
            }
        }

    })
}