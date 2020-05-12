const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    name: "userinfo",
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version){
    let uEmbed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
    .addField("**Username:**", `${message.author.username}`, true)
    .addField("**Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${message.author.createdAt}`, true)
    .setFooter('Orderd by ' + message.member.displayName);

    message.channel.send({embed: uEmbed}).then(msg => { msg.delete(600000)});
    }
}
