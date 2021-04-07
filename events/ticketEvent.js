const main = require('../index.js')
const sys = main.sys
const bot = main.bot
const config = main.conf
const { MessageEmbed } = require("discord.js");
setTimeout(() => {
    sys.emit('ping', 'Ticketing event at events/ticketEvent.js')
}, 5000)
// Ticket events siia

sys.on('ticketEvent', data => {
    if (!config.data[data.guild.id].ticket) return data.channel.send("**Error** Ticket system is not been set up.")
    const guild_conf = config.data[data.guild.id].ticket
    const parent = bot.channels.resolve(guild_conf.category)
    const admin_channel = bot.channels.resolve(guild_conf.admin)
    let embed = new MessageEmbed()
    switch (data.type) {
        case 'new':
            embed.setTitle("New ticket")
            embed.setColor("#B1FC57")

            data.guild.channels.create(`${guild_conf.last_id}-${formatName(data.user.username)}-ticket`, {
                permissionOverwrites: parent.permissionOverwrites,
                type: 'text',
                parent: parent
            }).then(new_channel => {
                new_channel.updateOverwrite(data.user, {
                    "SEND_MESSAGES": true,
                    "VIEW_CHANNEL": true
                })
                new_channel.updateOverwrite(data.guild.roles.everyone, {
                    "VIEW_CHANNEL": false
                })
                embed.setDescription(`${data.user.toString()} opend a new ticket\n**Reason:** ${data.message}\nChannel: ${new_channel.toString()}`)
                new_channel.send(embed)
                admin_channel.send(embed)
                data.channel.send("Ticket was created")
            })
            
            config.data[data.guild.id].ticket.last_id = config.data[data.guild.id].ticket.last_id + 1
            sys.emit('confUpdate')
        return;
        case 'add':
            if (!data.channel.parent) return data.channel.send("**Wrong channel!**")
            if (!(data.channel.parent.id == parent.id && data.channel.id != admin_channel.id)) return data.channel.send("**Wrong channel!**")
            if (!data.channel.name.endsWith("-ticket")) return data.channel.send("**Wrong channel!**")
            embed.setTitle("User was added")
            embed.setColor("ORANGE")
            embed.setDescription(`${data.user.toString()} added user ${data.target_user.toString()}\n**To ticket:** ${data.channel.toString()}`)
            
            data.channel.updateOverwrite(data.target_user, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true
            })
            admin_channel.send(embed)
            data.channel.send(embed)
        return;
        case 'close':

        return;
    }
})

function formatName(name) {
    if (name.lenght > 10) return name.substring(0, 10)
    else return name
}


// Mooduli nimi
module.exports = {
    name: 'ticket',
}
/*
[
                    {
                        id: data.user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: data.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    }
                ],
                */