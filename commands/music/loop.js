const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendSuccess = require("../../util/success")
const sendError =require("../../util/error")

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
const client = bot;
    const channel = message.member.voice.channel
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message.channel);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message.channel);
    var serverQueue = message.client.queue.get(message.guild.id);
if (!serverQueue) {
      return sendError('<:tairitsuno:801419553933492245> | There are no songs on playing right now, pls add a song to play!!!', message.channel);
    }
  if (!serverQueue.songs[0]) {
      return sendError('<:tairitsuno:801419553933492245> | There are no songs on playing right now, pls add a song to play!!!', message.channel);
    }
    serverQueue.loop = !serverQueue.loop;
    
            return message.channel.send(`🔁  **|**  Loop is **${serverQueue.loop === true ? "enabled" : "disabled"}**`)
    return;
  }
};