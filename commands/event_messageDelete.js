const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'event_messageDelete',
    execute(message){
        const embed = new RichEmbed()
        .setTitle('Message deleted')
        .setColor(0xFF0000)
        .setTimestamp(message.createdAt)
        .setDescription(message.content + `\n At channel <#${message.channel.id}> \n By user <@${message.member.id}>`)
        message.channel.sendEmbed(embed);
    }
}