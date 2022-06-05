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
  interaction: async (bot, message, arg) => {
    const sendSuccess = require("../../util/slash/success")
const sendError = require("../../util/slash/error")
    let args=[]
if(arg)args=[arg.find(arg => arg.name.toLowerCase() == "song").value]  
    const { channel } = message.member.voice;
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if(!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where I am to use this command!', message);
    const serverQueue = bot.queue.get(message.guild.id);
    if (!serverQueue) {
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to play something to use this command(please use "+bot.config.prefix+"play or "+bot.config.prefix+"search to play a song)!");
    }
    
    if(isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message, bot)
    if(args[0]<1)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please give a number that is higher than 1", message, bot)
   
    if(args[0] > serverQueue.songs.length) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this song", message, bot)
    }

    try {
      serverQueue.songs.splice(0, args[0]-1);
      serverQueue.player.stop(false);
      sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Skipped to [${serverQueue.songs[0].title}](${serverQueue.songs[0].title})!`, message, bot)
      
//message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
      return;
    } catch (err){
      serverQueue.connection.destroy();
      console.error(err)
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please try this command again, if it still don't work, report the owner.", message, bot);
    }
  },
  options: [
  {
    name: "song",
    description: "To which song do you want to skip(By number)",
    type: 3,
    required: true
  }
 ],
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
    
    if(isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message)
    if(args[0]<1)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please give a number that is higher than 1", message)
   
    if(args[0] > serverQueue.songs.length) {
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unable to find this song", message)
    }

    try {
      serverQueue.songs.splice(0, args[0]-1);
      serverQueue.player.stop(false);
message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904")
      return;
    } catch {
      serverQueue.connection.destroy();
      return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please try this command again, if it still don't work, report the owner.", message);
    }
  }
};