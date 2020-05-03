const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'say',
    execute(message, args, usePrefix, adminChat, bot, server, useAdminChat){
        const embed = new RichEmbed()
        .setTitle('Someone said anonymously')
        .setColor(0xFF0000);
        let say = message.content.substring(args[0].length + usePrefix.length + 1)
        embed.setDescription(say);
        message.channel.sendEmbed(embed);
        embed.setTitle(`${message.member.displayName} said this`)
        message.delete();
        if (useAdminChat != 0) {
            if(useAdminChat === undefined){
                return console.log('Error undefine something in somewhere');
            }
            else {
            bot.channels.get(useAdminChat).sendEmbed(embed);
            }
        }
    }
}
