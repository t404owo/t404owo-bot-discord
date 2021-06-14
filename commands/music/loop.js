const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");


module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "loop",
    description: "To loop songs :D",
    usage:"",
    aliases: ["l"],
  },
//checked
  run: async function (bot, message, args) {
    const sendSuccess = require("../../util/success")
const sendError =require("../../util/error")
const client = bot;
    const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);
    var serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | There are no songs on playing right now, pls add a song to play!!!', message);
    }
  if (!serverQueue.songs[0]) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | There are no songs on playing right now, pls add a song to play!!!', message);
    }
    serverQueue.loop = !serverQueue.loop;
    
            return sendSuccess(`🔁  **|**  Loop is **${serverQueue.loop === true ? "enabled" : "disabled"}**`, message)
    return;
  },
  options:[],
  interaction: async function (bot, message, args) {
    let sendError=require('../../util/slash/error.js')
    let sendSuccess=require('../../util/slash/success.js')
const client = bot;
    
    let channel = await client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).voice.channel;
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message, bot);
    if (client.guilds.cache.get(message.guild_id).me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message, bot);
    var serverQueue = client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
if (!serverQueue) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | There are no songs on playing right now, pls add a song to play!!!', message, bot);
    }
  if (!serverQueue.songs[0]) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | There are no songs on playing right now, pls add a song to play!!!', message, bot);
    }
    serverQueue.loop = !serverQueue.loop;
    
            return sendSuccess(`🔁  **|**  Loop is **${serverQueue.loop === true ? "enabled" : "disabled"}**`, message, bot)
    return;
  }
};