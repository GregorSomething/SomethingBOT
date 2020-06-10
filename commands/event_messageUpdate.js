const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'event_messageUpdate',
    execute(oldMessage, newMessage){
        var content = `**MESSAGE EDITED**\n**New Content: **${newMessage.content}\n**Edited at** ${dateFormat(newMessage.editedAt)}\n**Old content:** ${oldMessage.content}\n**Created at (or edited)** ${dateFormat(remUndefined(oldMessage.editedTimestamp, oldMessage.createdAt))}\n**Author: **<@${newMessage.member.id}>\nhttps://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}`
        newMessage.channel.send(content);
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
function remUndefined(isUndefined, replace) {
    if (isUndefined === undefined || isUndefined === null){
        return replace;
    }
    else {
        return isUndefined;
    }
}