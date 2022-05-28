const { Permissions } = require('discord.js')
exports.run = async (bot, message, args) => {
  
  
 const permissions = message.channel.permissionsFor(message.client.user);
  if(!permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I don't have permission to purge messages!!!"); 
  //checked
  let perm=message.channel.permissionsFor(message.member)
    if(!perm.has(Permissions.FLAGS.MANAGE_MESSAGES)&&!perm.has(Permissions.FLAGS.ADMINISTRATOR)) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+'| You don\'t have permission to purge the messages!')
    if(!args[0]) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} Error while running the command. Please type \`${bot.config.prefix}purge [number of message]\` to purge message!`)
    if(isNaN(args[0])) {
       message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} Error while running the command. Please type \`${bot.config.prefix}purge [number of message]\` to purge messages!`)
      return
  }
  
     if(parseInt(args[0])>100){
         try{
      message.delete().then(()=>{
      if(args[0]-parseInt(Math.round(parseInt(args[0]/100))*100)!==0)message.channel.bulkDelete(args[0]-parseInt(Math.round(parseInt(args[0]/100))*100))
        let b=Math.round(parseInt(args[0]/100))
        for (let i= 0;i<b;i++){
      message.channel.bulkDelete(50)
      message.channel.bulkDelete(50)

        }
      return message.channel.send({content:`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | deleted **${args[0]}** messages sucessfully(complete)!`}).then(msg=>msg.delete({timeout: 5000}))
      })
       }
    catch(error) {
      message.noMentionReply('Error:' + error)
    } return
  } else {
    try{
      message.delete().then(async()=>
      await message.channel.bulkDelete(args[0]).then(msg => message.channel.send({content: `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | deleted **${args[0]}** messages sucessfully(complete)!`})
      .then(msg=>msg.delete({timeout: 5000})))
)
                            }
    catch(error) {
      message.noMentionReply('Error:' + error)
    } return
  }
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