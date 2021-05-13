const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
exports.run = (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
      const setup = args.slice().join(" ");
    
      if(isNaN(args[0].replace("m", "").replace("d", "").replace("ms", "").replace("h", "").replace("s", ""))){
        return message.channel.send(`<:tairitsuno:801419553933492245> | <@!${message.author.id}>, please give nummerical numbers or <number>ms/<number>s/<number>m/<number>h/<number>d`)
      }
      bot.db.set(`${message.guild.id}_mutetime`, require("ms")(args[0]))
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup mute time`
      );
      return;
}
}
exports.info = {
name: 'setmutetime',
  aliases:["mutetime"],
  description: "sets the mute role",
  usage: "<muterole_id/muterole_tag>"
}
