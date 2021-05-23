const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error")

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
    
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("<:tairitsuno:801419553933492245> | There is nothing playing in this server.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Now Playing", song.req.displayAvatarURL({ dynamic: true }))
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", `[${song.title}]`+`(${song.url})`)
      .addField("Duration", song.duration)
      .addField("Requested by", song.req.tag)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
};
//checked, but the error is on ${song.ago} if the song is from a topic-user