module.exports.info = {
  name: "setprefix",
  description: "Set a new prefix for your server",
  usage: "<new_prefix>",
  aliases: []
};
module.exports.run=async(bot,message,args)=>{
  if (message.member.hasPermission("MANAGE_GUILD")||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")){
    if (!args[0]) {
        return message.mentionReply(
          "<:tairitsuno:801419553933492245> | Please add a new prefix!"
        );
      }

      let prefix = bot.db.set(`${message.guild.id}_prefix`, args.slice().join(" "));


      console.log(prefix);

      message.noMentionReply(`<:hikariok:801419553841741904> | Prefix set to \`${prefix}\`!`);

      return;
    } else return;
}
exports.conf={
  cooldown: 0,
  dm: "no"
}