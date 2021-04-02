module.exports = {
    name: 'define',
    alias: ['def', 'defineeri'],
    perms: [],
    async execute(message, args, config, bot, sys) {
        var lang = config.data[message.guild.id].lang
        switch(args[1]) {
            case 'prefix':
                if(!args[2]) return message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                config.data[message.guild.id].prefix = args[2]
                message.channel.send(this.newPrefix[lang] + args[2])
                message.delete({ timeout: config.delTimeCmd })
                sys.emit('confUpdate')
            break
            case 'lang':
                if(!args[2]) return message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                if (!["et", "en"].includes(args[2])) return message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                config.data[message.guild.id].lang = args[2]
                message.channel.send(this.newLang[lang] + args[2])
                message.delete({ timeout: config.delTimeCmd })
                sys.emit('confUpdate')
                break
            default:
                message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                message.delete({ timeout: config.delTimeCmd })
                break
        }

    },
    noArg: {
        et: "Argument puudub, või on vigane, vaata abi",
        en: "Missing argument or its worng, check help"
    },
    newPrefix: {
        et: "Uus prefix on ",
        en: "New prefix is "
    },
    newLang: {
        et: "Uus keel on ",
        en: "New language is "
    },
    help: {
        et: {
            usage: "%prefix%define <prefix | lang> <newValue>",
            description: "s",
            nameTranslate: "s"
        },
        en: {
            usage: "%prefix%define <prefix | lang> <newValue>",
            description: "s",
            nameTranslate: "s"
        }
    }
}
