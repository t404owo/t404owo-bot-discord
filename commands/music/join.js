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
    const channel = message.member.voice.channel
    if (!channel)return sendError("I'm sorry but you need to be in a voice channel to use this command!", message.channel);
    await channel.join();
    
    message.react("801419553841741904")
    sendSuccess("<:hikariok:801419553841741904> | Joined Successfully!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);

    if(serverQueue){serverQueue.songs = null;console.log('Connected')}
  },
};
