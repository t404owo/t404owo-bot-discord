exports.run = (bot, message, args) => {
   
        message.channel.send('Ping?')
      .then(msg => {
          
        msg.edit(`<:hikariok:801419553841741904> | Pong! \`Latency: ${Date.now()- message.createdTimestamp}ms, Message Latency: ${Date.now()- msg.createdTimestamp}ms, API Latency: ${Math.round(bot.ws.ping)}ms\``);
      });   
  }
  exports.info = {
    name: 'ping',
    aliases:[],
  usage: "",
    description: "Pings the bot, and check if it is on or off"
  }
exports.conf={
  cooldown: 0,
  dm: "yes"
}