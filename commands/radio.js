const fs = require('fs')
var connection;
let brodcast = false
setTimeout(() => {
    const main = require('../index.js');
    brodcast = main.bot.voice.createBroadcast()
    brodcast.play("http://striiming.trio.ee:8008/myhits_high.mp3")
}, 5000)
let connections = []
module.exports = {
    name: 'radio',
    alias: ['raadio'],
    perms: [],
    async execute(message, args, config, bot, sys) {
        if(!brodcast) return;
        if (args[1] == 'join' || args[1] == 'liitu'){
            if (!message.member.voice.channel) return;
            message.member.voice.channel.join().then(con => {
                con.play(brodcast)
                connections[message.guild.id] = con
                message.delete({ timeout: config.delTimeCmd })
                message.react("✅")
                return
            })
            return
        } if (args[1] == 'leave' || args[1] == 'lahku') {
            if (!message.member.voice.channel) return;
            if (connections[message.guild.id]){
                connections[message.guild.id].disconnect()
                connections[message.guild.id] = false
                message.delete({ timeout: config.delTimeCmd })
                message.react("✅")
                return
            }
            return
        }
        message.channel.send(bot.commands.find(cmd => cmd.name == 'help').getHelp(config.data[message.guild.id].lang, this, this.noArg[config.data[message.guild.id].lang])).then(msg => msg.delete({ timeout: config.delTime}))
    },
    noArg: {
        et: "Argument puudub",
        en: "Missing argument"
    },
    help: {
        et: {
            usage: "%prefix%radio [liitu | lahku]",
            description: "MyHits raadio et kuulata muusikat",
            nameTranslate: "raadio"
        },
        en: {
            usage: "%prefix%radio [join | leave]",
            description: "MyHits radio Estonia, for music",
            nameTranslate: "radio"
        }
    }
}