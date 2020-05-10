const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const login = JSON.parse(fs.readFileSync('login.json'));

const token = login.token;

const deafultPREFIX = login.deafultPrefix;
let PREFIX = [];

const version = login.version;
var activityList = login.status;

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
let lang = JSON.parse(fs.readFileSync('lang.json'));
var language = []
var i = 0;
let adminChat = [];
let announceChat = []; 
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', () =>{
    console.log(`Ready For something? of course not, here comes an ERROR!!!`);
    setInterval(function() {
        if (i < activityList.length - 1) { i++;}
        else { i = 0;}
        let status = activityList[i];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 5000)

})
/*
Vaatab kas oled admin
if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions.').then(msg => { msg.delete(10000)});

*/
bot.on('message', async message=>{

    var server = message.guild.id;
    if (PREFIX[server] === undefined) PREFIX[server] = deafultPREFIX;
    if (adminChat[server] === undefined) adminChat[server] = 0;
    if (language[server] === undefined) language[server] = "en";
    var useAnnounceChat = announceChat[server];
    var useAdminChat = adminChat[server];
    var usePrefix = PREFIX[server];
    let useLang = lang[language[server]];
    let args = message.content.substring(usePrefix.length).split(" ");
    let start = message.content.substring(0, usePrefix.length);
    if(start == usePrefix) {
        switch(args[0]){
            case 'userinfo':
            bot.commands.get('userinfo').execute(message, args);
            break;
            case 'clear':
            bot.commands.get('clear').execute(message, args, useLang);
            break;
            case 'math':
            bot.commands.get('math').execute(message, args, useLang);
            break;
            case 'say':
            bot.commands.get('say').execute(message, args, usePrefix, adminChat, bot, server, useAdminChat, useLang);
            break;
            case 'help':
            bot.commands.get('help').execute(message, args, usePrefix, version, useLang);
            break;
            case 'announce':
            bot.commands.get('announce').execute(message, args, usePrefix, bot, useAnnounceChat, useLang);
            break;
            case 'drive':
            bot.commands.get('drive').execute(message, args, bot);
            break;
            case 'ticket':
            bot.commands.get('ticket').execute(message, args, bot, usePrefix, useLang);
            break;







            
            case 'prefix':
                if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions.').then(msg => { msg.delete(10000)});
                if(!args[1]) return message.channel.sendMessage('Missing argument').then(msg => { msg.delete(10000)});
                PREFIX[server] = args[1];
                message.channel.sendMessage('New prefix is **' + PREFIX[server] + '** by ' + message.member.displayName)
                console.log('New prefix is ' + PREFIX[server]);
                message.delete();
            break;
            case 'define':
                if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions.').then(msg => { msg.delete(10000)});
                if(!args[1]) return message.channel.sendMessage('Missing argument').then(msg => { msg.delete(10000)});
                switch (args[1]){
                    case 'adminChat':
                        adminChat[server] = message.channel.id
                        message.delete();
                        message.channel.sendMessage('This is now where i put admin stuff').then(msg => { msg.delete(30000)});
                    break;
                    case 'announceChat':
                        announceChat[server] = message.channel.id
                        message.delete();
                        message.channel.sendMessage('This is now where i put announcments').then(msg => { msg.delete(30000)});
                    break;
                    case 'lang':
                        if(args[2] == "en" || args[2] == "et"){
                            language[server] = args[2];
                            message.delete();
                            message.channel.sendMessage('Language has been changed to this command with your intended language.').then(msg => { msg.delete(30000)});
                        }
                        else {
                            message.channel.sendMessage('Language code wrong').then(msg => { msg.delete(30000)});
                        }
                    break;
                }
            break;
        }
    }    
})
bot.login(token);