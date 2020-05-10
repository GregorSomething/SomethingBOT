const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'say',
    execute(message, args, usePrefix, adminChat, bot, server, useAdminChat, useLang){
        const embed = new RichEmbed()
        .setTitle(useLang.say.said)
        .setColor(0xFF0000);
        let say = message.content.substring(args[0].length + usePrefix.length + 1)
        embed.setDescription(say);
        message.channel.sendEmbed(embed);
        embed.setTitle(`${message.member.displayName} ${useLang.say.saidA}`)
        message.delete();
        if (useAdminChat != 0) {
            if(useAdminChat === undefined){
                return console.log(useLang.words.unErr);
            }
            else {
            bot.channels.get(useAdminChat).sendEmbed(embed);
            }
        }
    }
}
