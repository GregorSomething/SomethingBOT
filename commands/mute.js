/* Teadmata probleem Andmebaasi requestil maha võtt ei toimi */
module.exports = {
    name: 'mute',
    alias: ['vaigista'],
    perms: ["mod"],
    async execute(message, args, config, bot, sys) {
        if (message.mentions) {
            message.delete({ timeout: config.delTimeCmd })
            tuser = message.mentions.members.first();
            muser = message.member
            mtype = args[2]
            stime = new Date().getTime()
            etime = await stime - (-1 * (await this.getTimeAdd(args[3])))
            reason = message.content.replace(`${config.data[message.guild.id].prefix}${args[0]} ${args[1]} ${args[2]} ${args[3]} `, "");
            if (mtype.toUpperCase() == "VC") {
                if (tuser.voice != undefined) {
                    tuser.edit({mute: true}, reason).catch(e => {message.reply("User not in VC").then(msg => msg.delete({ timeout: config.delTime}))});
                    
                    await bot.db.exeQuery(`INSERT INTO mod(guild, mUser, tUser, mMessage, tMessage, type, reason, sTime, eTime, bool) VALUES("${message.guild.id}", "${muser.id}", "${tuser.id}", "${0}", "${1}", "${mtype}", "${reason}", "${stime}", "${etime}", "true")`, []);
                }
            } else if (mtype.toLowerCase() == "chat") {
                var muteRole = message.guild.roles.cache.find(role => role.name == "SB_Chat_Mute")
                if (muteRole == undefined) message.guild.roles.create({data: {name: "SB_Chat_Mute"}, reason: "Bot mute role needed!"}).then(role => {muteRole = role})
                var mMessageId = message.channel.id + "/";
                await message.channel.send(`**User ${tuser.toString()} was muted** by ${muser.toString()} for ${args[3]}!\n**Reason:** ${reason}`).then(msg => {mMessageId = mMessageId + msg.id})
                var tMessageId;
                await tuser.user.send(`**You were muted** by ${muser.toString()} for ${args[3]}!\n**Reason:** ${reason}`).then(msg => {tMessageId = msg.id})
                tuser.roles.add(muteRole)
                await bot.db.exeQuery(`INSERT INTO mod(guild, mUser, tUser, mMessage, tMessage, type, reason, sTime, eTime, bool) VALUES("${message.guild.id}", "${muser.id}", "${tuser.id}", "${mMessageId}", "${tMessageId}", "${mtype}", "${reason}", "${stime}", "${etime}", "true")`, []);
            }
            
        }

    },
    test: {
        et: "<:mmLol:216154654256398347>",
        en: "Huh"
    },
    test2: {
        et: "FFFF",
        en: "GGG"
    },
    help: {
        et: {
            usage: "%prefix%mute [user] [VC | CHAT] [time] [reason]",
            description: "Vaigistab kasutaja",
            nameTranslate: "Vaigista"
        },
        en: {
            usage: "%prefix%mute [user] [type] [time] [reason]",
            description: "Mutes user",
            nameTranslate: "Mute"
        }
    },
    getTimeAdd (time) {
        let timeReturn = 0;
        let unit = String(time.slice(-1));
        let ammount = Number(time.replace(unit, ""));
        if (ammount == "") ammount = 1;
        switch (unit) {
            case "m":
                timeReturn = ammount * 60 * 1000;
            case "h":
                timeReturn = ammount * 60 * 60 * 1000;
            case "d":
                timeReturn = (ammount * 24 * 60 * 60 * 1000);
        }
        return timeReturn;
    }
}
