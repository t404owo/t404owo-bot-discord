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
    if(!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel.id !== channel.id)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where I am to use this command!', message);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to play something to use this command(please use "+client.config.prefix+"play or "+client.config.prefix+"search to play a song)!", message);
    if (!args[0])return message.noMentionReply(`The current volume is: **${serverQueue.volume}**`);
    if(isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message)
    if(args[0]<0||args[0]>100) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please choose a number between 0 to 100 only", message)
    serverQueue.volume = args[0]; 
    serverQueue.player.volume=args[0]/100
    serverQueue.resource.volume.setVolume(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | I set the volume to: **${args[0]}/100**`)
    .setTitle("Server Volume Manager")
    .setColor("BLUE")
    return message.reply({embeds:[xd], allowedMentions: { repliedUser: false }});
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
    const sendError = require("../../util/error");
    let args=[]
if(arg._hoistedOptions[0])args=[arg._hoistedOptions[0].value]  
    const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if(!message.guild.me.voice.channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | I\'m not in a voice channel yet!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where I am to use this command!', message);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to play something to use this command(please use "+bot.config.prefix+"play or "+bot.config.prefix+"search to play a song)!", message);
    if (!args[0])return message.reply({content:`The current volume is: **${serverQueue.volume}**`});
    if(isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message)
    if(args[0]<0||args[0]>100) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please choose a number between 0 to 100 only", message)
    serverQueue.volume = args[0]; 
    serverQueue.player.volume=args[0]/100
    serverQueue.resource.volume.setVolume(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | I set the volume to: **${args[0]}/100**`)
    .setTitle("Server Volume Manager")
    .setColor("BLUE")
    return message.reply({embed:[xd]})
  },
};