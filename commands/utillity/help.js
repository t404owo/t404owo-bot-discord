let discord = require("discord.js");
let { MessageEmbed } = require("discord.js");
let pages = [
    "**Utillity/misc Commands**\n> `help`, `invite`, `support`, `prefix`, `avatar`, `info`, `userinfo(whois)`",
    "**Search/query Commands**\n> `say`, `sayembed`, `calculate`, `anime`, `poll`",
    "**Moderation Commands**\n> `kick`, `ban/unban`, `purge`, `setprefix`, `warn`, `warnings`, `mute/unmute`",
    "**Setup Commands**\n> `setprefix`, `setautorole`, `setautorolesystem`, `setmuterole`, `setverifyrole`, `setverifychannel`, `setwelcomemessage`, `setwelcomechannel`, `setleavemessage`, `setleavechannel`, `setwelcomemessagesystem`, `setgoodbyemessagesystem`, `setwelcomeimage`, `setwelcomeembed`, `prefix`, `setwarns`, `setupstatus`, `lvlmsg`",
    "**Economy Commands**\n> `balance`, `daily`, `dice(roll)`, `bet(gamble)`, `transfer`",
    "**Music Commands**\n> `join`, `play`, `np`, `lyrics`, `pause/continue`, `search`, `queue`, `skip`,`skipto`, `skipall`, `loop`, `volume`, `stop`, `disconnect`",
    "**Npc/Tupper Commands**\n> `npc`, `npccreate`, `npcname`, `npclist`, `npcinfo`, `npcdesc`, `npcremove`, `npcavatar`",
    "**Fun/roleplay Commands**\n> `kiss`, `hug`, `pat`, `slap`, `wink`, `cuddle`, `neko`, `foxgirl`",
    "**Leveling Commands**\n> `rank`, `addxp`, `leaderboard`"
  ];
  let list = [
    {
      Category: "**Utillity/misc**",
      commands:
        "> `help`, `invite`, `support`, `prefix`, `avatar`, `info`, `userinfo(whois)`"
    }, //1
    {
      Category: "**Search/query Commands**",
      commands: "> `say`, `sayembed`, `calculate`, `anime`, `poll`"
    }, //2
    {
      Category: "**Moderation Commands**",
      commands:
        "> `kick`, `ban/unban`, `purge`, `setprefix`, `warn`, `warnings`, `mute/unmute`"
    }, //3
    {
      Category: "**Setup Commands**",
      commands:
        "> `setprefix`, `setautorole`, `setautorolesystem`, `setmuterole`, `setverifyrole`, `setverifychannel`, `setwelcomemessage`, `setwelcomechannel`, `setleavemessage`, `setleavechannel`, `setwelcomemessagesystem`, `setgoodbyemessagesystem`, `setwelcomeimage`, `setwelcomeembed`, `prefix`, `setwarns`, `setupstatus`, `lvlmsg`"
    }, //4
    {
      Category: "**Economy Commands**",
      commands: "> `balance`, `daily`, `dice(roll)`, `bet(gamble)`, `transfer`"
    }, //5
    {
      Category: "**Music Commands**",
      commands:
        "> `join`, `play`, `np`, `lyrics`, `pause/continue`, `search`, `queue`, `skip`,`skipto`, `skipall`, `loop`, `volume`, `stop`, `disconnect`"
    }, //6
    {
      Category: "**Npc/Tupper Commands**",
      commands:
        "> `npc`, `npccreate`, `npcname`, `npclist`, `npcinfo`, `npcdesc`, `npcremove`, `npcavatar`"
    }, //7
    {
      Category: "**Fun/roleplay Commands**",
      commands:
        "> `kiss`, `hug`, `pat`, `slap`, `wink`, `cuddle`, `neko`, `foxgirl`"
    }, //8
    {
      Category: "**Leveling Commands**",
      commands: "> `rank`, `addxp`, `leaderboard`"
    }
  ];
