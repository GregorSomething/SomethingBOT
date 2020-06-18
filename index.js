// @author: Gregor Suurvarik
// Dependencies
const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
var cmd = require('node-cmd');
const fs = require('fs');
// Json file redins
let login = JSON.parse(fs.readFileSync('login.json'));
let commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
let lang = JSON.parse(fs.readFileSync('lang.json'));
let guildsData = JSON.parse(fs.readFileSync('guildsData.json'));
// var varibles
var language = [];
var i = 0;
// let varibles
let adminChat = [];
let announceChat = []; 
let working = [];
let PREFIX = [];
// Shortenings
let version = login.version;
let activityList = login.status;
let deafultPREFIX = login.deafultPrefix;
const token = login.token;
// Start
const bot = new Discord.Client(); // client = bot e. see on discordi bot
// Command handler stuff
bot.commands = new Discord.Collection();
for(const file of commandFiles){
    let command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    working.push(command.name);
}
//Redy listnerer
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
// message handler
bot.on('message', async message=>{
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return message.reply('For my current operations please use me in a guild.');
    var server = message.guild.id;
    if(guildsData[server] === undefined) guildsData[`${server}`] = {"lang":"en","prefix": deafultPREFIX};
    var usePrefix = guildsData[server].prefix
    var useAdminChat = remUndefined(guildsData[server].adminChat, 0);
    var useAnnounceChat = remUndefined(guildsData[server].announceChat, 0);
    let useLang = remUndefined(lang[guildsData[server].lang], lang.en);
    let args = message.content.substring(usePrefix.length).split(" ");
    let start = message.content.substring(0, usePrefix.length);
    if(start == usePrefix) {
        if(working.includes(args[0])){
            if (args[0] == 'define'){
                guildsData = await bot.commands.get(args[0]).execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs);
            } else {
                bot.commands.get(args[0]).execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, version, fs);
            }
        }
        else{
            switch(args[0]){
                case 'update':
                    if(message.member.id != 238965446026592257) break;
                    switch(args[1]){
                        case 'reload':
                            console.log(`[Uptade][Live]##################`)
                            login = JSON.parse(fs.readFileSync('login.json'));
                            lang = JSON.parse(fs.readFileSync('lang.json'));
                            guildsData = JSON.parse(fs.readFileSync('guildsData.json'));
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
                default:
                    message.reply(useLang.words.noCommand).then(msg => { msg.delete(10000)});
                    message.delete();
                break;
            }
        }
    }    
})
//other eventes
bot.on('messageDelete', async message => {
    bot.commands.get('event_messageDelete').execute(message, remUndefined(guildsData[message.guild.id].prefix, deafultPREFIX));
});
bot.on('messageUpdate', async (oldMessage, newMessage) => {
    bot.commands.get('event_messageUpdate').execute(oldMessage, newMessage);
});

bot.login(token); //onli thing ot of loop, that starts everithingl

//Functons in Index.js
function remUndefined(isUndefined, replace) {
    if (isUndefined === undefined || isUndefined === null){
        return replace;
    }
    else {
        return isUndefined;
    }
}