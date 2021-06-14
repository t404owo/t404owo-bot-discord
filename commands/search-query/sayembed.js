const { MessageEmbed } = require("discord.js");
exports.conf = {
  cooldown: 0,
  dm: "no"
};
exports.run = (bot, message, args) => {
  const permissions = message.channel.permissionsFor(message.client.user);
  if (!permissions.has("MANAGE_MESSAGES"))
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I don't have permission to run this command, I need Manage Messages perm!!!"
    );
  let perm=message.channel.permissionsFor(message.member)//perm.has()
    if (
    perm.has("MANAGE_MESSAGES") ||
    perm.has("MANAGE_GUILD") ||
    perm.has("MANAGE_CHANNELS") ||
    perm.has("ADMINISTRATOR") ||
    perm.has("801386993165533224") ||
    bot.config.owners.includes(message.member.id)
  )
   {
    if (!args[0]) return;
    let argsresult;

    let mChannel =
      message.mentions.channels.first() ||
      bot.channels.cache.get(args[0].replace("<#", "").replace(">", ""));

    message.delete();

    if (mChannel == args[0].replace("<#", "").replace(">", "")) {
      argsresult = args.slice(1).join(" ");
      let argsresulta = new MessageEmbed().setDescription(argsresult);
permissions = mChannel.permissionsFor(message.client.user);
  if (!permissions.has("SEND_MESSAGES"))
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | I don't have permission to run this command, I need Manage Messages perm!!!"
    );
      perm = mChannel.permissionsFor(message.client.user);
  if (!perm.has("SEND_MESSAGES")&&!perm.has("ADMINISTRATOR"))return
      mChannel.send(argsresulta);
    } else {
      argsresult = args.join(" ");
      let argsresulta = new MessageEmbed().setDescription(argsresult);

      return message.channel.send(argsresulta);
    }
  } else {
    return;
  }
};
exports.info = {
  name: "sayembed",
  aliases: ["sendembed"],
  usage: "(<channel_id_or_mention>) <message>",
  description: "sends something(in embed)"
};
