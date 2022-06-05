const Discord = require('discord.js')
//checked
const { Permissions } = require('discord.js')
exports.run = async (bot, message, args) => {
  //console.log(message.member)
  const permissions = message.channel.permissionsFor(message.client.user);
  let perm=message.channel.permissionsFor(message.member)//perm.has()
  if(!permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.noMentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I don't have permission to ban!!!");
 if (!perm.has(Permissions.FLAGS.BAN_MEMBERS)&&!perm.has(Permissions.FLAGS.MANAGE_GUILD)&&!perm.has(Permissions.FLAGS.MANAGE_MEMBERS)&&!perm.has(Permissions.FLAGS.ADMINISTRATOR))
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You don't have permission to ban!!!");

 if (!args[0]) {
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" |Please mention or give the id of the person who you want to ban"
        );
      }
      let target = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this Person") });

      if (target === !args[0]) {
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please mention or give the id of the person who you want to ban"
        );
      }
      
      if (target.id === message.author.id) {
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can not ban yourself");
      }
  let tar=message.channel.permissionsFor(target)//perm.has()
      if (tar.has(Permissions.FLAGS.ADMINISTRATOR)){
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | The user you want to ban is a moderator/administrator I can't do that, try to ban him/her/them yourself...");
  }
  let BotRole = message.guild.members.cache.get(message.client.user.id).roles.highest.position;

    let Role = target.roles.highest.position;

    let UserRole = message.member.roles.highest.position;

    if (UserRole <= Role) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You can\'t ban that user because that user has a role position which is higher than yours, or has a same role position as you!');
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "-";
      message.noMentionReply("banning...")
      .then(msg => {
        let reasonb = args.slice(1).join(" ");
        target.ban({reason: reason+` || by ${message.member.user.tag}`});
        if(!reasonb){
        msg.edit({content:`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Banned sucessfully`})
        };
      if(reasonb) {
        msg.edit({content:`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Banned sucessfully **|** ${reason}`});}
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
