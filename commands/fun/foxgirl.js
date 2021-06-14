const fs = require("fs");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = require('nekos.life');
const neko = new client();
module.exports.run = async (bot, message, args, tools) => {

  //start the command with a language
  
  

  if(message.channel.nsfw!== true) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This is not a NSFW channel!")
  const mat = await neko.sfw.foxGirl();
  const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("This is your Fox Girl OwU")
    .setImage(mat.url);
  
  message.noMentionReply(embed)
 
};

exports.info = {
  name: 'foxgirl',
usage: "",
  description: "sends a foxgirl **(NSFW foxgirl only for nsfw channels)**",
  enabled: true,
  guildOnly: false,
  aliases: ["fox_girl", "fox-girl"],
  permLevel: 0
};
exports.conf={
  cooldown: 0,
  dm: "yes"
}