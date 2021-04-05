#!/bin/usr/env node
// Botile vajalikud systeemid
const Discord = require('discord.js')
const fs = require('fs');
var events = require('events');
const chalk = require('chalk');
const dbClass = require('./database.js').database

// Boti andmete hoid
let keys = JSON.parse(fs.readFileSync('keys.json')); // Salastatud info
let config = JSON.parse(fs.readFileSync('config.json')); // Boti configuratsiooni fail
const db = new dbClass('./database.db');

// Sys enentide kogu
const sys = new events.EventEmitter();

// Command handler ile vajalik
// Teeb uue Clienti nimega Bot
const bot = new Discord.Client();
// Teeb uue kollektsiooni botile milles on commandid
bot.commands = new Discord.Collection();
// Teeb uue kollektsiooni botile milles on slash commandid commandid
bot.slashCommands = new Discord.Collection();
// Eventide kogumik et hoida failid laetuna
bot.cosEvents = new Discord.Collection();

// Loeb failid mis l6ppevad .js-iga command kaustast
let commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
let eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
let slashCmdFiles = fs.readdirSync('./slash_commands/').filter(file => file.endsWith('.js'));

// Save Database into bots object
bot.db = db;

// T66tleb command kausta failid
for(const file of commandFiles){ 
    // Node.js import fail
    let command = require(`./commands/${file}`); 
    // Seab faili collektsiooni nime pidi
    bot.commands.set(command.name, command); 
}

for(const file of slashCmdFiles){ 
    // Node.js import fail
    let command = require(`./slash_commands/${file}`); 
    // Seab faili collektsiooni nime pidi
    bot.slashCommands.set(command.name, command); 
}

// Boti eventil ready
bot.on('ready', () => {
    // Ytleb konsooli et on valmis
    console.log(chalk.blue.bold("[START] ") + 'Bot is ready to start working! Yay');
    var i=0; // Vajalik hiljem
    // Teeb invite linki ja paneb selle konsooli kui valmis
    bot.generateInvite(['ADMINISTRATOR']).then(link => {
        console.log(chalk.blue("[START]") + chalk.red("[INVALID]") + link)
    });
    // Kutsub esile selle funktsiooni iga 5000 ms tagant
    setInterval(function() { 
        // For loop mis on vajalik statuse muutuseks (if i++)
        if (i < config.activeList.length - 1) { i++;}
        else { i = 0;}
        // Seab staatuse configuratsioonist saadud array activeList-i i-ndaks elemengiks
        let status = config.activeList[i];
        // Kuvab botile staatuse "Playing: status"
        bot.user.setActivity(status, {type: "PLAYING"});
    }, 5000)
    //TEMP ################################### 
    bot.slashCommands.array().forEach(command => {
        bot.api.applications(bot.user.id).guilds(config.homeGuild).commands.post(command.regOpts)
    });
});

// Bot message event
bot.on('message',async message => {
    // Vaatab ka autor on bot või kanal on Direckt message, kui on siis kill
    // TODO: Bot to DM support
    if (message.author.bot || message.channel.type == 'dm') return;

    // Vaatame kas andmetes on guild ja selle deafult väärtused
    if (config.data[message.guild.id] === undefined) {
        config.data[message.guild.id] = {"prefix":"t!","lang":"en"}
        sys.emit('confUpdate')
    }
    

    // Võtab argumendid sõnumi sisust
    let args = message.content.substring(config.data[message.guild.id].prefix.length).split(" ");
    
    // Kui sõnum ei alga prefixiga siis kill
    if (!message.content.startsWith(config.data[message.guild.id].prefix)) return;

    // Vaatab kas boti commandides on command mille nime või aliaste nimi oleks arg0 e. käskluse alus, 
    // kõik tehakse väikesteks tähtedeks et ei oleks caps sensitiv
    if (bot.commands.some(command => command.name.toString().toLowerCase() == args[0].toString().toLowerCase()) 
            || bot.commands.some(command => command.alias.includes(args[0].toString().toLowerCase()))) {
        // kui oli command siis leiame selle commandi samal meetodil nagu ennem kontrolliseme
        let command = await bot.commands.find(command => command.alias.includes(args[0].toString().toLowerCase()) 
            || command.name.toString().toLowerCase() == args[0].toString().toLowerCase());
        // Jooksutame commandi
        command.execute(message, args, config, bot, sys);
        console.log(chalk.green("[COMMAND] ") + chalk.white(`User ${message.member.user.username} from ${message.guild.name} executed ` + 
                chalk.green(command.name.toUpperCase()) + "\n" + chalk.green("[COMMAND_INFO] ") + chalk.white(message.content))) // Logs Nice txt
    }

    
});

// Kui tuvastame kaltkriips kommandi siis ...
bot.ws.on('INTERACTION_CREATE', async interaction => {
    // ... otsime selle commandi ja viime selle läbi (/cmdl puudub multi lang support)
    let command = await bot.slashCommands.find(command => command.name.toString().toLowerCase() == interaction.data.name.toString().toLowerCase());
    bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: await APIMessage(interaction, await command.execute(interaction, bot, sys, config))
              
        }
    });
    console.log(chalk.green("[SLASH_COMMAND] ") + chalk.white(`User ${interaction.member.user.username} from ${bot.guilds.resolve(interaction.guild_id).name} executed ` + 
                chalk.green(interaction.data.name.toUpperCase())))
})

// Moodulis on eksporditavad asjad
module.exports = {
    bot: bot,
    sys: sys,
    conf: config
}

// Boti sisselogimine API keskonda
bot.login(keys.token);

// Analoogia command sysiga
// Laeme viimasene sest see on sekundaar systeem
for(const file of eventFiles){ 
    let event1 = require(`./events/${file}`); 
    bot.cosEvents.set(event1.event, event1); 
}

// Kontroll event
sys.on('ping', eventMoodul => {
    console.log(chalk.cyan("[INFO] ") + `Ping from ${eventMoodul}`)
})

// Confi muutuse event
sys.on('confUpdate', () => {
    console.log(chalk.green("[UPDATE] ") + "Config Update")
    setTimeout(() => {fs.writeFile('config.json', JSON.stringify(config, null, '\t'), 'utf8', function() {} )}, 5000)
    //fs.writeFile('config.json', JSON.stringify(config, null, '\t'), 'utf8', function() {} );
})

async function APIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(bot.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}