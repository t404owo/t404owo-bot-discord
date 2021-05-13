exports.run = (bot, message, args) => {
 const permissions = message.channel.permissionsFor(message.client.user);
  if(!permissions.has("MANAGE_MESSAGES")) return message.channel.send("<:koucry:801419554311241728> | <@!"+message.author.id+">, I don't have permission to purge messages!!!"); 
  //checked
    if(!message.member.hasPermission('MANAGE_MESSAGES')&&!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:tairitsuno:801419553933492245> | You dont have permission to purge the messages!')
    if(!args[0]) return message.channel.send(`<:botno:766649381411618837> | Error while running the command. Please type \`${bot.config.prefix}purge [number of message]\` to purge message!`)
    if(isNaN(args[0])) {
       message.channel.send(`<:tairitsuno:801419553933492245> | Error while running the command. Please type \`${bot.config.prefix}purge [number of message]\` to purge messages!`)
      return
  }
     if(parseInt(args[0])>99){
       return message.channel.send(`<:tairitsuno:801419553933492245> | Error while running the command because your given number is over 99. Please give a number which is less than 99`)
     }
     
    try{
      message.channel.bulkDelete(args[0]+++1).then(msg => message.channel.send(`<:hikariok:801419553841741904> | deleted **${args[0]---1}** messages sucessfully(complete)!`).then(msg=>msg.delete({timeout: 5000})))
    }
    catch(error) {
      message.channel.send('Error:' + error)
    } return
  }
  exports.info = {
    name: 'clear',
    aliases: ['purge', 'prune'],
  usage: "<number>",
  description:"clear messages in amount of a number"
  }
exports.conf={
  cooldown: 0,
  dm: "no"
}