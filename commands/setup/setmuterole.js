const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
exports.run = (bot, message, args) => {
    let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has("MANAGE_GUILD")&&!bot.config.owners.includes(message.author.id)&&!perm.has("MANAGE_CHANNELS")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
      const setup = args.slice().join(" ");
    
      if (!setup||isNaN(setup.replace("<@&", "").replace("<@", "").replace(">", "")))
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Please send a mute role id with this format ${bot.config.prefix}setmuterole [mute role id]`
        );
      bot.db.set(`${message.guild.id}_muterole`, setup.replace("<@&", "").replace("<@", "").replace(">", ""))
      
      message.noMentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Successfully setup mute role`
      );
      return;
}

exports.info = {
name: 'setmuterole',
  aliases:["muterole"],
  description: "sets the mute role",
  usage: "<muterole_id/muterole_tag>"
}
