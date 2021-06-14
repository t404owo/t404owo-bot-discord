const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const y = require("youtubei"), yti= new y.Client(), yts = require("yt-search");
let playlisturl = /list=([a-zA-Z0-9-_]+)&?/g;

module.exports = {
  conf: {
    cooldown: 0,
    dm: "no"
  },
  info: {
    name: "play",
    description: "To play/add a song/songs",
    usage: "<song_name>",
    aliases: ["p", "add"]
  },
  //checked, only the error on ${song.ago} because or topic-user's song
  run: async function(client, message, args) {
    const sendSuccess = require("../../util/success"),
      sendError = require("../../util/error");
    const sendSucces = require("../../util/succes");
    const sendEror = require("../../util/eror");
    const channel = message.member.voice.channel;
    if (!channel)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join a voice channel to use this command!",
        message
      );

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") && !permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has("SPEAK") && !permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I cannot speak in this voice channel, make sure I have the proper permissions!",
        message
      );

    var searchString = args.join(" ");
    if (!searchString)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't provide what you want to play",
        message
      );
    var songEmbed = await message.noMentionReply(
      `🔎 | Searching for \`${args.slice().join(" ")}\`...`
    );
    message.channel.startTyping();
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched, murl=/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\//g;
    
    searched= await yts({videoId:searchString.replace(murl,"")}).catch(async()=>searched=await yts(searchString))
    let song=[]
      let queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 100,
        playing: true
      };
    if(!searched.videos&&!searched.lists&&!searched.playlists)
      {
        console.log(searchString.replace(murl,""))
      }else{
    if (
      searched.videos.length === 0 &&
      searched.lists.length === 0 &&
      searched.playlists.length === 0
    ) {
      
      message.channel.stopTyping();
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Looks like I was unable to find the song on YouTube",
        message
      );
    }
      }
    //console.log(searched);
    if (searchString.match(playlisturl)) {
      
      let ytsc=await yti.getPlaylist(searched.playlists[0].listId)
      if (serverQueue && serverQueue.songs !== null){
        for (var i=0;i<ytsc.videos.length;i++){
let songInfo=await yts({videoId:ytsc.videos[i].id})
song.push({
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: message.author
      })
        
serverQueue.songs.push(song[i])
      }
      let playlist=ytsc
       //console.log(ytsc)
      const list = {
        id: playlist.id,
        title: playlist.title,
        views: playlist.viewCount,
        url: searchString,
        ago: "working on",
        duration: playlist.videoCount,
        img: searched.playlists[0].image,
        req: message.author
      };
        song=null
      //console.log("pong");
      let thing = new MessageEmbed()
        .setAuthor(
          "Playlist has been added to queue",
          list.req.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(list.img)
        .setColor("YELLOW")
        .addField("Name", `[${list.title}]` + `(${list.url})`)
        .addField("Videos Count", list.duration)
        .addField("Requested by", list.req.tag)
      .setFooter(`Views: ${list.views}`);
      message.channel.stopTyping();
      //if(songEmbed)return songEmbed.edit("",thing)
      return message.noMentionReply(thing);
      }else{
      message.client.queue.set(message.guild.id, queueConstruct);
      for (var i=0;i<ytsc.videos.length;i++){
let songInfo=await yts({videoId:ytsc.videos[i].id})
song.push({
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: message.author
      }) 
        queueConstruct.songs.push(song[i]);

        

      }
            let playlist=ytsc
      // console.log(ytsc)
      const list = {
        id: playlist.id,
        title: playlist.title,
        views: playlist.viewCount,
        url: searchString,
        ago: "working on",
        duration: playlist.videoCount,
        img: searched.playlists[0].image,
        req: message.author
      };
      //console.log("pong");
      let thing = new MessageEmbed()
        .setAuthor(
          "Playlist has been added to queue",
          list.req.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(list.img)
        .setColor("YELLOW")
        .addField("Name", `[${list.title}]` + `(${list.url})`)
        .addField("Videos Count", list.duration)
        .addField("Requested by", list.req.tag)
      .setFooter(`Views: ${list.views}`);

      message.channel.stopTyping();
      //if(songEmbed)return songEmbed.edit("",thing)
      message.noMentionReply(thing);
      }
    } else {
      
      var songInfo = await yts({videoId:searched.videoId||searched.videos[0].videoId});
      song = {
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: message.author
      };

      if (serverQueue && serverQueue.songs !== null) {
        message.channel.stopTyping();
        if (message.guild.me.voice.channel !== channel)
          return sendError(
            `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join voice channel where the bot is to use this command!",
            message
          );
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
          .setFooter(`Views: ${song.views} | ${song.ago || "Unknown"}`);
        message.channel.stopTyping();
        //if(songEmbed)return songEmbed.edit("",thing)
        return message.noMentionReply(thing);
      }
      message.client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);
    }

    message.channel.stopTyping();
    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        //sendSucces(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Disconnected sucessfully!", message.channel);//If you want your bot stay in vc 24/7 remove this line :D
        //queue.voiceChannel.leave(); //If you want your bot stay in vc 24/7 remove this line too :D
        message.client.queue.delete(message.guild.id);
        return;
      }
      console.log(song.url);
      const dispatcher = queue.connection
        .play(ytdl(song.url, { filter: "audioonly" }))
        .on("finish", () => {
          
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
        .setFooter(`Views: ${song.views} | Ago: ${song.ago || "Unknown"}`);
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
  },
  options: [
    {
      name: "song",
      description: "which song do you want to play?",
      type: 3,
      required: true
    }
  ],
  interaction: async function(client, interaction, arg) {
    let args = [arg.find(arg => arg.name.toLowerCase() == "song").value];
    const sendSuccess = require("../../util/slash/success"),
      sendError = require("../../util/slash/error");
    const sendSucces = require("../../util/succes");
    const sendEror = require("../../util/eror");
    const channel = await client.guilds.cache
      .get(interaction.guild_id)
      .members.cache.get(interaction.member.user.id).voice.channel;
    if (!channel)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join a voice channel to use this command!",
        interaction,
        client
      );

    const permissions = channel.permissionsFor(
      client.guilds.cache.get(interaction.guild_id).client.user
    );
    if (!permissions.has("CONNECT") && !permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I cannot connect to your voice channel, make sure I have the proper permissions!",
        interaction,
        client
      );
    if (!permissions.has("SPEAK") && !permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I cannot speak in this voice channel, make sure I have the proper permissions!",
        interaction,
        client
      );

    var searchString = args.join(" ");
    if (!searchString)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't provide what you want to play",
        interaction,
        client
      );
    var songEmbed = await client.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data: {
            content: `🔎 | Searching for \`${args.slice().join(" ")}\`...`
          }
        }
      });
    client.guilds.cache
      .get(interaction.guild_id)
      .channels.cache.get(interaction.channel_id)
      .startTyping();
    var serverQueue = client.guilds.cache
      .get(interaction.guild_id)
      .client.queue.get(interaction.guild_id);  
    var searched, murl=/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\//g;
    
    searched= await yts({videoId:searchString.replace(murl,"")}).catch(async()=>searched=await yts(searchString))

    let song=[]
      let queueConstruct = {
        textChannel: client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id),
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 100,
        playing: true
      };
    
