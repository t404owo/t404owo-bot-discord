const BotArcApi = require("botarcapi_lib");
const { MessageEmbed } = require("discord.js");
const { BotArcApiV4 } = BotArcApi;
let timestamp = require("unix-timestamp"),
  moment = require("moment");
let ta = require("ms");
function dx(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return +Math.round(elapsed / msPerYear) + " years ago";
  }
}

const api = new BotArcApiV4({
  baseURL: process.env.ARCAPI_URL,
  timeout: 120000,
  headers: {
    "User-Agent": process.env.ARCAPI_USERAGENT
  }
});
module.exports = {
  info: {
    name: "arcaea",
    aliases: ["arc"],
    description: "Arcaea commands",
    usage: '<command>/"help"',
    example: "arcaea b30"
  },
  run: async (bot, message, args) => {
    let arg = args,
      a;
    //console.log(args[0].toLowerCase())
    if (!arg[0]) {
      //  console.log("a")
      if (bot.db.get(`${message.author.id}_arcaea_acc`)) {
        a = bot.db.get(`${message.author.id}_arcaea_acc`);
      } else
        return message.mentionReply(
          `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
            " | You didn't binded your Arcaea account, please bind your Arcaea account like this: `" +
            bot.config.prefix +
            "arcaea bind <userid or username>` or `" +
            bot.config.prefix +
            "arcaeabind <userid or username>`"
        );

      let result = await api.user.info(a, true, 1).catch(console.error);
      let score = result.recent_score[0];
      //console.log(score)
      let title = await api.song.info(score.song_id);
      //console.log(title)
      let track = score.clear_type;
      let clear_type = [
          "Track Lost[L]",
          "Normal Clear[C]",
          "Full Recall[FR]",
          "Pure Memory[PM]",
          "Easy Clear[C]",
          "Hard Clear[C]"
        ],
        clear = clear_type[track];
      let difficulty = [
        "Past(pst)",
        "Present(prs)",
        "Future(ftr)",
        "Beyond(byn/byd/bynd)"
      ];
      if (
        title.difficulties[score.difficulty].ratingReal >= 10.7 &&
        title.difficulties[score.difficulty].ratingReal <= 10.9
      )
        title.difficulties[score.difficulty].rating = "10+";
      if (
        title.difficulties[score.difficulty].ratingReal >= 9.7 &&
        title.difficulties[score.difficulty].ratingReal <= 9.9
      )
        title.difficulties[score.difficulty].rating = "9+";
      let embed = new MessageEmbed()
        .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
        .setTitle(
          title.title_localized.en + ` [${difficulty[score.difficulty]}]`
        )
        .setDescription(
          `**${clear}**
**Song**: ${title.title_localized.en} by ${title.artist}
**Difficulty**: ${difficulty[score.difficulty]} ${
            title.difficulties[score.difficulty].rating
          }(${title.difficulties[score.difficulty].ratingReal})
**Score**: ${score.score}
BPM: ${title.bpm}
Rating: ${score.rating}
**Collection/Recollection Gauge**: ${score.health}%
**Pure**: ${score.perfect_count}(+${score.shiny_perfect_count})
**Far**: ${score.near_count}
**Lost**: ${score.miss_count}`
        )
        .setFooter(
          `Played by ${result.name}`,
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${result.character}_icon.png`
        );
      if (title.id === "melodyoflove") {
        let night_day = parseInt(moment(new Date()).format("HH"));
        if (night_day >= 20 && night_day < 6)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}night.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}day.jpg`
          );
      } else if (score.difficulty === 3)
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}byd.jpg`
        );
      else
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}.jpg`
        );
      return message.noMentionReply(embed);
    }
    if (args[0]) {
      // console.log("ok")
      if (args[0].toLowerCase() === "h" || args[0].toLowerCase() === "help") {
        let command;
        //args=args.slice(1)
        if (args[1]) {
          if (
            args[1].toLowerCase() === "bind" ||
            args[1].toLowerCase() === "b"
          ) {
            command = {
              name: "bind",
              description:
                "bind your Arcaea account(id or username(must be correct))",
              usage:
                "<friend_id/username(lower or upper digits must be typed correctly)",
              aliases: ["b"]
            };
          } else if (
            args[1].toLowerCase() === "songinfo" ||
            args[1].toLowerCase() === "chartinfo" ||
            args[1].toLowerCase() === "song" ||
            args[1].toLowerCase() === "chart" ||
            args[1].toLowerCase() === "song-info" ||
            args[1].toLowerCase() === "chart-info" ||
            args[1].toLowerCase() === "song_info" ||
            args[1].toLowerCase() === "chart_info" ||
            args[1].toLowerCase() === "song_" ||
            args[1].toLowerCase() === "chart_" ||
            args[1].toLowerCase() === "song-" ||
            args[1].toLowerCase() === "chart-"
          ) {
            command = {
              name: "songinfo",
              description: "Query for a song in Arcaea",
              usage: "<song>",
              aliases: [
                "chartinfo",
                "chart-info",
                "chart",
                "chart_info",
                "chart_",
                "chart-",
                "song-info",
                "song",
                "song_info",
                "song_",
                "song-"
              ]
            };
          } else if (
            args[1].toLowerCase() === "userinfo" ||
            args[1].toLowerCase() === "playerinfo" ||
            args[1].toLowerCase() === "user" ||
            args[1].toLowerCase() === "player" ||
            args[1].toLowerCase() === "user-info" ||
            args[1].toLowerCase() === "player-info" ||
            args[1].toLowerCase() === "user_info" ||
            args[1].toLowerCase() === "player_info" ||
            args[1].toLowerCase() === "user_" ||
            args[1].toLowerCase() === "player_" ||
            args[1].toLowerCase() === "user-" ||
            args[1].toLowerCase() === "player-"
          ) {
            command = {
              name: "userinfo",
              description: "Query for a user/player in Arcaea",
              usage: "(<user>)",
              aliases: [
                "player",
                "player-info",
                "player",
                "player_info",
                "player_",
                "player-",
                "user-info",
                "user",
                "user_info",
                "user_",
                "user-"
              ]
            };
          } else if (
            args[1].toLowerCase() === "b30" ||
            args[1].toLowerCase() === "best30"
          ) {
            command = {
              name: "",
              description: "",
              usage: "",
              aliases: []
            };
          } else if (
            args[1].toLowerCase() === "recent" ||
            args[1].toLowerCase() === "recent_score" ||
            args[1].toLowerCase() === "recent-score"
          ) {
            command = {
              name: "recent",
              description: "Sends the recent score of a specified player",
              usage: "(<user>)",
              aliases: ["recent_score", "recent-score"]
            };
          } else if (
            args[1].toLowerCase() === "score" ||
            args[1].toLowerCase() === "result" ||
            args[1].toLowerCase() === "best"
          ) {
            command = {
              name: "score",
              description: "",
              usage: "(<user>) <song> (<difficulty>)",
              aliases: ["best", "result"]
            };
          } else {
            return message.mentionReply(
              `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
                " | Unknown command!"
            );
          }

          let embed = new MessageEmbed()
            .setTitle("Command: " + command.name)
            .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
            .setDescription(`
Name: ${command.name}
Description: ${command.description}
Usage: \`\`${bot.config.prefix}arc ${command.name}${" " + command.usage ||
            ""}\`\`
Aliases: ${command.aliases.join(", ")}

about the brackets:
\`blank\` means that you can leave it blank
<>:Means that if something with a space which must be used in the command
() or (<>):This can be left empty, or you can give argument after a space in
"":Means that if something with a space is used, this will combine it to one`);
          return message.noMentionReply(embed);
        } else {
          let embed = new MessageEmbed()
            .setTitle("Arcaea commands")
            .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
            .setDescription(
              `\`bind\`, \`b30\`, \`userinfo\`, \`songinfo\`, \`score\`, \`recent\`
Make sure you use like this: \`${bot.config.prefix}arcaea <command>\``
            )
            .setFooter(
              `Use ${bot.config.prefix}arc help <command> for more informations.`
            );
          return message.noMentionReply(embed);
        }
      } else if (
        args[0].toLowerCase() === "bind" ||
        args[0].toLowerCase() === "b"
      ) {
        if (!args[1])
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | Please bind your Arcaea account like this: `" +
              bot.config.prefix +
              "arcaea bind <userid or username>` or `" +
              bot.config.prefix +
              "arcaeabind <userid or username>`"
          );
        let u = await api.user.info(args.slice(1).join(""), true).catch(e => {
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | This user doesn't exist!"
          );
        });
        console.log(args.slice(1).join());
        if (u.name) {
          bot.db.set(`${message.author.id}_arcaea_acc`, args.slice(1).join(""));
          message.noMentionReply(
            `${process.env.EMOTE_OK ||
              "<:hikariok:801419553841741904>"} | Arcaea User ID/Username binded successfully!`
          );
          return;
        } else
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | Please bind your Arcaea account like this: `" +
              bot.config.prefix +
              "arcaea bind <userid or username>` or `" +
              bot.config.prefix +
              "arcaeabind <userid or username>`"
          );
      } else if (
        args[0].toLowerCase() === "songinfo" ||
        args[0].toLowerCase() === "chartinfo" ||
        args[0].toLowerCase() === "song" ||
        args[0].toLowerCase() === "chart" ||
        args[0].toLowerCase() === "song-info" ||
        args[0].toLowerCase() === "chart-info" ||
        args[0].toLowerCase() === "song_info" ||
        args[0].toLowerCase() === "chart_info" ||
        args[0].toLowerCase() === "song_" ||
        args[0].toLowerCase() === "chart_" ||
        args[0].toLowerCase() === "song-" ||
        args[0].toLowerCase() === "chart-"
      ) {
        let result = await api.song
          .info(args.slice(1).join(" "), true)
          .catch(e => {
            return message.mentionReply(
              `${process.env.EMOTE_NO ||
                "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
            );
          });

        let side = ["Light 🔆", "Conflict 🌙"],
          difficulty = [
            "Past(pst)",
            "Present(prs)",
            "Future(ftr)",
            "Beyond(byn/byd/bynd)"
          ];
        let ftrdiff, prsdiff, pstdiff, byddiff;
        try {
          if (
            result.difficulties[2].ratingReal >= 10 &&
            result.difficulties[2].ratingReal <= 10.9
          )
            ftrdiff = "10+";
          else if (
            result.difficulties[2].ratingReal >= 9.7 &&
            result.difficulties[2].ratingReal <= 9.9
          )
            ftrdiff = "9+";
          else if (result.difficulties[2].rating < 1) ftrdiff = "?";
          else ftrdiff = result.difficulties[2].rating;
          if (
            result.difficulties[1].ratingReal >= 10 &&
            result.difficulties[1].ratingReal <= 10.9
          )
            prsdiff = "10+";
          else if (
            result.difficulties[1].ratingReal >= 9.7 &&
            result.difficulties[1].ratingReal <= 9.9
          )
            prsdiff = "9+";
          else if (result.difficulties[1].rating < 1) prsdiff = "?";
          else prsdiff = result.difficulties[1].rating;
          if (
            result.difficulties[0].ratingReal >= 10 &&
            result.difficulties[0].ratingReal <= 10.9
          )
            pstdiff = "10+";
          else if (
            result.difficulties[0].ratingReal >= 9.7 &&
            result.difficulties[0].ratingReal <= 9.9
          )
            pstdiff = "9+";
          else if (result.difficulties[0].rating < 1) pstdiff = "?";
          else pstdiff = result.difficulties[0].rating;
        } catch (e) {}
        let embed = new MessageEmbed()
          .setTitle(result.title_localized.en)
          .setDescription(
            `Name:${result.title_localized.en}
Name(Japanese):${result.title_localized.ja || result.title_localized.en}
Artist: ${result.artist}
BPM: ${result.bpm}
Side: ${side[result.side]}
Version: ${result.version} 
Release date: ${moment(timestamp.toDate(result.date)).format("LLLL") +
              ` (${dx(new Date(), result.date * 1000)}`})
`
          )
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf");
        try {
          if (result.id === "melodyoflove") {
            let night_day = parseInt(moment(new Date()).format("HH"));
            if (night_day >= 20 && night_day < 6)
              embed.setThumbnail(
                `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${result.id}night.jpg`
              );
            else
              embed.setThumbnail(
                `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${result.id}day.jpg`
              );
          } else
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${result.id}.jpg`
            );

          if (result.difficulties[0]) {
            embed.addField(
              difficulty[result.difficulties[0].ratingClass],
              `Level:${pstdiff}
Rating: ${result.difficulties[0].ratingReal}
Designer: ${result.difficulties[0].chartDesigner}
Illustration: ${result.difficulties[0].jacketDesigner}
Notes: ${result.difficulties[0].totalNotes}`
            );
          }
          if (result.difficulties[1]) {
            embed.addField(
              difficulty[result.difficulties[1].ratingClass],
              `Level:${prsdiff}
Rating: ${result.difficulties[1].ratingReal}
Designer: ${result.difficulties[1].chartDesigner}
Illustration: ${result.difficulties[1].jacketDesigner}
Notes: ${result.difficulties[1].totalNotes}`
            );
          }
          if (result.difficulties[2]) {
            embed.addField(
              difficulty[result.difficulties[2].ratingClass],
              `Level:${ftrdiff}
Rating: ${result.difficulties[2].ratingReal}
Designer: ${result.difficulties[2].chartDesigner}
Illustration: ${result.difficulties[2].jacketDesigner}
Notes: ${result.difficulties[2].totalNotes}`
            );
          }
          if (result.difficulties[3]) {
            if (
              result.difficulties[3].ratingReal >= 10 &&
              result.difficulties[3].ratingReal <= 10.9
            )
              byddiff = "10+";
            else if (
              result.difficulties[3].ratingReal >= 9.7 &&
              result.difficulties[3].ratingReal <= 9.9
            )
              byddiff = "9+";
            else if (result.difficulties[3].rating < 1) byddiff = "?";
            else byddiff = result.difficulties[3].rating;
            embed.addField(
              difficulty[result.difficulties[3].ratingClass],
              `Level:${byddiff}
Rating: ${result.difficulties[3].ratingReal}
Designer: ${result.difficulties[3].chartDesigner}
Illustration: [${result.difficulties[3].jacketDesigner}](https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${result.id}byd.jpg)
Notes: ${result.difficulties[3].totalNotes}`
            );
          }
        } catch (e) {
          embed.addField(
            difficulty[result.difficulties.ratingClass],
            `Level:${pstdiff}
Rating: ${result.difficulties.ratingReal}
Designer: ${result.difficulties.chartDesigner}
Illustration: ${result.difficulties.jacketDesigner}
Notes: ${result.difficulties.totalNotes}`
          );
        }
        if (result.remote_dl === true) {
          if (result.world_unlock === true) {
            embed.setFooter(
              "You need to download and unlock this song in World mode to play!"
            );
          } else {
            embed.setFooter("You need to download this song to play!");
          }
        } else {
          if (result.world_unlock === true) {
            embed.setFooter(
              "You need to unlock this song in World mode to play!"
            );
          }
        }
        message.noMentionReply(embed);
      } else if (
        args[0].toLowerCase() === "userinfo" ||
        args[0].toLowerCase() === "playerinfo" ||
        args[0].toLowerCase() === "user" ||
        args[0].toLowerCase() === "player" ||
        args[0].toLowerCase() === "user-info" ||
        args[0].toLowerCase() === "player-info" ||
        args[0].toLowerCase() === "user_info" ||
        args[0].toLowerCase() === "player_info" ||
        args[0].toLowerCase() === "user_" ||
        args[0].toLowerCase() === "player_" ||
        args[0].toLowerCase() === "user-" ||
        args[0].toLowerCase() === "player-"
      ) {
        //console.log('userinfo:')
        if (args[1]) {
          if (
            bot.db.get(
              `${args[1]
                .replace("<@!", "")
                .replace("<@", "")
                .replace(">", "")}_arcaea_acc`
            )
          )
            a = bot.db.get(
              `${args[1]
                .replace("<@!", "")
                .replace("<@", "")
                .replace(">", "")}_arcaea_acc`
            );
          else {
            let b = await api.user
              .info(args.slice(1).join(""), true)
              .catch(e => {
                return message.mentionReply(
                  `${process.env.EMOTE_NO ||
                    "<:tairitsuno:801419553933492245>"}` +
                    " | This user doesn't exist!"
                );
              });
            if (b) {
              a = args.slice(1).join("");
            } else {
              return message.mentionReply(
                `${process.env.EMOTE_NO ||
                  "<:tairitsuno:801419553933492245>"}` +
                  " | This user doesn't exist!"
              );
            }
          }
        } else if (!args[1] && bot.db.get(`${message.author.id}_arcaea_acc`)) {
          a = bot.db.get(`${message.author.id}_arcaea_acc`);
        } else
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | You didn't binded your Arcaea account, please bind your Arcaea account like this: `" +
              bot.config.prefix +
              "arcaea bind <userid or username>` or `" +
              bot.config.prefix +
              "arcaeabind <userid or username>`"
          );

        let result = await api.user.info(a, true).catch(console.error);
        //     console.log(result)

        let embed = new MessageEmbed()
          .setTitle(`Information from ${result.name}`)
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setThumbnail(
            `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${result.character}_icon.png`
          )
          .addField("Name", result.name)
          .addField("Potential", result.rating / 100)
          .addField("Friend ID", result.code)
          .addField(
            "Created At",
            moment(timestamp.toDate(result.join_date / 1000)).format("LLLL") +
              ` (${dx(new Date(), result.join_date)})`
          );
        message.noMentionReply(embed);
        return;
      } else if (
        args[0].toLowerCase() === "b30" ||
        args[0].toLowerCase() === "best30"
      ) {
        if (args[1]) {
          if (
            bot.db.get(
              `${args[1]
                .replace("<@!", "")
                .replace("<@", "")
                .replace(">", "")}_arcaea_acc`
            )
          ) {
            a = bot.db.get(
              `${args[1]
                .replace("<@!", "")
                .replace("<@", "")
                .replace(">", "")}_arcaea_acc`
            );
            //console.log(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`))
            //console.log(a)
          } else {
            let b = await api.user
              .info(args.slice(1).join(""), true)
              .catch(e => {
                return message.mentionReply(
                  `${process.env.EMOTE_NO ||
                    "<:tairitsuno:801419553933492245>"}` +
                    " | This user doesn't exist!"
                );
              });
            if (b) {
              a = args.slice(1).join("");
            } else {
              return message.mentionReply(
                `${process.env.EMOTE_NO ||
                  "<:tairitsuno:801419553933492245>"}` +
                  " | This user doesn't exist!"
              );
            }
          }
        } else if (!args[1] && bot.db.get(`${message.author.id}_arcaea_acc`)) {
          a = bot.db.get(`${message.author.id}_arcaea_acc`);
        } else {
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | You didn't binded your Arcaea account, please bind your Arcaea account like this: `" +
              bot.config.prefix +
              "arcaea bind <userid or username>` or `" +
              bot.config.prefix +
              "arcaeabind <userid or username>`"
          );
        }
        let difficulties = ["Past", "Present", "Future", "Beyond"],
          clear_type = [
            "Track Lost[L]",
            "Normal Clear[C]",
            "Full Recall[FR]",
            "Pure Memory[PM]",
            "Easy Clear[C]",
            "Hard Clear[C]"
          ],
          page = 0;
        let sendmessage = await message.noMentionReply("Loading 30 scores...");
        let b30 = await api.util.userBest30(a, true).catch(console.error);
        let user = b30.userInfo;
        let c = b30.userBest30.best30_list;
        a = c;
        let embeds = [
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed()
        ];

        
          embeds[0]
            .setTitle(`Best 30 List | ${user.name} | Page 1/6`)
            .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${user.character}.png`)
            .setFooter(
              `Played by ${user.name} | React ">" to go to page 2`,
              `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${user.character}_icon.png`
            );
          
          embeds[5]
            .setTitle(`Best 30 List | ${user.name} | Page 6/6`)
             .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${user.character}.png`)
            .setFooter(
              `Played by ${user.name} | React "<" to go back to page 5`,
              `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${user.character}_icon.png`
            );

          for (let x = 1; x < 5; x++) {
            embeds[x]
              .setTitle(`Best 30 List | ${user.name} | Page ${x + 1}/6`)
              .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${user.character}.png`)
              .setFooter(
                `Played by ${user.name} | React ">" to go to page ${x +
                  2} or "<" to go back to page ${x}`,
                `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${user.character}_icon.png`
              );
          }
        //.setTitle(`${b30.userInfo.name}'s best 30 songs`)
        function embedcontent(ct) {
          page=ct
          embeds[ct].addFields(
            {
              name:
                `\`${1 + parseInt(page * 5)}\`` +
                ":" +
                a[page * 5].songInfo.title_localized.en +
                ` [${difficulties[a[page * 5].difficulty]}]`,
              value: `${a[page * 5].score} (${
                clear_type[a[page * 5].clear_type]
              })
Pure: ${a[page * 5].perfect_count}(+${a[page * 5].shiny_perfect_count})
Far: ${a[page * 5].near_count}
Lost: ${a[page * 5].miss_count}`
            },
            {
              name:
                `\`${2 + parseInt(page * 5)}\`` +
                ":" +
                a[1 + parseInt(page * 5)].songInfo.title_localized.en +
                ` [${difficulties[a[1 + parseInt(page * 5)].difficulty]}]`,
              value: `${a[1 + parseInt(page * 5)].score} (${
                clear_type[a[1 + parseInt(page * 5)].clear_type]
              })
Pure: ${a[1 + parseInt(page * 5)].perfect_count}(+${
                a[1 + parseInt(page * 5)].shiny_perfect_count
              })
Far: ${a[1 + parseInt(page * 5)].near_count}
Lost: ${a[1 + parseInt(page * 5)].miss_count}`
            },
            {
              name:
                `\`${3 + parseInt(page * 5)}\`` +
                ":" +
                a[2 + parseInt(page * 5)].songInfo.title_localized.en +
                ` [${difficulties[a[2 + parseInt(page * 5)].difficulty]}]`,
              value: `${a[2 + parseInt(page * 5)].score} (${
                clear_type[a[2 + parseInt(page * 5)].clear_type]
              })
Pure: ${a[2 + parseInt(page * 5)].perfect_count}(+${
                a[2 + parseInt(page * 5)].shiny_perfect_count
              })
Far: ${a[2 + parseInt(page * 5)].near_count}
Lost: ${a[2 + parseInt(page * 5)].miss_count}`
            },
            {
              name:
                `\`${4 + parseInt(page * 5)}\`` +
                ":" +
                a[3 + parseInt(page * 5)].songInfo.title_localized.en +
                ` [${difficulties[a[3 + parseInt(page * 5)].difficulty]}]`,
              value: `${a[3 + parseInt(page * 5)].score} (${
                clear_type[a[3 + parseInt(page * 5)].clear_type]
              })
Pure: ${a[3 + parseInt(page * 5)].perfect_count}(+${
                a[3 + parseInt(page * 5)].shiny_perfect_count
              })
Far: ${a[3 + parseInt(page * 5)].near_count}
Lost: ${a[3 + parseInt(page * 5)].miss_count}`
            },
            {
              name:
                `\`${5 + parseInt(page * 5)}\`` +
                ":" +
                a[4 + parseInt(page * 5)].songInfo.title_localized.en +
                ` [${difficulties[a[4 + parseInt(page * 5)].difficulty]}]`,
              value: `${a[4 + parseInt(page * 5)].score} (${
                clear_type[a[4 + parseInt(page * 5)].clear_type]
              })
Pure: ${a[4 + parseInt(page * 5)].perfect_count}(+${
                a[4 + parseInt(page * 5)].shiny_perfect_count
              })
Far: ${a[4 + parseInt(page * 5)].near_count}
Lost: ${a[4 + parseInt(page * 5)].miss_count}`
            }
          );
          page=0
        }
        for (let あ = 0; あ < 6; あ++) {
          embeds[あ].setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
            .setDescription(`Potential: ${user.rating / 100}
Best 30 avg: ${b30.userBest30.best30_avg}
Recent 10 avg: ${b30.userBest30.recent10_avg}`);
          embedcontent(あ)
        }

        sendmessage.edit(embeds[0]).then(msg => {
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
            .then(r => {
              const BackwardFilter = (reaction, user) =>
                (reaction.emoji.id ===
                  process.env.EMOTE_LEFT.replace(
                    /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
                    ""
                  )
                    .replace(/>/g, "")
                    .replace(" ", "") &&
                  user.id === message.author.id) ||
                (reaction.emoji.id === "766649447413055498" &&
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
                (reaction.emoji.id === "766649411014361159" &&
                  user.id === message.author.id);
              const backward = msg.createReactionCollector(BackwardFilter, {
                time: 60000,
                dispose: true
              });
              const forward = msg.createReactionCollector(ForwardFilter, {
                time: 60000,
                dispose: true
              });
              backward.on("collect", async collect => {
                const userReactions = msg.reactions.cache.filter(reaction =>
                  reaction.users.cache.has(message.author.id)
                );
                if (page <= 0) return;
                page--
                
                msg.edit(embeds[page]);
              });
              backward.on("remove", async collect => {
                if (page <= 0) return;
                page--;
                
                msg.edit(embeds[page]);
              });
              forward.on("collect", async collect => {
                const userReactions = msg.reactions.cache.filter(reaction =>
                  reaction.users.cache.has(message.author.id)
                );
                if (page >= 5) return;
                page++;
                
                msg.edit(embeds[page]);
              });
              forward.on("remove", async collect => {
                if (page >= 5) return;
                page++;
                
                msg.edit(embeds[page]);
              });
            });
        });
      } else if (
        args[0].toLowerCase() === "recent" ||
        args[0].toLowerCase() === "recent_score" ||
        args[0].toLowerCase() === "recent-score"
      ) {
        if (args[1]) {
          if (
            bot.db.get(
              `${args[1]
                .replace("<@!", "")
                .replace("<@", "")
                .replace(">", "")}_arcaea_acc`
            )
          )
            a = bot.db.get(
              `${args[1]
                .replace("<@!", "")
                .replace("<@", "")
                .replace(">", "")}_arcaea_acc`
            );
        } else if (!args[1] && bot.db.get(`${message.author.id}_arcaea_acc`)) {
          a = bot.db.get(`${message.author.id}_arcaea_acc`);
        } else
          return message.mentionReply(
            `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
              " | You didn't binded your Arcaea account, please bind your Arcaea account like this: `" +
              bot.config.prefix +
              "arcaea bind <userid or username>` or `" +
              bot.config.prefix +
              "arcaeabind <userid or username>`"
          );

        let result = await api.user.info(a, true, 1).catch(console.error);
        let score = result.recent_score[0];
        //console.log(score)
        let title = await api.song.info(score.song_id);
        //console.log(title)
        let track = score.clear_type;
        let clear_type = [
            "Track Lost[L]",
            "Normal Clear[C]",
            "Full Recall[FR]",
            "Pure Memory[PM]",
            "Easy Clear[C]",
            "Hard Clear[C]"
          ],
          clear = clear_type[track];
        let difficulty = [
          "Past(pst)",
          "Present(prs)",
          "Future(ftr)",
          "Beyond(byn/byd/bynd)"
        ];
        if (
          title.difficulties[score.difficulty].ratingReal >= 10.7 &&
          title.difficulties[score.difficulty].ratingReal <= 10.9
        )
          title.difficulties[score.difficulty].rating = "10+";
        if (
          title.difficulties[score.difficulty].ratingReal >= 9.7 &&
          title.difficulties[score.difficulty].ratingReal <= 9.9
        )
          title.difficulties[score.difficulty].rating = "9+";
        let embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setTitle(
            title.title_localized.en + ` [${difficulty[score.difficulty]}]`
          )
          .setDescription(
            `**${clear}**
**Song**: ${title.title_localized.en} by ${title.artist}
**Difficulty**: ${difficulty[score.difficulty]} ${
              title.difficulties[score.difficulty].rating
            }(${title.difficulties[score.difficulty].ratingReal})
**Score**: ${score.score}
BPM: ${title.bpm}
Rating: ${score.rating}
**Collection/Recollection Gauge**: ${score.health}%
**Pure**: ${score.perfect_count}(+${score.shiny_perfect_count})
**Far**: ${score.near_count}
**Lost**: ${score.miss_count}`
          )
          .setFooter(
            `Played by ${result.name}`,
            `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${result.character}_icon.png`
          );
        if (title.id === "melodyoflove") {
          let night_day = parseInt(moment(new Date()).format("HH"));
          if (night_day >= 20 && night_day < 6)
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}night.jpg`
            );
          else
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}day.jpg`
            );
        } else if (score.difficulty === 3)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}byd.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}.jpg`
          );
        message.noMentionReply(embed);
        score = null;
        return;
      } else if (
        args[0].toLowerCase() === "best" ||
        args[0].toLowerCase() === "score" ||
        args[0].toLowerCase() === "result"
      ) {
        let diff = /([Ff]tr|[Pp]rs|[Pp]st|[Ff]uture|[Pp]resent|[Pp]ast|[Bb]eyond|[Bb]yd|[Bb]yn|[Bb]ynd)/g,
          diffic = args
            .slice(1)
            .join(" ")
            .match(diff),
          diffi;
        if (diffic)
          diffi = diffic[0]
            .replace(/([Bb]eyond|[Bb]yd|[Bb]yn|[Bb]ynd)/, 3)
            .replace(/([Ff]uture|[Ff]tr)/, 2)
            .replace(/([Pp]resent|[Pp]rs)/, 1)
            .replace(/([Pp]st|[Pp]ast)/, 0);
        console.log(diffi);
        let user_is_defined = true,
          song_is_defined = true;
        let detect_user = await api.user
          .info(args[1], true)
          .catch(() => (user_is_defined = false));
        let detect_song = await api.song
          .info(args[1], true)
          .catch(() => (song_is_defined = false));
        let songisdefined,
          detect_song_2 = await api.song
            .info(args[2], true)
            .catch(() => (songisdefined = false)),
          a,
          result;
        if (diffic) {
          if (user_is_defined === true) {
            if (song_is_defined === true) {
              if (songisdefined === true) {
                result = await api.user.info(args[1], true);
                a = await api.user
                  .best(
                    args[1],
                    true,
                    args
                      .slice(2)
                      .join(" ")
                      .replace(diff, ""),
                    parseInt(diffi)
                  )
                  .catch(e => {
                    if (e === "user not found")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                      );
                    if (e === "invalid songname")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                      );
                  });
              } else {
                result = await api.user.info(
                  bot.db.get(`${message.author.id}_arcaea_acc`),
                  true
                );
                a = await api.user
                  .best(
                    bot.db.get(`${message.author.id}_arcaea_acc`),
                    true,
                    args
                      .slice(1)
                      .join(" ")
                      .replace(diff, ""),
                    parseInt(diffi)
                  )
                  .catch(e => {
                    if (e === "user not found")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                      );
                    if (e === "invalid songname")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                      );
                  });
              }
            } else {
              result = await api.user.info(args[1], true);
              a = await api.user
                .best(
                  args[1],
                  true,
                  args
                    .slice(2)
                    .join(" ")
                    .replace(diff, ""),
                  parseInt(diffi)
                )
                .catch(e => {
                  if (e === "user not found")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                    );
                  if (e === "invalid songname")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                    );
                });
            }
          } else {
            if (song_is_defined === true) {
              result = await api.user.info(
                bot.db.get(`${message.author.id}_arcaea_acc`),
                true
              );
              a = await api.user
                .best(
                  bot.db.get(`${message.author.id}_arcaea_acc`),
                  true,
                  args
                    .slice(1)
                    .join(" ")
                    .replace(diff, ""),
                  parseInt(diffi)
                )
                .catch(e => {
                  if (e === "user not found")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                    );
                  if (e === "invalid songname")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                    );
                });
            } else {
              console.log("b");
              return message.mentionReply(
                `${process.env.EMOTE_NO ||
                  "<:tairitsuno:801419553933492245>"} | Song and User are not found in Arcaea, please give the correct username or user's friend ID and the correct song!`
              );
            }
          }
        } else {
          if (user_is_defined === true) {
            if (song_is_defined === true) {
              if (songisdefined === true) {
                result = await api.user.info(args[1], true);
                a = await api.user
                  .best(args[1], true, args.slice(2).join(" "))
                  .catch(e => {
                    if (e === "user not found")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                      );
                    if (e === "invalid songname")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                      );
                  });
              } else {
                result = await api.user.info(
                  bot.db.get(`${message.author.id}_arcaea_acc`),
                  true
                );
                a = await api.user
                  .best(
                    bot.db.get(`${message.author.id}_arcaea_acc`),
                    true,
                    args.slice(1).join(" ")
                  )
                  .catch(e => {
                    if (e === "user not found")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                      );
                    if (e === "invalid songname")
                      return message.mentionReply(
                        `${process.env.EMOTE_NO ||
                          "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                      );
                  });
              }
            } else {
              result = await api.user.info(args[1], true);
              a = await api.user
                .best(args[1], true, args.slice(2).join(" "))
                .catch(e => {
                  if (e === "user not found")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                    );
                  if (e === "invalid songname")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                    );
                });
            }
          } else {
            if (song_is_defined === true) {
              result = await api.user.info(
                bot.db.get(`${message.author.id}_arcaea_acc`),
                true
              );
              a = await api.user
                .best(
                  bot.db.get(`${message.author.id}_arcaea_acc`),
                  true,
                  args.slice(1).join(" ")
                )
                .catch(e => {
                  if (e === "user not found")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | User is not found in Arcaea, please give the correct username or user's friend ID!`
                    );
                  if (e === "invalid songname")
                    return message.mentionReply(
                      `${process.env.EMOTE_NO ||
                        "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
                    );
                });
            } else {
              console.log("c");
              return message.mentionReply(
                `${process.env.EMOTE_NO ||
                  "<:tairitsuno:801419553933492245>"} | Song and User are not found in Arcaea, please give the correct username or user's friend ID and the correct song!`
              );
            }
          }
        }

        let score = a;
        //console.log(score)
        let title = await api.song.info(score.song_id);
        //console.log(title)
        let track = score.clear_type;
        let clear_type = [
            "Track Lost[L]",
            "Normal Clear[C]",
            "Full Recall[FR]",
            "Pure Memory[PM]",
            "Easy Clear[C]",
            "Hard Clear[C]"
          ],
          clear = clear_type[track];
        let difficulty = [
          "Past(pst)",
          "Present(prs)",
          "Future(ftr)",
          "Beyond(byn/byd/bynd)"
        ];
        if (
          title.difficulties[score.difficulty].ratingReal >= 10.7 &&
          title.difficulties[score.difficulty].ratingReal <= 10.9
        )
          title.difficulties[score.difficulty].rating = "10+";
        if (
          title.difficulties[score.difficulty].ratingReal >= 9.7 &&
          title.difficulties[score.difficulty].ratingReal <= 9.9
        )
          title.difficulties[score.difficulty].rating = "9+";
        let embed = new MessageEmbed()
          .setTitle(
            title.title_localized.en + ` [${difficulty[score.difficulty]}]`
          )
          .setDescription(
            `**${clear}**
**Song**: ${title.title_localized.en} by ${title.artist}
**Difficulty**: ${difficulty[score.difficulty]} ${
              title.difficulties[score.difficulty].rating
            }(${title.difficulties[score.difficulty].ratingReal})
**Score**: ${score.score}
BPM: ${title.bpm}
Rating: ${score.rating}
**Collection/Recollection Gauge**: ${score.health}%
**Pure**: ${score.perfect_count}(+${score.shiny_perfect_count})
**Far**: ${score.near_count}
**Lost**: ${score.miss_count}`
          )
          .setFooter(
            `Played by ${result.name}`,
            `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${result.character}_icon.png`
          )
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf");
        if (title.id === "melodyoflove") {
          let night_day = parseInt(moment(new Date()).format("HH"));
          if (night_day >= 20 && night_day < 6)
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}night.jpg`
            );
          else
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}day.jpg`
            );
        } else if (score.difficulty === 3)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}byd.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}.jpg`
          );
        message.noMentionReply(embed);
      } else {
        if (
          bot.db.get(
            `${args[0]
              .replace("<@!", "")
              .replace("<@", "")
              .replace(">", "")}_arcaea_acc`
          )
        )
          a = bot.db.get(
            `${args[0]
              .replace("<@!", "")
              .replace("<@", "")
              .replace(">", "")}_arcaea_acc`
          );
        else {
          let b = await api.user.info(args.join(""), true).catch(e => {
            return message.mentionReply(
              `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
                " | This user doesn't exist!"
            );
          });
          if (b) {
            a = args.join("");
          } else {
            return message.mentionReply(
              `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
                " | This user doesn't exist!"
            );
          }
        }
        let result = await api.user.info(a, true, 1).catch(console.error);
        let score = result.recent_score[0];
        //console.log(score)
        let title = await api.song.info(score.song_id);
        //console.log(title)
        let track = score.clear_type;
        let clear_type = [
            "Track Lost[L]",
            "Normal Clear[C]",
            "Full Recall[FR]",
            "Pure Memory[PM]",
            "Easy Clear[C]",
            "Hard Clear[C]"
          ],
          clear = clear_type[track];
        let difficulty = [
          "Past(pst)",
          "Present(prs)",
          "Future(ftr)",
          "Beyond(byn/byd/bynd)"
        ];
        if (
          title.difficulties[score.difficulty].ratingReal >= 10.7 &&
          title.difficulties[score.difficulty].ratingReal <= 10.9
        )
          title.difficulties[score.difficulty].rating = "10+";
        if (
          title.difficulties[score.difficulty].ratingReal >= 9.7 &&
          title.difficulties[score.difficulty].ratingReal <= 9.9
        )
          title.difficulties[score.difficulty].rating = "9+";
        let embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setTitle(
            title.title_localized.en + ` [${difficulty[score.difficulty]}]`
          )
          .setDescription(
            `**${clear}**
**Song**: ${title.title_localized.en} by ${title.artist}
**Difficulty**: ${difficulty[score.difficulty]} ${
              title.difficulties[score.difficulty].rating
            }(${title.difficulties[score.difficulty].ratingReal})
**Score**: ${score.score}
BPM: ${title.bpm}
Rating: ${score.rating}
**Collection/Recollection Gauge**: ${score.health}%
**Pure**: ${score.perfect_count}(+${score.shiny_perfect_count})
**Far**: ${score.near_count}
**Lost**: ${score.miss_count}`
          )
          .setFooter(
            `Played by ${result.name}`,
            `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b%2F${result.character}_icon.png`
          );
        if (title.id === "melodyoflove") {
          let night_day = parseInt(moment(new Date()).format("HH"));
          if (night_day >= 20 && night_day < 6)
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}night.jpg`
            );
          else
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}day.jpg`
            );
        } else if (score.difficulty === 3)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}byd.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b%2F${title.id}.jpg`
          );
        message.noMentionReply(embed);
      }
    }
  },
  interaction: (bot, interaction, arg) => {},
  conf: {
    cooldown: 0,
    dm: "yes"
  }
};
