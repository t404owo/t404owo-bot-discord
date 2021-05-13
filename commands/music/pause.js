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
  if(message.member.voice.channel.id!==client.user.voice.channel.id)return sendError("I'm sorry but you need to be in my voice channel to pause music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setTitle("Music has been paused!")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  },
};