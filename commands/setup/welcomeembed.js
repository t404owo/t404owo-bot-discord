const { MessageEmbed } = require("discord.js");

const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
  
      if (!message.member.hasPermission("MANAGE_GUILD")&&!message.member.hasPermission("MANAGE_CHANNELS")&&!message.member.hasPermission("ADMINISTRATOR"))
      return message.mentionReply(
        "<:tairitsuno:801419553933492245> | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
    const type = args[0];
    if (type === "on" || type === "enable") {
      bot.db.set(`${message.guild.id}_welcomeembed`, "yes")
      message.noMentionReply(
        `<:hikariok:801419553841741904> | Welcome embed is successfully enabled!`
      );
      return;
    }
    if (type === "off" || type === "disable") {
      bot.db.set(`${message.guild.id}_welcomeembed`, "no")
      message.noMentionReply(
        `<:hikariok:801419553841741904> | Welcome embed is successfully disabled!`
      );
      return;
    }
}
exports.info = {
name: 'setwelcomeembed',
  aliases:["welcomeembed"],
  usage: "<on/enable/off/disable>",
  description: "turns the welcome message embed on/off",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}