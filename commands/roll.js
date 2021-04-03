module.exports = {
    name: 'roll',
    alias: ['taring', 'die', 'dice'],
    async execute(message, args, config, bot, sys) {
        if (!args[1]) {
            b = 100;
        } else if (args[1] == "rick") {
            b = 1;
            // TODO piira õigused sellele alam commandile
            var i = 0;
            var j =  setInterval(async () => {
                message.channel.send(lyrics.split("\n")[i]).then(msg => {message.delete({ timeout: 12000 })})
                i++;
            }, 1500);
            if (i == lyrics.split("\n").length) {
                clearImmediate(j);
                return;
            } 
        } else {
            b = args[1];
        }
        let e = Math.floor(Math.random() * b) + 1;
        message.channel.send(this.message[config.data[message.guild.id].lang].replace("#user#", message.member.toString()) + ` ${e}`);
        message.delete({ timeout: config.delTimeCmd })
    },
    message: {
        en: "User #user# rolled",
        et: "Kasutaja #user# veeretas"
    },
    help: {
        et: {
            usage: "%prefix%roll [number]",
            description: "Veeretab sulle numbri mis ei ole suurem kui argument number",
            nameTranslate: "Täring"
        },
        en: {
            usage: "%prefix%roll [number]",
            description: "Rolls a number that is less that input number",
            nameTranslate: "Roll"
        }
    }
}
const lyrics = `We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy
** **
I just wanna tell you how I'm feeling
Gotta make you understand
** **
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
** **
We've known each other for so long
Your heart's been aching, but you're too shy to say it
Inside, we both know what's been going on
We know the game, and we're gonna play it
** **
And if you ask me how I'm feeling
Don't tell me you're too blind to see
** **
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
** **
Ooh (Give you up)
Ooh-ooh (Give you up)
Ooh-ooh
Never gonna give, never gonna give (Give you up)
Ooh-ooh
Never gonna give, never gonna give (Give you up)
** **
We've known each other for so long
Your heart's been aching, but you're too shy to say it
Inside, we both know what's been going on
We know the game, and we're gonna play it
** **
I just wanna tell you how I'm feeling
Gotta make you understand
** **
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you`