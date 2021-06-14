const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
let axios=require("axios")
const editInteraction = async (client, interaction, response, appId) => {
    // Set the data as embed if reponse is an embed object else as content
    const data = typeof response === 'object' ? { embeds: [ response ] } : { content: response };
    // Get the channel object by channel id:
    const channel = await client.channels.resolve(interaction.channel_id);
    // Edit the original interaction response:
    return axios
        .patch(`https://discord.com/api/v8/webhooks/${appId}/${interaction.token}/messages/@original`, data)
        .then((answer) => {
            // Return the message object:
            return channel.messages.fetch(answer.data.id)
        })
};
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
  interaction: async function(client, interaction, arg) {
     
    let args=[arg.find(arg => arg.name.toLowerCase() == "song").value];
    
    const sendSuccess = require("../../util/slash/success"),sendError = require("../../util/slash/error");
const sendSucces = require("../../util/succes");
const sendEror = require("../../util/eror");
    const channel = await client.guilds.cache
      .get(interaction.guild_id)
      .members.cache.get(interaction.member.user.id).voice.channel;;
    if (!channel)
      return sendError(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!',
        interaction, client
      );

    const permissions = channel.permissionsFor(client.guilds.cache
      .get(interaction.guild_id).client.user);
    if (!permissions.has("CONNECT")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
      `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | I cannot connect to your voice channel, make sure I have the proper permissions!",
        interaction, client
      );
    if (!permissions.has("SPEAK")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | I cannot speak in this voice channel, make sure I have the proper permissions!",
        interaction, client
      );

    var searchString = args.join(" ");
    
    if (!searchString)
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | You didn't provide what you want to play",
        interaction, client
      );
    client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).startTyping();
    var serverQueue = client.guilds.cache
      .get(interaction.guild_id).client.queue.get(interaction.guild_id);

    let songEmbed=await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                      content: `🔎 | Searching for \`${args.slice().join(" ")}\`...`
                    }
                }
            })
    
    console.log(interaction.data.id)
    var searched = await yts.search(searchString);
    
    if (searched.videos.length === 0){
client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).channel.stopTyping()
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Looks like I was unable to find the song on YouTube",
        interaction, client
      );
    }
    
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
      
      .addField("Exit", " type `exit`, `cancel` or `close`");
 editInteraction(client, interaction, embed, client.user.id).then(client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping());
    
    try {
      var response = await client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).awaitMessages(
        msg => (msg.content > 0 && msg.content < 11) || msg.content === "exit",
        {
          max: 1,
          maxProcessed: 1,
          time: 60000,
          errors: ["time"]
        }
      );
      if (response.first() === undefined) {
        client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
        
        return sendEror(
          `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please try again and enter a number between 1 and 10 or exit",
          client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id)
        );
      }
      var videoIndex = parseInt(response.first().content);
    } catch (err) {
      client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      console.error(err);
      
      return sendEror(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please try again and enter a number between 1 and 10 or exit",
        client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id)
      );
    }
    if (
      response.first().content === "exit" ||
      response.first().content === "close" ||
      response.first().content === "cancel"
    )
     return 
    try {
      client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      var songInfo = await yts({videoId:searched.videos[videoIndex - 1].videoId});
     
    } catch (err) {
      client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      console.error(err);
      return
    }
    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(1, " "),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id).user
    };

    if (serverQueue&&serverQueue.songs!==null) {
      
      client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      if (client.guilds.cache
      .get(interaction.guild_id).me.voice.channel !== channel)return sendEror(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id));
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
      client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      //if(songEmbed)return songEmbed.edit("",thing)
      return client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).send(thing)
    }

    const queueConstruct = {
      textChannel: client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id),
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true
    };
    client.guilds.cache
      .get(interaction.guild_id).client.queue.set(interaction.guild_id, queueConstruct);
    queueConstruct.songs.push(song);
    client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
    const play = async song => {
      const queue = client.guilds.cache
      .get(interaction.guild_id).client.queue.get(interaction.guild_id);
      if (!song) {
        //sendSucces(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Disconnected sucessfully!", message.channel);//If you want your bot stay in vc 24/7 remove this line :D
        //queue.voiceChannel.leave(); //If you want your bot stay in vc 24/7 remove this line too :D
        client.guilds.cache
      .get(interaction.guild_id).client.queue.delete(interaction.guild_id);
        return;
      }
console.log(song.url)
      const dispatcher = queue.connection
        .play(ytdl(song.url, {filter:"audioonly"}))
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
        .setFooter(`Views: ${song.views} | Ago: ${song.ago||'Unknown'}`);
      queue.textChannel.send(thing);
      client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();

      //songEmbed.edit("",thing);
    };

    try {
      const connection = await channel.join();
      client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id).stopTyping();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true);
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      client.guilds.cache
      .get(interaction.guild_id).client.queue.delete(interaction.guild_id);
      await channel.leave();
      return sendEror(
        `<:tairitsuno:801419553933492245> | I could not join the voice channel: ${error}`,
        client.guilds.cache
      .get(interaction.guild_id).channels.cache.get(interaction.channel_id)
      );
    }
  },
  //checked, only the error on ${song.ago} because or topic-user's song, collection and the others are ok
  run: async function(client, message, args) {
    const sendSuccess = require("../../util/success"),sendError = require("../../util/error");
const sendSucces = require("../../util/succes");
const sendEror = require("../../util/eror");
    const channel = message.member.voice.channel;
    if (!channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join a voice channel to use this command!', message);
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | I cannot connect to your voice channel, make sure I have the proper permissions!",
        message
      );
    if (!permissions.has("SPEAK")&&!permissions.has("ADMINISTRATOR"))
      return sendError(
        `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | I cannot speak in this voice channel, make sure I have the proper permissions!",
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
    message.channel.startTyping();
    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString);
    if (searched.videos.length === 0){
message.channel.stopTyping()
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
          `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Please try again and enter a number between 1 and 10 or exit",
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
      message.channel.stopTyping();
      var songInfo = await yts({videoId:searched.videos[videoIndex - 1].videoId});
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
      if (message.guild.me.voice.channel !== channel)return sendError(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+' | You need to join voice channel where the bot is to use this command!', message);
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
        //sendSucces(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'}`+" | Disconnected sucessfully!", message.channel);
        //queue.voiceChannel.leave(); //If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
        return;
      }
      console.log(song.url)

      const dispatcher = queue.connection
        .play(ytdl(song.url, {filter:"audioonly"}))
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
        .on("error", error => console.error(error));
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
