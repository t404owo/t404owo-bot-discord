const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
      const setup = args.slice().join(" ");
      if (!setup)
        return message.mentionReply(
          `<:tairitsuno:801419553933492245> | Please send a leave message with this format\`` +
            bot.config.prefix +
            `setleavemessage [goodbye message]` +
          ' To mention the leave member, use $MEMBER$\nTo mention the server name, use $SERVER$'+  
            ":" +
            "/"
        );
      bot.db.set(`${message.guild.id}_leavemessage`, setup)
      message.noMentionReply(
        `<:hikariok:801419553841741904> | Successfully setup goodbye/leave`
      );
      return;
}
}
exports.info = {
name: 'setleavemessage',
  aliases:["leavemessage", "leavemsg", "setleavemsg","setgoobyemessage","goodbyemessage","setgoodbyemessage","setgoodbyemsg","goodbyemsg"],
  description: "sets the goodbye/leave message, To mention the new member, use $MENTION$\nTo mention the name of new member, use $MEMBER$\nTo mention the server name, use $SERVER$",
  usage: "<message>"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}

