//const fs = require("fs");
const Discord = require("discord.js");
const ms = require("ms");
exports.run = async(bot, message, args) => {
    //   let warning = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    const permissions = message.channel.permissionsFor(message.client.user);
  if(!permissions.has("MANAGE_MEMBERS")) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You don't have permission to ban!!!");
const perm=message.channel.permissionsFor(message.member)//perm.has()
  if(!perm.has("MANAGE_MEMBERS")&&!perm.has("MANAGE_GUILD")&&!perm.has("ADMINISTRATOR")) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You don't have permission to warn!!!");
  let wUser = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@","").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Remember to mention a valid user to warn!") })
  if(!wUser) return message.mentionReply("I couldn't find the user!");
  if(wUser.user.id === message.author.id)return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't warn yourself!")
 let pUser = message.channel.permissionsFor(wUser)//perm.has()
  if(pUser.has("ADMINISTRATOR")) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You don't have permission to warn an admin/mod!!!");
  let reason = args.slice(1).join(" ");
      if (!reason) reason = "";
      let a=bot.db.get(`${wUser.user.id}_${message.guild.id}_warns`)||0
  let b=bot.db.get(`${message.member.id}_${message.guild.id}_modwarns`)||0
let warnings=bot.db.set(`${wUser.user.id}_${message.guild.id}_warns`,a+1)
let modwarn=bot.db.set(`${message.member.id}_${message.guild.id}_modwarns`, b+1)
console.log(warnings)
  console.log(modwarn)
  
  let c= bot.db.get(`${message.guild.id}_warnmute`)||2//mute
  let d=bot.db.get(`${message.guild.id}_warnkick`)||3//kick
  let e=bot.db.get(`${message.guild.id}_warnban`)||4//ban
  


  
      if(a>e-1){
         let target = wUser
   
        
        target.ban({reason: `get too much warns`});
       
       return message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Banned sucessfully **|** get too much warns`)
}   
  else
  if(a > d-1){
    let target = wUser
      
   
        
        target.kick({reason: `get too much warns`});
       
       return message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Kicked sucessfully **|** get too much warns`)
}  
  else
    if(a > c-1){
   
  
    let userm = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).catch(err => { console.error(err);return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this Person") })
    
        let target = userm
  
  
  const permissions = message.channel.permissionsFor(message.client.user);
 
  

      


  
let muterole= bot.db.get(`${message.guild.id}_muterole`)
   

  if(!bot.db.get(`${message.guild.id}_muterole`)){
   let muterale = message.guild.roles.cache.find(r => r.name === 'Muted');
      //bot.db.set(`${message.guild.id}_muterole`,message.guild.roles.cache.find(r => r.name === 'Muted').id);
  if(!muterale) {
              try{
                let muterele = await message.guild.roles.create({
                  data:{ 
                  name: "Muted",
                  color: "#222222",
                  permissions: []
                  }
                })
                message.guild.channels.cache.forEach(async (channel, id) => {
                  await channel.updateOverwrite(message.guild.roles.cache.find(r => r.name === 'muted'), {
                    CREATE_INSTANT_INVITE: true,
                    ADD_REACTIONS: false,
                    STREAM: false,
                    SEND_MESSAGES: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    READ_MESSAGE_HISTORY: true,// https://discord.gg/Tx5tT8z
                    MENTION_EVERYONE: false,
                    USE_EXTERNAL_EMOJIS: true,
                    CONNECT: false,
                    SPEAK: false,
                    USE_VAD: false,
                    CHANGE_NICKNAME: true
                  })
                })
              }
              catch(err) {
                message.mentionReply(`Error : ${err}`)
              }
  }
    muterole = bot.db.set(`${message.guild.id}_muterole`,message.guild.roles.cache.find(r => r.name === 'Muted').id.toString());
            
}
    const time = bot.db.get(`${message.guild.id}_mutetime`)||"3d"
   
    
   
  let muteroles=bot.db.set(`${message.guild.id}_${userm.user.id}muteroles`, userm._roles)
  
      console.log(muterole+"\n"+muteroles)

      
    
bot.db.set(`${message.guild.id}_${userm.user.id}mutetime`, time)

  setTimeout(function(){
              
  target.roles.add(message.guild.roles.cache.find(r => r.id ===muteroles)).catch(()=>{
      target.roles.add(muteroles)
          target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole))
target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole).id)
  bot.db.delete(`${message.guild.id}_${userm.user.id}mutetime`)
  bot.db.delete(`${message.guild.id}_${userm.user.id}muteroles`)})
    target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole))
target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole).id)
    bot.db.delete(`${message.guild.id}_${userm.user.id}mutetime`)
    bot.db.delete(`${message.guild.id}_${userm.user.id}muteroles`)
             }, ms(bot.db.get(`${message.guild.id}_${userm.user.id}mutetime`)))
  
  
target.roles.remove(target.roles.cache);
  target.roles.add(message.guild.roles.cache.find(r => r.id ===muterole))
  target.roles.add(message.guild.roles.cache.find(r => r.id ===muterole).id)
 
  
  message.noMentionReply("${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Muted Sucessfully! **|** Get too much warns")
 
   
}
  
  else {
  message.noMentionReply("warning...")
      .then(msg => {
        let reasonb= args.slice(1).join(" ");
        if(!reasonb){
        msg.edit(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | ${wUser.user.tag} has been warned`)
        };
      if(reasonb) {
        msg.edit(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | ${wUser.user.tag} has been warned || ${reason}`);}
    });
}

  
}

exports.info = {
name: 'warn',
  aliases:[],
  usage: "<user_id_or_mention>",
  description: "warns a member",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}