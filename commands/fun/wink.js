exports.run = async (bot, message, args) => {
  let discord = require('discord.js')
  const { MessageEmbed } = require('discord.js');
const fetch= require("node-fetch"),main = await fetch("https://some-random-api.ml/animu/wink"), mat = await main.json();
        

        
           

       
    

 let userm;
  let author;
  let use;
  let usern;
 
if (args[0]=== "me"||args[0]=== `<@!${message.author.id}>`) {
      userm = message.author
      usern= message.author
      author = bot.user
    } else if(args[0]){
      if(!message.guild) return;
      userm = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Remember to mention a valid user to wink!") })
      usern =userm.user
      //userm =use.user
      author = message.author
    }
  
  if(!userm||!args[0]) {
let emb = new discord.MessageEmbed()
  .setTitle(`${message.author.username} winks!`)
  .setImage(mat.link)
  .setColor('RANDOM')
  .setTimestamp()
  return message.channel.send(emb)
}
    
  let embed = new discord.MessageEmbed()
  .setTitle(`${author.username} gives ${usern.username} a wink!`)
  .setImage(mat.link)
  .setColor('RANDOM')
  .setTimestamp()
  message.channel.send(embed)
  
}
exports.info = {
  name: 'wink',
  aliases: [],
  description: "winks (to a user)",
  usage: "(<user_id/mention/\"me\">)",
}
exports.conf={
  cooldown: 0,
  dm: "yes"
}