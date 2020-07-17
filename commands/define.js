const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'define',
    execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs){
        let guildsData = JSON.parse(fs.readFileSync('guildsData.json'));
        if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions.').then(msg => { msg.delete(10000)});
        if(!args[1]) return message.channel.sendMessage('Missing argument').then(msg => { msg.delete(10000)});
        if(guildsData[server] === undefined) guildsData[`${server}`] = {"logs":{}};
        switch (args[1]){
            case 'adminChat':
                guildsData[server].adminChat = message.channel.id
                message.delete();
                message.channel.sendMessage('This is now where i put admin stuff').then(msg => { msg.delete(30000)});
                fs.writeFile('guildsData.json', JSON.stringify(guildsData), 'utf8', function() {} );
            break;
            case 'announceChat':
                guildsData[server].announceChat = message.channel.id
                message.delete();
                message.channel.sendMessage('This is now where i put announcments').then(msg => { msg.delete(30000)});
                fs.writeFile('guildsData.json', JSON.stringify(guildsData), 'utf8', function() {} );
            break;
            case 'lang':
                if(args[2] == "en" || args[2] == "et"){
                    guildsData[server].lang = args[2];
                    message.delete();
                    message.channel.sendMessage('Language has been changed to this command with your intended language.').then(msg => { msg.delete(30000)})
                    fs.writeFile('guildsData.json', JSON.stringify(guildsData), 'utf8', function() {} );
                }
                else {
                    message.channel.sendMessage('Language code wrong').then(msg => { msg.delete(30000)});
                }
            break;
            case 'prefix':
                if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions.').then(msg => { msg.delete(10000)});
                if(!args[1]) return message.channel.sendMessage('Missing argument').then(msg => { msg.delete(10000)});
                guildsData[server].prefix = args[2];
                message.channel.sendMessage('New prefix is **' + guildsData[server].prefix + '** by ' + message.member.displayName)
                console.log('New prefix is ' + guildsData[server].prefix);
                message.delete();
                fs.writeFile('guildsData.json', JSON.stringify(guildsData), 'utf8', function() {} );
            break;
            case 'log':
                switch (args[2]){
                    case 'edit':
                        guildsData[server].logs.edit = message.channel.id;
                        message.reply('Edit log is now defined');
                        fs.writeFile('guildsData.json', JSON.stringify(guildsData), 'utf8', function() {} );
                        message.delete();
                    break;
                    case 'delete':
                        guildsData[server].logs.delete = message.channel.id;
                        message.reply('Delete log is now defined');
                        fs.writeFile('guildsData.json', JSON.stringify(guildsData), 'utf8', function() {} );
                        message.delete();
                    break;
                }
            break;
        }
       //Code here
       return guildsData;
    }
}
function saveJson(json, fs){
    fs.writeFile('guildsData.json', guildsData, 'utf8', function() {} );
}