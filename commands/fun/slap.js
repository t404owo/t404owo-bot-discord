
exports.run = async (bot, message, args) => {
let discord=require('discord.js')

let userm;
  let author;
  let use;
  let usern;
  const fetch= require("node-fetch"),main = await fetch("https://nekos.life/api/v2/img/slap"), mat = await main.json();
if (args[0]=== "me"||args[0]=== `<@!${message.author.id}>`) {
      userm = message.author
      usern= message.author
      author = bot.user
    } else if(args[0]){
      if(!message.guild) return;
      userm = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Remember to mention a valid user to hug!") })
      usern =userm.user
      //userm =use.user
      author = message.author
    }
  
  if(!userm||!args[0]) {
return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | Remember to mention a valid user to slap!');
}
    
         
    let embed = new discord.MessageEmbed()
    .setTitle(`${author.username} slaps ${usern.username}, ouch!!!`)
    .setImage(mat.url)
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter("ouch!")
    message.channel.send(embed)
    
  }
  exports.info = {
    name: 'slap',
  aliases:[],
  description: "slap a user",
  usage: "<user_id_or_mention>",
  }
exports.conf={
  cooldown: 0,
  dm: "no"
}