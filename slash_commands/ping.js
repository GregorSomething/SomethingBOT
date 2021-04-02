module.exports = {
    name: 'ping',
    async execute(interaction, bot, sys, config) {
        return "Pong! :)"
    },
    regOpts: {
        data: {
            name: "ping",
            description: "Check if bot is up and running :)"
        }
    }
}
