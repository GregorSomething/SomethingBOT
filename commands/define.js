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
            return
            case 'lang':
                if(!args[2]) return message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                if (!["et", "en"].includes(args[2])) return message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                config.data[message.guild.id].lang = args[2]
                message.channel.send(this.newLang[lang] + args[2])
                message.delete({ timeout: config.delTimeCmd })
                sys.emit('confUpdate')
            return
            case 'perm':
                if (!args[2] && !args[3]) return message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                if (args[2].toLowerCase() == "mod" || args[2].toLowerCase() == "admin") {
                    if (args[3] == "null") {
                        config.data[message.guild.id][args[2]] = []
                        sys.emit('confUpdate')
                        message.delete({ timeout: config.delTimeCmd })
                        return
                    }
                    if (message.mentions) {
                        if (message.mentions.roles) {
                            console.log(config.data[message.guild.id][args[2]])
                            config.data[message.guild.id][args[2]].push(message.mentions.roles.first().id)
                            console.log(config.data[message.guild.id][args[2]])
                            message.channel.send(this.newPerm[config.data[message.guild.id].lang].replace("%x%", args[2]) + args[3])
                            sys.emit('confUpdate')
                        }
                    }
                } else {
                    message.delete({ timeout: config.delTimeCmd })
                    return message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                }
            return
            default:
                message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
                message.delete({ timeout: config.delTimeCmd })
            return
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
    newPerm: {
        et: "New permission for %x% is added in form of role ",
        en: "New permission for %x% is added in form of role ",
    },
    help: {
        et: {
            usage: "%prefix%define <prefix | lang | perm(+mod/admin)> <newValue>",
            description: "Defineerib botile väärtuseid.",
            nameTranslate: "Defineeri"
        },
        en: {
            usage: "%prefix%define <prefix | lang | perm(+mod/admin)> <newValue>",
            description: "Defines bot things",
            nameTranslate: "Define"
        }
    }
}
