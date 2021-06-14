const { MessageEmbed } = require("discord.js");

module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "now-playing",
    description: "To show the music which is currently playing in this server",
    usage: "",
    aliases: ["np", "nowplaying"],
  },

  run: async function (client, message, args) {
    const sendError = require("../../util/error")

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Now Playing", song.req.displayAvatarURL({ dynamic: true }))
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", `[${song.title}]`+`(${song.url})`)
      .addField("Duration", song.duration)
      .addField("Requested by", song.req.tag)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.noMentionReply(thing)
  },
  options:[],
  interaction: async function (client, message, args) {
    const sendError = require("../../util/slash/error")

    const serverQueue = client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message, client);
    let song = serverQueue.songs[0]
    let embed = new MessageEmbed()
      .setAuthor("Now Playing", song.req.displayAvatarURL({ dynamic: true }))
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", `[${song.title}]`+`(${song.url})`)
      .addField("Duration", song.duration)
      .addField("Requested by", song.req.tag)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return client.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await client.createAPIMessage(message, embed)
                }
            });
  },
};
//checked, but the error is on ${song.ago} if the song is from a topic-user