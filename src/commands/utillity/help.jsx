let discord = require("discord.js");
let { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require("discord.js");
let list = [
  {
    Category: "**Utillity/misc**",
    commands:
      "> `help`, `invite`, `support`, `prefix`, `avatar`, `info`, `userinfo(whois)`",
  }, //1
  {
    Category: "**Search/query Commands**",
    commands: "> `say`, `sayembed`, `calculate`, `anime`, `poll`",
  }, //2
  {
    Category: "**Moderation Commands**",
    commands:
      "> `kick`, `ban/unban`, `purge`, `setprefix`, `warn`, `warnings`, `mute/unmute`",
  }, //3
  {
    Category: "**Setup Commands**",
    commands:
      "> `setprefix`, `setautorole`, `setautorolesystem`, `setmuterole`, `setverifyrole`, `setverifychannel`, `setwelcomemessage`, `setwelcomechannel`, `setleavemessage`, `setleavechannel`, `setwelcomemessagesystem`, `setgoodbyemessagesystem`, `setwelcomeimage`, `setwelcomeembed`, `prefix`, `setwarns`, `setupstatus`, `lvlmsg`",
  }, //4
  {
    Category: "**Economy Commands**",
    commands: "> `balance`, `daily`, `dice(roll)`, `bet(gamble)`, `transfer`",
  }, //5
  {
    Category: "**Music Commands**",
    commands:
      "> `join`, `play`, `np`, `lyrics`, `pause/continue`, `search`, `queue`, `skip`,`skipto`, `skipall`, `loop`, `volume`, `stop`, `disconnect`",
  }, //6
  {
    Category: "**Npc/Tupper Commands**",
    commands:
      "> `npc`, `npccreate`, `npcname`, `npclist`, `npcinfo`, `npcdesc`, `npcremove`, `npcavatar`",
  }, //7
  {
    Category: "**Fun/roleplay Commands**",
    commands:
      "> `kiss`, `hug`, `pat`, `slap`, `wink`, `cuddle`, `neko`, `foxgirl`",
  }, //8
  {
    Category: "**Leveling Commands**",
    commands: "> `rank`, `addxp`, `leaderboard`",
  },
];
exports.run = async (bot, message, args) => {
  let module = bot.helps.array();

  let page = 1;

  if (!message.guild) {
    console.log("!MessageGuild")
    if (args[0]) {
      let cmd = args[0];
      let command = bot.commands.get(cmd.toLowerCase());
      if (!command)
        command = bot.commands.find((x) =>
          x.info.aliases.includes(cmd.toLowerCase())
        );

      if (!command) {
        if (
          args[0] === "1" ||
          args[0].toLowerCase() === "utillity" ||
          args[0].toLowerCase() === "utillities" ||
          args[0].toLowerCase() === "util" ||
          args[0].toLowerCase() === "utils" ||
          args[0].toLowerCase() === "miscs" ||
          args[0].toLowerCase() === "misc"
        ) {
          page = 1;
        } else if (
          args[0] === "2" ||
          args[0].toLowerCase() === "search" ||
          args[0].toLowerCase() === "query" ||
          args[0].toLowerCase() === "searchs" ||
          args[0].toLowerCase() === "queries" ||
          args[0].toLowerCase() === "search/query" ||
          args[0].toLowerCase() === "query/search" ||
          args[0].toLowerCase() === "searchquery" ||
          args[0].toLowerCase() === "querysearch"
        ) {
          page = 2;
        } else if (
          args[0] === "3" ||
          args[0].toLowerCase() === "moderation" ||
          args[0].toLowerCase() === "moderator" ||
          args[0].toLowerCase() === "admin" ||
          args[0].toLowerCase() === "administrator" ||
          args[0].toLowerCase() === "mod" ||
          args[0].toLowerCase() === "moderations" ||
          args[0].toLowerCase() === "moderators" ||
          args[0].toLowerCase() === "mods" ||
          args[0].toLowerCase() === "admins" ||
          args[0].toLowerCase() === "administrators"
        ) {
          page = 3;
        } else if (args[0] === "4" || args[0].toLowerCase() === "setup") {
          page = 4;
        } else if (
          args[0] === "5" ||
          args[0].toLowerCase() === "economy" ||
          args[0].toLowerCase() === "economies" ||
          args[0].toLowerCase() === "eco" ||
          args[0].toLowerCase() === "ecos"
        ) {
          page = 5;
        } else if (args[0] === "6" || args[0].toLowerCase() === "music") {
          page = 6;
        } else if (
          args[0] === "7" ||
          args[0].toLowerCase() === "npc" ||
          args[0].toLowerCase() === "tupper" ||
          args[0].toLowerCase() === "npcs" ||
          args[0].toLowerCase() === "tuppers" ||
          args[0].toLowerCase() === "npc/tupper" ||
          args[0].toLowerCase() === "tupper/npc" ||
          args[0].toLowerCase() === "npctupper" ||
          args[0].toLowerCase() === "tuppernpc" ||
          args[0].toLowerCase() === "npcs/tuppers" ||
          args[0].toLowerCase() === "tuppers/npcs"
        ) {
          page = 7;
        } else if (
          args[0] === "8" ||
          args[0].toLowerCase() === "fun" ||
          args[0].toLowerCase() === "roleplay"
        ) {
          page = 8;
        } else if (args[0] === "9" || args[0].toLowerCase() === "leveling") {
          page = 9;
        } else
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | Unknown Command or Category"
          );
      } else {
        let commandinfo = new discord.MessageEmbed()
          .setTitle("Command: " + command.info.name)
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${bot.config.prefix}${command.info.name}${
          " " + command.info.usage || ""
        }\`\`
Aliases: ${command.info.aliases.join(", ")}

about the brackets:
\`blank\` means that you can leave it blank
<>:Means that if something with a space which must be used in the command
() or (<>):This can be left empty, or you can give argument after a space in
"":Means that if something with a space is used, this will combine it to one`);
        return message.reply({ embeds: [commandinfo], allowedMentions: { repliedUser: false } })
      }
    }

    let embed = new discord.MessageEmbed()
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
      .setTitle(`Page ${page}/${list.length}`).setDescription(`${
      list[page - 1].Category
    }
${list[page - 1].commands}

React ${
      process.env.EMOTE_RIGHT || "<:botarrowright:766649411014361159>"
    }to go to page ${page + 1}`);

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).then((msg) => {
      msg.react(
        process.env.EMOTE_LEFT.replace(
          /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
          ""
        )
          .replace(/>/g, "")
          .replace(" ", "") || "766649447413055498"
      );
      msg
        .react(
          process.env.EMOTE_RIGHT.replace(
            /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
            ""
          )
            .replace(/>/g, "")
            .replace(" ", "") || "766649411014361159"
        )
        .then((r) => {
          msg.react("????");
          const BackwardFilter = (reaction, user) =>
            (reaction.emoji.id ===
              process.env.EMOTE_LEFT.replace(
                /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
                ""
              )
                .replace(/>/g, "")
                .replace(" ", "") &&
              user.id === message.author.id) ||
            (reaction.emoji.id === "884236566837469204" &&
              user.id === message.author.id);
          const ForwardFilter = (reaction, user) =>
            (reaction.emoji.id ===
              process.env.EMOTE_RIGHT.replace(
                /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
                ""
              )
                .replace(/>/g, "")
                .replace(" ", "") &&
              user.id === message.author.id) ||
            (reaction.emoji.id === "884236566237691916" &&
              user.id === message.author.id);
          const CloseFilter = (reaction, user) =>
            reaction.emoji.name === "????" && user.id === message.author.id;
          const backward = msg.createReactionCollector({
            filter: BackwardFilter,
            time: 60000,
            dispose: true,
          });
          const forward = msg.createReactionCollector({
            filter: ForwardFilter,
            time: 60000,
            dispose: true,
          });
          const close = msg.createReactionCollector({
            filter: CloseFilter,
            time: 60000,
          });
          close.on("collect", (r) => {
            msg.delete();
            return;
          });
          backward.on("collect", async (collect) => {
            const userReactions = msg.reactions.cache.filter((reaction) =>
              reaction.users.cache.has(message.author.id)
            );
            /*try {
	for (const reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}*/
            if (page <= 1) return;
            page--;
            if (page === 1) {
              embed.setDescription(`${list[page - 1].Category}
${list[page - 1].commands}

React ${
                process.env.EMOTE_RIGHT || "<:botarrowright:766649411014361159>"
              }to go to page ${page + 1}`);
              embed.setTitle(`Page ${page}/${list.length}`);
              msg.edit({ embeds: [embed] });
              return;
            } else {
              embed.setDescription(
                `${list[page - 1].Category}
${list[page - 1].commands}` +
                  `

React with ${
                    process.env.EMOTE_LEFT ||
                    "<:botarrowleft:766649447413055498>"
                  }to go back page ${page - 1}
Or react with ${
                    process.env.EMOTE_RIGHT ||
                    "<:botarrowright:766649411014361159>"
                  }to go to page ${page + 1}`
              );
              embed.setTitle(`Page ${page}/${list.length}`);
              msg.edit({ embeds: [embed] });
            }
          });
          backward.on("remove", async (collect) => {
            if (page <= 1) return;
            page--;
            if (page === 1) {
              embed.setDescription(`${list[page - 1].Category}
${list[page - 1].commands}

React ${
                process.env.EMOTE_RIGHT || "<:botarrowright:766649411014361159>"
              }to go to page ${page + 1}`);
              embed.setTitle(`Page ${page}/${list.length}`);
              msg.edit({ embeds: [embed] });
              return;
            } else {
              embed.setDescription(
                `${list[page - 1].Category}
${list[page - 1].commands}` +
                  `

React with ${
                    process.env.EMOTE_LEFT ||
                    "<:botarrowleft:766649447413055498>"
                  }to go back page ${page - 1}
Or react with ${
                    process.env.EMOTE_RIGHT ||
                    "<:botarrowright:766649411014361159>"
                  }to go to page ${page + 1}`
              );
              embed.setTitle(`Page ${page}/${list.length}`);
              msg.edit({ embeds: [embed] });
            }
          });
          forward.on("collect", async (collect) => {
            const userReactions = msg.reactions.cache.filter((reaction) =>
              reaction.users.cache.has(message.author.id)
            );
            /*try {
	for (const reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}*/
            if (page >= list.length) return;
            page++;
            if (page === list.length) {
              embed.setDescription(
                `${list[page - 1].Category}
${list[page - 1].commands}` +
                  `

React with ${
                    process.env.EMOTE_LEFT ||
                    "<:botarrowleft:766649447413055498>"
                  }to go back page ${page - 1}`
              );
              embed.setTitle(`Page ${page}/${list.length}`);
              msg.edit({ embeds: [embed] });
              return;
            }
            embed.setDescription(
              `${list[page - 1].Category}
${list[page - 1].commands}` +
                `

React with ${
                  process.env.EMOTE_LEFT || "<:botarrowleft:766649447413055498>"
                }to go back page ${page - 1} 
Or react with ${
                  process.env.EMOTE_RIGHT ||
                  "<:botarrowright:766649411014361159>"
                }to go to page ${page + 1}`
            );
            embed.setTitle(`Page ${page}/${list.length}`);
            msg.edit({ embeds: [embed] });
          });
          forward.on("remove", async (collect) => {
            const userReactions = msg.reactions.cache.filter((reaction) =>
              reaction.users.cache.has(message.author.id)
            );
            /*try {
	for (const reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}*/
            if (page >= list.length) return;
            page++;
            if (page === list.length) {
              embed.setDescription(
                `${list[page - 1].Category}
${list[page - 1].commands}` +
                  `

React with ${
                    process.env.EMOTE_LEFT ||
                    "<:botarrowleft:766649447413055498>"
                  }to go back page ${page - 1}`
              );
              embed.setTitle(`Page ${page}/${list.length}`);
              msg.edit({ embeds: [embed] });
              return;
            }
            embed.setDescription(
              `${list[page - 1].Category}
${list[page - 1].commands}` +
                `

React with ${
                  process.env.EMOTE_LEFT || "<:botarrowleft:766649447413055498>"
                }to go back page ${page - 1} 
Or react with ${
                  process.env.EMOTE_RIGHT ||
                  "<:botarrowright:766649411014361159>"
                }to go to page ${page + 1}`
            );
            embed.setTitle(`Page ${page}/${list.length}`);
            msg.edit({ embeds: [embed] });
          });
        });
    });
  } else {
    const bot_user = await message.guild.members.fetch(bot.user.id);
    const permissions = bot_user.permissions;
    if (!permissions.has(Permissions.FLAGS.ADD_REACTIONS)) {
      if (args[0]) {
        let cmd = args[0];
        let command = bot.commands.get(cmd.toLowerCase());
        if (!command)
          command = bot.commands.find((x) =>
            x.info.aliases.includes(cmd.toLowerCase())
          );
        if (!command)
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | Unknown Command"
          );
        let commandinfo = new discord.MessageEmbed()
          .setTitle("Command: " + command.info.name)
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${bot.config.prefix}${command.info.name}${
          " " + command.info.usage || ""
        }\`\`
Aliases: ${command.info.aliases.join(", ")}

about the brackets:
\`blank\` means that you can leave it blank
<>:Means that if something with a space which must be used in the command
() or (<>):This can be left empty, or you can give argument after a space in
"":Means that if something with a space is used, this will combine it to one`);
        return message.reply({ embeds: [commandinfo], allowedMentions: { repliedUser: false } });
      }
      let command = new discord.MessageEmbed()
        .setTitle("Commands list")
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf");
      list.forEach((i) => {
        command.addField(i.Category, i.commands);
      });
      return message.reply({ embeds: [command], allowedMentions: { repliedUser: false } });
    } else {
      if (args[0]) {
        let cmd = args[0];
        let command = bot.commands.get(cmd.toLowerCase());
        if (!command)
          command = bot.commands.find((x) =>
            x.info.aliases.includes(cmd.toLowerCase())
          );

        if (!command) {
          if (
            args[0] === "1" ||
            args[0].toLowerCase() === "utillity" ||
            args[0].toLowerCase() === "utillities" ||
            args[0].toLowerCase() === "util" ||
            args[0].toLowerCase() === "utils" ||
            args[0].toLowerCase() === "miscs" ||
            args[0].toLowerCase() === "misc"
          ) {
            page = 1;
          } else if (
            args[0] === "2" ||
            args[0].toLowerCase() === "search" ||
            args[0].toLowerCase() === "query" ||
            args[0].toLowerCase() === "searchs" ||
            args[0].toLowerCase() === "queries" ||
            args[0].toLowerCase() === "search/query" ||
            args[0].toLowerCase() === "query/search" ||
            args[0].toLowerCase() === "searchquery" ||
            args[0].toLowerCase() === "querysearch"
          ) {
            page = 2;
          } else if (
            args[0] === "3" ||
            args[0].toLowerCase() === "moderation" ||
            args[0].toLowerCase() === "moderator" ||
            args[0].toLowerCase() === "admin" ||
            args[0].toLowerCase() === "administrator" ||
            args[0].toLowerCase() === "mod" ||
            args[0].toLowerCase() === "moderations" ||
            args[0].toLowerCase() === "moderators" ||
            args[0].toLowerCase() === "mods" ||
            args[0].toLowerCase() === "admins" ||
            args[0].toLowerCase() === "administrators"
          ) {
            page = 3;
          } else if (args[0] === "4" || args[0].toLowerCase() === "setup") {
            page = 4;
          } else if (
            args[0] === "5" ||
            args[0].toLowerCase() === "economy" ||
            args[0].toLowerCase() === "economies" ||
            args[0].toLowerCase() === "eco" ||
            args[0].toLowerCase() === "ecos"
          ) {
            page = 5;
          } else if (args[0] === "6" || args[0].toLowerCase() === "music") {
            page = 6;
          } else if (
            args[0] === "7" ||
            args[0].toLowerCase() === "npc" ||
            args[0].toLowerCase() === "tupper" ||
            args[0].toLowerCase() === "npcs" ||
            args[0].toLowerCase() === "tuppers" ||
            args[0].toLowerCase() === "npc/tupper" ||
            args[0].toLowerCase() === "tupper/npc" ||
            args[0].toLowerCase() === "npctupper" ||
            args[0].toLowerCase() === "tuppernpc" ||
            args[0].toLowerCase() === "npcs/tuppers" ||
            args[0].toLowerCase() === "tuppers/npcs"
          ) {
            page = 7;
          } else if (
            args[0] === "8" ||
            args[0].toLowerCase() === "fun" ||
            args[0].toLowerCase() === "roleplay"
          ) {
            page = 8;
          } else if (args[0] === "9" || args[0].toLowerCase() === "leveling") {
            page = 9;
          } else
            return message.mentionReply(
              `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
                " | Unknown Command or Category"
            );
        } else {
          let commandinfo = new discord.MessageEmbed()
            .setTitle("Command: " + command.info.name)
            .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
            .setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${bot.config.prefix}${command.info.name}${
            " " + command.info.usage || ""
          }\`\`
Aliases: ${command.info.aliases.join(", ")}

about the brackets:
\`blank\` means that you can leave it blank
<>:Means that if something with a space which must be used in the command
() or (<>):This can be left empty, or you can give argument after a space in
"":Means that if something with a space is used, this will combine it to one`);
          return message.reply({ embeds: [commandinfo], allowedMentions: { repliedUser: false } })
        }
      }

      let embed = new discord.MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
        .setTitle(`Page ${page}/${list.length}`).setDescription(`${`${
        list[page - 1].Category
      }
${list[page - 1].commands}`}

React ${
        process.env.EMOTE_RIGHT || "<:botarrowright:766649411014361159>"
      }to go to page ${page + 1}`);

      message
        .reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        .then((msg) => {
          msg.react(
            process.env.EMOTE_LEFT.replace(
              /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
              ""
            )
              .replace(/>/g, "")
              .replace(" ", "") || "766649447413055498"
          );
          msg
            .react(
              process.env.EMOTE_RIGHT.replace(
                /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
                ""
              )
                .replace(/>/g, "")
                .replace(" ", "") || "766649411014361159"
            )
            .then((r) => {
              msg.react("????");
              const BackwardFilter = (reaction, user) =>
                (reaction.emoji.id ===
                  process.env.EMOTE_LEFT.replace(
                    /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
                    ""
                  )
                    .replace(/>/g, "")
                    .replace(" ", "") &&
                  user.id === message.author.id) ||
                (reaction.emoji.id === "884236566837469204" &&
                  user.id === message.author.id);
              const ForwardFilter = (reaction, user) =>
                (reaction.emoji.id ===
                  process.env.EMOTE_RIGHT.replace(
                    /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
                    ""
                  )
                    .replace(/>/g, "")
                    .replace(" ", "") &&
                  user.id === message.author.id) ||
                (reaction.emoji.id === "884236566237691916" &&
                  user.id === message.author.id);
              const CloseFilter = (reaction, user) =>
                reaction.emoji.name === "????" && user.id === message.author.id;
              const backward = msg.createReactionCollector({
                filter: BackwardFilter,
                time: 60000,
                dispose: true,
              });
              const forward = msg.createReactionCollector({
                filter: ForwardFilter,
                time: 60000,
                dispose: true,
              });
              const close = msg.createReactionCollector({
                filter: CloseFilter,
                time: 60000,
              });
              close.on("collect", (r) => {
                msg.delete();
                return;
              });
              backward.on("collect", async (collect) => {
                const userReactions = msg.reactions.cache.filter((reaction) =>
                  reaction.users.cache.has(message.author.id)
                );
                /*try {
	for (const reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}*/
                if (page <= 1) return;
                page--;
                if (page === 1) {
                  embed.setDescription(`${list[page - 1].Category}
${list[page - 1].commands}

React ${
                    process.env.EMOTE_RIGHT ||
                    "<:botarrowright:766649411014361159>"
                  }to go to page ${page + 1}`);
                  embed.setTitle(`Page ${page}/${list.length}`);
                  msg.edit({ embeds: [embed] });
                  return;
                } else {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}
Or react with ${
                        process.env.EMOTE_RIGHT ||
                        "<:botarrowright:766649411014361159>"
                      }to go to page ${page + 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                  msg.edit({ embeds: [embed] });
                }
              });
              backward.on("remove", async (collect) => {
                if (page <= 1) return;
                page--;
                if (page === 1) {
                  embed.setDescription(`${list[page - 1].Category}
${list[page - 1].commands}

React ${
                    process.env.EMOTE_RIGHT ||
                    "<:botarrowright:766649411014361159>"
                  }to go to page ${page + 1}`);
                  embed.setTitle(`Page ${page}/${list.length}`);
                  msg.edit({ embeds: [embed] });
                  return;
                } else {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}
Or react with ${
                        process.env.EMOTE_RIGHT ||
                        "<:botarrowright:766649411014361159>"
                      }to go to page ${page + 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                  msg.edit({ embeds: [embed] });
                }
              });
              forward.on("collect", async (collect) => {
                const userReactions = msg.reactions.cache.filter((reaction) =>
                  reaction.users.cache.has(message.author.id)
                );
                /*try {
	for (const reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}*/
                if (page >= list.length) return;
                page++;
                if (page === list.length) {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                  msg.edit({ embeds: [embed] });
                  return;
                }
                embed.setDescription(
                  `${list[page - 1].Category}
${list[page - 1].commands}` +
                    `

React with ${
                      process.env.EMOTE_LEFT ||
                      "<:botarrowleft:766649447413055498>"
                    }to go back page ${page - 1} 
Or react with ${
                      process.env.EMOTE_RIGHT ||
                      "<:botarrowright:766649411014361159>"
                    }to go to page ${page + 1}`
                );
                embed.setTitle(`Page ${page}/${list.length}`);
                msg.edit({ embeds: [embed] });
              });
              forward.on("remove", async (collect) => {
                if (page === list.length) return;
                page++;
                if (page >= list.length) {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                  msg.edit({ embeds: [embed] });
                  return;
                }
                embed.setDescription(
                  `${list[page - 1].Category}
${list[page - 1].commands}` +
                    `

React with ${
                      process.env.EMOTE_LEFT ||
                      "<:botarrowleft:766649447413055498>"
                    }to go back page ${page - 1} 
Or react with ${
                      process.env.EMOTE_RIGHT ||
                      "<:botarrowright:766649411014361159>"
                    }to go to page ${page + 1}`
                );
                embed.setTitle(`Page ${page}/${list.length}`);
                msg.edit({ embeds: [embed] });
              });
            });
        });
    }
  }
};
exports.options = [
  {
    name: "command",
    description: "Which command do you want to search?",
    type: 3,
    required: false,
  },
  {
    name: "page",
    description: "Which page or which category?",
    type: 3,
    required: false,
    choices: [
      {
        name: "1: misc/utillity",
        value: "1",
      },
      {
        name: "2: Search/Query",
        value: "2",
      },
      {
        name: "3: Moderation",
        value: "3",
      },
      {
        name: "4: Setup",
        value: "4",
      },
      {
        name: "5: Economy",
        value: "5",
      },
      {
        name: "6: Music",
        value: "6",
      },
      {
        name: "7: Npcs/Tuppers",
        value: "7",
      },
      {
        name: "8: Fun/Roleplay",
        value: "8",
      },
      {
        name: "9: Leveling",
        value: "9",
      },
    ],
  },
];
exports.interaction = async (bot, message, arg) => {
  let interaction= message, args=[];
try{
  args = [arg._hoistedOptions[0].value];
} catch {

}
  let module = bot.helps.array();

  let page = 1;

      if (args[0]) {
        if (arg._hoistedOptions[0].name==="page") {
          if (
            args[0] === "1"
          ) {
            page = 1;
          } else if (
            args[0] === "2"
          ) {
            page = 2;
          } else if (
            args[0] === "3"
          ) {
            page = 3;
          } else if (args[0] === "4") {
            page = 4;
          } else if (
            args[0] === "5"
          ) {
            page = 5;
          } else if (args[0] === "6") {
            page = 6;
          } else if (
            args[0] === "7") {
            page = 7;
          } else if (
            args[0] === "8"
          ) {
            page = 8;
          } else if (args[0] === "9") {
            page = 9;
          }
        let embed = new discord.MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
        .setTitle(`Page ${page}/${list.length}`).setDescription(`${
        `${list[page - 1].Category}
${list[page - 1].commands}`
      }`);
      const buttons = new MessageActionRow()
			.addComponents(
      new MessageButton()
	.setCustomId('left')
	.setStyle('PRIMARY')
	.setEmoji(process.env.EMOTE_LEFT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,"").replace(/>/g, "").replace(" ", ""))
      )
      .addComponents(
      new MessageButton()
	.setCustomId('right')
	.setStyle('PRIMARY')
	.setEmoji(process.env.EMOTE_RIGHT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,"").replace(/>/g, "").replace(" ", ""))
      )
      .addComponents(
      new MessageButton()
  .setLabel("???????")
	.setCustomId('delete')
	.setStyle('DANGER')
        )
        
      interaction.reply({embeds:[embed], components:[buttons]})
          const filter = i => {
          return(i.customId === 'left' && i.user.id === interaction.user.id)||(i.customId === 'right' && i.user.id === interaction.user.id)||(i.customId === 'delete' && i.user.id === interaction.user.id);}
          const collect = await interaction.fetchReply()
          const collection= await interaction.channel.messages.fetch(collect.id)
          const collector= collection.createMessageComponentCollector({ filter, time: 60000 });
          collector.on('collect', async i => {
            const fs = require('fs');
function toString(ir) {
        return JSON.stringify(ir, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        );
    }
fs.writeFile('./log.json', toString(i), err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});

	if (i.customId === 'right') {
    if(page>=list.length)return i.deferUpdate();
    page++
    if (page === list.length) {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                  i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
                }
                embed.setDescription(
                  `${list[page - 1].Category}
${list[page - 1].commands}` +
                    `

React with ${
                      process.env.EMOTE_LEFT ||
                      "<:botarrowleft:766649447413055498>"
                    }to go back page ${page - 1} 
Or react with ${
                      process.env.EMOTE_RIGHT ||
                      "<:botarrowright:766649411014361159>"
                    }to go to page ${page + 1}`
                );
                embed.setTitle(`Page ${page}/${list.length}`);
    i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
	}
   else if (i.customId === 'left') {
    if(page<=1)return i.deferUpdate();
    page--
    if (page === 1) {
                  embed.setDescription(`${list[page - 1].Category}
${list[page - 1].commands}

React ${
                    process.env.EMOTE_RIGHT ||
                    "<:botarrowright:766649411014361159>"
                  }to go to page ${page + 1}`);
                  embed.setTitle(`Page ${page}/${list.length}`);
                  i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
          
                } else {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}
Or react with ${
                        process.env.EMOTE_RIGHT ||
                        "<:botarrowright:766649411014361159>"
                      }to go to page ${page + 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                
    i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
                }
	} else if (i.customId === 'delete') {

    i.deferUpdate()
		await interaction.deleteReply();
	}
});
        
        } else {
        let cmd = args[0];
        let command = bot.commands.get(cmd.toLowerCase());
        if (!command){
          command = bot.commands.find(x =>
            x.info.aliases.includes(cmd.toLowerCase())
          );
        if(!command){
        return interaction.reply({content: `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unknown Command."})
        }
        }
          let commandinfo = new discord.MessageEmbed()
            .setTitle("Command: " + command.info.name)
            .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf").setDescription(`
Name: ${command.info.name}
Description: ${command.info.description}
Usage: \`\`${bot.config.prefix}${command.info.name}${" " + command.info.usage ||
            ""}\`\`
Aliases: ${command.info.aliases.join(", ")}

about the brackets:
\`blank\` means that you can leave it blank
<>:Means that if something with a space which must be used in the command
() or (<>):This can be left empty, or you can give argument after a space in
"":Means that if something with a space is used, this will combine it to one`);
          return interaction.reply({embeds:[commandinfo]})

        }
    
    
  } else {
    let embed = new discord.MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
        .setTitle(`Page ${page}/${list.length}`).setDescription(`${
        `${list[page - 1].Category}
${list[page - 1].commands}`
      }`);
      const buttons = new MessageActionRow()
			.addComponents(
      new MessageButton()
	.setCustomId('left')
	.setStyle('PRIMARY')
	.setEmoji(process.env.EMOTE_LEFT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,"").replace(/>/g, "").replace(" ", ""))
      )
      .addComponents(
      new MessageButton()
	.setCustomId('right')
	.setStyle('PRIMARY')
	.setEmoji(process.env.EMOTE_RIGHT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,"").replace(/>/g, "").replace(" ", ""))
      )
      .addComponents(
      new MessageButton()
  .setLabel("???????")
	.setCustomId('delete')
	.setStyle('DANGER')
        )
        
      interaction.reply({embeds:[embed], components:[buttons]})
          const filter = i => {
          return(i.customId === 'left' && i.user.id === interaction.user.id)||(i.customId === 'right' && i.user.id === interaction.user.id)||(i.customId === 'delete' && i.user.id === interaction.user.id);}
          const collect = await interaction.fetchReply()
          const collection= await interaction.channel.messages.fetch(collect.id)
          const collector= collection.createMessageComponentCollector({ filter, time: 60000 });
          collector.on('collect', async i => {
            const fs = require('fs');

	if (i.customId === 'right') {
    if(page>=list.length)return i.deferUpdate();
    page++
    if (page === list.length) {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                  i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
                }
                embed.setDescription(
                  `${list[page - 1].Category}
${list[page - 1].commands}` +
                    `

React with ${
                      process.env.EMOTE_LEFT ||
                      "<:botarrowleft:766649447413055498>"
                    }to go back page ${page - 1} 
Or react with ${
                      process.env.EMOTE_RIGHT ||
                      "<:botarrowright:766649411014361159>"
                    }to go to page ${page + 1}`
                );
                embed.setTitle(`Page ${page}/${list.length}`);
    i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
	}
   else if (i.customId === 'left') {
    if(page<=1)return i.deferUpdate();
    page--
    if (page === 1) {
                  embed.setDescription(`${list[page - 1].Category}
${list[page - 1].commands}

React ${
                    process.env.EMOTE_RIGHT ||
                    "<:botarrowright:766649411014361159>"
                  }to go to page ${page + 1}`);
                  embed.setTitle(`Page ${page}/${list.length}`);
                  i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
          
                } else {
                  embed.setDescription(
                    `${list[page - 1].Category}
${list[page - 1].commands}` +
                      `

React with ${
                        process.env.EMOTE_LEFT ||
                        "<:botarrowleft:766649447413055498>"
                      }to go back page ${page - 1}
Or react with ${
                        process.env.EMOTE_RIGHT ||
                        "<:botarrowright:766649411014361159>"
                      }to go to page ${page + 1}`
                  );
                  embed.setTitle(`Page ${page}/${list.length}`);
                
    i.deferUpdate()
		return interaction.editReply({embeds:[embed], components:[buttons]});
                }
	} else if (i.customId === 'delete') {

    i.deferUpdate()
		await interaction.deleteReply();
	}
});
  }
};
exports.info = {
  name: "help",
  aliases: [
    "h",
    "command",
    "commands",
    "commandlist",
    "commandslist",
    "cmd",
    "cmds",
    "cmdlist",
    "cmdlists",
  ],
  usage: "(<command>)",
  description: "Get the information of a command or get the help list",
};
exports.conf = {
  cooldown: 0,
  dm: "yes",
};
