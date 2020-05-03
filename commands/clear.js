const Discord = require('discord.js')
const {RichEmbed} = require('discord.js');
module.exports = {
    name: 'clear',
    async execute(message, args, useLang){
        if(!message.member.hasPermission("ADMINISTRATOR", explicit = true)) return message.channel.send(useLang.words.noPerms).then(msg => { msg.delete(10000)});
        if(!args[1]) return message.channel.sendMessage(useLang.words.missingArg)
        message.channel.bulkDelete(args[1]);
        const sendIt = new RichEmbed();
        sendIt.setTitle(useLang.clear.title)
        .setColor(0xFF0000)
        .setDescription(`${useLang.clear.erased} ${args[1]} ${useLang.clear.messages}`)
        .setFooter(useLang.clear.order + " " + message.member.displayName);
        message.channel.sendEmbed(sendIt);
        message.delete();
    }
}