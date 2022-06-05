const discord = require('discord.js')
exports.run = (bot, message, args) => {
  const version = process.env.VERSION;
  let embed = new discord.MessageEmbed()
  .setAuthor({name:bot.user.tag, iconURL:bot.user.avatarURL})
        .setTitle("Bot Information")
      .addField("Bot Name", bot.user.username, true)
      .addField("Version", version, true)
      .setThumbnail(bot.user.avatarURL({dynamic:true, size: 1024}))
      .addField("Bot Owner/Lead Developer", bot.users.cache.get(process.env.DISCORD_BOT_OWNER_ID.toString()).tag, true)
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
      return message.reply({embeds:[embed], allowedMentions: { repliedUser: false }})
}
exports.options=[]
exports.interaction = async(bot, interaction, args) => {
  const version = process.env.VERSION;
  let embed = new discord.MessageEmbed()
  .setAuthor({name:bot.user.tag, iconURL:bot.user.avatarURL})
        .setTitle("Bot Information")
      .addField("Bot Name", bot.user.username, true)
      .addField("Version", version, true)
      .setThumbnail(bot.user.avatarURL({dynamic:true, size: 1024}))
      .addField("Bot Owner/Lead Developer", bot.users.cache.get(process.env.DISCORD_BOT_OWNER_ID.toString()).tag, true)
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
      return interaction.reply({embeds:[embed]})
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