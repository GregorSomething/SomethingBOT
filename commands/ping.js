module.exports = {
    name: 'ping',
    alias: ['pong', 'veel_yks_alias_ping_commandile'],
    perms: [],
    async execute(message, args, config, bot, sys) {
        message.reply(`Pong, **Debug Message**: ${this.test.et}`, {"reply": message.author});
    },
    test: {
        et: "ET laguage json obj",
        en: "Huh"
    },
    help: {
        et: {
            usage: "%prefix%ping",
            description: "Pong",
            nameTranslate: "Ping"
        },
        en: {
            usage: "%prefix%ping",
            description: "Pong",
            nameTranslate: "Ping"
        }
    }
}
