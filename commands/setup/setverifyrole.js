const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has("MANAGE_GUILD")&&!bot.config.owners.includes(message.author.id)&&!perm.has("MANAGE_CHANNELS")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
      const setup = args.slice().join(" ");
if (!setup)
    
      if (!setup||isNaN(setup.replace("<@&", "").replace("<@", "").replace(">", "")))
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Please send a verify role id with this format ${bot.config.prefix}setverifyrole [verified role id]`
        );
      bot.db.set(`${message.guild.id}_verifyrole`, setup.replace("<@&", "").replace("<@", "").replace(">", ""))
      
      message.noMentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | | Successfully setup verified role`
      );
      return;
}

exports.info = {
name: 'setverifyrole',
  aliases:['setverifyrole','setverifiedrole','verifiedrole'],
  description: "sets the verify role",
  usage: "<role_id/role_tag>"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}