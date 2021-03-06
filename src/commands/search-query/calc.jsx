const { evaluate } = require("mathjs"),{ MessageEmbed }= require('discord.js');
    module.exports.run = async (bot, message, args) => {

        if(!args[0]) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | Please give a question');

        let resp;

        try {
            resp = evaluate(args.join(" ").replace("x", "*").replace("X", "*").replace(":", "/").replace("²", "^2").replace("³", "^3").replace("&", "+"))
        } catch (e) {
            return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | Please give a correct question')
        }

        const embed = new MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.reply({embeds:[embed], allowedMentions: { repliedUser: false }});

};
module.exports.interaction = async (bot, interaction, arg) => {

let args=[]
if(arg)args=[arg._hoistedOptions[0].value]
  
        if(!args[0]) return interaction.reply({
                        content: `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | Please give a question'
            });

        let resp;

        try {
            resp = evaluate(args.join(" ").replace("x", "*").replace("X", "*").replace(":", "/").replace("²", "^2").replace("³", "^3").replace("&", "+"))
        } catch (e) {
         return interaction.reply({
                        content: `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | Please give a correct question'
            });
        }

        const embed = new MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        interaction.reply({embeds:[embed]})

};
exports.options=[
  {
    name: "math-question",
    description: "Math Question here",
    type: 3,//1=get perms for role,2=role,3=normal,6=mention,7=channel,8=role to edit
    required: true//true/false
  }
]
exports.conf={
  cooldown: 0,
  dm: "yes"
}
module.exports.info = {
    name: 'calculate',
  aliases: ["calc","math"],
  usage: "<math_question>",
  description:"Answers you the given math question."
};