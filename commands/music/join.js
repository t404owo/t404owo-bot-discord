const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");
const sendSuccess = require("../../util/success");

module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "join",
    description: "Joins the voice channel.",
    usage: "",
    aliases: ["voice-connect", "voiceconnect", "joinvoice", "voice-join", "join-voice", "voicejoin"],
  },
//checked
  run: async function (client, message, args) {
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        "<:tairitsuno:801419553933492245> | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has("SPEAK")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        "<:tairitsuno:801419553933492245> | I cannot speak in this voice channel, make sure I have the proper permissions!",
        message
      );
    const channel = message.member.voice.channel
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message);
    await channel.join();
    
    message.react("801419553841741904")
    sendSuccess("<:hikariok:801419553841741904> | Joined Successfully!", message);
    const serverQueue = message.client.queue.get(message.guild.id);

    if(serverQueue){message.client.queue.delete(message.guild.id);console.log('Connected')}
  },
};