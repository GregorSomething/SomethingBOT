const Discord = require('discord.js')
const {RichEmbed } = require('discord.js');
module.exports = {
    name: 'math',
    execute(message, args, useLang){
        if(!args[1]) return message.channel.sendMessage(useLang.words.missingArg).then(msg => { msg.delete(10000)});
        if(!args[2]) return message.channel.sendMessage(useLang.words.missingArg).then(msg => { msg.delete(10000)});
        if(!args[2]) return message.channel.sendMessage(useLang.words.missingArg).then(msg => { msg.delete(10000)});
        const embed = new RichEmbed()
        switch(args[2]){
            case '+':
                var result = args[1] - (-1 * args[3]); 
                embed.setTitle(useLang.math.name)
                .setColor(0xFF0000)
                .setFooter(useLang.math.request + message.member.displayName)
                .setDescription(`**${useLang.math.operatsion}:** ${args[1]} ${args[2]} ${args[3]}\n**${useLang.math.result}:** ${result}`);
                //message.channel.send(embed)
                message.channel.sendEmbed(`**${useLang.math.name}**\n` + useLang.math.request + message.member.displayName + `\n**${useLang.math.operatsion}:** ${args[1]} ${args[2]} ${args[3]}\n**${useLang.math.result}:** ${result}`)
                message.delete();
            break;
            case '-':
                var result = 0;
                result = args[1] - args[3]; 
                embed.setTitle(useLang.math.name)
                .setColor(0xFF0000)
                .setFooter(useLang.math.request + message.member.displayName)
                .setDescription(`**${useLang.math.operatsion}:** ${args[1]} ${args[2]} ${args[3]}\n**${useLang.math.result}:** ${result}`);
                message.channel.sendEmbed(embed)
                message.delete();
            break;
            case '*':
                var result = 0;
                result = args[1] * args[3]; 
                embed.setTitle(useLang.math.name)
                .setColor(0xFF0000)
                .setFooter(useLang.math.request + message.member.displayName)
                .setDescription(`**${useLang.math.operatsion}:** ${args[1]} ${args[2]} ${args[3]}\n**${useLang.math.result}:** ${result}`);
                message.channel.sendEmbed(embed)
                message.delete();
            break;
            case '/':
                var result = 0;
                result = args[1] / args[3]; 
                embed.setTitle(useLang.math.name)
                .setColor(0xFF0000)
                .setFooter(useLang.math.request + message.member.displayName)
                .setDescription(`**${useLang.math.operatsion}:** ${args[1]} ${args[2]} ${args[3]}\n**${useLang.math.result}:** ${result}`);
                message.channel.sendEmbed(embed)
                message.delete();
            break;
        }
    }
}