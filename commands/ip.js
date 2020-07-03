const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
const rp = require('request-promise');
module.exports = {
    name: 'ip',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs){
       //Code here
        rp("http://gd.geobytes.com/GetCityDetails?callback=?").then(function(data){
            var dataTXT = data.substring(2, data.length-2);
            info = JSON.parse(dataTXT);
            message.channel.send(`**Ip:** ${info.geobytesipaddress}\n Backup: ${info.geobytesremoteip}\n **Accuret:** ${info.geobytescertainty}`).then(msg => { msg.delete(120)});
        });
        message.delete();
    }
}