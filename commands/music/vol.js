const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

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
    const channel = message.member.voice.channel;
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("There is nothing playing in this server.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);;
    if(isNaN(args[0]))return sendError("Please use Numerical Values only", message.channel)
    let xd = new MessageEmbed()
    .setDescription(`<:hikariok:801419553841741904> | I set the volume to: **${args[0]}/100**`)
    .setTitle("Server Volume Manager")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};