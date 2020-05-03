const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'ticket',
    execute(message, args, bot){
        switch(args[1]){
            case 'new':
                if(!message.guild.roles.find(role => role.name === "Ticeter")){
                    message.channel.send('Please do a role with a exsaxt name of Ticeter')
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
                let time = new Date();
                channel.send('Describe your problem, to add others to here do <prefix>ticket add <UserId (right click on that person and select copy ID)>')
                channel.setTopic(`${message.member.displayName} ${IntTwoChars(time.getHours())}:${IntTwoChars(time.getMinutes())}   ${IntTwoChars(time.getDate())}/${IntTwoChars(time.getMonth() + 1)}/${IntTwoChars(time.getFullYear())}`);
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
                    bot.users.get(creatorID).send(`Your ticet on ${message.guild.name} was closed by ${message.member.displayName}, contact admins if it wasent ready for closeing.`)
                    message.channel.delete();
                }
                else message.reply('You dont have teh perms or right channel');
            break;
        }
       
       message.delete();
    }
}
function IntTwoChars(i) {
    return (`0${i}`).slice(-2);
    }
