
const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has("MANAGE_GUILD")&&!bot.config.owners.includes(message.author.id)&&!perm.has("MANAGE_CHANNELS")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
  let setup= args[0]
      if (!args[0]||isNaN(args[0].replace("<#", "").replace(">", "")))setup = message.channel.id
      bot.db.set(`${message.guild.id}_welcomechannel`, setup.replace("<#", "").replace(">", ""))
      message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Successfully setup welcome message send place`);
      return;
}

exports.info = {
name: 'setwelcomechannel',
  aliases:["welcomechannel"],
  description: "sets the welcome message",
  usage: "<channel_id/channel_tag>"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}