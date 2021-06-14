const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has("MANAGE_GUILD")&&!bot.config.owners.includes(message.author.id)&&!perm.has("MANAGE_CHANNELS")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
  const setup = args.slice().join(" ");
      if (!setup)
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Please send a welcome message with this format\`` +
            bot.config.prefix +
            `setwelcomemessage [welcome message] ` +
          'To mention the new member\'s name, use $MEMBER$\nTo mention the new member, use $MENTION$\nTo mention the server name, use $SERVER$'+  
":" +
            "/"
        );
      bot.db.set(`${message.guild.id}_welcomemessage`, setup)
      message.noMentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Successfully setup welcome message`
      );
      return;
}

exports.info = {
name: 'setwelcomemessage',
  aliases:["welcomemessage", "welcomemsg", "setwelcomemsg"],
  description: "sets the welcome message. To mention the new member, use $MEMBER$\nTo mention the server name, use $SERVER$",
  usage: "<message>"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}
