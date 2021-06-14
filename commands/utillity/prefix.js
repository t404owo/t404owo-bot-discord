module.exports.info = {
  name: "prefix",
  description: "Set a new prefix for your server or it shows the prefix of this server",
  usage: "(new_prefix)",
  aliases: []
};
module.exports.run=async(bot,message,args)=>{
      if (args[0]) {
        if(!message.guild) return;
        let perm=message.channel.permissionsFor(message.member)//perm.has()
  if (perm.has("ADMINISTRATOR")||perm.has("MANAGE_SERVER")) {
        

      let prefix = bot.db.set(`${message.guild.id}_prefix`, args.slice().join(" ").toLowerCase());
if(args.slice().join(" ").toLowerCase()==='+')bot.db.delete(`${message.guild.id}_prefix`)

      console.log(prefix);

      message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Prefix set to \`${prefix}\`!`);

      return;
    } else return message.noMentionReply(`Prefix is \`${bot.config.prefix}\`, but you can also <@!${bot.user.id}> me`)
      }else message.noMentionReply(`Prefix is \`${bot.config.prefix}\`, but you can also <@!${bot.user.id}> me`)
}
exports.options=[]
module.exports.interaction=async(bot,message,args)=>{
  let interaction=message
      bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                      content:`Prefix is \`${bot.config.prefix}\`, but you can also <@!${bot.user.id}> me`
                    }
                }
            })
}
exports.conf={
  cooldown: 0,
  dm: "yes"
}