exports.conf = {
  cooldown: 0,
  dm: "no",
};
const { Permissions } = require("discord.js");
exports.run = (bot, message, args) => {
  let permissions = message.channel.permissionsFor(message.client.user);
  if (!permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
    return message.mentionReply(
      `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
        " | I don't have permission to run this command, I need Manage Messages perm!!!"
    );
  let perm = message.channel.permissionsFor(message.member); //perm.has()
  if (
    perm.has(Permissions.FLAGS.MANAGE_MESSAGES) ||
    perm.has(Permissions.FLAGS.MANAGE_GUILD) ||
    perm.has(Permissions.FLAGS.MANAGE_CHANNELS) ||
    perm.has(Permissions.FLAGS.ADMINISTRATOR) ||
    bot.config.owners.includes(message.member.id)
  ) {
    if (!args[0]) return;
    let content;

    let mChannel =
      message.mentions.channels.first() ||
      bot.channels.cache.get(args[0].replace("<#", "").replace(">", ""));

    message.delete();

    if (mChannel == args[0].replace("<#", "").replace(">", "")) {
      
      permissions = mChannel.permissionsFor(message.client.user);
      if (!permissions.has(Permissions.FLAGS.SEND_MESSAGES))
        return message.mentionReply(
          `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
            " | I don't have permission to run this command, I need Manage Messages perm!!!"
        );
      perm = mChannel.permissionsFor(message.member);
      if (
        !perm.has(Permissions.FLAGS.SEND_MESSAGES) &&
        !perm.has(Permissions.FLAGS.ADMINISTRATOR)
      )
        return;
      const content = args.slice(1).join(" ");
      mChannel.send({ content });
    } else {
      content = args.join(" ");

      return message.channel.send({ content });
    }
  } else {
    return;
  }
};
exports.info = {
  name: "say",
  aliases: ["send"],
  usage: "(channel_id_or_mention>) <message>",
  description: "sends something",
};
