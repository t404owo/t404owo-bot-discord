const Discord = require("discord.js");
let sendSuccess= require("../../util/success"),sendError= require("../../util/error")
module.exports = {
  info:{
  name: "shuffle",
  description:"Shuffle the Queue",
  usage:"",
  aliases: ["sf", "shufflequeue"],
  },
  conf:{
    cooldown: 0,
  dm: "no"
  },
  run: async (client, message, args) => {
    const channel = message.member.voice.channel
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message);    
    const Channel = message.member.voice.channel;

    if (!Channel) return sendError('There are no songs on playing right now, pls add a song to play!!!', message);

    const Queue = await message.client.queue.get(message.guild.id);

    if (!Queue)
      return sendError("There is nothing playing in this server.", message);
    
    const Current = await Queue.songs.shift();
    
    Queue.songs = Queue.songs.sort(() => Math.random() - 0.5);
    await Queue.songs.unshift(Current);
    message.react("801419553841741904")
    sendSuccess("<:hikariok:801419553841741904> | Queue Has Been Shuffled", message)
    
  }
};
