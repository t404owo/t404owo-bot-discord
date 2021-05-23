const { MessageEmbed } = require("discord.js");
const sendSuccess = require("../../util/success")
const sendError =require("../../util/error")
module.exports = {
  conf:{
    cooldown: 0,
  dm: "yes"
  },
  info: {
    name: "lyrics",
    description: "Shows the song lyrics **Warning: it can be blank if 1 song is currently playing, else it will not show the lyrics!**",
    usage: "<song_name/(blank)>",
    aliases: ["lyric", "song-lyric", "songlyrics"],
  },
  run: async function (bot, message, args) {
         const genius = require("genius-lyrics")
   const G = new genius.Client(process.env.GENIUS)
if(message.guild!== null){
  
          if(args[0]) {
    const results = await G.songs.search(message.content.split(' ').slice(1).join(' ')); 
    const song = results[0];
    song.lyrics().then(lyrics => {
      if (lyrics.length > 2049) {
        const lyricsEmbo = new MessageEmbed()
          .setColor(0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        return message.channel.send(lyricsEmbo);
        
      }
      
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        return message.channel.send(lyricsEmbed);
      }
  
    
    })
    
} 
  else
  if(!args[0]){
    
      const serverQueue = message.client.queue.get(message.guild.id);
      if(!serverQueue){
         return message.channel.send("<:tairitsuno:801419553933492245> | Song is currently not playing, please give an argument after the space in the command like this: **"+bot.config.prefix+"lyrics siromaru Cranky Conflict**!")
         }
      const ly = serverQueue.songs[0].title.toString()
      const results = await G.songs.search(ly); 
    const song = results[0];
    song.lyrics().then(lyrics => {
      if (lyrics.length > 2049) {
        const lyricsEmbo = new MessageEmbed()
          .setColor(0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        return message.channel.send(lyricsEmbo);
        
      }
      
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        return message.channel.send(lyricsEmbed);
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
          .setColor(0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .setDescription(`[Link]`+ `(${song.url})`);
        
          
        return message.channel.send(lyricsEmbo);
        
      }
      
      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setColor(0x0affaf)
          .setTitle(`**${song.artist.name} - ${song.title}**`)
          .addField("** **", `[link]`+ `(${song.url})`)
          .setDescription(lyrics.trim());
        return message.channel.send(lyricsEmbed);
      }
  
    
    })
    
    
    
    
} else {
  return sendError("You're in my DM, not in a server, please give a name of the song to let me search and send you!", message.channel)
             }
  }
};
