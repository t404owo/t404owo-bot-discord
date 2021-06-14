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
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message);
    if(args[0]&&isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message)
    if(args[0]&&parseInt(args[0])> Math.ceil(Object.keys(serverQueue.songs).length / 10)) return sendError(`<:tairitsuno:801419553933492245> | The queue currently only has \`${Math.ceil(Object.keys(serverQueue.songs).length / 10)}\` pages!`, message)
    if(args[0]&&parseInt(args[0])<2)return sendError(`<:tairitsuno:801419553933492245> | Please give a number that is higher than **1**!`, message)
    let song=[],qu=[],data=[],page=args[0]||"1"

serverQueue.songs.forEach((s)=>{
 data.push(s) 
})

    
    data.splice(0, 1+parseInt(10 * (parseInt(page) - 1)));
    data.length=10
    
    let queue = new MessageEmbed()
    .setTitle("Server Songs Queue")
    .setColor("BLUE")
    .addField("Now Playing", `[${serverQueue.songs[0].title}]`+`(${serverQueue.songs[0].url})`)
    .addField("Text Channel", serverQueue.textChannel)
    .addField("Voice Channel", serverQueue.voiceChannel)
    if(serverQueue.songs.length>11&&parseInt(page)+1 <= Math.ceil(Object.keys(serverQueue.songs).length / 10))queue.setFooter(`Type ${client.config.prefix}queue ${parseInt(page)+1} or /queue page:${parseInt(page)+1} to see page ${parseInt(page)+1}.`)
    if(serverQueue.songs.length < 2)queue.setDescription(`No songs to play next, please add songs by \`\`${client.config.prefix}play <song_name>\`\``)
    else {
      for(let i in data){
        song.push(`\`${parseInt(i)+1+parseInt(10 * (parseInt(page) - 1))}.\`[${data[i].title}]`+`(${data[i].url})`)
      }
        
      
      
      queue.setDescription(song.join('\n'))
    }
    message.noMentionReply(queue)
  },
  options:[
    {
    name: "page",
    description: "Which page do you you want to look for in the playing queue?",
    type: 3,
    required: false
  }
  ],
  interaction: async function (client, message, arg) {
    let args;
    if(!arg)args=['1']
    else args=[arg.find(arg => arg.name.toLowerCase() == "page").value]
    const sendError = require("../../util/slash/error");
    const serverQueue = client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
    if (!serverQueue) return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing in this server.", message, client);
if(isNaN(args[0]))return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please use Numerical Values only", message, client)
    if(arg&&parseInt(args[0])> Math.ceil(Object.keys(serverQueue.songs).length / 10)) return sendError(`<:tairitsuno:801419553933492245> | The queue currently only has \`${Math.ceil(Object.keys(serverQueue.songs).length / 10)}\` pages!`, message, client)
    if(arg&&parseInt(args[0])<2)return sendError(`<:tairitsuno:801419553933492245> | Please give a number that is higher than **1**!`, message, client)
let song=[],qu=[],data=[],page=args[0]
serverQueue.songs.forEach((s)=>{
 data.push(s) 
})

    
    data.splice(0, 1+parseInt(10 * (parseInt(page) - 1)));
    data.length=10
    
    let embed = new MessageEmbed()
    .setTitle("Server Songs Queue")
    .setColor("BLUE")
    .addField("Now Playing", `[${serverQueue.songs[0].title}]`+`(${serverQueue.songs[0].url})`)
    .addField("Text Channel", serverQueue.textChannel)
    .addField("Voice Channel", serverQueue.voiceChannel)
    if(serverQueue.songs.length>11&&parseInt(page)+1 <= Math.ceil(Object.keys(serverQueue.songs).length / 10))embed.setFooter(`Type ${client.config.prefix}queue ${parseInt(page)+1} or /queue page:${parseInt(page)+1} to see page ${parseInt(page)+1}.`)
    if(serverQueue.songs.length < 2)embed.setDescription(`No songs to play next, please add songs by \`\`${client.config.prefix}play <song_name>\`\``)
    else {
      for(let i in data){
        song.push(`\`${parseInt(i)+1+parseInt(10 * (parseInt(page) - 1))}.\`[${data[i].title}]`+`(${data[i].url})`)
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