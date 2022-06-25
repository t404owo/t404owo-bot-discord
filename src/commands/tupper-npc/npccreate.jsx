let error=require("../../util/error.js")
let success=require("../../util/success.js")
var regex = /\bhttps?:\/\/\S*?\/[^\/.]+\.(jpg|png|bmp|webp|jpeg|tif|tiff|gif|jfif|svg|JPG|JPEG|PNG|WEBP|JPEG|GIF)\b/g
exports.conf={
  cooldown: 0,
  dm: "no"
}
module.exports.run=async(bot,message,args)=>{
  
    let avatar=args[1]
    if (!args[0])return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" |  Please give a Name for your character");
    
    function attachIsImage(msgAttac) {
            var url = msgAttac.url;
            console.log(url);
          avatar=msgAttac.url
if(args[1]&&!args[2]){
  if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`))
    return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc was already existed in this server, type "+bot.config.prefix+"npcavatar to change the avatar, or "+bot.config.prefix+"npcname to change the name of the npc!");
bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, args[0]+" "+args[1]);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, avatar);
    success(`**${args[0]+" "+args[1]}** is created with the avatar:\n[Click Here]`+`(${a})`,message, a);
    } else if(args[0]&&!args[1]){
      if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`))
    return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc was already existed in this server, type "+bot.config.prefix+"npcavatar to change the avatar, or "+bot.config.prefix+"npcname to change the name of the npc!");
      console.log(args[0])
    bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()}`, args[0]);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()}`, url);
  success(`**${args[0]}** is created with the avatar:\n[Click Here]`+`(${a})`,message, a);
    }
      return
  }
    if (message.attachments.size > 0) {
            if (message.attachments.every(attachIsImage)) {
              return;
            }
      return;
          }
     
    else if(args[2]&&!args[3]&&args[2].toLowerCase().includes("/".toLowerCase())&&args[2].toLowerCase().includes(".".toLowerCase())){
     if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`))
    return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc was already existed in this server, type "+bot.config.prefix+"npcavatar to change the avatar, or "+bot.config.prefix+"npcname to change the name of the npc!");
      if(regex.test(avatar)===false) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | The link you sent me is not an image, try again!");
      
      bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, args[0]+" "+args[1]);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, avatar);
    success(`**${args[0]+" "+args[1]}** is created with the avatar:\n[Click Here]`+`(${a})`,message, a);
      
      return
    }
   else if(args[1]&&!args[2]&&args[1].toLowerCase().includes("/".toLowerCase())&&args[1].toLowerCase().includes(".".toLowerCase())){
     if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`))
    return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc was already existed in this server, type "+bot.config.prefix+"npcavatar to change the avatar, or "+bot.config.prefix+"npcname to change the name of the npc!");
    if(regex.test(avatar)===false) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | The link you sent me is not an image, try again!");
      bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()}`, args[0]);
     let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()}`, avatar);
    success(`**${args[0]}** is created with the avatar:\n[Click Here]`+`(${a})`,message, a);
      return
    } 
    else if(args[1]&&!args[2]&&message.attachments.size<1){
      if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`))
    return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc was already existed in this server, type "+bot.config.prefix+"npcavatar to change the avatar, or "+bot.config.prefix+"npcname to change the name of the npc!");
      avatar=bot.user.avatarURL({dynamic: true, size: 1024})
      bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, args[0]+" "+args[1]);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, avatar);
    success(`**${args[0]+" "+args[1]}** is created with the avatar:\n[Click Here]`+`(${a})`,message, a);
      return
    }
    else if(args[0]&&!args[1]&&message.attachments.size<1){
      if(bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`))
    return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc was already existed in this server, type "+bot.config.prefix+"npcavatar to change the avatar, or "+bot.config.prefix+"npcname to change the name of the npc!");
      avatar=bot.user.avatarURL({dynamic: true, size: 1024});
      bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()}`, args[0]);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()}`, avatar);
    success(`**${args[0]}** is created with the avatar:\n[Click Here]`+`(${a})`,message, a);
      return
    }else {
      return
    }

}
module.exports.info = {
  name: "npccreate",
  description: "Set a new npc/tupper for your server",
  usage: "<new_tupper> <new_avatar_image/new_avatar_image_url/blank>",
  aliases: ["createnpc", "create-npc", "npc-create", `tuppercreate`, "createtupper", "create-tupper", "tupper-create"]
};