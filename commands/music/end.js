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
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message.channel);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message.channel);
    await channel.leave();
    message.react("801419553841741904")
    sendSuccess("<:hikariok:801419553841741904> | Disconnected Successfully!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);

    if(serverQueue){serverQueue.songs = null;console.log("disconnected")}
  },
};
