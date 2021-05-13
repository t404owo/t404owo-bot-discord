exports.run = (bot, message, args) => {
         const Discord = require("discord.js")
         let link =
             `https://discord.gg/`
         let msgembed = new Discord.MessageEmbed()
      .setColor('#0affaf')
         .setTitle("Supports <:koulove:801419554156445726>")
      .setDescription('My main support server: [Click here]' + `(${link})`)
      //.addField("Core/Support Server", 'Arcaea bots\' core (T4gs4owo): [Click Here]' + `(${link})`)
      //.addField("­", "Commands Emotes: [Link]"+`(${link2})`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
       message.channel.send("Generating support servers invites...")
        .then(msg => {
          msg.edit("", msgembed)
       });
  }
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