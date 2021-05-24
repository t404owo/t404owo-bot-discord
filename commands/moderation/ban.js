
const Discord = require('discord.js')
//checked
exports.run = (bot, message, args) => {
  //console.log(message.member)
  const permissions = message.channel.permissionsFor(message.client.user);
  if(!permissions.has("BAN_MEMBERS")) return message.noMentionReply("<:koucry:801419554311241728> | I don't have permission to ban!!!");
 if (!message.member.hasPermission("BAN_MEMBERS")&&!message.member.hasPermission("MANAGE_GUILD")&&!message.member.hasPermission("MANAGE_MEMBERS")&&!message.member.hasPermission("ADMINISTRATOR"))
        return message.mentionReply("<:tairitsuno:801419553933492245> | You don't have permission to ban!!!");

 if (!args[0]) {
        return message.mentinReply(
          "⚠ |Please mention or give the id of the person who you want to ban"
        );
      }
      let target = bot.users.cache.get(args[0].replace("<@!", "").replace("<@", "").replace(">", ""));
const targe =  message.guild.member(target)
      if (target === !args[0]) {
        return message.mentionReply(
          "⚠ |Please mention or give the id of the person who you want to ban"
        );
      }
      
      if (targe.id === message.author.id) {
        return message.mentionReply("<:tairitsuno:801419553933492245> | You can not ban yourself");
      }
      if (targe.hasPermission("ADMINISTRATOR")/*hasPermission("ADMINISTRATOR")*/){
        return message.mentionReply("<:tairitsuno:801419553933492245> | The user you want to ban is a moderator/administrator I can't do that,try to ban him/her/them yourself..");
  }
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "-";
      message.noMentionReply("banning...")
      .then(msg => {
        let reasonb = args.slice(1).join(" ");
        targe.ban({reason: reason+` || by ${message.member.user.tag}`});
        if(!reasonb){
        msg.edit(`<:hikariok:801419553841741904> | Banned sucessfully`)
        };
      if(reasonb) {
        msg.edit(`<:hikariok:801419553841741904> | Banned sucessfully **|** ${reason}`);}
    });
      
}


exports.info = {
  name: 'ban',
  aliases: [],
  usage: "<user_id_or_mention>",
  description:"ban a user"
}
exports.conf={
  cooldown: 0,
  dm: "no"
}