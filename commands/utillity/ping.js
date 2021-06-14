exports.run = (bot, message, args) => {
   
        message.noMentionReply('Ping?')
      .then(msg => {
          
        msg.edit(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Pong! \`Latency: ${Date.now()- message.createdTimestamp}ms, Message Latency: ${Date.now()- msg.createdTimestamp}ms, API Latency: ${Math.round(bot.ws.ping)}ms\``);
      });   
  }
exports.interaction= async (bot, interaction, args) =>{
  bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Pong! \`${Math.round(bot.ws.ping)}ms\``
                    }
                }
            });
}
exports.options=[]
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