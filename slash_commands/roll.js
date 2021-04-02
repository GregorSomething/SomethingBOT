module.exports = {
    name: 'roll',
    async execute(interaction, bot, sys, config) {
        args = interaction.data.options;
        if (!args) {    
            b = 100
        } else {
            b = args.find(arg => arg.name.toLowerCase() == "maxnumber").value;
        }
        let e = Math.floor(Math.random() * b) + 1;
        return `User rolled ${e}`
    },
    regOpts: {
        data: {
            name: "roll",
            description: "Roll a number",
            options: [
                {
                    name: "maxNumber",
                    description: "Maximum value what can be rolled",
                    type: 3,
                    required: false
                }
            ]
        }
    }
}


