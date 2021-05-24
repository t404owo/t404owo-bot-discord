let sendSuccess= require("../../util/success"),sendError= require("../../util/error")
module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "skipall",
    description: "To skip all the songs in the queue and play the last song",
    usage: "",
    aliases: ["skip-all"],
  },

  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message);
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.mentionReply("<:tairitsuno:801419553933492245> | Nothing playing in this server");
    }
     

    try {
      serverQueue.songs.splice(0, serverQueue.songs.length-2);
      serverQueue.connection.dispatcher.end("Skiped the music");
message.react("801419553841741904")
      return;
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
    }
  }
};