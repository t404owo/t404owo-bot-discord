const request = require("node-superfetch");
const Discord = require("discord.js");
const fs = require("fs");
//checked
exports.conf={
  cooldown: 0,
  dm: "yes"
}
exports.run = async (bot, message, args, prefix) => {
  
  
  
 
  
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
      return message.reply("Can't find any results");
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
    return message.channel.send(embed);
  } catch (err) {
    console.log(err)
     message.reply(
      `Error, please report it to the arcaea bot devs`
    );
    return
  }
  
};

exports.info = {
  name: "anime",
  aliases: [],
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  usage: "<anime_title>",
  description:"Sends the info of the anime from kitsu.io"
};
