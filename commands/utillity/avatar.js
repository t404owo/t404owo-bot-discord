let discord = require('discord.js')
const fs = require("fs");
exports.run = async (bot, message, args) => {

  let use;

    if (!args[0]) {
      use = message.member;
    } else {
      if(!message.guild) return;
      use = await message.guild.members.fetch(args[0].replace("<@!","").replace("<@", "").replace(">","")).catch(err => { return message.channel.send("<:tairitsuno:801419553933492245> | Please Mention a correct user or give a correct id of the user!") })
    
    }

    if (!use) {
      return message.channel.send("<:tairitsuno:801419553933492245> | Unable to find this person!")
    }
  if(message.author.id === "770304260919001159"){
   
              
  
  }
  // user.avatarURL({dynamic: true, size: 1024});
  console.log(use.user.avatarURL({dynamic: true, size: 1024}))
  let embed = new discord.MessageEmbed()
  .setTitle(`${use.user.tag}`)
  .setDescription(`[Avatar link]`+`(${use.user.avatarURL({dynamic: true, size: 1024})})`)
  .setImage(`${use.user.avatarURL({dynamic: true, size: 1024})}`)
  .setColor(use.displayHexColor === "#000000" ? "#ffffff" : use.displayHexColor)
  message.channel.send(embed)
  
}
exports.info = {
  name: 'avatar',
  aliases: ["av", "pfp"],
  usage: "<user_id/mention/blank>",
  description: "Get a user's avatar."
}//
exports.conf={
  cooldown: 0,
  dm: "yes"
}