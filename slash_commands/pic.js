const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'pic',
    async execute(interaction, bot, sys, config) {
        let Embed = new MessageEmbed();
        if (interaction.data.options != undefined) {
            if (!interaction.data.options.find(opt => opt.name == "user")) return "Something went wrong"
            let member = bot.users.cache.get(interaction.data.options.find(opt => opt.name == "user").value);
            Embed.setTitle(member.tag + " Profile picutre");
            Embed.setImage(member.displayAvatarURL());
            return Embed;
        } else {
            let User = interaction.member.user
            let member = bot.users.cache.get(User.id);
            Embed.setTitle(member.tag + " Profile picutre");
            Embed.setImage(member.displayAvatarURL());
            return Embed;
        }
    },
    regOpts: {
        data: {
            name: "pic",
            description: "Sends user profile pic.",
            options: [
                {
                    name: "user",
                    description: "User whos picure you want to see.",
                    type: 6,
                    required: false
                }]
        }
    }
}
