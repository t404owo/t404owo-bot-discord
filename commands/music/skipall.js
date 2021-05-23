let sendSuccess= require("../../util/success"),sendError= require("../../util/error")
module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "skipall",
    description: "To skip to the specified song",
    usage: "<number>",
    aliases: ["skip-all"],
  },

  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message.channel);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message.channel);
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.channel.send("Nothing playing in this server");
    }
     

    try {
      serverQueue.songs.splice(0, serverQueue.songs.length-2);
      serverQueue.connection.dispatcher.end("Skiped the music");

      return;
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send("PLEASE TRY AGAIN");
    }
  }
};
