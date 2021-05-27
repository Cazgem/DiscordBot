module.exports = {
    commands: ['add', 'additiopn'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'You Need Admin Permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {

    },
    permissions: [''],
    requiredRoles: [''],
}