exports.run = async (bot, message, args) => {
  let module = bot.helps.array();
  

  let page = 1;

  if (!message.guild) {
    if (args[0]) {
      let cmd = args[0];
      let command = bot.commands.get(cmd.toLowerCase());
      if (!command)
        command = bot.commands.find(x =>
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
            `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unknown Command or Category"
          );
      } else {
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
        return message.noMentionReply(commandinfo);
      }
    }

    let embed = new discord.MessageEmbed()
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
      .setTitle(`Page ${page}/${pages.length}`).setDescription(`${
      pages[page - 1]
    }

React ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`);

    message.noMentionReply(embed).then(msg => {
        msg.react(process.env.EMOTE_LEFT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","")||"766649447413055498");
        msg.react(process.env.EMOTE_RIGHT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","")||"766649411014361159").then(r => {
          msg.react("🗑");
          const BackwardFilter = (reaction, user) =>
          reaction.emoji.id === process.env.EMOTE_LEFT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","") &&
          user.id === message.author.id||
          reaction.emoji.id === "766649447413055498" &&
          user.id === message.author.id;
        const ForwardFilter = (reaction, user) =>
          reaction.emoji.id === process.env.EMOTE_RIGHT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","")&&
          user.id === message.author.id||
          reaction.emoji.id === "766649411014361159" &&
          user.id === message.author.id;
        const CloseFilter = (reaction, user) =>
          reaction.emoji.name === "🗑" && user.id === message.author.id;
        const backward = msg.createReactionCollector(BackwardFilter, {
          time: 60000,
          dispose: true
        });
        const forward = msg.createReactionCollector(ForwardFilter, {
          time: 60000,
          dispose: true
        });
        const close = msg.createReactionCollector(CloseFilter, {
          time: 60000
        });
        close.on("collect", r => {
          msg.delete();
          return;
        });
        backward.on("collect", async collect => {
          const userReactions = msg.reactions.cache.filter(reaction =>
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
          if (page == 1) {
            embed.setDescription(`${pages[page - 1]}

React ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`);
            msg.edit(embed);
            return;
          }
          embed.setDescription(
            `${pages[page - 1]}` +
              `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
          );
          embed.setTitle(`Page ${page}/${pages.length}`);
          msg.edit(embed);
        });
        backward.on("remove", async collect => {
          if (page <= 1) return;
          page--;
          if (page == 1) {
            embed.setDescription(`${pages[page - 1]}

React ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`);
            msg.edit(embed);
            return;
          }
          embed.setDescription(
            `${pages[page - 1]}` +
              `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
          );
          embed.setTitle(`Page ${page}/${pages.length}`);
          msg.edit(embed);
        });
        forward.on("collect", async collect => {
          const userReactions = msg.reactions.cache.filter(reaction =>
            reaction.users.cache.has(message.author.id)
          );
          /*try {
	for (const reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}*/
          if (page === pages.length) return;
          page++;
          if (page >= pages.length) {
            embed.setDescription(
              `${pages[page - 1]}` +
                `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}`
            );
            embed.setTitle(`Page ${page}/${pages.length}`);
            msg.edit(embed);
            return;
          }
          embed.setDescription(
            pages[page - 1] +
              `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1} 
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
          );
          embed.setTitle(`Page ${page}/${pages.length}`);
          msg.edit(embed);
        });
        forward.on("remove", async collect => {
          if (page === pages.length) return;
          page++;
          if (page >= pages.length) {
            embed.setDescription(
              `${pages[page - 1]}` +
                `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}`
            );
            embed.setTitle(`Page ${page}/${pages.length}`);
            msg.edit(embed);
            return;
          }
          embed.setDescription(
            pages[page - 1] +
              `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1} 
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
          );
          embed.setTitle(`Page ${page}/${pages.length}`);
          msg.edit(embed);
        });
      });
    });
  } else {
    const permissions = message.channel.permissionsFor(message.client.user);

    if (!permissions.has("ADD_REACTIONS")) {
      if (args[0]) {
        let cmd = args[0];
        let command = bot.commands.get(cmd.toLowerCase());
        if (!command)
          command = bot.commands.find(x =>
            x.info.aliases.includes(cmd.toLowerCase())
          );
        if (!command)
          return message.mentionReply(
            `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unknown Command"
          );
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
        return message.noMentionReply(commandinfo);
      }
      let command = new discord.MessageEmbed()
        .setTitle("Commands list")
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf");
      list.forEach(i => {
        command.addField(i.Category, i.commands);
      });
      return message.noMentionReply(command);
    } else {
      if (args[0]) {
        let cmd = args[0];
        let command = bot.commands.get(cmd.toLowerCase());
        if (!command)
          command = bot.commands.find(x =>
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
              `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unknown Command or Category"
            );
        } else {
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
          return message.noMentionReply(commandinfo);
        }
      }

      let embed = new discord.MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
        .setTitle(`Page ${page}/${pages.length}`).setDescription(`${
        pages[page - 1]
      }

React ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`);

      message.noMentionReply(embed).then(msg => {
        msg.react(process.env.EMOTE_LEFT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","")||"766649447413055498");
        msg.react(process.env.EMOTE_RIGHT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","")||"766649411014361159").then(r => {
          msg.react("🗑");
          const BackwardFilter = (reaction, user) =>
          reaction.emoji.id === process.env.EMOTE_LEFT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","") &&
          user.id === message.author.id||
          reaction.emoji.id === "766649447413055498" &&
          user.id === message.author.id;
        const ForwardFilter = (reaction, user) =>
          reaction.emoji.id === process.env.EMOTE_RIGHT.replace(/<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g, "").replace(/>/g, "").replace(" ","")&&
          user.id === message.author.id||
          reaction.emoji.id === "766649411014361159" &&
          user.id === message.author.id;
          const CloseFilter = (reaction, user) =>
            reaction.emoji.name === "🗑" && user.id === message.author.id;
          const backward = msg.createReactionCollector(BackwardFilter, {
            time: 60000,
            dispose: true
          });
          const forward = msg.createReactionCollector(ForwardFilter, {
            time: 60000,
            dispose: true
          });
          const close = msg.createReactionCollector(CloseFilter, {
            time: 60000
          });
          close.on("collect", r => {
            msg.delete();
            return;
          });
          backward.on("collect", async collect => {
            const userReactions = msg.reactions.cache.filter(reaction =>
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
            if (page == 1) {
              embed.setDescription(`${pages[page - 1]}

React ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`);
              msg.edit(embed);
              return;
            }
            embed.setDescription(
              `${pages[page - 1]}` +
                `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
            );
            embed.setTitle(`Page ${page}/${pages.length}`);
            msg.edit(embed);
          });
          backward.on("remove", async collect => {
            if (page <= 1) return;
            page--;
            if (page == 1) {
              embed.setDescription(`${pages[page - 1]}

React ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`);
              msg.edit(embed);
              return;
            }
            embed.setDescription(
              `${pages[page - 1]}` +
                `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
            );
            embed.setTitle(`Page ${page}/${pages.length}`);
            msg.edit(embed);
          });
          forward.on("collect", async collect => {
            const userReactions = msg.reactions.cache.filter(reaction =>
              reaction.users.cache.has(message.author.id)
            );
            /*try {
	for (const reaction of userReactions.values()) {
		await reaction.users.remove(message.author.id);
	}
} catch (error) {
	console.error('Failed to remove reactions.');
}*/
            if (page === pages.length) return;
            page++;
            if (page >= pages.length) {
              embed.setDescription(
                `${pages[page - 1]}` +
                  `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}`
              );
              embed.setTitle(`Page ${page}/${pages.length}`);
              msg.edit(embed);
              return;
            }
            embed.setDescription(
              pages[page - 1] +
                `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1} 
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
            );
            embed.setTitle(`Page ${page}/${pages.length}`);
            msg.edit(embed);
          });
          forward.on("remove", async collect => {
            if (page === pages.length) return;
            page++;
            if (page >= pages.length) {
              embed.setDescription(
                `${pages[page - 1]}` +
                  `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1}`
              );
              embed.setTitle(`Page ${page}/${pages.length}`);
              msg.edit(embed);
              return;
            }
            embed.setDescription(
              pages[page - 1] +
                `

React with ${process.env.EMOTE_LEFT||'<:botarrowleft:766649447413055498>'}to go back page ${page - 1} 
Or react with ${process.env.EMOTE_RIGHT||'<:botarrowright:766649411014361159>'}to go to page ${page + 1}`
            );
            embed.setTitle(`Page ${page}/${pages.length}`);
            msg.edit(embed);
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
    required: false
  },
  {
    name: "page",
    description: "Which page or which category?",
    type: 3,
    required: false,
    choices:[
    {
    name:"1: misc/utillity",
    value:"1"
    },
    {
    name:"2: Search/Query",
    value:"2"
    },
    {
    name:"3: Moderation",
    value:"3"
    },
    {
    name:"4: Setup",
    value:"4"
    },
    {
    name:"5: Economy",
    value:"5"
    },
    {
    name:"6: Music",
    value:"6"
    },
    {
    name:"7: Npcs/Tuppers",
    value:"7"
    },
    {
    name:"8: Fun/Roleplay",
    value:"8"
    },
     {
    name:"9: Leveling",
    value:"9"
    }, 
]
  }
  
];
exports.interaction = async (bot, message, arg) => {
  let interaction= message, args=[];
if(arg){
try{
  args = [arg.find(arg => arg.name.toLowerCase() == "command").value];
} catch(e){
  args = [arg.find(arg => arg.name.toLowerCase() == "page").value];
}

}
  let module = bot.helps.array();

  let page = 1;

      if (args[0]) {
        let cmd = args[0];
        let command = bot.commands.get(cmd.toLowerCase());
        if (!command)
          command = bot.commands.find(x =>
            x.info.aliases.includes(cmd.toLowerCase())
          );

        if (!command) {
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
          } else if (args[0] === "9" || args[0].toLowerCase() === "leveling") {
            page = 9;
          } else
            return bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Unknown Command or Category"
                    }
                }
            });
        } else {
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
          return bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                  type: 4,
                  data: await bot.createAPIMessage(interaction, commandinfo)
                }
            });
        }
      

      let embed = new discord.MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
        .setTitle(`Page ${page}/${pages.length}`).setDescription(`${
        pages[page - 1]
      }`);

      bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(interaction, embed)
                }
            });
      }
  else {
     let command = new discord.MessageEmbed()
        .setTitle("Commands list")
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf");
      list.forEach(i => {
        command.addField(i.Category, i.commands);
      });
    bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(interaction, command)
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
    "cmdlists"
  ],
  usage: "(<command>)",
  description: "Get the information of a command or get the help list"
};
exports.conf = {
  cooldown: 0,
  dm: "yes"
};
