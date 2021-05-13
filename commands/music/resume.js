const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

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
  run: async function (bot, message, args) {
    const client = bot
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("YELLOW")
      .setTitle("Music has been Resumed!")
      return message.channel.send(xd);
    }
    return sendError("There is nothing playing in this server.", message.channel);
  },
};