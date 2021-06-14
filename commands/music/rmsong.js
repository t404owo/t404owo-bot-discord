const { MessageEmbed } = require("discord.js");

module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
 info: 
  {
  name: "removesong",
  description: "Drop The Song From Queue",
    usage:"<number>",
  aliases: ["rmsong",
            "remove-song",
            "drop",
            "drop-song",
            "dropsong",
            "rm-song",
            "qremove",
            "queueremove",
            "quremove",
            "qrm",
            "queuerm",
            "qurm"]
  },
  interaction: async (bot, message, arg) => {
    const sendSuccess = require("../../util/slash/success")
const sendError =require("../../util/slash/error")
    let args=[]
if(arg)args=[arg.find(arg => arg.name.toLowerCase() == "song").value]  
    const channel = await bot.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message, bot);
    if (bot.guilds.cache.get(message.guild_id).me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message, bot);

    const serverQueue = bot.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);

    if (!serverQueue)return sendError(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | There is nothing playing in this server.", message, bot);
     if(isNaN(args[0]))return sendError(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please use Numerical Values only", message, bot)
    if(args[0]<1)return sendError(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please give a number that is higher than 0", message, bot)
   
    if(args[0] > serverQueue.songs.length) {
      return sendError(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Unable to find this song", message, bot)
    }
    
    
    serverQueue.songs.splice(args[0], 1)
    sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Song is removed sucessfully!", message, bot)
  },
  options: [
  {
    name: "song",
    description: "which song do you want to remove(By number)",
    type: 3,
    required: true
  }
],
  run: (bot, message, args) => {
    const sendSuccess = require("../../util/success")
const sendError =require("../../util/error")
    const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue)return sendError(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | There is nothing playing in this server.", message);
     if(isNaN(args[0]))return sendError(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please use Numerical Values only", message)
    if(args[0]<1)return sendError(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please give a number that is higher than 0", message)
   
    if(args[0] > serverQueue.songs.length) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this song", message)
    }
    
    
    serverQueue.songs.splice(args[0], 1)
    sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Song is removed sucessfully!", message)
  },
  
};
