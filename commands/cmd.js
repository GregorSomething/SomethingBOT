const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
var cmd = require('node-cmd');
module.exports = {
    name: 'cmd',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version){
        if(message.member.id != 238965446026592257) return;
        switch(args[1]){
            case 'startMine':
                if(server == 698431558410960997){
                    const kanal = message.guild.channels.find(channel => channel.name === "minecrafti-chat");
                    bot.channels.get(kanal.id).send(`:hourglass_flowing_sand: Serveri start anti kolmandast isikust, oodakke kuni server käivitub.`);
                }
                cmd.run('cd C:/Users/Gregor/Desktop/UusMinecraft & start.bat');
                
            break;
        }
        
        
        
        
        
        
    message.delete();
    }
}