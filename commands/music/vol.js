const { MessageEmbed } = require("discord.js");


module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "volume",
    description: "To change the server song queue volume",
    usage: "<number>",
    aliases: ["v", "vol"],
  },
//checked
  run: async function (client, message, args) {
    const sendError = require("../../util/error");
    const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel.id !== channel.id)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
    if (!args[0])return message.noMentionReply(`The current volume is: **${serverQueue.volume}**`);
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);;
    if(isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message)
    let xd = new MessageEmbed()
    .setDescription(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | I set the volume to: **${args[0]}/100**`)
    .setTitle("Server Volume Manager")
    .setColor("BLUE")
    return message.noMentionReply(xd);
  },
  options:[
  {
    name: "volume",
    description: "(1-100) How many percents of volume do you want to set?",
    type: 3,
    required: false
  }
],
  interaction: async function (bot, message, arg) {
    const sendError = require("../../util/slash/error");
    let args=[]
if(arg)args=[arg.find(arg => arg.name.toLowerCase() == "volume").value]  
    const channel = bot.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message, bot);
    if (bot.guilds.cache.get(message.guild_id).me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message, bot);
    const serverQueue = bot.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message, bot);
    if (!args[0])return bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: {
                      content:`The current volume is: **${serverQueue.volume}**`
                    }
                }
            });
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);;
    if(isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message, bot)
    let xd = new MessageEmbed()
    .setDescription(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | I set the volume to: **${args[0]}/100**`)
    .setTitle("Server Volume Manager")
    .setColor("BLUE")
    return bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(message, xd)
                }
            });;
  },
};