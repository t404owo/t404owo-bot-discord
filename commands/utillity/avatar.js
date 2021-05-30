let discord = require('discord.js')
const fs = require("fs");
exports.run = async (bot, message, args) => {

  let use;

    if (!args[0]) {
      use = message.member;
    } else {
      if(!message.guild) return;
      use = await message.guild.members.fetch(args[0].replace("<@!","").replace("<@", "").replace(">","")).catch(err => { return message.mentionReply("<:tairitsuno:801419553933492245> | Please Mention a correct user or give a correct id of the user!") })
    
    }

    if (!use) {
      return message.mentionReply("<:tairitsuno:801419553933492245> | Unable to find this person!")
    }
 
  // user.avatarURL({dynamic: true, size: 1024});
  console.log(use.user.avatarURL({dynamic: true, size: 1024}))
  let embed = new discord.MessageEmbed()
  .setTitle(`${use.user.tag}`)
  .setDescription(`[Avatar link]`+`(${use.user.avatarURL({dynamic: true, size: 1024})})`)
  .setImage(`${use.user.avatarURL({dynamic: true, size: 1024})}`)
  .setColor(use.displayHexColor === "#000000" ? "#ffffff" : use.displayHexColor)
  message.noMentionReply(embed)
  
}
exports.interaction = async (bot, message, arg) => {
let args=[]
if(arg)args=[arg.find(arg => arg.name.toLowerCase() == "user").value]       
  
  else {
      args = [message.member.user.id];
    } 
  let use;
      use = await bot.guilds.cache.get(message.guild_id).members.fetch(args[0].replace("<@!","").replace("<@", "").replace(">","")).catch(err => { return message.mentionReply("<:tairitsuno:801419553933492245> | Please Mention a correct user or give a correct id of the user!") })
    
    
    

    if (!use) {
      return bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "<:tairitsuno:801419553933492245> | Unable to find this person!"
                    }
                }
            });
    }
  // user.avatarURL({dynamic: true, size: 1024});
 // console.log(use.user.avatarURL({dynamic: true, size: 1024}))
  let embed = new discord.MessageEmbed()
  .setTitle(`${use.user.tag}`)
  .setDescription(`[Avatar link]`+`(${use.user.avatarURL({dynamic: true, size: 1024})})`)
  .setImage(`${use.user.avatarURL({dynamic: true, size: 1024})}`)
  .setColor(use.displayHexColor === "#000000" ? "#ffffff" : use.displayHexColor)
  bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(message, embed)
                }
            });
  
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