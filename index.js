const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
const bot = new Discord.Client();
var cmd = require('node-cmd');
const fs = require('fs');
let login = JSON.parse(fs.readFileSync('login.json'));

const token = login.token;

let deafultPREFIX = login.deafultPrefix;
let PREFIX = [];

let version = login.version;
let activityList = login.status;

bot.commands = new Discord.Collection();
let commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
let lang = JSON.parse(fs.readFileSync('lang.json'));
var language = []
var i = 0;
let adminChat = [];
let announceChat = []; 
let working = [];
for(const file of commandFiles){
    let command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    working.push(command.name);
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
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return message.reply('For my current operations please use me in a guild.');
    var server = message.guild.id;
    var usePrefix = remUndefined(PREFIX[server], deafultPREFIX);
    var useAdminChat = remUndefined(adminChat[server], 0);
    var useAnnounceChat = remUndefined(announceChat[server], 0);
    let useLang = remUndefined(lang[language[server]], lang.en);
    let args = message.content.substring(usePrefix.length).split(" ");
    let start = message.content.substring(0, usePrefix.length);
    if(start == usePrefix) {
        if(working.includes(args[0])){
            bot.commands.get(args[0]).execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version);
        }
        else{
            switch(args[0]){
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
                case 'update':
                    if(message.member.id != 238965446026592257) break;
                    switch(args[1]){
                        case 'reload':
                            console.log(`[Uptade][Live]##################`)
                            login = JSON.parse(fs.readFileSync('login.json'));
                            lang = JSON.parse(fs.readFileSync('lang.json'));
                            message.channel.send(`Bot update in progress from ${version} to ${login.version}`);
                            console.log(`Bot update in progress from ${version} to ${login.version}`);
                            deafultPREFIX = login.deafultPrefix;
                            version = login.version;
                            activityList = login.status;
                            commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
                            for(const file of commandFiles){
                                let command = require(`./commands/${file}`);
                                bot.commands.set(command.name, command);
                                working.push(command.name);
                                message.channel.send(`Loaded command files for ${command.name.toUpperCase()}`);
                                console.log(`Loaded command files for ${command.name.toUpperCase()}`);
                            }
                            message.channel.send(`Sucsesfully updated to version ${version}! Have a nice day GregorS`);
                            console.log(`Sucsesfully updated to version ${version}! Have a nice day GregorS`);
                        break;
                        case 'pull':
                            cmd.get(
                                'git pull origin Stabile',
                                function(err, data, stderr){
                                    console.log('Git pull:\n\n',data);
                                    message.channel.send(`Git returned:\n\n ${data}\n Sucsessfull :white_check_mark:`);
                                }
                            );
                        break;
                        case 'restart':
                            message.reply(`Now started to restart`)
                            cmd.get('start cmd /k node .', function(err, data, stderr){});
                            console.log(`Headaega!`);
                            setTimeout(function(){
                                message.channel.send(`Opend and closing old`);
                                process.exit(1);
                            }, 3000);  
                        break;
                    }
                break;
            }
        }
    }    
})
bot.login(token);

//Functons in Index.js
function remUndefined(isUndefined, replace) {
    if (isUndefined === undefined){
        return replace;
    }
    else {
        return isUndefined;
    }
}