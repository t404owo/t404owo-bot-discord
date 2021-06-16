const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const sendSuccess = require("../../util/success");

module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "join",
    description: "Joins the voice channel.",
    usage: "",
    aliases: ["voice-connect", "voiceconnect", "joinvoice", "voice-join", "join-voice", "voicejoin"],
  },
//checked
  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has("SPEAK")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I cannot speak in this voice channel, make sure I have the proper permissions!",
        message
      );
    
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel){
    if(message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | The bot is already in an another channel, you need to join voice channel where the bot is to use this command!', message, client);
  }
    await channel.join();
    
    message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
    sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Joined Successfully!", message);
    const serverQueue = message.client.queue.get(message.guild.id);

    if(serverQueue){message.client.queue.delete(message.guild.id);console.log('Connected')}
  },
  options:[],
  interaction: async function (client, message, args){//message=interaction
   let sendError=require('../../util/slash/error.js')
    let sendSuccess=require('../../util/slash/success.js')
   let channel=await client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message, client);
    if (client.guilds.cache.get(message.guild_id).me.voice.channel){
    if (client.guilds.cache.get(message.guild_id).me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | The bot is already in an another channel, you need to join voice channel where the bot is to use this command!', message, client);
  }
    await channel.join();
    //message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
    sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Joined Successfully!", message, client);
    const serverQueue = client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);

    if(serverQueue){client.guilds.cache.get(message.guild_id).client.queue.delete(message.guild_id);console.log("disconnected")}
  }
};