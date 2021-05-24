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
    name: "search-song",
    description: "To play songs :D",
    usage: "<song_name>",
    aliases: [
      "searchsong",
      "search-music",
      "searchmusic",
      "search",
      "find-song",
      "findsong",
      "find-music",
      "findmusic"
    ]
  },
  //checked, only the error on ${song.ago} because or topic-user's song, collection and the others are ok
  run: async function(client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError('<:tairitsuno:801419553933492245> | You need to join a voice channel to use this command!', message);
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return sendError(
        "<:tairitsuno:801419553933492245> | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has("SPEAK"))
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
        "<:tairitsuno:801419553933492245> | Looks like i was unable to find the song on YouTube",
        message
      );}
    const vidNameArr = [];
    const vidUrlArr = [];
    const vidLengthArr = [];
    const vidArr = [];
    for (let i = 0; i < searched.videos.length && i < 10; i++) {
      vidNameArr.push(
        `\`${i + 1}.\` [${Util.escapeMarkdown(searched.videos[i].title)}]`
      );
      vidUrlArr.push(`(${Util.escapeMarkdown(searched.videos[i].url)})`);

      vidArr.push(`${vidNameArr[i]}${vidUrlArr[i]}`);
    }

    vidNameArr.push("exit");
    vidNameArr.push("cancel");
    vidNameArr.push("close");
    const embed = new MessageEmbed()
      .setColor("#0affaf")
      .setTitle("Choose a song by giving a number between 1 and 10")
      .setDescription(vidArr.join("\n")) //Ok
      /*.addField('** **', `${vidNameArr[0]}`+`${vidUrlArr[0]}`)
        .addField('** **', `${vidNameArr[1]}`+`${vidUrlArr[1]}`)
        .addField('** **', `${vidNameArr[2]}`+`${vidUrlArr[2]}`)
        .addField('** **', `${vidNameArr[3]}`+`${vidUrlArr[3]}`)
        .addField('** **', `${vidNameArr[4]}`+`${vidUrlArr[4]}`)
        .addField('** **', `${vidNameArr[5]}`+`${vidUrlArr[5]}`)
        .addField('** **', `${vidNameArr[6]}`+`${vidUrlArr[6]}`)
        .addField('** **', `${vidNameArr[7]}`+`${vidUrlArr[7]}`)
        .addField('** **', `${vidNameArr[8]}`+`${vidUrlArr[8]}`)
        .addField('** **', `${vidNameArr[9]}`+`${vidUrlArr[9]}`)*/
      .addField("Exit", " type `exit`, `cancel` or `close`");
    songEmbed.edit("", { embed }).then(message.channel.stopTyping());

    /*songEmbed.react("766649381411618837").then(r => {
                  const CloseFilter = (reaction, user) =>
          reaction.emoji.id === "766649381411618837" && user.id === message.author.id;
 const close = songEmbed.createReactionCollector(CloseFilter, {
          time: 60000
        });
        close.on("collect", r => {
          message.channel.stopTyping()
         return songEmbed.delete();
        })
        })*/
    try {
      var response = await message.channel.awaitMessages(
        msg => (msg.content > 0 && msg.content < 11) || msg.content === "exit",
        {
          max: 1,
          maxProcessed: 1,
          time: 60000,
          errors: ["time"]
        }
      );
      if (response.first() === undefined) {
        message.channel.stopTyping();
        if (songEmbed) {
          songEmbed.delete();
        }
        return sendError(
          "<:tairitsuno:801419553933492245> | Please try again and enter a number between 1 and 10 or exit",
          message
        );
      }
      var videoIndex = parseInt(response.first().content);
    } catch (err) {
      message.channel.stopTyping();
      console.error(err);
      if (songEmbed) {
        songEmbed.delete();
      }
      return sendError(
        "<:tairitsuno:801419553933492245> | Please try again and enter a number between 1 and 10 or exit",
        message
      );
    }
    if (
      response.first().content === "exit" ||
      response.first().content === "close" ||
      response.first().content === "cancel"
    )
      return songEmbed.delete();
    try {
      message.channel.stopTyping();
      var songInfo = searched.videos[videoIndex - 1];
      if (songEmbed) songEmbed.delete();
    } catch (err) {
      message.channel.stopTyping();
      console.error(err);
      if (songEmbed) {
        songEmbed.delete();
      }
    }

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
        .setFooter(`Views: ${song.views} | ${song.ago}`);
      message.channel.stopTyping();
      //if(songEmbed)return songEmbed.edit("",thing);
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

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          if (queue.loop === true) {
            queue.songs.push(queue.songs.shift());
          }
          if (queue.skip !== true) {
            queue.songs.shift();
            play(queue.songs[0]);
            //queue.skip = !queue.skip
            console.log(
              queue.skip === true ? "enabled" : "disabled" + ": !true"
            );
          } else {
            console.log(
              queue.skip === true ? "enabled" : "disabled" + ": true"
            );

            play(queue.songs[0]);
            queue.skip = false;
          }

          const command = args.shift().toLowerCase();
        }) //thynk
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queueConstruct.volume / 100);
      let thing = new MessageEmbed()
        .setAuthor("Now Playing", song.req.displayAvatarURL({ dynamic: true }))
        .setThumbnail(song.img)
        .setColor("BLUE")
        .addField("Name", `[${song.title}]` + `(${song.url})`)
        .addField("Duration", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter(`Views: ${song.views} | Ago: ${song.ago}`);
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
