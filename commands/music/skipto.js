let sendSuccess= require("../../util/success"),sendError= require("../../util/error")
module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "skipto",
    description: "To skip to the specified song",
    usage: "<number>",
    aliases: ["skip-to"],
  },

  run: async (client, message, args) => {

    const { channel } = message.member.voice;
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message.channel);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message.channel);
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.channel.send("Nothing playing in this server");
    }
    if(isNaN(args[0]))return sendError("<:tairitsuno:801419553933492245> | Please use Numerical Values only", message.channel)
    if(args[0]<2)return sendError("<:tairitsuno:801419553933492245> | Please give a number that is higher than 1", message.channel)
   
    if(args[0] > serverQueue.songs.length) {
      return sendError("<:tairitsuno:801419553933492245> | Unable to find this song", message.channel)
    }

    try {
      serverQueue.songs.splice(0, args[0]-1);
      serverQueue.connection.dispatcher.end("Skiped the music");
message.react("801419553841741904")
      return;
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return sendError("<:tairitsuno:801419553933492245> | Please try this command again, if it still don't work, report the owner.");
    }
  }
};