const util = require("util");
exports.run = async (client, message, args) => {
  const promises = [
    client.shard.fetchClientValues("guilds.cache.size"),
    client.shard.broadcastEval(
      "this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)"
    )
  ];
  if (client.config.owners.includes(message.author.id)) {
    let status;
    let guildssize = [],
      memberssize = [];
    let totalGuilds, totalMembers;
    Promise.all(promises)
      .then(results => {
        totalGuilds = results[0].reduce(
          (acc, guildCount) => acc + guildCount,
          0
        );
        totalMembers = results[1].reduce(
          (acc, memberCount) => acc + memberCount,
          0
        );
        console.log(
          `Server count: ${totalGuilds}\nMember count: ${totalMembers}`
        );

        if (
          args[0].toLowerCase() === "stream" ||
          args[0].toLowerCase() === "streamin" ||
          args[0].toLowerCase() === "streaming"
        ) {
          client.user.setActivity(
            args
              .slice(2)
              .join(" ")
              .replace("$MEMBER$", totalMembers)
              .replace("$GUILD$", totalGuilds),
            {
              type: "STREAMING",
              url: `https://www.twitch.tv/${args[1]}`
            }
          );

          message.noMentionReply(
            `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} I set my stream Status to :\n\`\`\`${args
              .slice(2)
              .join(" ")
              .replace("$MEMBER$", totalMembers)
              .replace("$GUILD$", totalGuilds)}\`\`\``
          );
          return;
        } else {
          var stat;

          if (
            args[0].toLowerCase() === "play" ||
            args[0].toLowerCase() === "playin" ||
            args[0].toLowerCase() === "playing"
          )
            stat = "PLAYING";
          if (
            args[0].toLowerCase() === "listen" ||
            args[0].toLowerCase() === "listenin" ||
            args[0].toLowerCase() === "listening"
          )
            stat = "LISTENING";
          if (
            args[0].toLowerCase() === "watch" ||
            args[0].toLowerCase() === "watchin" ||
            args[0].toLowerCase() === "watching"
          )
            stat = "WATCHING";

          client.user.setActivity(
            args
              .slice(1)
              .join(" ")
              .replace("$MEMBER$", totalMembers)
              .replace("$GUILD$", totalGuilds),
            {
              type: stat
            }
          );
          message.noMentionReply(
            `${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} I set my ${stat.toLowerCase()} Status to :\n\`\`\`${args
              .slice(1)
              .join(" ")
              .replace("$MEMBER$", totalMembers)
              .replace("$GUILD$", totalGuilds)}\`\`\``
          );
        }
      })
      .catch(console.error);
  }
};
exports.info = {
  name: "setstatus",
  aliases: ["setstat"],
  description: "set bot's status(Owner or trusted person only)",
  usage:
    '<"WATCHING"/"STREAMING"/"LISTENING"/"PLAYING"> (<twitch_username>) <status>',
  example: "WATCHING movie\nstream a_user Arcaea on Switch"
};
exports.conf = {
  cooldown: 0,
  dm: "yes"
};
