let error=require("../../util/error")
let success=require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
module.exports.run=async(bot,message,args)=>{
  const {MessageEmbed}= require("discord.js")
  let data = bot.db.all().filter(i => i.ID.startsWith(`${message.guild.id}npcname_`)).sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | There's no npc/Tupper saved here");
    
    data.length = 100;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1]
        lb.push(
          "• "+
          //"> "+
          bot.db.get(`${message.guild.id}npcname_${id}`)  ,
        );
    };

    const embed = new MessageEmbed()
    .setTitle("List of npcs/tuppers")
    .setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
    
      // a= `•`+d.user.id
    
  embed.setDescription(lb.join("\n"))
    return message.noMentionReply(embed);
      

}
module.exports.info = {
  name: "npclist",
  description: "Shows the list of the npcs/tuppers in the the server",
  usage: "",
  aliases: ["listnpc", "list-npc", "npc-list", "tupperlist", "tupper-list", "listtupper", "tupperslist", "tuppers-list", "listtuppers"]
};