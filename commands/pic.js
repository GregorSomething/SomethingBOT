const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'pic',
    alias: ['pilt', 'picture'],
    perms: [],
    async execute(message, args, config, bot) {
        let Embed = new MessageEmbed();
        if (!message.mentions.users.first()) {
            Embed.setTitle(message.author.tag + this.message[config.data[message.guild.id].lang]);
            Embed.setImage(message.author.displayAvatarURL());
            Embed.setFooter(`${message.author.tag}`);
            message.channel.send(Embed);
        } else {
            let User = message.mentions.members.first();
            let member = bot.users.cache.get(User.id);
            Embed.setTitle(member.tag + this.message[config.data[message.guild.id].lang]);
            Embed.setImage(member.displayAvatarURL());
            Embed.setFooter(`${message.author.tag}`);
            message.channel.send(Embed);
        }
        message.delete({ timeout: config.delTimeCmd })
    },
    message: {
        et: " avatat!",
        en: "'s avatar!"
    },
    help: {
        et: {
            usage: "%prefix%pic <kasutaja>",
            description: "Annab kasutaja avatari",
            nameTranslate: "Pilt"
        },
        en: {
            usage: "%prefix%pic <member>",
            description: "Gives members avatar",
            nameTranslate: "Picture"
        }
    }
}