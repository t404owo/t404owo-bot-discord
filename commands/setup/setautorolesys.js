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
      let setup;
   if(args[0]==="enable"||args[0]==="on"){
     setup="enabled"
   } else if(args[0]==="disable"||args[0]==="off"){
      setup="disabled"
   }
     else
   {
return sendError("please give enable, on, disable or off as command's argument",message)
}
      
      let a=bot.db.set(`${message.guild.id}_autorolesys`, setup)
      
      message.nomentionReply(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Auto role system is ${a}`
      );
      return;
}

exports.info = {
name: 'setautorolesystem',
  aliases:["autorolesystem","autorolesys","setautorolesys"],
  description: "turn the auto role system(for members who joins this server(recommend to turn off if your community servers has Rule screenings))",
  usage: "<\"on\"/\"off\"/\"enable\"/\"disable\">"
}
