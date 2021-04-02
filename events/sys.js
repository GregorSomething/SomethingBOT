// Loeme sisse indexi mooduli
const main = require('../index.js')
// loeme mooodulist systeemi
const sys = main.sys
// loeme moodulist boti
const bot = main.bot
// Ootame 5 sec ja siis informeerime boti event mooduli etukat starti
setTimeout(() => {
    sys.emit('ping', 'System Events at events/sys.js')
}, 5000)
// Sys events siia






// Mooduli nimi
module.exports = {
    name: 'sys',
}