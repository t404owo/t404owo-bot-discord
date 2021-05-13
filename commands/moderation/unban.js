const fs = require("fs");
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  
 const permissions = message.channel.permissionsFor(message.client.user);
  if(!permissions.has("BAN_MEMBERS")) return message.channel.send("<:koucry:801419554311241728> | <@!"+message.author.id+">, I don't have permission to unban!!!");
 if (!message.member.hasPermission("BAN_MEMBERS")&&!message.member.hasPermission("MANAGE_MEMBERS")&&!message.member.hasPermission("MANAGE_GUILD")&&!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send("<:tairitsuno:801419553933492245> | <@!"+message.author.id+">, You don't have permission to unban!!!");
  if(!args[0]){return}
  let bannedMember = args[0].replace("<@!", "").replace(">", "").replace("<@", "")
  if(!bannedMember)return message.reply("⚠ |Please mention the person who you want to unban");
  
  let reason = args.slice(1).join(" ");
      if (!reason) reason = "-";
  let reasonb= args.slice(1).join(" ");
  try{
    message.guild.fetchBans().then( bans =>{
    message.guild.members.unban(bannedMember)
    })
  }catch(error){
    console.log(error)
  }
    if(reasonb){
      message.channel.send(`<:hikariok:801419553841741904> | Unbanned successfully **|** ${reason}`);
    }
    if(!reasonb){
    message.channel.send(`<:hikariok:801419553841741904> | Unbanned successfully`);
    }
  return
}


exports.info = {
  name: 'unban',
  aliases: [],
  usage: "<user_id>",
  description: "unban a member",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}