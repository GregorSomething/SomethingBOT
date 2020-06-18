const {RichEmbed } = require('discord.js');
const fs = require('fs');
var hasPerms = 0;
const GregorS = 238965446026592257;
var commands = ["announce", "clear", "drive", "help", "math", "prefix", "say", "ticket", "userinfo", "define"]; // Useble commands
module.exports = {
    name: 'help',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs){
        const helpEmbed = new RichEmbed();
        helpEmbed.setTitle(useLang.help.cname)
        .setColor(0xFF0000)
        .setAuthor(useLang.help.version + version)
        .setFooter(useLang.help.vain);
        //Perms in my system
        hasPerms = 0;
        if(message.member.hasPermission("ADMINISTRATOR", explicit = true)) hasPerms = 8;

        if(message.member.id == GregorS) hasPerms = 9;
        //end of it
        for(i=0; i < commands.length; i++) {
            if(useLang[commands[i]].permNr <= hasPerms) {
                helpEmbed.addField(useLang[commands[i]].name.toUpperCase(), `**${useLang.words.description}:** ${useLang[commands[i]].description}\n**${useLang.words.use}:** ${usePrefix}${useLang[commands[i]].use}\n**${useLang.words.perms}:** ${useLang[commands[i]].perms}`)
            }
        }
        message.channel.sendEmbed(helpEmbed).then(msg => { msg.delete(120000)});
       message.delete();
    }
}