const main = require('../index.js')
const sys = main.sys
const bot = main.bot
const config = main.conf
setTimeout(() => {
    sys.emit('ping', 'Ticketing event at events/ticketEvent.js')
}, 5000)
// Ticket events siia

sys.on('ticketCreate', data => {
    
})




// Mooduli nimi
module.exports = {
    name: 'ticket',
}