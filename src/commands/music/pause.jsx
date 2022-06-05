const { MessageEmbed } = require("discord.js");


module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "pause",
    description: "To pause the current music in the server",
    usage: "",
    aliases: ["pause-song", "pausesong"],
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
      if(serverQueue.playing){
      serverQueue.player.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("GREEN")
      .setTitle(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Music has been paused!")
      return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }})
      }
      else {
        let xd = new MessageEmbed()
      .setDescription("⏸ You're pausing")
      .setColor("GREEN")
      .setTitle(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Music has already been paused, please run the command \`resume\` to continue playing the music!`)
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
      if(serverQueue.playing){
      serverQueue.player.pause();
      serverQueue.playing = false;
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("GREEN")
      .setTitle(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Music has been paused!")
      return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }})
      }
      else {
        let xd = new MessageEmbed()
      .setDescription("⏸ You're pausing")
      .setColor("GREEN")
      .setTitle(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Music has already been paused, please run the command \`resume\` to continue playing the music!`)
      return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }})
      }
    }
    return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
  },
};