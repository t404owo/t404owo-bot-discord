const Discord = require("discord.js");
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
    let sendSuccess= require("../../util/success"),
        sendError= require("../../util/error")

    
    const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);    
    
    const Queue = await message.client.queue.get(message.guild.id);

    if (!Queue)
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
    
     const Current = await Queue.songs.shift();
    
   let q=[]
    Queue.songs.forEach((it)=>q.push(it))
    q.sort(() => Math.random() - 0.5)
    console.log(q)
Queue.songs.splice(0, Queue.songs.length)
    for(let i=0;i<q.length;i++){
      Queue.songs.push(q[i])
    }
    
    await Queue.songs.unshift(Current);
    message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
    sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Queue Has Been Shuffled", message, client)

  },
  interaction: async (client, message, args) => {
    let sendSuccess= require("../../util/slash/success"),
        sendError= require("../../util/slash/error")

    
    const channel = await client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).voice.channel

    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message, client);
    if (client.guilds.cache.get(message.guild_id).me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message, client);    
    
    const Queue = await client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
    
    if (!Queue)
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message, client);
    
    const Current = await Queue.songs.shift();
    
   let q=[]
    Queue.songs.forEach((it)=>q.push(it))
    q.sort(() => Math.random() - 0.5)
    console.log(q)
Queue.songs.splice(0, Queue.songs.length)
    for(let i=0;i<q.length;i++){
      Queue.songs.push(q[i])
    }
    
    await Queue.songs.unshift(Current);
    //message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
    sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Queue Has Been Shuffled", message, client)

        
  },
  options:[]
  
};