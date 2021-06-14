const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    }

    let balance = db.get(`account.${message.author.id}.balance`);

    if (!user) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please mention the user or input the user ID.");
    if (user.bot || user === client.user) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user is a bot.");
    if (user.id === message.author.id || user === message.author) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't transfer credit to yourself");

    let amount = parseInt(args[1]);
    if (!amount) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please input a credits that you want to transfer it.");
    if (isNaN(amount)) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please input a valid number.");
    // isNaN = is Not a Number.

    if (!balance || balance == 0) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Your wallet is empty.");
    if (amount > balance) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You don't have an enough credits to transfer. That is way too much.");
    if (amount === 0) return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You transfer, nothing? No. You cannot.");

    await db.add(`account.${user.id}.balance`, amount);
    await db.subtract(`account.${message.author.id}.balance`, amount);

    return message.noMentionReply(`You've been transferred to your friends (${user.tag}) $${amount} credits!`);
}

exports.info = {
    name: "transfer",
    aliases: ["tf", "ship", "give"],
    description: "Transfer a credits to the user.",
    usage: "transfer <user_id_or_mention> <amount>",
    example: "transfer @t404owo#2452 900"
}

exports.conf = {
    cooldown: 15,
  dm: "no"
}