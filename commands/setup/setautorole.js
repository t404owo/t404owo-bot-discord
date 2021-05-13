const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
exports.run = (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
      const setup = args.slice().join(" ");
    
      if (!setup||isNaN(setup.replace("<@&", "").replace("<@", "").replace(">", "")))
        return message.channel.send(
          `<:tairitsuno:801419553933492245> | <@!${message.author.id}>, Please send a auto role id with this format ${bot.config.prefix}setautorole [auto role id]`
        );
      bot.db.set(`${message.guild.id}_autorole`, setup.replace("<@&", "").replace("<@", "").replace(">", ""))
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup verified role`
      );
      return;
}
}
exports.info = {
name: 'setautorole',
  aliases:["autorole"],
  description: "sets the auto role(for members who joins this server(not recommended for community servers with Rule screenings))",
  usage: "<role_id/role_tag>"
}
