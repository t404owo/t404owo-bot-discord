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
    if(!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where I am to use this command!', message);
    var serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to play something to use this command(please use '+client.config.prefix+'play or '+client.config.prefix+'search to play a song)!', message);
    }
  if (!serverQueue.songs[0]) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to play something to use this command(please use '+client.config.prefix+'play or '+client.config.prefix+'search to play a song)!', message);
    }
    serverQueue.loop = !serverQueue.loop;
    
            return sendSuccess(`🔁  **|**  Loop is **${serverQueue.loop === true ? "enabled" : "disabled"}**`, message)
    return;
  },
  options:[],
  interaction: async function (bot, message, args) {
    let sendError=require('../../util/error.js')
    let sendSuccess=require('../../util/success.js')
const client = bot;
    
    let channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if(!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where I am to use this command!', message);
    var serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to play something to use this command(please use '+client.config.prefix+'play or '+client.config.prefix+'search to play a song)!', message);
    }
  if (!serverQueue.songs[0]) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to play something to use this command(please use '+client.config.prefix+'play or '+client.config.prefix+'search to play a song)!', message);
    }
    serverQueue.loop = !serverQueue.loop;
    
            return sendSuccess(`🔁  **|**  Loop is **${serverQueue.loop === true ? "enabled" : "disabled"}**`, message)
    return;
  }
};