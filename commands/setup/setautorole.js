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
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Please send a auto role id with this format ${bot.config.prefix}setautorole [auto role id]`
        );
      bot.db.set(`${message.guild.id}_autorole`, setup.replace("<@&", "").replace("<@", "").replace(">", ""))
      
      message.noMentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Successfully setup verified role`
      );
      return;
}

exports.info = {
name: 'setautorole',
  aliases:["autorole"],
  description: "sets the auto role(for members who joins this server(not recommended for community servers with Rule screenings))",
  usage: "<role_id/role_tag>"
}
