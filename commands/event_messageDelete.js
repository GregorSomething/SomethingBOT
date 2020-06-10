const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'event_messageDelete',
    execute(message, usePrefix){
        //bug Ajad on kaootiliselt valed

        //if ((message.author.bot || message.content.substring(0, usePrefix.length) == usePrefix) && message._edits.length == 0) return;
        let content = `**MESSAGE DELETED**\n**Message content**:  ` + message.content + `\n**At channel** <#${message.channel.id}> \n**By user** <@${message.member.id}>\n**Created at** ${dateFormat(message.createdAt)}`;
        if (message._edits.length != 0) {
            message._edits.forEach(edit => {
                content = content + `\n**Edits: **` + edit.content;
            });
            content = content + `\nLast edit at ${dateFormat(message.editedAt)}`
        }
        message.channel.send(content);
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