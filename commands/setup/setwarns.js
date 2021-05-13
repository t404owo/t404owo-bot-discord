const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
exports.run = (bot, message, args) => {
        if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
    if(isNaN(args[0])&&!isNaN(args[1])){
      const setup = args[1]
      if(args[0].toLowerCase()==="mute"){
    
     
      bot.db.set(`${message.guild.id}_warnmute`, setup)
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup warn, the member will be **muted** if he/she gets **${args[1]}** warns`
      );
      return;
      }
      else if(args[0].toLowerCase()==="kick"){
     
    
      
      bot.db.set(`${message.guild.id}_warnkick`, setup)
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup warn, the member will be **kicked** if he/she gets **${args[1]}** warns`
      );
      return;
      }
      else if(args[0].toLowerCase()==="ban"){
      
    
      
      bot.db.set(`${message.guild.id}_warnban`, setup)
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup warn, the member will be **banned** if he/she gets **${args[1]}** warns`
      );
      return;
      } else return
      }
          
      else if(isNaN(args[1])&&!isNaN(args[0])){
      const setup = args[0]
      if(args[1].toLowerCase()==="mute"){
    
     
      bot.db.set(`${message.guild.id}_warnmute`, setup)
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup warn, the member will be **muted** if he/she gets **${args[0]}** warns`
      );
      return;
      }
      else if(args[1].toLowerCase()==="kick"){
     
    
      
      bot.db.set(`${message.guild.id}_warnkick`, setup)
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup warn, the member will be **kicked** if he/she gets **${args[0]}** warns`
      );
      return;
      }
      else if(args[1].toLowerCase()==="ban"){
      
    
      
      bot.db.set(`${message.guild.id}_warnban`, setup)
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Successfully setup warn, the member will be **banned** if he/she gets **${args[0]}** warns`
      );
      return;
      } else return
      }
          else return
}
}
exports.info = {
name: 'setwarn',
  aliases:["setwarns", "setwarning", "setwarnings"],
  description: "sets the auto role(the user is for example muted if he/she gets 2 warns)",
  usage: "<\"mute\"/\"kick\"/\"ban\"> <number>"
}
