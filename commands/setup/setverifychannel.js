const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
      let setup= args[0]
      if (!args[0]||isNaN(args[0].replace("<#", "").replace(">", "")))setup = message.channel.id
      bot.db.set(`${message.guild.id}_verifychannel`, setup.replace("<#", "").replace(">", ""))
      
      message.noMentionReply(
        `<:hikariok:801419553841741904> | Successfully setup verify channel`
      );
      return;
    }
}
exports.info = {
name: 'setverifychannel',
  aliases:["verifychannel"],
  description: "sets the verify channel",
  usage: "<channel_id/channel_tag>"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}