
let discord = require('discord.js')
const fs = require("fs");
exports.run = async (bot, message, args) => {

  let use;

    if (!args[0]) {
      use = message.member;
    } else {
      if(!message.guild) return;
      use = await message.guild.members.fetch(args[0].replace("<@!","").replace("<@", "").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please Mention a correct user or give a correct id of the user!") })
    
    }

    if (!use) {
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this person!")
    }
 
  // user.avatarURL({dynamic: true, size: 1024});
  console.log(use.user.avatarURL({dynamic: true, size: 1024}))
  let embed = new discord.MessageEmbed()
  .setTitle(`${use.user.tag}`)
  
  .setImage(`${use.user.avatarURL({dynamic: true, size: 1024})}`)
  .setColor(use.displayHexColor === "#000000" ? "#ffffff" : use.displayHexColor)
  embed.setDescription(`[Original Avatar](${use.user.avatarURL({dynamic: true, size: 1024})}) | [png](${use.user.avatarURL({size: 1024, format:"png"})}) | [jpg](${use.user.avatarURL({size: 1024, format:"jpg"})}) | [webp](${use.user.avatarURL({size: 1024, format:"webp"})})`)

  
  message.reply({embeds:[embed], allowedMentions: { repliedUser: false }})
  
}
exports.interaction = async (bot, message, arg) => {
let args=[]
try{args=[arg._hoistedOptions[0].value]       
  
   }catch(e) {
      args = [message.member.user.id];
    } 
  let use;
      use = await bot.guilds.cache.get(message.guild.id).members.fetch(args[0].replace("<@!","").replace("<@", "").replace(">","")).catch(err => { return message.reply({content:`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please Mention a correct user or give a correct id of the user!"})})
    
    
    

    if (!use) {
      return message.reply({
        content: `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this person!"
      });
    }
  // user.avatarURL({size: 1024});
 // console.log(use.user.avatarURL({size: 1024}))
  let embed = new discord.MessageEmbed()
  .setTitle(`${use.user.tag}`)
  
  
  .setImage(`${use.user.avatarURL({size: 1024})}`)
  .setColor(use.displayHexColor === "#000000" ? "#ffffff" : use.displayHexColor)
  .setDescription(`[Original Avatar](${use.user.avatarURL({dynamic: true, size: 1024})}) | [png](${use.user.avatarURL({size: 1024, format:"png"})}) | [jpg](${use.user.avatarURL({size: 1024, format:"jpg"})}) | [webp](${use.user.avatarURL({size: 1024, format:"webp"})})`)
  message.reply({embeds:[embed]})
              
          
  
}
exports.options=[
  {
    name: "user",
    description: "Which person do you want to see the avatar?",
    type: 6,
    required: false
  }
]
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