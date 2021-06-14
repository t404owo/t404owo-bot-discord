const { MessageEmbed } = require("discord.js");


module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "pause",
    description: "To pause the current music in the server",
    usage: "",
    aliases: ["pause-song", "pausesong"],
  },
//checked
  run: async function (client, message, args) {
    const sendError = require("../../util/error"), sendSuccess = require("../../util/success");
  const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);

    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setTitle(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Music has been paused!")
      return message.noMentionReply(xd);
    }
    return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
  },
  options:[],
  interaction: async function (client, message, args) {
    const sendError = require("../../util/slash/error"), sendSuccess = require("../../util/success");
  const channel = await client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).voice.channel;
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (client.guilds.cache.get(message.guild_id).me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);

    const serverQueue = client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let embed = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setTitle(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Music has been paused!")
      return client.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await client.createAPIMessage(message, embed)
                }
            });
    }
    return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server or the bot is currently paused.", message, client);
  },
};
