const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
let saada = [];

const { GoogleSpreadsheet } = require('google-spreadsheet');
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('12yRwnWMvRh3__GBBcoKrQvTgsibJHQv07cklFbDzuy8');
// Gets data from Google Sheets
var leht = 0;
module.exports = {
    name: 'drive',
    execute(message, args, bot){
    async function getInfoFromGSheets(leht, message, koht, bot){
        await doc.useServiceAccountAuth(require('./securiti_key.json'));
        await doc.loadInfo();
        //defineerib lehe
        const sheet = doc.sheetsByIndex[leht];
        const rows = await sheet.getRows({
            offset: 0
        });
        bot.channels.get(koht.id).sendMessage(`**### Reading sheet nr ${leht} ###**`).then(msg => { msg.delete(600000)});
        rows.forEach(row => {
            //Muuda sadetavad ara
            switch (leht){
                case '0':
                    bot.channels.get(koht.id).sendMessage(`User ID: ${row.User_Id}, Did: ${row.Do_What}, Object: ${row.Item}, Value: ${row.Value}`).then(msg => { msg.delete(600000)});
                break;
                case '1':
                    bot.channels.get(koht.id).sendMessage(`User Name: ${row.Name}, Time and Date: ${row.Time} ${row.Date}, Went: ${row.Went}`).then(msg => { msg.delete(600000)});
                break;
            }
        });
        bot.channels.get(koht.id).sendMessage(`**### Orderd by ${message.member.displayName} ###**`).then(msg => { msg.delete(600000)});
    }



    async function sendRowToGSheets(rida, leht, message, koht, bot){
        await doc.useServiceAccountAuth(require('./securiti_key.json'));
        await doc.loadInfo();
        //defineerib lehe
        const sheet = doc.sheetsByIndex[leht];
        await sheet.addRow(rida);
        bot.channels.get(koht.id).send(`**Sent:** ${rida} || by ${message.member.displayName}`).then(msg => { msg.delete(600000)});
    }



function IntTwoChars(i) {
    return (`0${i}`).slice(-2);
    }



    const kanal = message.guild.channels.find(channel => channel.name === "sheets");
        switch(args[1]){
            case 'read':
                if (!kanal) return message.channel.send(`Do [prefix]drive join , it will create needed channels.`);
                if(!args[2]) return message.channel.sendMessage('Missing sheet nr first is 0');
                getInfoFromGSheets(args[2], message, kanal, bot);
                message.delete();
            break;
            case 'mSend':
                if(!args[2]) return message.channel.sendMessage('Missing sheet nr first is 0');
                saada = message.content.substring(PREFIX.length + args[0].length + args[1].length + args[2].length + 3).split(" ");
                sendRowToGSheets(saada, args[2], message, kanal, bot);
                message.delete();
            break;
            case 'work':
                let time = new Date();
                saada = [message.member.id, message.member.displayName, `${IntTwoChars(time.getHours())}:${IntTwoChars(time.getMinutes())}`, `${IntTwoChars(time.getDate())}/${IntTwoChars(time.getMonth() + 1)}/${IntTwoChars(time.getFullYear())}`, args[1]];
                sendRowToGSheets(saada, 1, message, kanal, bot);
                message.delete();
            break;
            
            case 'join':
                message.guild.createChannel('sheets', { type: 'text' });
                message.delete();
            break;
        }
    }
}