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
          `<:tairitsuno:801419553933492245> | <@!${message.author.id}>, Please send a mute role id with this format ${bot.config.prefix}setmuterole [mute role id]`
        );
      bot.db.set(`${message.guild.id}_muterole`, setup.replace("<@&", "").replace("<@", "").replace(">", ""))
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup mute role`
      );
      return;
}
}
exports.info = {
name: 'setmuterole',
  aliases:["muterole"],
  description: "sets the mute role",
  usage: "<muterole_id/muterole_tag>"
}
