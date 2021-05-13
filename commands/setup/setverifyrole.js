const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.run = (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
      const setup = args.slice().join(" ");
if (!setup)
    
      if (!setup||isNaN(setup.replace("<@&", "").replace("<@", "").replace(">", "")))
        return message.channel.send(
          `<:tairitsuno:801419553933492245> | <@!${message.author.id}>, Please send a verify role id with this format ${bot.config.prefix}setverifyrole [verified role id]`
        );
      bot.db.set(`${message.guild.id}_verifyrole`, setup.replace("<@&", "").replace("<@", "").replace(">", ""))
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup verified role`
      );
      return;
}
}
exports.info = {
name: 'setverifyrole',
  aliases:['setverifyrole','setverifiedrole','verifiedrole'],
  description: "sets the verify role",
  usage: "<role_id/role_tag>"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}