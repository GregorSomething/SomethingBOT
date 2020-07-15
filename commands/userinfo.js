const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
const bot = new Discord.Client();
var member = {}
module.exports = {
    name: "userinfo",
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs){

    if (message.mentions.members.array()[0] !== undefined) {
        let members = message.mentions.members.array();
        member = members[0].user
    }else{
        member = message.author;
    }
    let uEmbed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${member.username} Info`, member.displayAvatarURL)
    .addField("**Username:**", `${member.username}`, true)
    .addField("**Discriminator:**", `${member.discriminator}`, true)
    .addField("**ID:**", `${member.id}`, true)
    .addField("**Status:**", `${member.presence.status}`, true)
    .addField("**Created At:**", `${member.createdAt}`, true)
    .setFooter('Orderd by ' + message.member.displayName);

    message.channel.send({embed: uEmbed}).then(msg => { msg.delete(600000)});
    message.delete();
    }
}
