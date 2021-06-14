let error=require("../../util/error")
let success=require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
module.exports.run=async(bot,message,args)=>{
  
    if (!args[0])
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please give a Name to find your character");
    
     let tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)
    
  if (!tupper){ 
      tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`);
   if (!tupper)return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc is not existing in this server!");
    }
    
    if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)){
      if(!args[1])return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to add a new name for this npc/tupper!")


      if(args[2]){
    bot.db.set(`${message.guild.id}npcav_${args[1].toLowerCase()+" "+args[2].toLowerCase()}`, bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase()}`));
    bot.db.set(`${message.guild.id}npcname_${args[1].toLowerCase()+" "+args[2].toLowerCase()}`,args[1]+" "+args[2]);
    bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()}`)
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)}** is now changed to **${args[1]+" "+args[2]}**`, message);
        bot.db.delete(`${message.guild.id}npcname_${args[0].toLowerCase()}`)
      
      return
      }
     if(args[1]) {
    bot.db.set(`${message.guild.id}npcav_${args[1].toLowerCase()}`, bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase()}`));
    bot.db.set(`${message.guild.id}npcname_${args[1].toLowerCase()}`,args[1]);
    bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()}`)
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)}** is now changed to **${args[1]}**`, message);
      bot.db.delete(`${message.guild.id}npcname_${args[0].toLowerCase()}`)
      
      return
     }
}
    else if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`)){
      
      
      if(!args[2])return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to add a new name for this npc/tupper!")
      
     if(args[3]){ 
    bot.db.set(`${message.guild.id}npcav_${args[2]+" "+args[3]}`,
               bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`))
     bot.db.set(`${message.guild.id}npcname_${args[2].toLowerCase()+" "+args[3].toLowerCase()}`, args[2]+" "+args[3]);
    bot.db.delete(`${message.guild.id}npcav_${args[0]+" "+args[1]}`)
    success(`**${args[0]} ${args[1]}** is now changed to **${args[2]+" "+args[3]}**`, message);
bot.db.delete(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`)
      
      return
                }
      
      if(args[2]) {
    bot.db.set(`${message.guild.id}npcav_${args[2]}`,
               bot.db.get(`${message.guild.id}npcav_${args[0]+" "+args[1]}`))
     bot.db.set(`${message.guild.id}npcname_${args[2]}`, args[2]);
    bot.db.delete(`${message.guild.id}npcav_${args[0]+" "+args[1]}`)
    success(`**${args[0]} ${args[1]}** is now changed to **${args[2]}**`, message);
        bot.db.delete(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`)
      
      return
                  
      }else {
        message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | The npc/Tupper may not exist in this server!")
        return

      }

    }
}
module.exports.info = {
  name: "npcname",
  description: "Change the name of the Tupper/npc",
  usage: "<npc_name> <new_name>",
  aliases: ["npc-name", "tuppername", "tupper-name"],
};