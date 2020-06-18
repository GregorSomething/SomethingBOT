const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'announce',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs){
        var say = message.content.substring(args[0].length + usePrefix.length + 1)
        if (useAnnounceChat != 0) {
            bot.channels.get(useAnnounceChat).send(say);
        }
        else{
            message.channel.sendMessage(useLang.announce.undefined).then(msg => { msg.delete(10000)});
        }
       //Code here
       message.delete();
    }
}