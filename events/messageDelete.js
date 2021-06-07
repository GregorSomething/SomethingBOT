const main = require('../index.js')
const sys = main.sys
const bot = main.bot


setTimeout(() => {
    sys.emit('ping', 'messageDelete event at events/messageDelete.js')
}, 5000)

// Kuulab kustutamise eventi
bot.on("messageDelete", async message => {
    // Saime kustutatud s6numi

    // Kui s6num on bgoti oma v6i on algav prefixiga
    if (message.author.bot === true) return; // BUg not working this line
    if (message.content.startsWith(main.conf.data[message.guild.id].prefix) === true) return;

    // Vaatame kas see log on defineeritud
    if (main.conf.data[message.guild.id]) {
        if (main.conf.data[message.guild.id].deleteLog === undefined || main.conf.data[message.guild.id].deleteLog === null) return;
    } else return;

    // S6numi tootlus
    let content = `**MESSAGE DELETED**\n**Message content**: ` + message.content 
    + `\n**In channel** <#${message.channel.id}> \n**By user** <@${message.member.id}>\n**Created at** ${dateFormat(message.createdAt)}`;
    if (message._edits.length != 0) {
        message._edits.forEach(edit => {
            content = content + `\n**Edits: **` + edit.content;
        });
        content = content + `\nLast edit at ${dateFormat(message.editedAt)}`
    }
    bot.channels.fetch(main.conf.data[message.guild.id].deleteLog).then(channel => {
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