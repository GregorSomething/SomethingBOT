// @author: GregorS
// Dependencies
const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
const cmd = require('node-cmd');
const fs = require('fs');
// Json file redins
let login = JSON.parse(fs.readFileSync('login.json'));
let commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // searces commands from /commands/ with ending .js
let lang = JSON.parse(fs.readFileSync('lang.json'));
let guildsData = JSON.parse(fs.readFileSync('guildsData.json'));
// var varibles
var i = 0;
// let varibles
let working = [];
// Shortenings
let version = login.version;
let activityList = login.status;
let deafultPREFIX = login.deafultPrefix;
const token = login.token;
// Start
const bot = new Discord.Client(); // client = bot e. see on discordi bot
// Command handler stuff
bot.commands = new Discord.Collection(); // collection for command handler
for(const file of commandFiles){ // Adds files to it
    let command = require(`./commands/${file}`); // takse command from commandFiles
    bot.commands.set(command.name, command); // adds a new command to collection
    working.push(command.name); // warible for command handlers list of worcing commands in /commands/
}
//Ready listnerer
bot.on('ready', () =>{ // When bot ready it will log it to console
    console.log(`Ready For something? of course not, here comes an ERROR!!!`);
    setInterval(function() { // It will change activitis every 5 sec
        if (i < activityList.length - 1) { i++;}
        else { i = 0;}
        let status = activityList[i];
        bot.user.setActivity(status, {type: "WATCHING"}); // sets status
    }, 5000)

});//reportError(err, `event/ready`)
/*
Vaatab kas oled admin
if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send('You don´t have permissions.').then(msg => { msg.delete(10000)});

*/
// message handler
bot.on('message', async message=>{
    if(message.author.bot) return; // If message author bot then its not my problem
    // My bot uses guld as its identifyer, so it can work else where
    if(message.channel.type == 'dm') return message.reply('For my current operations please use me in a guild.');
    var server = message.guild.id; // Gets guild id
    // If gild is new to bott then it adds it to guildsData
    if(guildsData[server] === undefined) guildsData[`${server}`] = {"lang":"en","prefix": deafultPREFIX};
    // Following lines read data from guildsData for guild, some remove undefined values if they appere
    var usePrefix = guildsData[server].prefix
    var useAdminChat = remUndefined(guildsData[server].adminChat, 0);
    var useAnnounceChat = remUndefined(guildsData[server].announceChat, 0);
    // Finds language and then reads it fom lang.json
    let useLang = remUndefined(lang[guildsData[server].lang], lang.en);
    // Splits message so bot can handel it more easely
    let args = message.content.substring(usePrefix.length).split(" ");
    let start = message.content.substring(0, usePrefix.length);
    if(start == usePrefix) { // When it starts with correct prefix it reacts
        if(working.includes(args[0])){ // If the command is in /commands/
            if (args[0] == 'define'){ // if its define then it will wait for and updated guildsData
                guildsData = await bot.commands.get(args[0]).execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, login, fs);
            } else {// else it will execute command normaly
                bot.commands.get(args[0]).execute(message, args, useLang, usePrefix, useAdminChat, useAnnounceChat, server, bot, login, fs);
            }
        }
        else{// when command is needed to bi executed from index it will do it from here
            switch(args[0]){
                // TEMP Close
                /*
                case 'update':
                    if(message.member.id != "238965446026592257") break; // Checks if executor is GregorS
                    switch(args[1]){
                        case 'reload': // Reaload all bot files
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
                        case 'pull': // Pulls updates from version control, stabile branch
                            cmd.get(
                                'git pull origin Stabile',
                                function(err, data, stderr){
                                    console.log('Git pull:\n\n',data);
                                    message.channel.send(`Git returned:\n\n ${data}\n Sucsessfull :white_check_mark:`);
                                }
                            );
                        break;
                        case 'restart': // Opens new terminal and closes old (@BUG Doesnt work on ubuntu server only WIN10)
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
                */
                default: // when there was no command with such name it will give err msg
                    message.reply(useLang.words.noCommand).then(msg => { msg.delete(10000)});
                    message.delete();
                break;
            }
        }
    }    
})
//other eventes
bot.on('messageDelete', async message => { // Wehen delete event happenas it will exixute
    bot.commands.get('event_messageDelete').execute(message, remUndefined(guildsData[message.guild.id].prefix, deafultPREFIX), guildsData, bot);
});
bot.on('messageUpdate', async (oldMessage, newMessage) => { // Wehen edit event happenas it will exixute
    bot.commands.get('event_messageUpdate').execute(oldMessage, newMessage, guildsData, bot);
});

bot.login(token).catch(err => console.log(`Viga Sisselogimisel \n##\n${err}`)); // Logs bot into Discord using token from login.json

//Functons in Index.js
function remUndefined(isUndefined, replace) { // replaces unfefined value vith something else
    if (isUndefined === undefined || isUndefined === null){
        return replace;
    }
    else {
        return isUndefined;
    }
}
