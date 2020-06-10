const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'test',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version){
        content = message.content.replace(/:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>/g, '`:)`');
        message.channel.send(content);
        message.delete();
    }
}