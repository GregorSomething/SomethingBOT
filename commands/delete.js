

module.exports = {
    name: 'delete',
    alias: ['del', 'kustuta'],
    perms: [],
    async execute(message, args, config, bot, sys) {
        if (args[1].toString().toLowerCase() === 'bot' && (args[2] >= 1 && args[2] <= 150)) {
            console.log(args[1])


        } else if (args[1].toString().toLowerCase() === 'bot') message.channel.send(this.et.notValidNumber).then(msg => msg.delete({ timeout: 10000 }))
        if (message.mentions.members.first() && (args[2] >= 1 && args[2] <= 150)) {
            


        } if (message.mentions.members.first()) message.channel.send(this.et.notValidNumber).then(msg => msg.delete({ timeout: 10000 }))
        if (args[1] >= 1 && args[1] <= 150) {
            
            await message.channel.bulkDelete(parseInt(args[1]), true).catch(console.error) // Tekib viga
            message.channel.send(this.et.replyBulk.replace("%n%", args[1]).replace("%user%", message.member.toString()))
            

        } else message.channel.send(this.et.notValidNumber).then(msg => msg.delete({ timeout: 10000 }))




        message.delete({ timeout: 1000 })
        return true;
    },
    et: {
        "noPerms": "See on hea idee",
        "replyBulk": "**Kustudasin %n% s6numit**\n%user% soovil",
        "replyUser": "See on hea idee",
        "replyBot": "See on hea idee",
        "notValidNumber": "Argumendi number peab olema vahemikus 1- 150"
    },
    en: {
        "noPerms": "See on hea idee",
        "replyBulk": "Ei, ära isegi mõtle",
        "replyUser": "See on hea idee",
        "replyBot": "See on hea idee",
        "notValidNumber": "Arguments 2 number has to be between 1- 150"
    },
    help: {
        et: {
            usage: "a",
            description: "a",
            nameTranslate: "a"
        },
        en: {
            usage: "a",
            description: "a",
            nameTranslate: "a"
        }
    }
} 
