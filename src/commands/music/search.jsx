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
const yts = require("yt-search");
module.exports = {
  conf: {
    cooldown: 0,
    dm: "no"
  },
  info: {
    name: "search",
    description: "To search, play/add a song/songs :D",
    usage: "<song_name>",
    aliases: [
      "searchsong",
      "search-music",
      "searchmusic",
      "search-song",
      "find-song",
      "findsong",
      "find-music",
      "findmusic"
    ]
  },
  options: [
  {
    name: "song",
    description: "which song do you want to play?",
    type: 3,
    required: true
  }
],
  run: async function(client, message, args) {
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
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | You didn't provide what you want to play",
        message
      );
    var songEmbed = await message.noMentionReply(
      `🔎 | Searching for \`${args.slice().join(" ")}\`...`
    );
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0){
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Looks like i was unable to find the song on YouTube",
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
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
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
    songEmbed.edit({ content:"\u200b",  embeds:[embed] });

    /*songEmbed.react("766649381411618837").then(r => {
                  const CloseFilter = (reaction, user) =>
          reaction.emoji.id === "766649381411618837" && user.id === message.author.id;
 const close = songEmbed.createReactionCollector(CloseFilter, {
          time: 60000
        });
        close.on("collect", r => {
          
         return songEmbed.delete();
        })
        })*/
    try {
      var response = await message.channel.awaitMessages(
        {
          filter: msg => (msg.content > 0 && msg.content < 11 && msg.member.id===message.author.id) || (msg.content === "exit"&& msg.member.id===message.author.id),
          max: 1,
          maxProcessed: 1,
          time: 60000,
          errors: ["time"]
        }
      );
      if (response.first() === undefined) {
        
        if (songEmbed) {
          songEmbed.delete();
        }
        return sendError(
          `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please try again and enter a number between 1 and 10 or exit",
          message
        );
      }
      var videoIndex = parseInt(response.first().content);
    } catch (err) {
      
      console.error(err);
      if (songEmbed) {
        songEmbed.delete();
      }
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please try again and enter a number between 1 and 10 or exit",
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
      
      var songInfo = await yts({videoId:searched.videos[videoIndex - 1].videoId});
      if (songEmbed) songEmbed.delete();
    } catch (err) {
      
      console.error(err);
      if (songEmbed) {
        songEmbed.delete();
      }
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true
    };
    const song = {
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
  interaction: async function(client, message, arg) {
    let args=[arg._hoistedOptions[0].value];
    
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
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | You didn't provide what you want to play",
        message
      );
    var songEmbed = await message.noMentionReply(
      `🔎 | Searching for \`${args[0]}\`...`
    );
    
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0){

      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Looks like i was unable to find the song on YouTube",
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
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
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
    message.editReply({ content:"\u200b",  embeds:[embed] });

    /*songEmbed.react("766649381411618837").then(r => {
                  const CloseFilter = (reaction, user) =>
          reaction.emoji.id === "766649381411618837" && user.id === message.author.id;
 const close = songEmbed.createReactionCollector(CloseFilter, {
          time: 60000
        });
        close.on("collect", r => {
         
         return songEmbed.delete();
        })
        })*/
    try {
      var response = await message.channel.awaitMessages(
        {
          filter: msg => (msg.content > 0 && msg.content < 11 && msg.member.id===message.author.id) || (msg.content === "exit"&& msg.member.id===message.author.id),
          max: 1,
          maxProcessed: 1,
          time: 60000,
          errors: ["time"]
        }
      );
      if (response.first() === undefined) {
       
        if (songEmbed) {
          songEmbed.delete();
        }
        return sendError(
          `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please try again and enter a number between 1 and 10 or exit",
          message
        );
      }
      var videoIndex = parseInt(response.first().content);
    } catch (err) {
      
      console.error(err);
      if (songEmbed) {
        songEmbed.delete();
      }
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please try again and enter a number between 1 and 10 or exit",
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
      
      var songInfo = await yts({videoId:searched.videos[videoIndex - 1].videoId});
      if (songEmbed) songEmbed.delete();
    } catch (err) {
      
      console.error(err);
      if (songEmbed) {
        songEmbed.delete();
      }
    }
    
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true
    };
    const song = {
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
  //checked, only the error on ${song.ago} because or topic-user's song, collection and the others are ok
};