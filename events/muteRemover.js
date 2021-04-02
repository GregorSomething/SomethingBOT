const main = require('../index.js')
const sys = main.sys
const bot = main.bot


setTimeout(() => {
    sys.emit('ping', 'muteRemoverCheck event at events/muteRemover.js')
    sys.emit('muteRemoveCheck');
}, 5000)


sys.on('muteRemoveCheck', async () => {
    
    /* TEADMATA JA TUVASTAMATU PROBLEEM SQLIS */
    
})


// Mooduli nimi
module.exports = {
    name: 'muteRemover',
}