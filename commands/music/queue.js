const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "queue",
    description: "To show the server songs queue",
    usage: "",
    aliases: ["q", "list", "songlist", "song-list", "songs-list", "songslist"],
  },
//checked, only the error on ${song.ago} because or topic-user's song
  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("<:tairitsuno:801419553933492245> | There is nothing playing in this server.", message.channel);

    let queue = new MessageEmbed()
    .setTitle("Server Songs Queue")
    .setColor("BLUE")
    .addField("Now Playing", `[${serverQueue.songs[0].title}]`+`(${serverQueue.songs[0].url})`)
    .addField("Text Channel", serverQueue.textChannel)
    .addField("Voice Channel", serverQueue.voiceChannel)
    .setDescription(serverQueue.songs.map((song) => {
      if(song < serverQueue.songs[1])return
      return `**-** [${song.title}]`+`(${song.url})`
    }).join("\n"))
    .setFooter("Currently Server Volume is "+serverQueue.volume)
    if(serverQueue.songs.length < 1)queue.setDescription(`No songs to play next add songs by \`\`${client.config.prefix}play <song_name>\`\``)
    message.channel.send(queue)
  },
}