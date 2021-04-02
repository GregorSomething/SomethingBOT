const main = require('../index.js')
const sys = main.sys
const bot = main.bot
setTimeout(() => {
    sys.emit('ping', 'System Events at events/messageContains.js')
}, 5000)
let listenTo = []

// Ootab eventi msgContainsAdd ja siis lisab selle arrayse
sys.on('msgContainsAdd', async (addToList, id) => {
    if (listenTo[id] === undefined) listenTo[id] = []
    listenTo[id].push(addToList)
})

// Eemaldus event
sys.on('msgContainsRemove', async (removeFromList, id) => {
    if (listenTo[id] === undefined) return
    listenTo[id] = listenTo[id].filter(listElement => listElement != removeFromList)
})

// List return
sys.on('msgContainsList', id => {
    sys.emit('msgContainsListSend', listenTo[id])
})

// Ootab sõnumit ja vaatab kas see on kuulamis listis
bot.on('message', async message => {
    if (message.author.bot || listenTo[message.guild.id] === undefined) return
    listenTo[message.guild.id].forEach(listElement => {
        message.content.split(" ").forEach(word => {
            if(word.toUpperCase() == listElement.toUpperCase()) sys.emit('msgContainsReturn', listElement.toUpperCase(), message)
        }) 
    })
})



// Mooduli nimi
module.exports = {
    name: 'messageContains',
}