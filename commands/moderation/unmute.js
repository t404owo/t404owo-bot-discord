
const ms = require("ms")

exports.run = async(bot, message, args) => {
     const permissions = message.channel.permissionsFor(message.client.user);
 let perm= message.channel.permissionsFor(message.member)//perm.has()
  if(!permissions.has("MANAGE_ROLES")) return
  if(!perm.has("MANAGE_ROLES")&&!perm.has("MANAGE_MEMBERS")&&!perm.has("MANAGE_GUILD")&&!perm.has("ADMINISTRATOR"))return
  if(!args[0])return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please mention the person who you want to unmute"
        );
  let userm = await message.guild.members.fetch(args[0].replace("<@!", "").replace("<@", "").replace(">", "")).catch(err => { console.error(err);return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this Person") })
    
        let target = userm
 

if (target === !args[0]) {
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please mention the person who you want to unmute"
        );
      }
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "-";
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
  
   
  let muteroles=bot.db.get(`${message.guild.id}_${userm.user.id}muteroles`)
  
      console.log(muterole+"\n"+muteroles)

      if(!target.roles.cache.has(muterole)){
        return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user is not muted!")
      }
    


  
              
  
    target.roles.add(message.guild.roles.cache.find(r => r.id ===muteroles)).catch(()=>{
      target.roles.add(muteroles)
          target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole))
target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole).id)
  bot.db.delete(`${message.guild.id}_${userm.user.id}mutetime`)
  bot.db.delete(`${message.guild.id}_${userm.user.id}muteroles`)
  })


  
    target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole))
target.roles.remove(message.guild.roles.cache.find(r => r.id ===muterole).id)
  bot.db.delete(`${message.guild.id}_${userm.user.id}mutetime`)
  bot.db.delete(`${message.guild.id}_${userm.user.id}muteroles`)
 let reasonb = args.slice(1).join(" ");
  if(!reasonb) {
  message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Unmuted Sucessfully!")
  }
  if(reasonb) {
  message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Unmuted Sucessfully! **|** " + reason)
  }
  
}

exports.info = {
name: 'unmute',
  aliases:[],
  usage: "<user_id_or_mention>",
  description: "unmute a member",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}