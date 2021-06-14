let error=require("../../util/error.js")
let success=require("../../util/success.js")
var regex = /\bhttps?:\/\/\S*?\/[^\/.]+\.(jpg|png|bmp|webp|jpeg|tif|tiff|gif|jfif|svg|JPG|JPEG|PNG|WEBP|JPEG|GIF)\b/g
exports.conf={
  cooldown: 0,
  dm: "no"
}
module.exports.run=async(bot,message,args)=>{
let avatar=args[1]
    if (!args[0])return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please give a Name for your character");
      let tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)
    
  if (!tupper){
      tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`);
   if (!tupper)return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc is not existing in this server!");
    }
    
    function attachIsImage(msgAttac) {
            var url = msgAttac.url;
            console.log(url);
          avatar=msgAttac.url
if(args[1]&&!args[2]){
//bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, args[0]+" "+args[1]);
  bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, avatar);
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`)}**'s new avatar is:\n[Click Here]`+`(${a})`, message, a); 
    }
      else if(args[0]&&!args[1]){
      console.log(args[0])
    //bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()}`, args[0]);
bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()}`);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()}`, url);
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)}**'s new avatar is:\n[Click Here]`+`(${a})`, message, a);
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
      
      avatar= args[2]
      if(regex.test(avatar)===false) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | The link you sent me is not an image, try again!");
      //bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, args[0]+" "+args[1]);
bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, avatar);
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`)}**'s new avatar is:\n[Click Here]`+`(${a})`, message, a);
      
      return
    }
   else if(args[1]&&!args[2]&&args[1].toLowerCase().includes("/".toLowerCase())&&args[1].toLowerCase().includes(".".toLowerCase())){
      //bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()}`, args[0]);
     if(regex.test(avatar)===false) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | The link you sent me is not an image, try again!");
     bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()}`);
     let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()}`, avatar);
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)}**'s new avatar is:\n[Click Here]`+`(${a})`, message, a);
      return
    }
    
    else if(args[1]&&!args[2]&&message.attachments.size<1){
      avatar=bot.user.avatarURL({dynamic: true, size: 1024});
      //bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, args[0]+" "+args[1]);
      bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`, avatar);
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`)}**'s new avatar is:\n[Click Here]`+`(${a})`, message, a);
      return
    }
    else if(args[0]&&!args[1]&&message.attachments.size<1){
      avatar=bot.user.avatarURL({dynamic: true, size: 1024});
      //bot.db.set(`${message.guild.id}npcname_${args[0].toLowerCase()}`, args[0]);
      bot.db.delete(`${message.guild.id}npcav_${args[0].toLowerCase()}`);
    let a = bot.db.set(`${message.guild.id}npcav_${args[0].toLowerCase()}`, avatar);
    success(`**${bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)}**'s new avatar is:\n[Click Here]`+`(${a})`, message, a);
      return
    } else
      if(args[3]||args[2]&&!message.content.toLowerCase().includes("/".toLowerCase())){
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc is not existing in this server!");
    }

}
module.exports.info = {
  name: "npcavatar",
  description: "Change the avatar of the Tupper/npc",
  usage: "<npc_name> <new_avatar_image/new_avatar_image_url/blank>",
  aliases: ["npc-av",
            "npc-avatar",
            "npcav",
            "tupper-av",
            "tupper-avatar",
            "npc av",
            "npc avatar",
            "tupper av",
            "tupper avatar",
            "tupperav", "tupperavatar"]
};