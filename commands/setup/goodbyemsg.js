const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")&&!message.member.hasPermission("MANAGE_CHANNELS")&&!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply(
        "<:tairitsuno:801419553933492245> | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
    const type = args[0];
    if (type === "on" || type === "enable") {
      bot.db.set(`${message.guild.id}_goodbyemessagesys`, "yes")
      message.channel.send(
        `<:hikariok:801419553841741904> | Welcome message is successfully enabled!`
      );
      return;
    }
    if (type === "off" || type === "disable") {
      bot.db.set(`${message.guild.id}_goodbyemessagesys`, "no")
      message.channel.send(
        `<:hikariok:801419553841741904> | Welcome message is successfully disabled!`
      );
      return;
    }
}
exports.info = {
name: 'setgoodbyemessagesystem',
  aliases:["goodbyemsgsys", 'goodbyemessagesys',"setgoodbymessagesys", "setgoodbyemsgsys", "leavemessagesys", "setleavemessagesys", "setleavemsgsys","leavemsgsys","leavemsgsystem","setleavemsgsystem","setleavemessagesystem","leavemessagesystem"],
  usage: "<on/enable/off/disable>",
  description: "turns the welcome message on/off",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}