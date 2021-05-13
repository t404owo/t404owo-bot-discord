const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const sendSuccess = require("../../util/success");

module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "stop",
    description: "To stop the music and clearing the queue",
    usage: "",
    aliases: ["end", "finish", "leave", "disconnect"],
  },
//checked
  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to use this command!", message.channel);
    await channel.leave();
    message.react("766664525356204092")
    sendSuccess("<:botyes:766664525356204092> | Disconnected Successfully!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);

    serverQueue.songs = [];
  },
};
