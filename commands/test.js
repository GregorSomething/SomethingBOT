const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'sample',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version){
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
          } else {
            message.reply('You need to join a voice channel first!');
          }
        message.delete();
    }
}