module.exports = {
    name: 'delete',
    alias: ['del', 'kustuta'],
    perms: ["mod"],
    async execute(message, args, config, bot, sys) {
        if (args[1]) if(args[1] <= 100 && args[1] > 0) {
            message.channel.bulkDelete(args[1]);
            return message.channel.send(this[config.data[message.guild.id].lang].replyBulk
                .replace("%n%", args[1]).replace("%user%", message.author.toString()))
        } else return message.channel.send(this[config.data[message.guild.id].lang].notValidNumber)

        message.delete({ timeout: 1000 })
        return true;
    },
    et: {
        "noPerms": "See on hea idee",
        "replyBulk": "**Kustutasin %n% s6numit**\n%user% soovil",
        "notValidNumber": "Argumendi number peab olema vahemikus 1- 100"
    },
    en: {
        "noPerms": "See on hea idee",
        "replyBulk": "**Deleted %n% messages**\nRequested by %user%",
        "notValidNumber": "Argument number has to be between 1- 100"
    },
    help: {
        et: {
            usage: "%prefix%delete <nr messages>",
            description: "Kustutab nr koguse sõnumeid",
            nameTranslate: "Kustuta"
        },
        en: {
            usage: "%prefix%delete <nr messages>",
            description: "Deletes nr amoount of messages",
            nameTranslate: "Delete"
        }
    }
} 
