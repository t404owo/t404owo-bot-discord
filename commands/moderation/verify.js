
exports.run = async (bot, message, args) => {
 if(bot.db.get(`${message.guild.id}_verifychannel`) === message.channel.id){
   message.delete();
   message.member.roles.add(message.guild.roles.cache.find(r => r.id === bot.db.get(`${message.guild.id}_verifyrole`)))
 } else return;
}
exports.info = {
  name: 'verify',
  aliases: [],
  usage: "",
  description: "Verify yourself (Must be setup by moderators first)"
}//
exports.conf={
  cooldown: 0,
  dm: "no"
}