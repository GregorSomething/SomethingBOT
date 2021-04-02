const main = require('../index.js')
const sys = main.sys
const bot = main.bot
setTimeout(() => {
    sys.emit('ping', 'Ticketing event at events/ticketEvent.js')
}, 5000)
// Ticket events siia






// Mooduli nimi
module.exports = {
    name: 'ticet',
}