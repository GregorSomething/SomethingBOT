// TODO: Msg del ja save ja keel
module.exports = {
    name: 'log',
    alias: ['logi', 'logs'],
    perms: ["admin"],
    async execute(message, args, config, bot, sys) {
        if (config.data[message.guild.id] === undefined) {
            config.data[message.guild.id] = {}
        }
        var lang = config.data[message.guild.id].lang
        if (args[1] === undefined){
            // To do translate
            message.reply(bot.commands.find(command => command.name.toString().toLowerCase() == "help").getHelp(lang, this, this.noArg[lang]) ).then(msg => msg.delete({ timeout: config.delTime }))
            return
        }
        switch(args[1]){
            case 'delete':
                // fix save
                config.data[message.guild.id].deleteLog = message.channel.id
                if (args[2]) {
                    config.data[message.guild.id].deleteLog = null
                    message.channel.send(this.undefine[lang].replace("%LOG%", "Delete log"))
                } else message.channel.send(this.defined[lang].replace("%LOG%", "Delete log"))
                sys.emit('confUpdate')
                message.delete({ timeout: config.delTimeCmd })
            break
            case 'edit':
                config.data[message.guild.id].editLog = message.channel.id
                if (args[2]) {
                    config.data[message.guild.id].editLog = null
                    message.channel.send(this.undefine[lang].replace("%LOG%", "Edit log"))
                } else message.channel.send(this.defined[lang].replace("%LOG%", "Edit log"))
                sys.emit('confUpdate')
                message.delete({ timeout: config.delTimeCmd })
            break
            default:
                message.reply(this.noArg[lang]).then(msg => msg.delete({ timeout: config.delTime }))
            break
        }


    },
    noArg: {
        et: "Argument puudub või on vigane.",
        en: "Argument is missing or it is wrong."
    },
    defined: {
        et: "See kanal saab nyyd %LOG%i asju",
        en: "This channel now recives %LOG%s messages"
    },
    undefine: {
        et: "See kanal enam ei saa %LOG%i asju",
        en: "This channel does not recive %LOG%s messages anymore"
    },
    help: {
        et: {
            usage: "%prefix%log <edit | delete>",
            description: "Seab logi kanalis siia kanalisse",
            nameTranslate: "Logi"
        },
        en: {
            usage: "%prefix%log <edit | delete>",
            description: "Sets log channel to here",
            nameTranslate: "Log"
        }
    }
}
