const { Message } = require('discord.js')
const main = require('../index.js')
const sys = main.sys
module.exports = {
    name: 'chatFilter',
    alias: ['cf', 'filter'],
    perms: ["admin"],
    async execute(message, args, config, bot, sys) {
        if (args[1] == 'init') sys.emit('msgContainsAdd', args[2], message.guild.id)    
    },
    help: {
        et: {
            usage: "%prefix%chatFilter <init> <|FilerWord|>",
            description: "Chati filter systeem",
            nameTranslate: "Chati filter"
        },
        en: {
            usage: "%prefix%chatFilter <init> <|FilerWord|>",
            description: "Chat filtering system",
            nameTranslate: "Chat Filter"
        }
    }
}
