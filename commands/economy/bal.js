const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
      if(!message.guild) return;
        user = message.mentions.users.first();
    } else if (args[0]) {
      if(!message.guild) return;
        user = message.guild.members.cache.get(args[0]).user;
    } else {
        user = message.author;
    }

    if (user.bot || user === client.user) {
        return message.noMentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user is a bot.");
        // If the user was a bot, ignore it.
    }

    let balance = client.db.get(`account.${user.id}.balance`);
    if (!balance) balance = 0;
    else balance = balance;

    const embed = new Discord.MessageEmbed()
    .setColor(0x7289DA)
    .setTitle(`${user.tag}'s Credit Card`)
    .addField("Credits", `$${(balance).toLocaleString()}`)
    .setThumbnail(user.displayAvatarURL({size: 4096, dynamic: true}))
    .setTimestamp(new Date) 
    return message.noMentionReply(embed);
}

exports.info = {
    name: "credit",
    description: "Checking yours, or other members money.",
    usage: "(<user_id_or_mention>)",
    aliases: ["bal", "balance","coin", "money", "credit"],
    example: "balance \nbalance @ray#1337"
}
exports.conf = {
  cooldown: 5,
  dm: "yes"
}