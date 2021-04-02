module.exports = {
    name: 'ticket',
    alias: ['pilet', 'complaint', 'kaebus'],
    perms: [],
    async execute(message, args, config, bot, sys) {
        switch (args[1].toLowerCase()) {
            case 'setup':
                if(args[2] && args[3]) {
                    
                }
            break
            default:
                bot.commands.find(cmd => cmd.name == 'help').getHelp(config.data[message.guild.id].lang, this, this.subCommand[config.data[message.guild.id].lang])
            break
        }
   
   
   
   
   
    },
    subCommand: {
        et: "Teadmata alam käsklus",
        en: "Unknown subcommand"
    },
    test2: {
        et: "FFFF",
        en: "GGG"
    },
    help: {
        et: {
            usage: "h",
            description: "h",
            nameTranslate: "h"
        },
        en: {
            usage: "h",
            description: "h",
            nameTranslate: "h"
        }
    }
}