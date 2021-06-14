const { MessageEmbed } = require("discord.js");

const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
  
      let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has("MANAGE_GUILD")&&!bot.config.owners.includes(message.author.id)&&!perm.has("MANAGE_CHANNELS")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
    const type = args[0];
    if (type === "on" || type === "enable") {
      bot.db.set(`${message.guild.id}_lvlupmsg`, "yes")
      message.noMentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Level up message  is successfully enabled!`
      );
      return;
    }
    if (type === "off" || type === "disable") {
      bot.db.set(`${message.guild.id}_lvlupmsg`, "no")
      message.noMentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Level up message successfully disabled!`
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