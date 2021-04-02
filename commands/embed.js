module.exports = {
    name: 'embed',
    alias: ['nice', 'textembed'],
    perms: ["TEST"],
    async execute(message, args, config, bot, sys) {
        message.reply(`Pong, **Debug Message**: ${this.test.et}`);
    },
    test: {
        et: "Jees",
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