
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  //console.log(message.member)
  const permissions = message.channel.permissionsFor(message.client.user);
  let perm=message.channel.permissionsFor(message.member)//perm.has()
  if(!permissions.has("KICK_MEMBERS")) return message.noMentionReply("<:koucry:801419554311241728> | I don't have permission to ban!!!");
 if (!perm.has("KICK_MEMBERS")&&!perm.has("MANAGE_GUILD")&&!perm.has("MANAGE_MEMBERS")&&!perm.has("ADMINISTRATOR"))
        return message.mentionReply("<:tairitsuno:801419553933492245> | You don't have permission to kick!!!");

 if (!args[0]) {
        return message.mentinReply(
          "⚠ |Please mention or give the id of the person who you want to kick"
        );
      }
      let target = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => { return message.mentionReply("<:tairitsuno:801419553933492245> | Unable to find this Person") });

      if (target === !args[0]) {
        return message.mentionReply(
          "⚠ |Please mention or give the id of the person who you want to kick"
        );
      }
      
      if (target.id === message.author.id) {
        return message.mentionReply("<:tairitsuno:801419553933492245> | You can not kick yourself");
      }
  let tar=message.channel.permissionsFor(target)//perm.has()
      if (tar.has("ADMINISTRATOR")){
        return message.mentionReply("<:tairitsuno:801419553933492245> | The user you want to kick is a moderator/administrator I can't do that,try to kick him/her/them yourself..");
  }
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "-";
      message.noMentionReply("kicking...")
      .then(msg => {
        let reasonb = args.slice(1).join(" ");
        target.kick({reason: reason+` || by ${message.member.user.tag}`});
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