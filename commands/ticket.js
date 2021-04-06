/* WIP */
module.exports = {
    name: 'ticket',
    alias: ['pilet', 'complaint', 'kaebus'],
    perms: [],
    async execute(message, args, config, bot, sys) {
        switch (args[1].toLowerCase()) {
            case 'setup':
                config.data[message.guild.id].ticket = {}
                message.guild.channels.create("Tickets", { type: 'category'}).then(channel => {
                    config.data[message.guild.id].ticket.category = channel.id
                    message.guild.channels.create("info-mod-only", { 
                            parent: channel, 
                            permissionOverwrites: [
                            {
                                id: message.guild.roles.everyone,
                                deny: ["VIEW_CHANNEL"]
                            }
                        ], type: 'text'
                    }).then(channel2 => config.data[message.guild.id].ticket.admin = channel2.id)
                })
                message.channel.send("Done?").then(msg => msg.delete({ timeout: config.delTime }))
                sys.emit('confUpdate')

            return
            default:
                message.channel.send(bot.commands.find(cmd => cmd.name == 'help')
                .getHelp(config.data[message.guild.id].lang, this, this.subCommand[config.data[message.guild.id].lang]))
                .then(msg => msg.delete({ timeout: config.delTime }))
            return
        }
    },
    subCommand: {
        et: "Teadmata alam käsklus",
        en: "Unknown subcommand"
    },
    help: {
        et: {
            usage: "%prefix%ticket <setup>",
            description: "Seab üles pileti süsteemi",
            nameTranslate: "Pilet"
        },
        en: {
            usage: "%prefix%ticket <setup>",
            description: "Setup for ticketing sys",
            nameTranslate: "Ticket"
        }
    }
}