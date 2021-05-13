const { evaluate } = require("mathjs");
    module.exports.run = async (bot, message, args) => {
const { MessageEmbed }= require('discord.js');

        if(!args[0]) return message.channel.send('Please give a question');

        let resp;

        try {
            resp = evaluate(args.join(" ").replace("x", "*").replace("X", "*").replace(":", "/").replace("²", "^2").replace("³", "^3").replace("&", "+"))
        } catch (e) {
            return message.channel.send('Please give a correct question')
        }

        const embed = new MessageEmbed()
        .setColor(0x0affaf)
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

};
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