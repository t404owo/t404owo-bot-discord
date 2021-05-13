const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
      const setup = args.slice().join(" ");
      if (!setup)
        return message.channel.send(
          `<:tairitsuno:801419553933492245> | <@!${message.author.id}>, Please send a welcome message with this format\`` +
            bot.config.prefix +
            `setwelcomemessage [welcome message] ` +
          'To mention the new member\'s name, use $MEMBER$\nTo mention the new member, use $MENTION$\nTo mention the server name, use $SERVER$'+  
":" +
            "/"
        );
      bot.db.set(`${message.guild.id}_welcomemessage`, setup)
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup welcome message`
      );
      return;
}
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
