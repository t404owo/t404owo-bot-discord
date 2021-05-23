const { MessageEmbed } = require("discord.js");
const sendSuccess = require("../../util/success")
const sendError =require("../../util/error")
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
  }
  ,
  run: (bot, message, args) => {
    
    const channel = message.member.voice.channel
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message.channel);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message.channel);

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue)return sendError("<:tairitsuno:801419553933492245> | There is nothing playing in this server.", message.channel);
     if(isNaN(args[0]))return sendError("<:tairitsuno:801419553933492245> | Please use Numerical Values only", message.channel)
    if(args[0]<2)return sendError("<:tairitsuno:801419553933492245> | Please give a number that is higher than 1", message.channel)
   
    if(args[0] > serverQueue.songs.length) {
      return sendError("<:tairitsuno:801419553933492245> | Unable to find this song", message.channel)
    }
    
    
    serverQueue.songs.splice(args[0] - 1, 1)
    sendSuccess("<:hikariok:801419553841741904> | Song is removed sucessfully!", message.channel)
  }
};
