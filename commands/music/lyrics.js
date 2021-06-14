const { MessageEmbed } = require("discord.js");

module.exports = {
  conf:{
    cooldown: 0,
  dm: "yes"
  },
  info: {
    name: "lyrics",
    description: "Shows the song lyrics(Let it keep empty if you want to know the lyrics the song's playing)",
    usage: "<song_name/(blank)>",
    aliases: ["lyric", "song-lyric", "songlyrics"],
  },
  run: async function (bot, message, args) {
    const sendSuccess = require("../../util/success")
const sendError =require("../../util/error")
         const genius = require("genius-lyrics")
   const G = new genius.Client(process.env.GENIUS)
if(message.guild!== null){
  
          if(args[0]) {
    const results = await G.songs.search(message.content.split(' ').slice(1).join(' ')); 
    const song = results[0];
    song.lyrics().then(lyrics => {
      if (lyrics.length > 2049) {
        const lyricsEmbo = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        return message.noMentionReply(lyricsEmbo);
        
      }
      
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        return message.noMentionReply(lyricsEmbed);
      }
  
    
    })
    
} 
  else
  if(!args[0]){
    
      const serverQueue = message.client.queue.get(message.guild.id);
      if(!serverQueue){
         return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Song is currently not playing, please give an argument after the space in the command like this: **"+bot.config.prefix+"lyrics siromaru Cranky Conflict**!", message)
         }
      const ly = serverQueue.songs[0].title.toString().replace(/\\/g, "")
      console.log(ly)
      const results = await G.songs.search(ly); 
    const song = results[0];
    song.lyrics().then(lyrics => {
      if (lyrics.length > 2049) {
        const lyricsEmbo = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        return message.noMentionReply(lyricsEmbo);
        
      }
      
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        return message.noMentionReply(lyricsEmbed);
      }
  
    
    })
    
    
    
}
  else return
}
    
    else if(args[0]){
     const results = await G.songs.search(message.content.split(' ').slice(1).join(' ')); 
    const song = results[0];
    song.lyrics().then(lyrics => {
      if (lyrics.length > 2049) {
        const lyricsEmbo = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        return message.noMentionReply(lyricsEmbo);
        
      }
      
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        return message.noMentionReply(lyricsEmbed);
      }
  
    
    })
    
    
    
    
} else {
  return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You're in my DM, not in a server, please give a name of the song to let me search and send you!", message)
             }
  },
  options: [
  {
    name: "song",
    description: "Which song do you want to search the lyrics?",
    type: 3,
    required: false
  }
],
  interaction: async function (bot, message, arg) {
    const sendSuccess = require("../../util/slash/success")
const sendError =require("../../util/slash/error")
let args=[];
  if(arg) args = [arg.find(arg => arg.name.toLowerCase() == "song").value];
    
         const genius = require("genius-lyrics")
   const G = new genius.Client(process.env.GENIUS)
if(message.guild!== null){
  
          if(args[0]) {
    const results = await G.songs.search(args[0]); 
    const song = results[0];
    song.lyrics().then(async lyrics => {
      var embed
      if (lyrics.length > 2049) {
         embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        
        
      }
      
      if (lyrics.length < 2048) {
       embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        
      }
  
    return bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(message, embed)
                }
            });
    })
    
} 
  else
  if(!args[0]){
    
      const serverQueue = bot.guilds.cache
      .get(message.guild_id)
      .client.queue.get(message.guild_id);
      if(!serverQueue){
         return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Song is currently not playing, please give an argument after the space in the command like this: **"+bot.config.prefix+"lyrics siromaru Cranky Conflict**!", message, bot)
         }
      const ly = serverQueue.songs[0].title.toString().replace(/\\/g, "")
      console.log(ly)
      const results = await G.songs.search(ly); 
    const song = results[0];
    song.lyrics().then(async lyrics => {
      var embed
      if (lyrics.length > 2049) {
        embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        
        
      }
      
      if (lyrics.length < 2048) {
         embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        
      }
  
    return bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(message, embed)
                }
            });
    })
    
    
    
}
  else return
}
    
    else if(args[0]){
     const results = await G.songs.search(args[0]); 
    const song = results[0];
    song.lyrics().then(async lyrics => {
      var embed
      if (lyrics.length > 2049) {
         embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        
        
      }
      
      if (lyrics.length < 2048) {
         embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        
      }
  
    return bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(message, embed)
                }
            });
    })
    
    
    
    
} else {
  return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You're in my DM, not in a server, please give a name of the song to let me search and send you!", message, bot)
             }
  }
};
