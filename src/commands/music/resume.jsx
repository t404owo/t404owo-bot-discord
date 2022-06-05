const { MessageEmbed } = require("discord.js");


module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "resume",
    description: "To contunue the paused music",
    usage: "",
    aliases: ["continue", "continue-song", "continuesong", "resumesong", "resume-song"],
  },
//checked
  run: async function (client, message, args) {
    const sendError = require("../../util/error"), sendSuccess = require("../../util/success");
  const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue) {
      if(!serverQueue.playing){
      serverQueue.player.unpause();
      serverQueue.playing = false;
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("GREEN")
      .setTitle(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Music has been resumed!")
      return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }})
      }
      else {
        let xd = new MessageEmbed()
      .setDescription("▶ The player is playing...")
      .setColor("RED")
      .setTitle(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Music has already been resumed...`)
      return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }})
      }
    }
    return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
  },
  options:[],
  interaction: async function (client, message, args) {
    const sendError = require("../../util/error"), sendSuccess = require("../../util/success");
  const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue) {
      if(!serverQueue.playing){
      serverQueue.player.unpause();
      serverQueue.playing = false;
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("GREEN")
      .setTitle(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Music has been resumed!")
      return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }})
      }
      else {
        let xd = new MessageEmbed()
      .setDescription("▶ The player is playing...")
      .setColor("RED")
      .setTitle(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Music has already been resumed...`)
      return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }})
      }
    }
    return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
  },
};