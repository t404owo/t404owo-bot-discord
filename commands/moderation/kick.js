const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  //console.log(message.member)
  const permissions = message.channel.permissionsFor(message.client.user);
  let perm=message.channel.permissionsFor(message.member)//perm.has()
  if(!permissions.has("KICK_MEMBERS")) return message.noMentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I don't have permission to kick!!!");
 if (!perm.has("KICK_MEMBERS")&&!perm.has("MANAGE_GUILD")&&!perm.has("MANAGE_MEMBERS")&&!perm.has("ADMINISTRATOR"))
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You don't have permission to kick!!!");

 if (!args[0]) {
        return message.mentinReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" |Please mention or give the id of the person who you want to kick"
        );
      }
      let target = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this Person") });

      if (target === !args[0]) {
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please mention or give the id of the person who you want to kick"
        );
      }
      
      if (target.id === message.author.id) {
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can not kick yourself");
      }
  let tar=message.channel.permissionsFor(target)//perm.has()
      if (tar.has("ADMINISTRATOR")){
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | The user you want to kick is a moderator/administrator I can't do that,try to kick him/her/them yourself..");
  }
  let BotRole = message.guild.member(message.guild.me).roles.highest.position;

    let Role = target.roles.highest.position;

    let UserRole = message.member.roles.highest.position;

    if (UserRole <= Role) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You can\'t kick that user because that user has a role position which is higher than yours, or has a same role position as you!');
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "-";
      message.noMentionReply("kicking...")
      .then(msg => {
        let reasonb = args.slice(1).join(" ");
        target.kick({reason: reason+` || by ${message.member.user.tag}`});
        if(!reasonb){
        msg.edit(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Kicked sucessfully`)
        };
      if(reasonb) {
        msg.edit(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Kicked sucessfully **|** ${reason}`);}
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
