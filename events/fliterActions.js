const { MessageEmbed } = require('discord.js')
const main = require('../index.js')
const sys = main.sys
setTimeout(() => {
    sys.emit('ping', 'msgContainsReturn event at events/filterActions.js')
}, 5000)
sys.on('msgContainsReturn', (contains, message) => {
    message.delete()
    embed = new MessageEmbed()
    
})