if(!searched.videos&&!searched.lists&&!searched.playlists)
      {
        console.log(searchString.replace(murl,""))
      }else{
    if (
      searched.videos.length === 0 &&
      searched.lists.length === 0 &&
      searched.playlists.length === 0
    ) {
      
      client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      return sendEror(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Looks like I was unable to find the song on YouTube",
        client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id)
      );
    }
      }
    //console.log(searched);
    if (searchString.match(playlisturl)) {
      let ytsc=await yti.getPlaylist(searched.playlists[0].listId)
      let playlist=ytsc
       //console.log(ytsc)
      const list = {
        id: playlist.id,
        title: playlist.title,
        views: playlist.viewCount,
        url: searchString,
        ago: "working on",
        duration: playlist.videoCount,
        img: searched.playlists[0].image,
        req: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user
      };
      
      if (serverQueue && serverQueue.songs !== null){
        for (var i=0;i<ytsc.videos.length;i++){
let songInfo=await yts({videoId:ytsc.videos[i].id})
song.push({
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user
      })
        
serverQueue.songs.push(song[i])
      }
        song=null
      //console.log("pong");
      let thing = new MessageEmbed()
        .setAuthor(
          "Playlist has been added to queue",
          list.req.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(list.img)
        .setColor("YELLOW")
        .addField("Name", `[${list.title}]` + `(${list.url})`)
        .addField("Videos Count", list.duration)
        .addField("Requested by", list.req.tag)
      .setFooter(`Views: ${list.views}`);
      client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      //if(songEmbed)return songEmbed.edit("",thing)
      return client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).send(thing);
      }else{
      client.guilds.cache.get(interaction.guild_id).client.queue.set(interaction.guild_id, queueConstruct);
      for (var i=0;i<ytsc.videos.length;i++){
let songInfo=await yts({videoId:ytsc.videos[i].id})
song.push({
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user
      })
        
queueConstruct.songs.push(song[i]);
      }
      let playlist=ytsc
       //console.log(ytsc)
      //console.log("pong");
      let thing = new MessageEmbed()
        .setAuthor(
          "Playlist has been added to queue",
          list.req.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(list.img)
        .setColor("YELLOW")
        .addField("Name", `[${list.title}]` + `(${list.url})`)
        .addField("Videos Count", list.duration)
        .addField("Requested by", list.req.tag)
      .setFooter(`Views: ${list.views}`);
      client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      //if(songEmbed)return songEmbed.edit("",thing)
      client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).send(thing);
      }
    } else {
      
      var songInfo = await yts({videoId:searched.videoId||searched.videos[0].videoId});

      song = {
        id: songInfo.videoId,
        title: Util.escapeMarkdown(songInfo.title),
        views: String(songInfo.views).padStart(1, " "),
        url: songInfo.url,
        ago: songInfo.ago,
        duration: songInfo.duration.toString(),
        img: songInfo.image,
        req: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user
      };

      if (serverQueue && serverQueue.songs !== null) {
        client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
        if (client.guilds.cache.get(interaction.guild_id).me.voice.channel !== channel)
          return sendError(
            `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You need to join voice channel where the bot is to use this command!",
            interaction, client
          );
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
          .setFooter(`Views: ${song.views} | ${song.ago || "Unknown"}`);
        client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
        //if(songEmbed)return songEmbed.edit("",thing)
        return client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).send(thing);
      }
      client.guilds.cache.get(interaction.guild_id).client.queue.set(client.guilds.cache.get(interaction.guild_id).id, queueConstruct);
      queueConstruct.songs.push(song);
    }

    client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
    const play = async song => {
      const queue = client.guilds.cache
        .get(interaction.guild_id)
        .client.queue.get(interaction.guild_id);
      if (!song) {
        //sendSucces(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Disconnected sucessfully!", message.channel);//If you want your bot stay in vc 24/7 remove this line :D
        //queue.voiceChannel.leave(); //If you want your bot stay in vc 24/7 remove this line too :D
        client.guilds.cache
          .get(interaction.guild_id)
          .client.queue.delete(interaction.guild_id);
        return;
      }
      console.log(song.url);
      const dispatcher = queue.connection
        .play(ytdl(song.url, { filter: "audioonly" }))
        .on("finish", () => {
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
        .setFooter(`Views: ${song.views} | Ago: ${song.ago || "Unknown"}`);
      queue.textChannel.send(thing);
      client.guilds.cache
        .get(interaction.guild_id)
        .channels.cache.get(interaction.channel_id)
        .stopTyping();

      //songEmbed.edit("",thing);
    };

    try {
      const connection = await channel.join();
      client.guilds.cache
        .get(interaction.guild_id)
        .channels.cache.get(interaction.channel_id)
        .stopTyping();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      client.guilds.cache
        .get(interaction.guild_id)
        .client.queue.delete(interaction.guild_id);
      await channel.leave();
      return sendEror(
        `<:tairitsuno:801419553933492245> | I could not join the voice channel: ${error}`,
        client.guilds.cache
          .get(interaction.guild_id)
          .channels.cache.get(interaction.channel_id)
      );
    }
  }
};
