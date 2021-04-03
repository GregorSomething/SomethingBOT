const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'help',
    alias: ['abi', 'commands'],
    perms: [],
    async execute(message, args, config, bot, sys) {
        const lang = config.data[message.guild.id].lang
        const embed = new MessageEmbed();
        embed.setColor("GREEN");
        embed.setTitle(this.help[lang].nameTranslate);
        embed.setFooter(this.orderd[lang].replace("%user%", message.author.tag))
        bot.commands.array().forEach(command => {
            embed.addField(command.help[lang].nameTranslate.toUpperCase(), `**${this.nameS[lang]}:** ${command.name} | ${command.alias}\n**${this.description[lang]}:** ${command.help[lang].description}\n**${this.usage[lang]}:** ${command.help[lang].usage.replace("%prefix%", config.data[message.guild.id].prefix)}\n**${this.permsS[lang]}:** ${remUndefined(command.prems, "NONE")}`)
        })

        message.channel.send(embed).then(msg => msg.delete({ timeout: config.delTime*10 }))
        message.delete({ timeout: config.delTimeCmd })
    },
    getHelp(lang, command, err) {
        const embed = new MessageEmbed();
        embed.setColor("ORANGE");
        embed.setTitle(this.help[lang].nameTranslate);
        embed.setFooter(this.orderd[lang].replace("%user%", "System"))
        embed.addField(command.help[lang].nameTranslate.toUpperCase(), `**${this.nameS[lang]}:** ${command.name} | ${command.alias}\n**${this.description[lang]}:** ${command.help[lang].description}\n**${this.usage[lang]}:** ${command.help[lang].usage}\n**${this.permsS[lang]}:** ${remUndefined(command.prems, "NONE")}`)
        embed.addField(this.cmdFail[lang].toUpperCase(), err)
        return embed
    },
    getAllHelp(guild_id, author, config, bot) {
        const lang = config.data[guild_id].lang
        const embed = new MessageEmbed();
        embed.setColor("GREEN");
        embed.setTitle(this.help[lang].nameTranslate);
        embed.setFooter(this.orderd[lang].replace("%user%", author))
        bot.commands.array().forEach(command => {
            embed.addField(command.help[lang].nameTranslate.toUpperCase(), `**${this.nameS[lang]}:** ${command.name} | ${command.alias}\n**${this.description[lang]}:** ${command.help[lang].description}\n**${this.usage[lang]}:** ${command.help[lang].usage.replace("%prefix%", config.data[guild_id].prefix)}\n**${this.permsS[lang]}:** ${remUndefined(command.prems, "NONE")}`)
        })
        return embed
    },
    orderd: {
        et: "%user%i soovil",
        en: "%user% requested"
    },
    nameS: {
        et: "Nimi ja aliased",
        en: "Name and aliases"
    },
    description: {
        et: "Kirjeldus",
        en: "Description"
    },
    usage: {
        et: "Kasutus",
        en: "Usage"
    },
    permsS: {
        et: "Premmissionid",
        en: "Premissions"
    },
    help: {
        et: {
            usage: "%prefix%help",
            description: "Annab käskluste abi",
            nameTranslate: "Abi"
        },
        en: {
            usage: "%prefix%help",
            description: "Gives this embed",
            nameTranslate: "Help"
        }
    },
    cmdFail: {
        et: "Käsu sisestus viga",
        en: "Commad input failiur",
    }
}
function remUndefined(from, relpace) {
    if (from == undefined || from == null) {
        return relpace
    } else return from
}