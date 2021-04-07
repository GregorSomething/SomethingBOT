module.exports = {
    name: 'ticket',
    async execute(interaction, bot, sys, config) {
        let data = {
            type: null,
            guild: bot.guilds.resolve(interaction.guild_id),
            channel: bot.channels.resolve(interaction.channel_id),
            user: bot.users.resolve(interaction.member.user.id),
            target_user: null,
            message: null
        }
        switch(interaction.data.options[0].name) {
            case 'add':
                data.type = "add"
                data.target_user = bot.users.resolve(interaction.data.options[0].options.find(opt => opt.name == "user").value)
                sys.emit('ticketEvent', data)
            return "Prossesing"
            case 'new':
                data.type = "new"
                data.message = interaction.data.options[0].options.find(opt => opt.name == "reason").value
                sys.emit('ticketEvent', data)
            return "Prossesing"
            case 'close':
                data.type = "close"
                data.message = interaction.data.options[0].options.find(opt => opt.name == "reason").value
                sys.emit('ticketEvent', data)
            return "Prossesing"
        }
        return "Jee?"
    },
    regOpts: {
        data: {
            name: "ticket",
            description: "Ticketing command",
            options: [{
                name: "new",
                description: "Makes a new ticket",
                type: 1,
                options: [{
                    name: "reason",
                    description: "Reason for opening ticket",
                    type: 3,
                    required: true
                }]
            },{
                name: "add",
                description: "Adds person to this ticket",
                type: 1,
                options: [{
                    name: "user",
                    description: "User to add to this ticket",
                    type: 6,
                    required: true
                }]
            },{
                name: "close",
                description: "Closes ticket",
                type: 1,
                options: [{
                    name: "reason",
                    description: "Reason for this",
                    type: 3,
                    required: true
                }]
            }]
        }
    }
} // https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
//https://discord.com/developers/docs/interactions/slash-commands#example-walkthrough
