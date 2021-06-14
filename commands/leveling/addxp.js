const { MessageAttachment, MessageEmbed } = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let perm=message.channel.permissionsFor(message.member)//perm.has()
  if (!perm.has("MANAGE_GUILD")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
  let userm;
if (args[0]=== "me"||args[0]=== `<@!${message.author.id}>`) {
      userm = message.author
      message.mention= message.author
      if(args[0])message.xpadd= args[1]; else message.xpadd= args[0]
    } else if(args[0]){
      if(!message.guild)return;
      
      userm= await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => {
        userm = message.author
      message.mention= message.author
      message.xpadd= args[0];
        
        message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | EXP added successfully!")
        let a = message.guild.id;
  let xp = bot.db.add(`${a}xp_${message.mention.id}`, message.xpadd);
  let level = Math.floor(0.3 * Math.sqrt(xp));
  let lvl =
    bot.db.get(`${a}level_${message.mention.id}`) ||
    bot.db.set(`${a}level_${a}xp_${message.mention.id}`, 1);
  if (level > lvl) {
    let newLevel = bot.db.set(`${a}level_${message.mention.id}`, level);
    if (bot.db.get(`${message.mention.id}_lvlupmsg`)=== "no") return;
    message.channel
      .send(
        `<@!${message.mention.id}> is now on level ${newLevel} in this server!`
      )
      .then(ms => {
        ms.delete({ timeout: "5000" });
      });
  }
        return
      })
      message.mention =userm.user
      //userm =use.user
      
    }
  
  
  
let a = message.guild.id;
  let xp = bot.db.add(
    `${a}xp_${message.mention.id}`,
    message.xpadd
  );
  let level = Math.floor(0.3 * Math.sqrt(xp));
  let lvl =
    bot.db.get(`${a}level_${message.mention.id}`) ||
    bot.db.set(`${a}level_${a}xp_${message.mention.id}`, 1);
  if (level > lvl) {
    let newLevel = bot.db.set(`${a}level_${message.mention.id}`, level);
    if (bot.db.get(`${message.mention.id}_lvlupmsg`)=== "no") return;
    message.channel
      .send(
        `<@!${message.mention.id}> is now on level ${newLevel} in this server!`
      )
      .then(ms => {
        ms.delete({ timeout: "5000" });
      });
  }
};

module.exports.info = {
  name: "addxp",
  aliases: ["addexp", "expadd", "xpadd"],
  description: "Add EXP",
  usage: "(<user_id/mention>)"
};
exports.conf={
  cooldown: 0,
  dm: "yes"
}