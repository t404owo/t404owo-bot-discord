const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendSuccess = require("../../util/success"),sendError = require("../../util/error");
const sendSucces = require("../../util/succes");
const sendEror = require("../../util/eror");
module.exports = {
  conf: {
    cooldown: 0,
    dm: "no"
  },
  info: {
    name: "play",
    description: "To play songs :D",
    usage: "<song_name>",
    aliases: ["p", "add"]
  },
  //checked, only the error on ${song.ago} because or topic-user's song
  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        '<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!',
        message
      );

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        "<:tairitsuno:801419553933492245> | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has("SPEAK")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        "<:tairitsuno:801419553933492245> | I cannot speak in this voice channel, make sure I have the proper permissions!",
        message
      );

    var searchString = args.join(" ");
    if (!searchString)
      return sendError(
        "<:tairitsuno:801419553933492245> | You didn't provide what you want to play",
        message
      );
    var songEmbed = await message.noMentionReply(
      `🔎 | Searching for \`${args.slice().join(" ")}\`...`
    );
    message.channel.startTyping();
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0){
message.channel.stopTyping()
      return sendError(
        "<:tairitsuno:801419553933492245> | Looks like I was unable to find the song on YouTube",
        message
      );}
    var songInfo = searched.videos[0];

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(1, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue&&serverQueue.songs!==null) {
      
      message.channel.stopTyping();
      if (message.guild.me.voice.channel !== channel)return sendError('<:tairitsuno:801419553933492245> | You need to join voice channel where the bot is to use this command!', message);
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setAuthor(
          "Song has been added to queue",
          song.req.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(song.img)
        .setColor("YELLOW")
        .addField("Name", `[${song.title}]` + `(${song.url})`)
        .addField("Duration", song.duration)
        .addField("Requested by", song.req.tag)
        .setFooter(`Views: ${song.views} | ${song.ago||'Unknown'}`);
      message.channel.stopTyping();
      //if(songEmbed)return songEmbed.edit("",thing)
      return message.noMentionReply(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);
    message.channel.stopTyping();
    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        sendSucces("<:hikariok:801419553841741904> | Disconnected sucessfully!", message.channel);
        queue.voiceChannel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
        return;
      }
console.log(song.url)
      const dispatcher = queue.connection
        .play(ytdl(song.url, {filter:"audioonly"}))
        .on("finish", () => {
          if (queue.loop === true) {
            queue.songs.push(queue.songs.shift());
          }
          if (queue.skip !== true) {
            queue.songs.shift();
            play(queue.songs[0]);
            console.log(
              queue.skip === true ? "enabled" : "disabled" + ": !true"
            );
          } else {
            console.log(
              queue.skip === true ? "enabled" : "disabled" + ": true"
            );
            queue.skip = false;
            play(queue.songs[0]);
            //
          }

          //const command = args.shift().toLowerCase();
          
        }) //thynk
        .on("error", error => console.error);
      dispatcher.setVolumeLogarithmic(queueConstruct.volume / 100);
      let thing = new MessageEmbed()
        .setAuthor("Now Playing", song.req.displayAvatarURL({ dynamic: true }))
        .setThumbnail(song.img)
        .setColor("BLUE")
        .addField("Name", `[${song.title}]` + `(${song.url})`)
        .addField("Duration", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter(`Views: ${song.views} | Ago: ${song.ago||'Unknown'}`);
      queue.textChannel.send(thing);
      message.channel.stopTyping();

      //songEmbed.edit("",thing);
    };

    try {
      const connection = await channel.join();
      message.channel.stopTyping();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return sendEror(
        `<:tairitsuno:801419553933492245> | I could not join the voice channel: ${error}`,
        message.channel
      );
    }
  }
};
