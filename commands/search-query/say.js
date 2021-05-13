exports.conf = {
  cooldown: 0,
  dm: "no"
};
exports.run = (bot, message, args) => {
  const permissions = message.channel.permissionsFor(message.client.user);
  if (!permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      "<:tairitsuno:801419553933492245> | <@!" +
        message.author.id +
        ">, I don't have permission to run this command, I need Manage Messages perm!!!"
    );
  if (
    message.member.hasPermission("MANAGE_MESSAGES") ||
    message.member.hasPermission("MANAGE_GUILD") ||
    message.member.hasPermission("MANAGE_CHANNELS") ||
    message.member.hasPermission("ADMINISTRATOR") ||
    message.member.roles.cache.has("801386993165533224") ||
    bot.config.owners.includes(message.member.id)
  ) {
    if (!args[0]) return;
    if (message.member.id == 693660869334138960) return;
    let argsresult;

    let mChannel =
      message.mentions.channels.first() ||
      bot.channels.cache.get(args[0].replace("<#", "").replace(">", ""));

    message.delete();

    if (mChannel == args[0].replace("<#", "").replace(">", "")) {
      argsresult = args.slice(1).join(" ");

      mChannel.send(argsresult);
    } else {
      argsresult = args.join(" ");

      return message.channel.send(argsresult);
    }
  } else {
    return;
  }
};
exports.info = {
  name: "say",
  aliases: ["send"],
  usage: "(channel_id_or_mention>) <message>",
  description: "sends something"
};
