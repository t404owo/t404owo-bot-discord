const { Util, MessageEmbed, Permissions } = require("discord.js");
const {
  joinVoiceChannel,
  getVoiceConnection,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const y = require("youtubei"),
  yti = new y.Client(),
  yts = require("yt-search");
let playlisturl = /list=([a-zA-Z0-9-_]+)&?/g;

module.exports = {
  conf: {
    cooldown: 0,
    dm: "no",
  },
  info: {
    name: "play",
    description: "To play/add a song/songs",
    usage: "<song_name>",
    aliases: ["p", "add"],
  },
  //checked, only the error on ${song.ago} because or topic-user's song
  run: async function (client, message, args) {
    const sendSuccess = require("../../util/success"),
      sendError = require("../../util/error");
    const sendSucces = require("../../util/succes");
    const sendEror = require("../../util/eror");
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | You need to join a voice channel to use this command!",
        message
      );

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has(Permissions.FLAGS.CONNECT) && !permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has(Permissions.FLAGS.SPEAK) && !permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | I cannot speak in this voice channel, make sure I have the proper permissions!",
        message
      );

    var searchString = args.join(" ");
    if (!searchString)
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | You didn't provide what you want to play",
        message
      );
    var songEmbed = await message.noMentionReply(
      `🔎 | Searching for \`${args.slice().join(" ")}\`...`
    );
    
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched,
      murl = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\//g;

    searched = await yts({ videoId: searchString.replace(murl, "") }).catch(
      async () => (searched = await yts(searchString))
    );
    let song = [];
    let queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
    };
    if (!searched.videos && !searched.lists && !searched.playlists) {
      console.log(searchString.replace(murl, ""));
    } else {
      if (
        searched.videos.length === 0 &&
        searched.lists.length === 0 &&
        searched.playlists.length === 0
      ) {
        
        return sendError(
          `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
            " | Looks like I was unable to find the song on YouTube",
          message
        );
      }
    }
    //console.log(searched);
    if (searchString.match(playlisturl)) {
      let ytsc = await yti.getPlaylist(searched.playlists[0].listId);
      if (serverQueue && serverQueue.songs !== null) {
        for (var i = 0; i < ytsc.videos.length; i++) {
          let songInfo = await yts({ videoId: ytsc.videos[i].id });
          song.push({
            id: songInfo.videoId,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(1, " "),
            url: songInfo.url,
            ago: songInfo.ago,
            duration: songInfo.duration.toString(),
            img: songInfo.image,
            req: message.author,
          });

          serverQueue.songs.push(song[i]);
        }
        let playlist = ytsc;
        //console.log(ytsc)
        const list = {
          id: playlist.id,
          title: playlist.title,
          views: playlist.viewCount,
          url: searchString,
          ago: "working on",
          duration: playlist.videoCount,
          img: searched.playlists[0].image,
          req: message.author,
        };
        song = null;
        //console.log("pong");
        let thing = new MessageEmbed()
          .setAuthor({
            name:"Song has been added to queue",
            iconURL:song.req.avatarURL({ dynamic: true })
          })
          .setThumbnail(list.img)
          .setColor("YELLOW")
          .addField("Name", `[${list.title}]` + `(${list.url})`)
          .addField("Videos Count", list.duration)
          .addField("Requested by", list.req.tag)
          .setFooter({text:`Views: ${list.views}`});
        
        //if(songEmbed)return songEmbed.edit({content:"\u200b",embeds:[thing]})
        return message.reply({embeds:[thing], allowedMentions: { repliedUser: false }});
      } else {
        message.client.queue.set(message.guild.id, queueConstruct);
        for (var i = 0; i < ytsc.videos.length; i++) {
          let songInfo = await yts({ videoId: ytsc.videos[i].id });
          song.push({
            id: songInfo.videoId,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(1, " "),
            url: songInfo.url,
            ago: songInfo.ago,
            duration: songInfo.duration.toString(),
            img: songInfo.image,
            req: message.author,
          });
          queueConstruct.songs.push(song[i]);
        }
        let playlist = ytsc;
        // console.log(ytsc)
        const list = {
          id: playlist.id,
          title: playlist.title,
          views: playlist.viewCount,
          url: searchString,
          ago: "working on",
          duration: playlist.videoCount,
          img: searched.playlists[0].image,
          req: message.author,
        };
        //console.log("pong");
        let thing = new MessageEmbed()
          .setAuthor({
            name:"Song has been added to queue",
            iconURL:song.req.displayAvatarURL({ dynamic: true })
          })
          .setThumbnail(list.img)
          .setColor("YELLOW")
          .addField("Name", `[${list.title}]` + `(${list.url})`)
          .addField("Videos Count", list.duration)
          .addField("Requested by", list.req.tag)
          .setFooter({text:`Views: ${list.views}`});

        
        //if(songEmbed)return songEmbed.edit({content:"\u200b",embeds:[thing]})
        message.reply({embeds:[thing], allowedMentions: { repliedUser: false }});
      }
    } else {
      var songInfo = await yts({
        videoId: searched.videoId || searched.videos[0].videoId,
      });
      song = {
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: message.author,
      };

      if (serverQueue && serverQueue.songs !== null) {
        
        if (message.guild.me.voice.channel !== channel)
          return sendError(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | You need to join voice channel where the bot is to use this command!",
            message
          );
        serverQueue.songs.push(song);
        let thing = new MessageEmbed()
          .setAuthor({
            name:"Song has been added to queue",
            iconURL:song.req.displayAvatarURL({ dynamic: true })
          })
          .setThumbnail(song.img)
          .setColor("YELLOW")
          .addField("Name", `[${song.title}]` + `(${song.url})`)
          .addField("Duration", song.duration)
          .addField("Requested by", song.req.tag)
          .setFooter({text:`Views: ${song.views} | ${song.ago || "Unknown"}`});
        
        //if(songEmbed)return songEmbed.edit({content:"\u200b",embeds:[thing]})
        return message.reply({embeds:[thing], allowedMentions: { repliedUser: false }});
      }
      message.client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);
    }

    
    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        //sendSucces(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Disconnected sucessfully!", message.channel);//If you want your bot not to stay in vc 24/7 remove the // of this line :D
        //message.client.queue.get(message.guild.id).connection.destroy(); //If you want your bot not to stay in vc 24/7 remove the // of this line too :D
        message.client.queue.delete(message.guild.id);
        return;
      }
      queue.resource=createAudioResource(ytdl(song.url, { filter: "audioonly"}), { inlineVolume: true })
      queue.resource.volume.setVolume(queueConstruct.volume/100)
      
      const dispatcher = queue.player
        .play(queue.resource);
        queue.player.on(AudioPlayerStatus.Idle, () => {
          if (queue.skip !== true) {
            if (queue.loop === true) {
              queue.songs.push(queue.songs[0]);
            }
            queue.songs.shift();
            play(queue.songs[0]);
            //queue.skip = !queue.skip
            //  console.log(
            //  queue.skip === true ? "enabled" : "disabled" + ": !true"
            //  );
          } else {
            //  console.log(
            //   queue.skip === true ? "enabled" : "disabled" + ": true"
            //  );

            play(queue.songs[0]);
            queue.skip = false;
          }

          //const command = args.shift().toLowerCase();
        }).on(AudioPlayerStatus.Playing, ()=>{
          message.client.queue.get(message.guild.id).playing=true
        }).on(AudioPlayerStatus.Paused, ()=>{
          message.client.queue.get(message.guild.id).playing=false
        })//thynk
        .on("error", (error) => console.error);
      
      let thing = new MessageEmbed()
        .setAuthor({name:"Now Playing", iconURL:song.req.displayAvatarURL({ dynamic: true })})
        .setThumbnail(song.img)
        .setColor("BLUE")
        .addField("Name", `[${song.title}]` + `(${song.url})`)
        .addField("Duration", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter({text:`Views: ${song.views} | ${song.ago || "Unknown"}`});
      queue.textChannel.send({embeds:[thing]});
      

      //songEmbed.edit({content:"\u200b",embeds: [thing]});
    };

    try {
       message.client.queue.get(message.guild.id).player =  createAudioPlayer()
        message.client.queue.get(message.guild.id).connection=  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: true,
});
      
      
      queueConstruct.connection = message.client.queue.get(message.guild.id).connection;
      queueConstruct.player = message.client.queue.get(message.guild.id).player;
      message.client.queue.get(message.guild.id).connection.subscribe(message.client.queue.get(message.guild.id).player);
      message.client.queue.get(message.guild.id).player.encoder=require("libsodium-wrappers")
      message.client.queue.get(message.guild.id).player.volume= queueConstruct.volume / 100;
      //channel.guild.voice.setSelfDeaf(true);
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
  },
  options: [
    {
      name: "song",
      description: "which song do you want to play?",
      type: 3,
      required: true,
    },
  ],
  interaction: async function (client, message, arg) {
    let args=[arg._hoistedOptions[0].value]    
    const sendSuccess = require("../../util/success"),
      sendError = require("../../util/error");
    const sendSucces = require("../../util/succes");
    const sendEror = require("../../util/eror");
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | You need to join a voice channel to use this command!",
        message
      );

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has(Permissions.FLAGS.CONNECT) && !permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has(Permissions.FLAGS.SPEAK) && !permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | I cannot speak in this voice channel, make sure I have the proper permissions!",
        message
      );

    var searchString = args[0];
    if (!searchString)
      return sendError(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | You didn't provide what you want to play",
        message
      );
    var songEmbed = await message.noMentionReply(
      `🔎 | Searching for \`${args}\`...`
    );
    
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched,
      murl = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\//g;

    searched = await yts({ videoId: searchString.replace(murl, "") }).catch(
      async () => (searched = await yts(searchString))
    );
    let song = [];
    let queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
    };
    if (!searched.videos && !searched.lists && !searched.playlists) {
      console.log(searchString.replace(murl, ""));
    } else {
      if (
        searched.videos.length === 0 &&
        searched.lists.length === 0 &&
        searched.playlists.length === 0
      ) {
        
        return sendError(
          `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
            " | Looks like I was unable to find the song on YouTube",
          message
        );
      }
    }
    //console.log(searched);
    if (searchString.match(playlisturl)) {
      let ytsc = await yti.getPlaylist(searched.playlists[0].listId);
      if (serverQueue && serverQueue.songs !== null) {
        for (var i = 0; i < ytsc.videos.length; i++) {
          let songInfo = await yts({ videoId: ytsc.videos[i].id });
          song.push({
            id: songInfo.videoId,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(1, " "),
            url: songInfo.url,
            ago: songInfo.ago,
            duration: songInfo.duration.toString(),
            img: songInfo.image,
            req: message.author,
          });

          serverQueue.songs.push(song[i]);
        }
        let playlist = ytsc;
        //console.log(ytsc)
        const list = {
          id: playlist.id,
          title: playlist.title,
          views: playlist.viewCount,
          url: searchString,
          ago: "working on",
          duration: playlist.videoCount,
          img: searched.playlists[0].image,
          req: message.author,
        };
        song = null;
        //console.log("pong");
        let thing = new MessageEmbed()
          .setAuthor({
            name:"Song has been added to queue",
            iconURL:song.req.displayAvatarURL({ dynamic: true })
          })
          .setThumbnail(list.img)
          .setColor("YELLOW")
          .addField("Name", `[${list.title}]` + `(${list.url})`)
          .addField("Videos Count", list.duration)
          .addField("Requested by", list.req.tag)
          .setFooter({text:`Views: ${list.views}`});
        
        //if(songEmbed)return songEmbed.edit({content:"\u200b",embeds:[thing]})
        return message.followUp({embeds:[thing], allowedMentions: { repliedUser: false }});
      } else {
        message.client.queue.set(message.guild.id, queueConstruct);
        for (var i = 0; i < ytsc.videos.length; i++) {
          let songInfo = await yts({ videoId: ytsc.videos[i].id });
          song.push({
            id: songInfo.videoId,
            title: Util.escapeMarkdown(songInfo.title),
            views: String(songInfo.views).padStart(1, " "),
            url: songInfo.url,
            ago: songInfo.ago,
            duration: songInfo.duration.toString(),
            img: songInfo.image,
            req: message.author,
          });
          queueConstruct.songs.push(song[i]);
        }
        let playlist = ytsc;
        // console.log(ytsc)
        const list = {
          id: playlist.id,
          title: playlist.title,
          views: playlist.viewCount,
          url: searchString,
          ago: "working on",
          duration: playlist.videoCount,
          img: searched.playlists[0].image,
          req: message.author,
        };
        //console.log("pong");
        let thing = new MessageEmbed()
          .setAuthor({
            name:"Song has been added to queue",
            iconURL:song.req.displayAvatarURL({ dynamic: true })
          })
          .setThumbnail(list.img)
          .setColor("YELLOW")
          .addField("Name", `[${list.title}]` + `(${list.url})`)
          .addField("Videos Count", list.duration)
          .addField("Requested by", list.req.tag)
          .setFooter({text:`Views: ${list.views}`});

        
        //if(songEmbed)return songEmbed.edit({content:"\u200b",embeds:[thing]})
        message.followUp({embeds:[thing], allowedMentions: { repliedUser: false }});
      }
    } else {
      var songInfo = await yts({
        videoId: searched.videoId || searched.videos[0].videoId,
      });
      song = {
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: message.author,
      };

      if (serverQueue && serverQueue.songs !== null) {
        
        if (message.guild.me.voice.channel !== channel)
          return sendError(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | You need to join voice channel where the bot is to use this command!",
            message
          );
        serverQueue.songs.push(song);
        let thing = new MessageEmbed()
          .setAuthor({
            name:"Song has been added to queue",
            iconURL:song.req.displayAvatarURL({ dynamic: true })
          })
          .setThumbnail(song.img)
          .setColor("YELLOW")
          .addField("Name", `[${song.title}]` + `(${song.url})`)
          .addField("Duration", song.duration)
          .addField("Requested by", song.req.tag)
          .setFooter({text:`Views: ${song.views} | ${song.ago || "Unknown"}`});
        
        //if(songEmbed)return songEmbed.edit({content:"\u200b",embeds:[thing]})
        return message.followUp({embeds:[thing], allowedMentions: { repliedUser: false }});
      }
      message.client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);
    }

    
    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        //sendSucces(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Disconnected sucessfully!", message.channel);//If you want your bot not to stay in vc 24/7 remove the // of this line :D
        //message.client.queue.get(message.guild.id).connection.destroy(); //If you want your bot not to stay in vc 24/7 remove the // of this line too :D
        message.client.queue.delete(message.guild.id);
        return;
      }
      queue.resource=createAudioResource(ytdl(song.url, { filter: "audioonly"}), { inlineVolume: true })
      queue.resource.volume.setVolume(queueConstruct.volume/100)
      
      const dispatcher = queue.player
        .play(queue.resource);
        queue.player.on(AudioPlayerStatus.Idle, () => {
          if (queue.skip !== true) {
            if (queue.loop === true) {
              queue.songs.push(queue.songs[0]);
            }
            queue.songs.shift();
            play(queue.songs[0]);
            //queue.skip = !queue.skip
            //  console.log(
            //  queue.skip === true ? "enabled" : "disabled" + ": !true"
            //  );
          } else {
            //  console.log(
            //   queue.skip === true ? "enabled" : "disabled" + ": true"
            //  );

            play(queue.songs[0]);
            queue.skip = false;
          }

          //const command = args.shift().toLowerCase();
        }).on(AudioPlayerStatus.Playing, ()=>{
          message.client.queue.get(message.guild.id).playing=true
        }).on(AudioPlayerStatus.Paused, ()=>{
          message.client.queue.get(message.guild.id).playing=false
        })//thynk
        .on("error", (error) => console.error);
      
      let thing = new MessageEmbed()
        .setAuthor({name:"Now Playing", iconURL:song.req.displayAvatarURL({ dynamic: true })})
        .setThumbnail(song.img)
        .setColor("BLUE")
        .addField("Name", `[${song.title}]` + `(${song.url})`)
        .addField("Duration", song.duration, true)
        .addField("Requested by", song.req.tag, true)
        .setFooter({text:`Views: ${song.views} | ${song.ago || "Unknown"}`});
      queue.textChannel.send({embeds:[thing]});
      

      //songEmbed.edit({content:"\u200b",embeds: [thing]});
    };

    try {
       message.client.queue.get(message.guild.id).player =  createAudioPlayer()
        message.client.queue.get(message.guild.id).connection=  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: true,
});
      
      
      queueConstruct.connection = message.client.queue.get(message.guild.id).connection;
      queueConstruct.player = message.client.queue.get(message.guild.id).player;
      message.client.queue.get(message.guild.id).connection.subscribe(message.client.queue.get(message.guild.id).player);
      message.client.queue.get(message.guild.id).player.encoder=require("libsodium-wrappers")
      message.client.queue.get(message.guild.id).player.volume= queueConstruct.volume / 100;
      //channel.guild.voice.setSelfDeaf(true);
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
  },
};
