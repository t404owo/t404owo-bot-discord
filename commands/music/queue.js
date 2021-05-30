const { MessageEmbed } = require("discord.js");


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
    const sendError = require("../../util/error");
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("<:tairitsuno:801419553933492245> | There is nothing playing in this server.", message);
let song=[]
    let queue = new MessageEmbed()
    .setTitle("Server Songs Queue")
    .setColor("BLUE")
    .addField("Now Playing", `[${serverQueue.songs[0].title}]`+`(${serverQueue.songs[0].url})`)
    .addField("Text Channel", serverQueue.textChannel)
    .addField("Voice Channel", serverQueue.voiceChannel)
    if(serverQueue.songs.length < 2)queue.setDescription(`No songs to play next, please add songs by \`\`${client.config.prefix}play <song_name>\`\``)
    else {
      for (let i= 1;i<serverQueue.songs.length;i++)  {
        song.push(`\`${i}.\` [${serverQueue.songs[i].title}]`+`(${serverQueue.songs[i].url})`)
      }
      queue.setDescription(song.join('\n'))
    }
    message.noMentionReply(queue)
  },
  options:[],
  interaction: async function (client, message, args) {
    const sendError = require("../../util/slash/error");
    const serverQueue = client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
    if (!serverQueue) return sendError("<:tairitsuno:801419553933492245> | There is nothing playing in this server.", message);
let song=[];
    
    let embed = new MessageEmbed()
    .setTitle("Server Songs Queue")
    .setColor("BLUE")
    .addField("Now Playing", `[${serverQueue.songs[0].title}]`+`(${serverQueue.songs[0].url})`)
    .addField("Text Channel", serverQueue.textChannel)
    .addField("Voice Channel", serverQueue.voiceChannel)
    .setFooter("Currently Server Volume is "+serverQueue.volume)
    if(serverQueue.songs.length < 2)embed.setDescription(`No songs to play next, please add songs by \`\`${client.config.prefix}play <song_name>\`\``)
    else {
      for (let i= 1;i<serverQueue.songs.length;i++)  {
        song.push(`\`${i}.\` [${serverQueue.songs[i].title}]`+`(${serverQueue.songs[i].url})`)
      }
      embed.setDescription(song.join('\n'))
    }
    return client.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await client.createAPIMessage(message, embed)
                }
            });
  },
}