const { MessageEmbed, Permissions } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs=require('fs')
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
const slash_commands = [];
exports.run = async (bot, message, args) => {
  let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has(Permissions.FLAGS.MANAGE_GUILD)&&!bot.config.owners.includes(message.author.id)&&!perm.has(Permissions.FLAGS.MANAGE_CHANNELS)&&!perm.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
      else{
if(!message.guild)return

         rest.put(
			Routes.applicationGuildCommands(bot.user.id.toString(), message.guild.id.toString()),
			{ body: bot.application_commands },
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
