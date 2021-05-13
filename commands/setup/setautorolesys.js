const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
exports.run = (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
      let setup;
   if(args[0]==="enable"||args[0]==="on"){
     setup="enabled"
   } else if(args[0]==="disable"||args[0]==="off"){
      setup="disabled"
   }
     else
   {
return sendError("please give enable, on, disable or off as command's argument",message.channel)
}
      
      let a=bot.db.set(`${message.guild.id}_autorolesys`, setup)
      
      message.channel.send(
        `<:hikariok:801419553841741904> | Auto role system is ${a}`
      );
      return;
}
}
exports.info = {
name: 'setautorolesystem',
  aliases:["autorolesystem","autorolesys","setautorolesys"],
  description: "turn the auto role system(for members who joins this server(recommend to turn off if your community servers has Rule screenings))",
  usage: "<\"on\"/\"off\"/\"enable\"/\"disable\">"
}
