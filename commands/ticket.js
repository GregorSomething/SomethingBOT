const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'ticket',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs){
        switch(args[1]){
            case 'new':
                if(!message.guild.roles.find(role => role.name === "Ticeter")){
                    message.channel.send(useLang.ticket.err1)
                    break;
                }
                message.guild.createChannel(`${message.member.displayName}-ticket-${message.member.id}`, { type: 'text' })
                .then(channel => {
                let category = message.guild.channels.find(c => c.name == "Tickets" && c.type == "category");
                
                if (!category){
                    message.guild.createChannel("Tickets", { type: 'category'})
                    category = message.guild.channels.find(c => c.name == "Tickets" && c.type == "category");
                }
                channel.setParent(category.id);
                channel.overwritePermissions(message.member, {
                    'VIEW_CHANNEL': true ,
                    'SEND_MESSAGES': true ,
                    'READ_MESSAGE_HISTORY': true
                });
                channel.overwritePermissions(message.guild.defaultRole, {
                    'VIEW_CHANNEL': false ,
                    'SEND_MESSAGES': false ,
                    'READ_MESSAGE_HISTORY': false
                });
                channel.overwritePermissions(message.guild.roles.find(role => role.name === "Ticeter"), {
                    'VIEW_CHANNEL': true ,
                    'SEND_MESSAGES': true ,
                    'READ_MESSAGE_HISTORY': true
                });
                channel.send(useLang.ticket.help)
                channel.setTopic(`${message.member.displayName} ${date()}`);
                }).catch(console.error);
            break;
            case 'add':
                if(message.channel.parentID == message.guild.channels.find(c => c.name == "Tickets" && c.type == "category").id){
                    message.channel.overwritePermissions(bot.users.get(args[2]), {
                        'VIEW_CHANNEL': true ,
                        'SEND_MESSAGES': true ,
                        'READ_MESSAGE_HISTORY': true
                    });
                    console.log(args[2]);
                }
            break;
            case 'close':
                if(message.channel.parentID == message.guild.channels.find(c => c.name == "Tickets" && c.type == "category").id && message.member.roles.find(r => r.name === "Ticeter")) {
                    let creatorData = message.channel.name.split("-");
                    var creatorID = creatorData[creatorData.length - 1];
                    let reason = message.content.substring(usePrefix.length + 13)
                    var textToDM = useLang.ticket.closeMessage.replace('#creator#', bot.users.get(creatorID).username)
                    .replace('#guild#', message.guild.name)
                    .replace('#ticeter#', message.member.displayName)
                    .replace('#reason#', reason)
                    .replace('#time#', date());;
                    bot.users.get(creatorID).send(textToDM)
                    message.channel.delete();
                }
                else message.reply(useLang.ticket.err2);
            break;
        }
       
       message.delete();
    }
}
function date(date) {
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
