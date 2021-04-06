module.exports = {
    name: 'ticket',
    async execute(interaction, bot, sys, config) {
        let data = {
            type: "",
            guild: "",
            channel: "",
            user: "",
            target_user: null,
            message: null
        }
        return data
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
                    name: "bool",
                    description: "Are you sure?",
                    type: 5,
                    required: true
                }]
            }]
        }
    }
} // https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
//https://discord.com/developers/docs/interactions/slash-commands#example-walkthrough
