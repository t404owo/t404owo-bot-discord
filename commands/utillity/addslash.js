const { MessageEmbed } = require("discord.js");

const sendError =require("../../util/success"), fs=require('fs')
exports.run = (bot, message, args) => {
  let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has("MANAGE_GUILD")&&!bot.config.owners.includes(message.author.id)&&!perm.has("MANAGE_CHANNELS")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
      else{
if(!message.guild)return
        
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

bot.api.applications(bot.user.id).guilds(message.guild.id).commands.post({
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
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Slash command succesfully exported!`
      );
      }
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