module.exports.info = {
  name: "prefix",
  description: "Set a new prefix for your server or it shows the prefix of this server",
  usage: "(new_prefix)",
  aliases: []
};
module.exports.run=async(bot,message,args)=>{
      if (args[0]) {
        if(!message.guild) return;
  if (message.member.hasPermission("ADMINISTRATOR")||message.member.hasPermission("MANAGE_SERVER")) {
        

      let prefix = bot.db.set(`${message.guild.id}_prefix`, args.slice().join(" ").toLowerCase());


      console.log(prefix);

      message.channel.send(`<:hikariok:801419553841741904> | Prefix set to \`${prefix}\`!`);

      return;
    } else return message.channel.send(`Prefix is \`${bot.config.prefix}\`, but you can also <@!${bot.user.id}> me`)
      }else message.channel.send(`Prefix is \`${bot.config.prefix}\`, but you can also <@!${bot.user.id}> me`)
}
exports.conf={
  cooldown: 0,
  dm: "yes"
}