const fs = require("fs");
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  
 const permissions = message.channel.permissionsFor(message.client.user);
  let perm=message.channel.permissionsFor(message.member)//perm.has()
  if(!permissions.has("BAN_MEMBERS")) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I don't have permission to unban!!!");
 if (!perm.has("BAN_MEMBERS")&&!perm.has("MANAGE_MEMBERS")&&!perm.has("MANAGE_GUILD")&&!perm.has("ADMINISTRATOR"))
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You don't have permission to unban!!!");
  if(!args[0]){return}
  let bannedMember = args[0].replace("<@!", "").replace(">", "").replace("<@", "")
  if(!bannedMember)return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please mention the person who you want to unban");
  
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
      message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Unbanned successfully **|** ${reason}`);
    }
    if(!reasonb){
    message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Unbanned successfully`);
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