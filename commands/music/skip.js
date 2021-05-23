const sendError = require("../../util/error");
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
    const channel = message.member.voice.channel
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message.channel);
    if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("There is nothing playing that I could skip for you.", message.channel);
    /*let{vote}=client
    const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
    const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
    console.log(message.guild.me.voice.channel.members.size)
    if(!message.member.hasPermission("ADMINISTRATOR")&&client.music.vote===true) {
       if(vote.vote > okie) {
         const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
    //serverQueue.songs.shift()
    serverQueue.skip = !serverQueue.skip
    serverQueue.connection.dispatcher.end("Skiped the music");
    message.react("766664525356204092")
    return
       }
       
       if(vote.voters.includes(message.author.id)) {
         return message.channel.send("You already voted for this song")
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
       return message.channel.send(`Thanks for vote, we currently need ${Math.floor(vcvote - vote.vote)} votes more to skip`)
    
     
     
     
     }else{*/
    
     const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
    //serverQueue.songs.shift()
    console.log(serverQueue.loop === true ? "enabled" : "disabled"+ ": !true")

    serverQueue.skip = true
    serverQueue.connection.dispatcher.end("Skiped the music");
    message.react("801419553841741904")
}
 // } 
      
};