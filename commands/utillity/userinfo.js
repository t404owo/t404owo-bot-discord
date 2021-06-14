let discord = require('discord.js')
let { RichEmbed } = require('discord.js')
let { MessageEmbed } = require('discord.js')
const moment = require("moment");

exports.run = async (bot, message, args) => {

  

    let userm;

    if (!args[0]) {
      userm = await message.guild.members.fetch(message.member.id).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this Person") });
    } else {
      if(!message.guild) return;
      userm = message.mentions.members.last() || await message.guild.members.fetch(args[0]).catch(err => { return message.mentionReply(" | Unable to find this Person") })
    }

    if (!userm) {
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this person!")
    }
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Green)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Gold)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Early Verified Bot Developer'
};
    
    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }


    let embed = new MessageEmbed()
if(userm.user.displayAvatarURL()!==undefined) embed.setThumbnail(userm.user.displayAvatarURL({ dynamic: true }))
  else embed.setThumbnail("https://cdn.glitch.com/0e253384-8c9d-4a84-9d39-604eb20e01c4%2F4669af3c-fd30-4b37-a89a-1a18f4f5e66e.image.png?v=1609118781652")
   
  //ACTIVITY
    let array = []
    
let data;
      if(userm.user.presence.activities.length){
         data = userm.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "none"
        let zname = data[i].state || "none"
        let type = data[i].type || "none"
        

        array.push(`**${type}** : \`${name}: ${zname}\``)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }
        embed.setDescription(array.join("\n"))
      } 
        }
      //EMBED COLOR BASED ON member
      embed.setColor(userm.displayHexColor === "#000000" ? "#ffffff" : userm.displayHexColor)

      //OTHER STUFF 
             if(userm.user.displayAvatarURL()!==undefined) embed.setAuthor(userm.user.tag, userm.user.displayAvatarURL({ dynamic: true })||"https://cdn.glitch.com/0e253384-8c9d-4a84-9d39-604eb20e01c4%2F4669af3c-fd30-4b37-a89a-1a18f4f5e66e.image.png?v=1609118781652")
else embed.setAuthor(userm.user.tag, "https://cdn.glitch.com/0e253384-8c9d-4a84-9d39-604eb20e01c4%2F4669af3c-fd30-4b37-a89a-1a18f4f5e66e.image.png?v=1609118781652")
       embed.addField("Nickname", userm.nickname||"no nickname("+userm.user.username+")")
      embed.addField("Joined this Server At", moment(userm.joinedAt).format("LLLL"))
        embed.addField("Account Created At", moment(userm.user.createdAt).format("LLLL"))
        
        embed.addField("Common Information", `ID: \`${userm.user.id}\`\nTag: #${userm.user.discriminator}\nIs a Bot: ${userm.user.bot}\nIs a Deleted User: ${userm.deleted}`)
                                
       if(userm._roles) embed.addField("Roles",`<@&${userm._roles.join('> <@&')}>`.replace("<@&>", "No Roles"))
        embed.addField("Highest Role", userm.roles.highest)
        if(userm.roles.hoist)embed.addField("Rank/Hoist Role", userm.roles.hoist)
        if(userm.user.flags.toArray())embed.addField("Flags", userm.user.flags.toArray().length ? userm.user.flags.toArray().map(flag => flags[flag]).join(', ') : 'None')
        embed.setFooter(userm.user.presence.status, stat[userm.user.presence.status])


console.log(userm._roles)
//  message.noMentionReply(userm.user.tag)
      return message.noMentionReply(embed).catch(err => {
        return message.mentionReply("Error : " + err)
      })


}
exports.options=[
  {
    name: "user",
    description: "who do you want to see the info?",
    type: 6,
    required: false
  }
]
exports.interaction = async (bot, message, arg) => {
  let args;
if(arg) args=[arg.find(arg => arg.name.toLowerCase() == "user").value]       
  
  else {
      args = [message.member.user.id];
    } 
  let userm;
      userm = await bot.guilds.cache.get(message.guild_id).members.fetch(args[0].replace("<@!","").replace("<@", "").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please Mention a correct user or give a correct id of the user!") })
    
    
    

    if (!userm) {
      return bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this person!"
                    }
                }
            });
    }
  

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Green)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Gold)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Early Verified Bot Developer'
};
    
    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }


    let embed = new MessageEmbed()
if(userm.user.displayAvatarURL()!==undefined) embed.setThumbnail(userm.user.displayAvatarURL({ dynamic: true }))
  else embed.setThumbnail("https://cdn.glitch.com/0e253384-8c9d-4a84-9d39-604eb20e01c4%2F4669af3c-fd30-4b37-a89a-1a18f4f5e66e.image.png?v=1609118781652")
   
  //ACTIVITY
    let array = []
    
let data;
      if(userm.user.presence.activities.length){
         data = userm.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "none"
        let zname = data[i].state || "none"
        let type = data[i].type || "none"
        

        array.push(`**${type}** : \`${name}: ${zname}\``)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }
        embed.setDescription(array.join("\n"))
      } 
        }
      //EMBED COLOR BASED ON member
      embed.setColor(userm.displayHexColor === "#000000" ? "#ffffff" : userm.displayHexColor)

      //OTHER STUFF 
             if(userm.user.displayAvatarURL()!==undefined) embed.setAuthor(userm.user.tag, userm.user.displayAvatarURL({ dynamic: true })||"https://cdn.glitch.com/0e253384-8c9d-4a84-9d39-604eb20e01c4%2F4669af3c-fd30-4b37-a89a-1a18f4f5e66e.image.png?v=1609118781652")
else embed.setAuthor(userm.user.tag, "https://cdn.glitch.com/0e253384-8c9d-4a84-9d39-604eb20e01c4%2F4669af3c-fd30-4b37-a89a-1a18f4f5e66e.image.png?v=1609118781652")
       embed.addField("Nickname", userm.nickname||"no nickname("+userm.user.username+")")
      embed.addField("Joined this Server At", moment(userm.joinedAt).format("LLLL"))
        embed.addField("Account Created At", moment(userm.user.createdAt).format("LLLL"))
        
        embed.addField("Common Information", `ID: \`${userm.user.id}\`\nTag: #${userm.user.discriminator}\nIs a Bot: ${userm.user.bot}\nIs a Deleted User: ${userm.deleted}`)
                                
       if(userm._roles) embed.addField("Roles",`<@&${userm._roles.join('> <@&')}>`.replace("<@&>", "No Roles"))
        embed.addField("Highest Role", userm.roles.highest)
        if(userm.roles.hoist)embed.addField("Rank/Hoist Role", userm.roles.hoist)
        if(userm.user.flags)embed.addField("Flags", userm.user.flags.toArray().length ? userm.user.flags.toArray().map(flag => flags[flag]).join(', ') : 'None')
        embed.setFooter(userm.user.presence.status, stat[userm.user.presence.status])



      bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(message, embed)
                }
            });


}
exports.info = {
  name: 'userinfo',
  aliases:['whois', "uinfo"],
  usage: "(<user_id_or_mention>)",
  description: "Get the information of yourself or a user",
}
exports.conf={
  cooldown: 0,
  dm: "yes"
}