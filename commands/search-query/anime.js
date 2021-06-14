const request = require("node-superfetch");
const Discord = require("discord.js");
const fs = require("fs");
//checked
exports.conf={
  cooldown: 0,
  dm: "yes"
}
exports.run = async (bot, message, args) => {
  
  
  
 
  
  function shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
  }
  const query = args.join(" ");
  try {
    const { text } = await request
      .get("https://kitsu.io/api/edge/anime")
      .query({ "filter[text]": query });
    const body = JSON.parse(text);
    if (!body.data.length)
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Can't find any results");
    const data = body.data[0].attributes;
    const embed = new Discord.MessageEmbed()
      .setColor(0xf75239)
      .setURL(`https://kitsu.io/anime/${data.slug}`)
      .setThumbnail(data.posterImage ? data.posterImage.original : null)
      .setTitle(data.canonicalTitle)
      .setDescription(shorten(data.synopsis))
      .addField("❯ Type", `${data.showType} - ${data.status}`, true)
      .addField("❯ Episodes", data.episodeCount || "???", true)
      .addField(
        "❯ Start Date",
        data.startDate ? new Date(data.startDate).toDateString() : "???",
        true
      )
      .addField(
        "❯ Ending Date",
        data.endDate ? new Date(data.endDate).toDateString() : "???",
        true
      );
    return message.noMentionReply(embed);
  } catch (err) {
    console.log(err)
     message.mentionReply(
      `Error, please report it to the arcaea bot devs`
    );
    return
  }
  
};
exports.interaction = async (bot, interaction, arg) => {
  
  let args=[]
if(arg)args=[arg.find(arg => arg.name.toLowerCase() == "anime").value]     
  
 
  
  function shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
  }
  const query = args[0];
  try {
    const { text } = await request
      .get("https://kitsu.io/api/edge/anime")
      .query({ "filter[text]": query });
    const body = JSON.parse(text);
    if (!body.data.length)
      return bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Can't find any results"
                    }
                }
            });
                      const data = body.data[0].attributes;
    const embed = new Discord.MessageEmbed()
      .setColor(0xf75239)
      .setURL(`https://kitsu.io/anime/${data.slug}`)
      .setThumbnail(data.posterImage ? data.posterImage.original : null)
      .setTitle(data.canonicalTitle)
      .setDescription(shorten(data.synopsis))
      .addField("❯ Type", `${data.showType} - ${data.status}`, true)
      .addField("❯ Episodes", data.episodeCount || "???", true)
      .addField(
        "❯ Start Date",
        data.startDate ? new Date(data.startDate).toDateString() : "???",
        true
      )
      .addField(
        "❯ Ending Date",
        data.endDate ? new Date(data.endDate).toDateString() : "???",
        true
      );
    return bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(interaction, embed)
                }
            });
  } catch (err) {
    console.log(err)
     bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content:
      `Error, please report it to the bot owner`
    }
                }
            });
    return
  }
  
};
exports.options= [
  {
    name: "anime",
    description: "Which Anime do you want to search?",
    type: 3,//1=get perms for role,2=role,3=normal,6=mention,7=channel,8=role to edit
    required: true//true/false
  }
];
exports.info = {
  name: "anime",
  aliases: [],
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  usage: "<anime_title>",
  description:"Sends the info of the anime from kitsu.io"
};
