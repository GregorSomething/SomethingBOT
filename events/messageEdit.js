const main = require('../index.js')
const sys = main.sys
const bot = main.bot

setTimeout(() => {
    sys.emit('ping', 'messageUpdate event at events/messageEdit.js')
}, 5000)

bot.on("messageUpdate", async (oldMessage, message ) => {
    if (message.author.bot || message.content.startsWith(main.conf.data[message.guild.id].prefix)) return
    if (main.conf.data[message.guild.id]) {
        if (main.conf.data[message.guild.id].editLog === undefined || main.conf.data[message.guild.id].editLog === null) return
    } else return
    if ((message.author.bot || message.content.substring(0, main.conf.data[message.guild.id].prefix.length) == main.conf.data[message.guild.id].prefix) && message._edits.length == 0) return;
    let content = `**MESSAGE EDITED**\n**Message content**:  ` + message.content + `\n**In channel** <#${message.channel.id}> \n**By user** <@${message.member.id}>\n**Created at** ${dateFormat(message.createdAt)}`;
    content = content + `\n**Previously: **` + oldMessage.content;
    bot.channels.fetch(main.conf.data[message.guild.id].editLog).then(channel => {
        channel.send(content)
    })
})

module.exports = {
    name: 'delete',
}

// Aja saamise functsioon
function dateFormat(date) {
    var d = new Date(date);
    if (date === undefined || date === null) d = new Date();
    var dformat = [
        (`0${d.getMonth()+1}`).slice(-2),
        (`0${d.getDate()}`).slice(-2),
        d.getFullYear()].join('/')+' '+
       [(`0${d.getHours()}`).slice(-2),
        (`0${d.getMinutes()}`).slice(-2),
        (`0${d.getSeconds()}`).slice(-2)].join(':');
    return dformat;
}
