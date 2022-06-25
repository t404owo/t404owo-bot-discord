const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  let wUser = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Remember to mention a valid user to warn!") })
  
  
  if(!wUser) return message.mentionReply("I couldn't find this member!");
  
  
  let warnlevel = bot.db.get(`${wUser.user.id}_${message.guild.id}_warns`)||0;

  message.noMentionReply(`<@${wUser.id}> has ${warnlevel} warnings.`);

}

module.exports.info = {
  name: "warnings",
  aliases: ["warning"],
  usage: "<user_id_or_mention>",
  description: "to know how much warns does the member has",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}