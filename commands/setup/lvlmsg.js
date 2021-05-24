const { MessageEmbed } = require("discord.js");

const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
  
      if (!message.member.hasPermission("MANAGE_GUILD")&&!message.member.hasPermission("MANAGE_CHANNELS")&&!message.member.hasPermission("ADMINISTRATOR"))
      return message.mentionReply(
        "<:tairitsuno:801419553933492245> | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
    const type = args[0];
    if (type === "on" || type === "enable") {
      bot.db.set(`${message.guild.id}_lvlupmsg`, "yes")
      message.noMentionReply(
        `<:hikariok:801419553841741904> | Level up message  is successfully enabled!`
      );
      return;
    }
    if (type === "off" || type === "disable") {
      bot.db.set(`${message.guild.id}_lvlupmsg`, "no")
      message.noMentionReply(
        `<:hikariok:801419553841741904> | Level up message successfully disabled!`
      );
      return;
    }
}
exports.info = {
name: 'setlevelmessage',
  aliases:["levelmessage", "lvlmsg", "setlvlmsg", "levelupmessage", "lvlupmsg", "setlvlupmsg", 'setlevelupmessage', 
          "level-message", "lvl-msg", "set-lvl-msg", "level-up-message", "lvl-up-msg", "set-lvl-up-msg", 'set-level-up-message'
          ],
  usage: "<on/enable/off/disable>",
  description: "turns the level message on/off(default: on)",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}