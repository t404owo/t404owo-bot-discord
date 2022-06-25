exports.conf={
  cooldown: 0,
  dm: "no"
}
const { MessageEmbed, Permissions } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has(Permissions.FLAGS.MANAGE_GUILD)&&!bot.config.owners.includes(message.author.id)&&!perm.has(Permissions.FLAGS.MANAGE_CHANNELS)&&!perm.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
      let setup= args[0]
      if (!args[0]||isNaN(args[0].replace("<#", "").replace(">", "")))setup = message.channel.id
      bot.db.set(`${message.guild.id}_botlog`, setup.replace("<#", "").replace(">", ""))
      message.noMentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Successfully setup bot log`
      );
      return;
}

exports.info = {
name: 'setlogchannel',
  aliases:["logchannel", "setbotlogchannel", "botlogchannel", "setbotlog", "botlog"],
  description: "sets the bot log channel",
  usage: "<channel_id/channel_tag>"
}
