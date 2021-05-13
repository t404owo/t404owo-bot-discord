const { MessageEmbed } = require("discord.js");
exports.conf = {
  cooldown: 0,
  dm: "no"
};
exports.run = (bot, message, args) => {
  const permissions = message.channel.permissionsFor(message.client.user);
  if (!permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      "<:botno:766649381411618837> | <@!" +
        message.author.id +
        ">, I don't have permission to run this command, I need Manage Messages perm!!!"
    );
  if (
    message.member.hasPermission("MANAGE_MESSAGES") ||
    message.member.hasPermission("MANAGE_GUILD")
  ) {
    if (!args[0]) return;
    let argsresult;

    let mChannel =
      message.mentions.channels.first() ||
      bot.channels.cache.get(args[0].replace("<#", "").replace(">", ""));

    message.delete();

    if (mChannel == args[0].replace("<#", "").replace(">", "")) {
      argsresult = args.slice(1).join(" ");
      let argsresulta = new MessageEmbed().setDescription(argsresult);

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
