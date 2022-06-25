let error=require("../../util/error")
let success=require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
module.exports.run = async (bot, message, args) => {
 
  let channel = message.channel;
  if (!args[0])
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Tupper/npc is not specified."
    );
  
  let tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)
    
  if (!tupper){ 
      tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`);
   if (!tupper)return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc is not existing in this server!");
    }

  let a = args.slice(1).join(" ");

  if (bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase() + " " + args[1].toLowerCase()}`)) {
     a= args.slice(2).join(" ")
    if (!args[2])     
return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Description not specified. Please type -delete if you want to remove the description."
    );
    if (args[2]==="-delete")
       {
bot.db.delete(`${message.guild.id}npcdesc_${args[0].toLowerCase()+ " " + args[1].toLowerCase()}`)
       return success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+ " " + args[1].toLowerCase()}`)}**'s description is reseted successfully!`,message);
}  
  bot.db.set(`${message.guild.id}npcdesc_${args[0].toLowerCase()+ " " + args[1].toLowerCase()}`, a)
return success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+ " " + args[1].toLowerCase()}`)}**'s description is now \`${a}\`!`,message);
  }
  if (bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)) {
       if (!args[1])     
return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Description not specified. Please type -delete if you want to remove the description."
    );
    if (args[1]==="-delete")
       {
bot.db.delete(`${message.guild.id}npcdesc_${args[0].toLowerCase()}`)
         return success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)}**'s description is reseted successfully!`,message);
}
    bot.db.set(`${message.guild.id}npcdesc_${args[0].toLowerCase()}`, a)
 return success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)}**'s description is now \`${a}\`!`,message);
  }
  };
module.exports.info = {
  name: "npcdesc",
  description: "Sets the description of a mentioned character",
  usage: "<npc_name> <description/\"-delete\">",
  aliases: ["tupperdescription","npc-description", "tupper-descrtiption",
           "tupperdesc","npcdescription","npc-desc","tupper-desc"]
};