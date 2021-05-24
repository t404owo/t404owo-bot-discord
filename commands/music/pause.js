const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

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
  const channel = message.member.voice.channel
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setTitle("Music has been paused!")
      return message.noMentionReply(xd);
    }
    return sendError("<:tairitsuno:801419553933492245> | There is nothing playing in this server.", message);
  },
};