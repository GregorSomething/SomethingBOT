module.exports = {
    name: 'help',
    async execute(interaction, bot, sys, config) {
        let User = interaction.member.user
        let member = bot.users.cache.get(User.id);
        return bot.commands.find(cmd => cmd.name == 'help').getAllHelp(interaction.guild_id, member.tag, config, bot)
    },
    regOpts: {
        data: {
            name: "help",
            description: "Sends help embed"
        }
    }
}