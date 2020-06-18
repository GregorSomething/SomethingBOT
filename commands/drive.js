const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
let saada = [];

const { GoogleSpreadsheet } = require('google-spreadsheet');
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('12yRwnWMvRh3__GBBcoKrQvTgsibJHQv07cklFbDzuy8');
// Gets data from Google Sheets
var leht = 0;
var loetud = '';
module.exports = {
    name: 'drive',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs){
    async function getInfoFromGSheets(leht, message, koht, bot){
        await doc.useServiceAccountAuth(require('./securiti_key.json'));
        await doc.loadInfo();
        //defineerib lehe
        let sheet = doc.sheetsByIndex[leht];
        let rows = await sheet.getRows({
            offset: 0
        });
        loetud = `**### Reading sheet nr ${leht} ###**\n`;
        loetud = loetud + `**THINGS:** ${sheet.headerValues} \n`
        rows.forEach(row => {
            //Muuda sadetavad ara
            if (loetud.length >= 1750){
                bot.channels.get(koht.id).send(loetud).then(msg => { msg.delete(600000)});
                loetud = '';
            }
            for(i = 0; i <=sheet.headerValues.length -1; i++){
                loetud = loetud + `${remUndefined(row[sheet.headerValues[i]], '-n-')}; `;
            }
            loetud = loetud + `${remUndefined(row[sheet.headerValues[sheet.headerValues.length-2]], '-n-')};\n`;
        });
        bot.channels.get(koht.id).send(loetud).then(msg => { msg.delete(600000)});
        bot.channels.get(koht.id).send(`**### Orderd by ${message.member.displayName} ###**`).then(msg => { msg.delete(600000)});
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
function remUndefined(i, j) {
    if (i === undefined){
        return j;
    }
    else {
        return i;
    }
}



    const kanal = message.guild.channels.find(channel => channel.name === "sheets");
    if(message.member.id != 238965446026592257) return;
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