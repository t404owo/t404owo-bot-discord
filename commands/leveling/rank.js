const { MessageAttachment, MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
  if(args[0] === "global")
    {
let usera;
let x;
  if(!args[1]){
           usera = message.author
           x = usera
         }else{  
         usera = await message.guild.members.fetch(args[1].replace("<@!", "").replace("<@", "").replace(">", ""))
           x = usera.user
         }
  let level = client.db.get(`level_${x.id}`) || 1;
  let exp = client.db.get(`xp_${x.id}`);
  let neededXP = Math.floor(Math.pow(level / 0.1, 2));

  let every = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
  let rank = every.map(x => x.ID).indexOf(`xp_${x.id}`) + 1;
  const card = new MessageEmbed()
    .setTitle(`Global level Card From: ${x.username}#${x.discriminator}`)
    .addField("Level", level)
    .addField("XP", `${exp}/${neededXP}`)
   if(usera.id === message.author.id) {card.setFooter("You're now currently on rank #"+rank)}
  if(usera.id !== message.author.id) {card.setFooter("That user is/are on rank #"+rank)}
  

card.setColor(x.displayHexColor === "#000000" ? "#ffffff" : x.displayHexColor)
     if(x.displayAvatarURL()) card.setThumbnail(x.displayAvatarURL({ dynamic: true }))
  
  return message.noMentionReply(card);
}

if(!message.guild) return;
  let usera;
let x;
  let ao= message.guild.id;
  if(!args[0]){
           usera = message.author
           x = usera
         }else{  
         usera = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", ""))
           x = usera.user
         }
  let level = client.db.get(`${ao}level_${x.id}`) || 1;
  let exp = client.db.get(`${ao}xp_${x.id}`);
  let neededXP = Math.floor(Math.pow(level / 0.1, 2));

  let every = client.db.all().filter(i => i.ID.startsWith(`${ao}xp_`)).sort((a, b) => b.data - a.data);
  let rank = every.map(x => x.ID).indexOf(`${ao}xp_${x.id}`) + 1;
  const card = new MessageEmbed()
    .setTitle(`Level Card From: ${x.username}#${x.discriminator}`)
    .addField("Level", level)
    .addField("XP", `${exp}/${neededXP}`)
   if(usera.id === message.author.id) {card.setFooter("You're now currently on rank #"+rank)}
  if(usera.id !== message.author.id) {card.setFooter("That user is/are on rank #"+rank)}
  

card.setColor(x.displayHexColor === "#000000" ? "#ffffff" : x.displayHexColor)
     if(x.displayAvatarURL()) card.setThumbnail(x.displayAvatarURL({ dynamic: true }))
  
  return message.noMentionReply(card);
};

module.exports.info = {
  name: "rank",
  aliases: ["lvl", "level"],
  description: "Shows your or a user's rank card",
  usage: "(<user_id_or_mention>)"
};
exports.conf={
  cooldown: 0,
  dm: "yes"
}