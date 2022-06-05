exports.run = (bot, message, args) => {
         const Discord = require("discord.js")
         let link =
             `https://discord.gg/${process.env.DISCORD_BOT_INVITE}`
         let msgembed = new Discord.MessageEmbed()
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||'#0affaf')
         .setTitle("Supports <:koulove:801419554156445726>")
      .setDescription('My main support server: [Click here]' + `(${link})`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
       message.noMentionReply("Generating support servers invites...")
        .then(msg => {
          msg.edit({content:"\u200b", embeds:[msgembed], allowedMentions: { repliedUser: false }})
       });
  }
exports.interaction = async(bot, interaction, args) => {
         const Discord = require("discord.js")
         let link =
             `https://discord.gg/${process.env.DISCORD_BOT_INVITE}`
         let embed = new Discord.MessageEmbed()
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||'#0affaf')
      .setTitle("Supports <:koulove:801419554156445726>")
      .setDescription('My main support server: [Click here]' + `(${link})`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
       interaction.reply({embeds:[embed]})
  }
exports.options=[]
  exports.info = {
    name: 'support',
  aliases:[],
  usage: "",
    description: "sends the support server, where you can ask us, report bugs, and add new ideas",
  }
exports.conf={
  cooldown: 0,
  dm: "yes"
}
