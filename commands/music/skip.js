
const fs = require("fs")
//const skipreq = JSON.parse(fs.readFileSync("./skipreq.json", "utf8"));

module.exports = {
  conf:{
    cooldown: 0,
  dm: "no"
  },
  info: {
    name: "skip",
    description: "To skip the current music",
    usage: "",
    aliases: ["s","next", "n", "nxt"],
  },
//checked, adding something...
  run: async function (client, message, args) {
    const sendError = require("../../util/error");
    const channel = message.member.voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing that I could skip for you.", message);
    /*let{vote}=client
    const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
    const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
    console.log(message.guild.me.voice.channel.members.size)
    let perm=message.channel.permissionsFor(message.member)//perm.has()
    if(!perm.has("ADMINISTRATOR")&&client.music.vote===true) {
       if(vote.vote > okie) {
         const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
    //serverQueue.songs.shift()
    serverQueue.skip = !serverQueue.skip
    serverQueue.connection.dispatcher.end("Skiped the music");
    message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"766664525356204092")
    return
       }
       
       if(vote.voters.includes(message.author.id)) {
         return message.mentionReply("`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You already voted for this song")
       }
       
       if(vcvote === 2) {
          const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
    //serverQueue.songs.shift()
    serverQueue.skip = !serverQueue.skip
    serverQueue.connection.dispatcher.end("Skiped the music");
    message.react("766664525356204092")
       }
       
       
       
vote.vote++
       vote.voters.push(message.author.id)
       return message.noMentionReply(`Thanks for vote, we currently need ${Math.floor(vcvote - vote.vote)} votes more to skip`)
    
     
     
     
     }else{*/
    
     console.log(serverQueue.loop === true ? "enabled" : "disabled"+ ": !true")
if (serverQueue.loop === true) {
            serverQueue.songs.push(serverQueue.songs[0]);
          }
    serverQueue.songs.shift()
    
    serverQueue.skip = true
    serverQueue.connection.dispatcher.end("Skiped the music");
    message.react(process.env.EMOTE_OK.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "")||"801419553841741904");
},
  options:[],
  interaction: async function (client, message, args) {
    const sendError = require("../../util/slash/error"),sendSuccess = require("../../util/slash/success");
    const channel = client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).voice.channel
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    if (client.guilds.cache.get(message.guild_id).me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);
    const serverQueue = client.guilds.cache.get(message.guild_id).client.queue.get(message.guild_id);
    if (!serverQueue)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There is nothing playing that I could skip for you.", message);
    /*let{vote}=client
    const vcvote = Math.floor(client.guilds.cache.get(message.guild_id).me.voice.channel.members.size / 2)
    const okie = Math.floor(client.guilds.cache.get(message.guild_id).me.voice.channel.members.size / 2 - 1)
    console.log(client.guilds.cache.get(message.guild_id).me.voice.channel.members.size)
    if(!client.guilds.cache.get(message.guild_id).channels.cache.get(message.channel_id).permissionsFor(client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id)).has("ADMINISTRATOR")&&client.music.vote===true) {
       if(vote.vote > okie) {
         const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
    //serverQueue.songs.shift()
    serverQueue.skip = !serverQueue.skip
    serverQueue.connection.dispatcher.end("Skiped the music");
    
    return sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Skipped the song!`)
       }
       
       if(vote.voters.includes(message.member.user.id)) {
         return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You already voted for this song")
       }
       
       if(vcvote === 2) {
          const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
    //serverQueue.songs.shift()
    serverQueue.skip = !serverQueue.skip
    serverQueue.connection.dispatcher.end("Skiped the music");
    return sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Skipped the song!`)
       }
       
       
       
vote.vote++
       vote.voters.push(message.author.id)
       return sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Thanks for vote, we currently need ${Math.floor(vcvote - vote.vote)} votes more to skip`, message, client)
    
     
     
     
     }else{*/
    
     
    console.log(serverQueue.loop === true ? "enabled" : "disabled"+ ": !true")
if (serverQueue.loop === true) {
            serverQueue.songs.push(serverQueue.songs[0]);
          }
    serverQueue.songs.shift()
    
    serverQueue.skip = true
    serverQueue.connection.dispatcher.end("Skiped the music");
    sendSuccess(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+' | Skipped the song!', message, client)
}
 // } 
      
};
