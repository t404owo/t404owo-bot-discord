const { MessageEmbed } = require("discord.js");

const sendError =require("../../util/success"), fs=require('fs')
exports.run = (bot, message, args) => {
  
      if (message.member.hasPermission("MANAGE_GUILD")||bot.config.owners.includes(message.author.id)||message.member.hasPermission("MANAGE_CHANNELS")||message.member.hasPermission("ADMINISTRATOR")||message.guild){

      
    fs.readdir("./commands/", (err, categories) => {
	if (err) console.log(err);
  categories.forEach(category => {
    let moduleConf = require(`../${category}/module.json`);
    moduleConf.path = `../${category}`;
    moduleConf.cmds = [];
    if (!moduleConf) return;
    bot.helps.set(category, moduleConf);

    fs.readdir(`./commands/${category}`, (err, files) => {
      if (err) console.log(err);

      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let prop = require(`../${category}/${file}`);
        let cmdName = file.split(".")[0];
        if(!prop.options||!prop.interaction)return
        
      

        bot.helps.get(category).cmds.push(prop.info.name);

bot.api.applications(bot.user.id).commands.post({
        data: {
            name: prop.info.name,
            description: prop.info.description,
	     options:prop.options
        }
    });//command for slash

 })
})
})
})
   return message.noMentionReply(
        `<:hikariok:801419553841741904> | Slash command succesfully exported!`
      );
      } else return message.mentionReply(
        "<:tairitsuno:801419553933492245> | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
}
exports.info = {
name: 'addslash',
  aliases:["slashadd", "add-slash", "slash-add"],
  usage: "",
  description: "Sets up the slash command for this server.",
}
exports.conf={
  cooldown: 0,
  dm: "yes"
}