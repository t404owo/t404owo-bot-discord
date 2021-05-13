exports.run = (bot, message, args) => {
    const { MessageEmbed } = require('discord.js');
  let totalSeconds = (bot.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds.toFixed(2)} seconds`;
    let a = new MessageEmbed()
    .setColor('#0affaf')
    .setDescription("The bot has started for " + uptime)
    message.channel.send(a)
  };
  
 exports.info = {
      name: 'uptime',
  aliases:[],
  usage: "",
    description: "get the uptime of the bot",
  };
exports.conf={
  cooldown: 0,
  dm: "yes"
}