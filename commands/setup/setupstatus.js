const { MessageEmbed } = require("discord.js");
const sendError =require("../../util/success.js")
exports.conf={
  cooldown: 0,
  dm: "no"
}
exports.run = (bot, message, args) => {
  let perm=message.channel.permissionsFor(message.member)//perm.has()
      if (!perm.has("MANAGE_GUILD")&&!bot.config.owners.includes(message.author.id)&&!perm.has("MANAGE_CHANNELS")&&!perm.has("ADMINISTRATOR"))
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't use that command! you need at least manage channels, manage server or admin perm!"
      );
    let autorole = `<@&`+bot.db.get(`${message.guild.id}_autorole`)+`>`;
      let log = bot.db.get(`${message.guild.id}_botlog`)+`>`;
      let welcomemessage = "`"+bot.db.get(`${message.guild.id}_welcomemessage`)+"`";
      let leavemessage = "`"+bot.db.get(`${message.guild.id}_leavemessage`)+"`";
      let welcomemessagesend = `<#`+bot.db.get(`${message.guild.id}_welcomechannel`)+`>`;
      let leave = `<#`+bot.db.get(`${message.guild.id}_leavechannel`)+`>`;
      let mute =`<@&`+bot.db.get(`${message.guild.id}_muterole`)+`>`;
      let verifychannel = `<#`+bot.db.get(`${message.guild.id}_verifychannel`)+`>`;
      let verifyrole = `<@&`+bot.db.get(`${message.guild.id}_verifyrole`)+`>`;
      if (!bot.db.get(`${message.guild.id}_autorole`)) autorole = process.env.EMOTE_NO || "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_botlog`)) log = process.env.EMOTE_NO ||  "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_welcomemessage`)) welcomemessage = process.env.EMOTE_NO ||  "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_leavemessage`)) leavemessage = process.env.EMOTE_NO ||  "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_welcomechannel`))welcomemessagesend = process.env.EMOTE_NO ||  "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_leavechannel`)) leave = process.env.EMOTE_NO ||  "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_muterole`)) mute = process.env.EMOTE_NO ||  "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_verifychannel`)) verifychannel = process.env.EMOTE_NO ||  "<:hikarisorry:801419553892073483>";
      if (!bot.db.get(`${message.guild.id}_verifyrole`)) verifyrole = process.env.EMOTE_NO || "<:hikarisorry:801419553892073483>";
      
      const embed = new MessageEmbed()
        .setTitle(
          `Settings for ${message.guild.name}, if some setting has <:hikarisorry:801419553892073483> , that means you haven't setup for this setting yet, else if you have setting, it will show you what thing did you setting`
        )
        .setDescription(`${autorole} : welcome auto role
${log} : bot log
${welcomemessage} : welcome message
${leavemessage} : leave message
${welcomemessagesend} : welcome channel
${leave} : Leave channel
${mute} : mute role
${verifychannel} : verify channel
${verifyrole} :verified role`)
        .setTimestamp();
      message.noMentionReply(embed);
      return;
  }

exports.info = {
name: 'setupstatus',
  aliases:["setupstat","setupstats","setup-ststus","setup-stat","setup-stats"],
  description: "showing the setup status",
  usage: ""
}