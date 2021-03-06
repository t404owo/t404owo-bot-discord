
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
options:[],
  interaction: async (client, message, args) =>{
let sendSuccess= require("../../util/success"),sendError= require("../../util/error")
    const { channel } = message.member.voice;
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if(!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where I am to use this command!', message);
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to play something to use this command(please use "+client.config.prefix+"play or "+client.config.prefix+"search to play a song)!");
    }
     

    try {
      serverQueue.songs.splice(0, serverQueue.songs.length-2);
      serverQueue.player.stop(false);
//message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
      return;
    } catch {
      serverQueue.connection.destroy();
    }
  },
  run: async (client, message, args) => {
let sendSuccess= require("../../util/success"),sendError= require("../../util/error")
    const { channel } = message.member.voice;
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if(!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where I am to use this command!', message);
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to play something to use this command(please use "+client.config.prefix+"play or "+client.config.prefix+"search to play a song)!");
    }
     

    try {
      serverQueue.songs.splice(0, serverQueue.songs.length-2);
      serverQueue.player.stop(false);
message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
      return;
    } catch {
      serverQueue.connection.destroy();
    }
  }
};