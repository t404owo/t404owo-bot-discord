const { MessageEmbed, Permissions } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs=require('fs')
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);
const slash_commands = [];
exports.run = async (bot, message, args) => {
  let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has(Permissions.FLAGS.MANAGE_GUILD)&&!bot.config.owners.includes(message.author.id)&&!perm.has(Permissions.FLAGS.MANAGE_CHANNELS)&&!perm.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
      else{
if(!message.guild)return
        
        fs.readdir("./src/commands/", (err, categories) => {
	if (err) console.log(err);
  categories.forEach(category => {
    let moduleConf = require(`../${category}/module.json`);
    moduleConf.path = `../${category}`;
    moduleConf.cmds = [];
    if (!moduleConf) return;
    bot.helps.set(category, moduleConf);

    fs.readdir(`./src/commands/${category}`, (err, files) => {
      if (err) console.log(err);

      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let prop = require(`../${category}/${file}`);
        let cmdName = file.split(".")[0];
        if(!prop.options||!prop.interaction)return
        
      

        bot.helps.get(category).cmds.push(prop.info.name);

/*bot.api.applications(bot.user.id).guilds(message.guild.id).commands.post({
        data: {
            name: prop.info.name,
            description: prop.info.description,
	     options:prop.options
        }
    });//command for slash*/
        let data= {
            name: prop.info.name,
             name_localizations: undefined,
            description: prop.info.description,
            description_localizations: undefined,
	     options:prop.options
        }
           slash_commands.push(data)

 })
})
})
})
        await rest.put(
			Routes.applicationGuildCommands(bot.user.id, message.guild.id.toString()),
			{ body: slash_commands },
		);
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