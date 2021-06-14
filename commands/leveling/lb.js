const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  //message.channel.startTyping();

  
  if(args[0]==="global"){
    if(args[1]){
    if(isNaN(args[1])){
      let data = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
    if (data.length < 1) {
      client.sleep(2000)
message.channel.stopTyping();
return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard");}
    let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A";
    data.length = 10;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data.indexOf(data[i]) + 1;
        let level = client.db.get(`level_${id}`)||1;
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Global Leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`);
    });
    embed.setFooter(`Your Position: #${myrank}`);
      client.sleep(2000);
      message.channel.stopTyping();
    return message.noMentionReply(embed);
    } else {
      
let data = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data).splice(10 * (parseInt(args[1]) - 1), 10 * parseInt(args[1]));
      if(parseInt(args[1])> Math.ceil(Object.keys(data).length / 10)){client.sleep(2000);message.channel.stopTyping();return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard")}
    if (data.length < 1) {
      client.sleep(2000)
message.channel.stopTyping();
return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard");}
      let data2 = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data)
    let myrank = data2.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A";
    data.length = 10;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1]
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data2.indexOf(data2[i * 1 + 1 + 10 * (parseInt(args[1]) - 1)]);
        let level = client.db.get(`level_${id}`)||1;
        let xp = data[i].data;
    let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Global leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`);
    });
    embed.setFooter(`Your Position: #${myrank}`);
      client.sleep(2000)
      message.channel.stopTyping();
    return message.noMentionReply(embed);
      
    }
  }
let data = client.db.all().filter(i => i.ID.startsWith("xp_")).sort((a, b) => b.data - a.data);
    if (data.length < 1) {
      client.sleep(2000)
message.channel.stopTyping();
return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard");
    }
    let myrank = data.map(m => m.ID).indexOf(`xp_${message.author.id}`) + 1 || "N/A";
    data.length = 10;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data.indexOf(data[i]) + 1;
        let level = client.db.get(`level_${id}`)||1;
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Global leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level}\n**XP** - ${d.xp} / ${d.xpreq}`);
    });
    embed.setFooter(`Your Position: #${myrank}`);client.sleep(2000)
    message.channel.stopTyping();
    return message.noMentionReply(embed);

}
  //server
  if(!message.guild) return;
  let ao = message.guild.id
  if(args[0]){
    if(isNaN(args[0])){
      let data = client.db.all().filter(i => i.ID.startsWith(`${ao}xp_`)).sort((a, b) => b.data - a.data);
    if (data.length < 1) {
      client.sleep(2000)
      message.channel.stopTyping();return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard");}
    let myrank = data.map(m => m.ID).indexOf(`${ao}xp_${message.author.id}`) + 1 || "N/A";
    data.length = 10;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data.indexOf(data[i]);
        let level = client.db.get(`${ao}level_${id}`)|| 1;
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level||1}\n**XP** - ${d.xp} / ${d.xpreq||100}`);
    });
    embed.setFooter(`Your Position: #${myrank}`);
      client.sleep(2000)
      message.channel.stopTyping();
    return message.noMentionReply(embed);
    } else {
 let data = client.db.all().filter(i => i.ID.startsWith(`${ao}xp_`)).sort((a, b) => b.data - a.data).splice(10 * (parseInt(args[0]) - 1), 10 * parseInt(args[0]));
   if(parseInt(args[0])> Math.ceil(Object.keys(data).length / 10)){client.sleep(2000);message.channel.stopTyping();return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard!")}
      let data2 = client.db.all().filter(i => i.ID.startsWith(`${ao}xp_`)).sort((a, b) => b.data - a.data);
      if (data.length < 1) {client.sleep(2000);message.channel.stopTyping();return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard");}
    let myrank = data2.map(m => m.ID).indexOf(`${ao}xp_${message.author.id}`) + 1 || "N/A";
    data.length = 10;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data2.indexOf(data2[i * 1 + 1 + 10 * (parseInt(args[0]) - 1)]);
        let level = client.db.get(`${ao}level_${id}`)||1;
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level||1}\n**XP** - ${d.xp} / ${d.xpreq}`);
    });
    embed.setFooter(`Your Position: #${myrank}`);
      client.sleep(2000)
      message.channel.stopTyping();
    return message.noMentionReply(embed);
    }
  }
    
   let data = client.db.all().filter(i => i.ID.startsWith(`${ao}xp_`)).sort((a, b) => b.data - a.data);
    if (data.length < 1) {client.sleep(2000);message.channel.stopTyping();return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | No leaderboard");}
    let myrank = data.map(m => m.ID).indexOf(`${ao}xp_${message.author.id}`) + 1 || "N/A";
    data.length = 10;
    let lb = [];
    for (let i in data)  {
        let id = data[i].ID.split("_")[1];
        let user = await client.users.fetch(id);
        user = user ? user.tag : "Unknown User#0000";
        let rank = data.indexOf(data[i]) + 1;
        let level = client.db.get(`${ao}level_${id}`)||1;
        let xp = data[i].data;
        let xpreq = Math.floor(Math.pow(level / 0.1, 2));
        lb.push({
            user: { id, tag: user },
            rank,
            level,
            xp,
            xpreq
        });
    };

    const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setColor("RANDOM")
    lb.forEach(d => {
        embed.addField(`${d.rank}. ${d.user.tag}`, `**Level** - ${d.level||1}\n**XP** - ${d.xp} / ${d.xpreq||100}`);
    });
    embed.setFooter(`Your Position: #${myrank}`);client.sleep(2000)
  message.channel.stopTyping();
    return message.noMentionReply(embed);
};

module.exports.info = {
    name: "leaderboard",
  aliases: ["lb"],
  description: "Shows the users leaderboard",
  usage: "(\"global\")",
};
exports.conf={
  cooldown: 0,
  dm: "yes"
}