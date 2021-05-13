const discord = require('discord.js')
exports.run = (bot, message, args) => {
  const version = "1.0.0";
  let embed = new discord.MessageEmbed()
  .setAuthor(bot.user.tag, bot.user.avatarURL)
        .setTitle("Bot Information")
      .addField("Bot Name", bot.user.username, true)
      .addField("Version", version, true)
      .setThumbnail(bot.user.avatarURL({dynamic:true, size: 1024}))
      .addField("Bot Owner/Lead Developer", "t404owo#2452", true)
      //.addField("Bot Developers", "[404]-QuangBùi#6288, t404owo#2452", true)
      //.addField("Bot's Arcaea Wiki Members","t404owo#2452 mitsuko21#3187, TriPizza#7407",true)
      //.setFooter("")
      .setColor("#0affaf")
      return message.channel.send(embed);
}
exports.info = {
  name: 'info',
  aliases: ['botinfo'],
  usage: "",
  description: "shows the info of the bot"
}
//checked
exports.conf={
  cooldown: 0,
  dm: "yes"
}
