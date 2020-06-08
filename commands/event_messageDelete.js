const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'event_messageDelete',
    execute(message, usePrefix){
        //bug Ajad on kaootiliselt valed

        if ((message.author.bot || message.content.substring(0, usePrefix.length) == usePrefix) && message._edits.length == 0) return;
        const embed = new RichEmbed()
        embed.setColor(0xFF0000);
        let content = `**Message content**:  ` + message.content + `\n At channel <#${message.channel.id}> \n By user <@${message.member.id}>\n Created at ${dateFormat(message.createdAt)}`;
        if (message._edits.length != 0) {
            message._edits.forEach(edit => {
                content = content + `\n**Edits:  **` + edit.content;
            });
            content = content + `\n Last edit at ${dateFormat(message.editedAt)}`
        }
        embed.addField('**Message deleted**', content);
        message.channel.send(embed);
    }
}


function dateFormat(date) {
    var d = new Date(date);
    var dformat = [
        (`0${d.getMonth()+1}`).slice(-2),
        (`0${d.getDate()}`).slice(-2),
        d.getFullYear()].join('/')+' '+
       [(`0${d.getHours()}`).slice(-2),
        (`0${d.getMinutes()}`).slice(-2),
        (`0${d.getSeconds()}`).slice(-2)].join(':');
    return dformat;
}