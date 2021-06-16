const { MessageEmbed } = require("discord.js");

module.exports = {
  conf: {
    cooldown: 0,
    dm: "no"
  },
  info: {
    name: "stop",
    description: "To stop the music and clearing the queue",
    usage: "",
    aliases: ["end", "finish"]
  },
  //checked
  run: async function(client, message, args) {
    const sendError = require("../../util/error"), sendSuccess = require("../../util/success");

    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join a voice channel to use this command!",
        message
      );
    if (message.guild.me.voice.channel !== channel)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join voice channel where the bot is to use this command!",
        message
      );
    //await channel.leave();
    message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to play at least a song to use this command!",
        message
      );
    } else {
      serverQueue.connection.dispatcher.end("Ended");
      message.client.queue.delete(message.guild.id);
      console.log("disconnected");
      sendSuccess(
      `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Ended Successfully!",
      message
    );
    }
  },
  options: [],
  interaction: async function(client, message, args) {
    //message=interaction
    let sendError = require("../../util/slash/error.js");
    let sendSuccess = require("../../util/slash/success.js");
    let channel = await client.guilds.cache
      .get(message.guild_id)
      .members.cache.get(message.member.user.id).voice.channel;
    if (!channel)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join a voice channel to use this command!",
        message,
        client
      );
    if (client.guilds.cache.get(message.guild_id).me.voice.channel !== channel)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join voice channel where the bot is to use this command!",
        message,
        client
      );

    // await channel.leave();
    //message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
    const serverQueue = client.guilds.cache
      .get(message.guild_id)
      .client.queue.get(message.guild_id);

    if (!serverQueue) {
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to play at least a song to use this command!",
        message,
        client
      );
    } else {
      serverQueue.connection.dispatcher.end("Ended");
      client.guilds.cache
        .get(message.guild_id)
        .client.queue.delete(message.guild_id);
      console.log("disconnected");sendSuccess(
      `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Ended Successfully!",
      message,
      client
    );
    }
  }
};
