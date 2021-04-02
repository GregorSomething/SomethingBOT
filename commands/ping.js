module.exports = {
    name: 'ping',
    alias: ['pong', 'veel_yks_alias_ping_commandile'],
    perms: ["TEST"],
    async execute(message, args, config, bot, sys) {
        message.reply(`Pong, **Debug Message**: ${this.test.et}`, {"reply": message.author});
    },
    test: {
        et: "<:mmLol:216154654256398347>",
        en: "Huh"
    },
    test2: {
        et: "FFFF",
        en: "GGG"
    },
    help: {
        et: {
            usage: "h",
            description: "h",
            nameTranslate: "h"
        },
        en: {
            usage: "h",
            description: "h",
            nameTranslate: "h"
        }
    }
}
