
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  //console.log(message.member)
 const permissions = message.channel.permissionsFor(message.client.user);
  if(!permissions.has("KICK_MEMBERS")) return message.channel.send("<:koucry:801419554311241728> | <@!"+message.author.id+">, I don't have permission to kick!!!");
 if (!message.member.hasPermission("KICK_MEMBERS")&&!message.member.hasPermission("MANAGE_GUILD")&&!message.member.hasPermission("MANAGE_MEMBERS")&&!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send("<:tairitsuno:801419553933492245> | <@!"+message.author.id+">, You don't have permission to kick!!!");
  if (!args[0]) {
        return message.channel.send(
          "⚠ |Please mention or give the id of the person who you want to kick"
        );
      } 
      let target = bot.users.cache.get(args[0].replace("<@!", "").replace("<@", "").replace(">", ""));

      if (target === !args[0]) {
        return message.channel.send(
          "⚠ |Please mention the person who you want to kick"
        );
      }
     const targe =  message.guild.member(target)
      
      if (targe.id === message.author.id) {
        return message.channel.send("<:tairitsuno:801419553933492245> | You can not kick yourself");
      }
      if(targe.hasPermission("ADMINISTRATOR")){
        return message.channel.send("<:tairitsuno:801419553933492245> | <@!"+message.author.id+">, The user you want to kick is a moderator/administrator, I can't do that,try to kick him/her/them yourself...");
  }
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "-";
      message.channel.send("kicking...")
  
      .then(msg => {
        let reasonb= args.slice(1).join(" ");
        
        targe.kick({reason: reason+` || by ${message.member.user.tag}`});
      if(!reasonb){
        msg.edit(`<:hikariok:801419553841741904> | Kicked sucessfully`)
        };
      if(reasonb) {
        msg.edit(`<:hikariok:801419553841741904> | Kicked sucessfully **|** ${reason}`);}
    });
      
}


exports.info = {
  name: 'kick',
  aliases:[],
  usage: "<user_id_or_mention>",
  description: "kicks a member"
}//checked
exports.conf={
  cooldown: 0,
  dm: "no"
}