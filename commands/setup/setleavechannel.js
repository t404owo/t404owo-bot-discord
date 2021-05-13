
const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
  let setup= args[0]
      if (!args[0]||isNaN(args[0].replace("<#", "").replace(">", "")))setup = message.channel.id
      bot.db.set(`${message.guild.id}_leavechannel`, setup.replace("<#", "").replace(">", ""))
      message.channel.send(`<:hikariok:801419553841741904> | Successfully setup welcome message send place`);
      return;
}
}
exports.info = {
name: 'setgoodbyechannel',
  aliases:["goodbyechannel", "leavechannel", "setleavechannel"],
  description: "sets the leave message channel",
  usage: "<channel_id/channel_tag>"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}