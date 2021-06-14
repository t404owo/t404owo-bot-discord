let error=require("../../util/error")
let success=require("../../util/success")
exports.conf = {
  cooldown: 0,
  dm: "no"
};
module.exports.run = async (bot, message, args) => {
  let { MessageEmbed } = require("discord.js");
  if (!args[0])
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please give a Name to find the character/npc/Tupper"
    );
  let a = args.slice().join(" ");

  let embed = new MessageEmbed(),
    tupper = bot.db.get(`${message.guild.id}npcname_${a.toLowerCase()}`);
  if (!tupper)
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc is not existing in this server!"
    );
  message.noMentionReply(
    embed
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
      .setTitle(`__${bot.db.get(`${message.guild.id}npcname_${a.toLowerCase()}`)}__'s info`)
      .setDescription(`\n${bot.db.get(`${message.guild.id}npcdesc_${a.toLowerCase()}`)||"No Description"}`)
      .addField("Name", `${bot.db.get(`${message.guild.id}npcname_${a.toLowerCase()}`)}`)
      .addField("Avatar", "[Click Here]"+ `(${bot.db.get(`${message.guild.id}npcav_${a.toLowerCase()}`)})`)
      .setThumbnail( `${bot.db.get(`${message.guild.id}npcav_${a.toLowerCase()}`)}`)
      
  );
};
module.exports.info = {
  name: "npcinfo",
  description: "Get the info of a mentioned Tupper/npc",
  usage: "<npc_name>",
  aliases: [
    "tupperinfo",
    "npci",
    "tupperi"
  ]
};
