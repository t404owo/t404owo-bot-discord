const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

exports.run = (bot, message, args) => {
  let link = `https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot+applications.commands&permissions=8989934591`
    let msgembed = new Discord.MessageEmbed()
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||'#0affaf')
      .setTitle("Invite me! <:koulove:801419554156445726>")
      .addField(process.env.DISCORD_BOT_USERNAME, '[Click here]' + `(${link})`)
      //.addField("Tairitsu", '[Click here]' + `(${link2})`)
      //.addField("Al!ce (Unstable)", '[Click here]' + `(${link3})`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      
  
      message.noMentionReply('Generating...')
    .then(msg => {
      msg.edit("", msgembed);
    });   
}
exports.interaction= async(bot, interaction, args) =>{
  let link = `https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot+applications.commands&permissions=8989934591`
let embed = new Discord.MessageEmbed()
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||'#0affaf')
       .setTitle("Invite me! <:koulove:801419554156445726>")
      .addField(process.env.DISCORD_BOT_USERNAME, '[Click here]' + `(${link})`)
      //.setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      //.addField("Tairitsu", '[Click here]' + `(${link2})`)
      //.addField("Al!ce (Unstable)", '[Click here]' + `(${link3})`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
  
  bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(interaction, embed)
                }
            });  
}
exports.options=[]
exports.info = {
  name: 'invite',
  aliases: [],
  usage: "",
  description: "gives an invite link of this bot"
}
//checked
exports.conf={
  cooldown: 0,
  dm: "yes"
}
