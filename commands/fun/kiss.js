exports.run = async (bot, message, args) => {
  const { MessageEmbed }= require("discord.js")


 let userm;
  let author;
  let usern;
  const fetch= require("node-fetch"),main = await fetch("https://nekos.life/api/v2/img/kiss"), mat = await main.json();
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
return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | Remember to mention a valid user to kiss!');
}
    
  let embed = new MessageEmbed()
  .setTitle(`${author.username} gives ${usern.username} a big kiss <3 <3!!! Much love!`)
  .setImage(mat.url)
  .setColor('RANDOM')
  .setTimestamp()
  .setFooter("Kissu, kissu, kissu")
  message.channel.send(embed)
  
}
exports.info = {
  name: 'kiss',
  aliases:[],
  description: "kiss a user",
  usage: "<user_id/mention/\"me\">",
}
exports.conf={
  cooldown: 0,
  dm: "yes"
}