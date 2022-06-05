const BotArcApi = require("botarcapi_lib");
const { MessageEmbed } = require("discord.js");
const { BotArcApiV5 } = BotArcApi;
let ta = require("ms");

const api = new BotArcApiV5({
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
    let arg = args, a;
    //console.log(args[0].toLowerCase())
    if (!arg[0]) {
if(process.env.ARCAPI_URL&&process.env.ARCAPI_USERAGENT){
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
        title.difficulties[score.difficulty].rating >= 107 &&
        title.difficulties[score.difficulty].rating <= 109
      )
        title.difficulties[score.difficulty].difficulty = "10+";
      if (
        title.difficulties[score.difficulty].rating >= 97 &&
        title.difficulties[score.difficulty].rating <= 99
      ) title.difficulties[score.difficulty].difficulty = "9+";
      else {if(!isNaN(title.difficulties[score.difficulty].difficulty)){
title.difficulties[score.difficulty].difficulty = title.difficulties[score.difficulty].difficulty/2
        }}
      let embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setAuthor("Arcaea | Recent")
          .setTitle(
            title.difficulties[score.difficulty].artist +" - "+ title.difficulties[score.difficulty].name_en
          )
          .addField("Chart Info:", 
`**Song**: ${title.difficulties[score.difficulty].name_en} by ${title.difficulties[score.difficulty].artist}
**Difficulty**: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].difficulty} (${title.difficulties[score.difficulty].rating/10})
**BPM**: ${title.difficulties[score.difficulty].bpm}
**Rating**: ${score.rating}`)
          .addField("Score", 
`**${score.score}** [**${clear}**]
**Pure**: ${score.perfect_count}(+${score.shiny_perfect_count})
**Far**: ${score.near_count}
**Lost**: ${score.miss_count}
**Collection/Recollection Gauge**: ${score.health}%`
)
        if(result.account_info.is_char_uncapped === true) embed.setFooter(
          `Played by ${result.account_info.name}`,
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}u_icon.png`
        );
        else embed.setFooter(
          `Played by ${result.account_info.name}`,
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}_icon.png`
        );

if (score.song_id === "melodyoflove") {
        let night_day = parseInt(moment(new Date()).format("HH"));
        if (night_day >= 20 && night_day < 6)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}night.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}day.jpg`
          );
      } else if (score.difficulty === 3)
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}byd.jpg`
        );
      else
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}.jpg`
        );
      return message.noMentionReply(embed);
      }
else return;
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
                "Bind your Arcaea account(id or username(must be correct))",
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
              description: "Query for a song/chart in Arcaea",
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
              name: "b30",
              description: "Gets a list of best 30 scores (from a user/from yourself)",
              usage: "(<user>)",
              aliases: ["best30"]
            };
          } else if (
            args[1].toLowerCase() === "recent" ||
            args[1].toLowerCase() === "recent_score" ||
            args[1].toLowerCase() === "recent-score"
          ) {
            command = {
              name: "recent",
              description: "Get the score of the chart/song you(or a specified player) played recently in Arcaea",
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
              description: "Get the best score of a certain chart/song you played in Arcaea",
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
      } else 
        if(process.env.ARCAPI_URL&&process.env.ARCAPI_USERAGENT){
          if (
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
        if (u.account_info.name) {
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
        let result = await api.song.info(args.slice(1).join(" "), true)
          .catch(e => {
            console.log(e)
            return message.mentionReply(
              `${process.env.EMOTE_NO ||
                "<:tairitsuno:801419553933492245>"} | Song is not found in Arcaea, please give a correct song name`
            );
            
          });
        console.log(result)
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
            result.difficulties[2].rating >= 100 &&
            result.difficulties[2].rating <= 109
          )
            ftrdiff = "10+";
          else if (
            result.difficulties[2].rating >= 97 &&
            result.difficulties[2].rating <= 99
          )
            ftrdiff = "9+";
          else if (result.difficulties[2].rating < 1) ftrdiff = "?";
          else ftrdiff = result.difficulties[2].rating;
          if (
            result.difficulties[1].rating >= 100 &&
            result.difficulties[1].rating <= 109
          )
            prsdiff = "10+";
          else if (
            result.difficulties[1].rating >= 97 &&
            result.difficulties[1].rating <= 99
          )
            prsdiff = "9+";
          else if (result.difficulties[1].rating < 1) prsdiff = "?";
          else prsdiff = result.difficulties[1].rating;
          if (
            result.difficulties[0].rating >= 100 &&
            result.difficulties[0].rating <= 109
          )
            pstdiff = "10+";
          else if (
            result.difficulties[0].rating >= 97 &&
            result.difficulties[0].rating <= 99
          )
            pstdiff = "9+";
          else if (result.difficulties[0].difficulty < 1) pstdiff = "?";
          else {
            pstdiff = result.difficulties[0].difficulty/2
            prsdiff = result.difficulties[1].difficulty/2
            ftrdiff = result.difficulties[2].difficulty/2
               };
        } catch (e) {console.log(e)}
        let embed = new MessageEmbed()
          .setTitle(result.difficulties[0].name_en)
          .setDescription(
            `Name:${result.difficulties[0].name_en}
Name(Japanese):${result.difficulties[0].name_jp || result.difficulties[0].name_en}
Artist: ${result.difficulties[0].artist}
BPM: ${result.difficulties[0].bpm}
Side: ${side[result.difficulties[0].side]}
Pack: ${result.difficulties[0].set_friendly}
Version: ${result.difficulties[0].version} 
Release date: <t:${result.difficulties[0].date}:F> (<t:${result.difficulties[0].date}:R>)`
          )
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf");
        if (result.difficulties[0].remote_download
            &&result.difficulties[0].world_unlock) {
            embed.setFooter(
              "You need to download and unlock this song in World mode to play!"
            );
          } else if (result.difficulties[0].remote_download
            &&!result.difficulties[0].world_unlock) {
            embed.setFooter("You need to download this song to play!");
          }
          else if(result.difficulties[0].world_unlock) {
            embed.setFooter(
              "You need to unlock this song in World mode to play!"
            );
        }
        try {
          if (result.id === "melodyoflove") {
            let night_day = parseInt(moment(new Date()).format("HH"));
            if (night_day >= 20 && night_day < 6)
              embed.setThumbnail(
                `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${result.song_id}night.jpg`
              );
            else
              embed.setThumbnail(
                `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${result.song_id}day.jpg`
              );
          } else
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${result.song_id}.jpg`
            );

          if (result.difficulties[0]) {
            embed.addField(
              difficulty[0],
              `Level:${pstdiff}
Rating: ${result.difficulties[0].rating/10}
Designer: ${result.difficulties[0].chart_designer}
Illustration: ${result.difficulties[0].jacket_designer}
Notes: ${result.difficulties[0].note}`
            );
          }
          if (result.difficulties[1]) {
            embed.addField(
              difficulty[1],
              `Level:${prsdiff}
Rating: ${result.difficulties[1].rating/10}
Designer: ${result.difficulties[1].chart_designer}
Illustration: ${result.difficulties[1].jacket_designer}
Notes: ${result.difficulties[1].note}`
            );
          }
          if (result.difficulties[2]) {
            embed.addField(
              difficulty[2],
              `Level:${ftrdiff}
Rating: ${result.difficulties[2].rating/10}
Designer: ${result.difficulties[2].chart_designer}
Illustration: ${result.difficulties[2].jacket_designer}
Notes: ${result.difficulties[2].note}`
            );
          }
          if (result.difficulties[3]) {
            if (
              result.difficulties[3].rating >= 100 &&
              result.difficulties[3].rating <= 109
            )
              byddiff = "10+";
            else if (
              result.difficulties[3].rating >= 97 &&
              result.difficulties[3].rating <= 9.9
            )
              byddiff = "9+";
            else if (result.difficulties[3].rating < 1) byddiff = "?";
            else byddiff = result.difficulties[3].rating;
            embed.addField(
              difficulty[3],
              `Level:${byddiff}
Rating: ${result.difficulties[3].rating/10}
Designer: ${result.difficulties[3].chart_designer}
Illustration: [${result.difficulties[3].jacket_designer}](https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${result.song_id}byd.jpg)
Notes: ${result.difficulties[3].note}`
            );
          }
        } catch (e) {
          embed.addField(
            difficulty[2],
            `Level:${result.difficulties.difficulty}
Rating: ${result.difficulties.rating/10}
Designer: ${result.difficulties.chart_designer}
Illustration: ${result.difficulties.jacket_designer}
Notes: ${result.difficulties.note}`
          );
        }
       return message.noMentionReply(embed);
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
          .setTitle(`Information from ${result.account_info.name}`)
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .addField("Name", result.account_info.name)
          .addField("Potential", result.account_info.rating / 100)
          .addField("Friend ID", result.account_info.code)
          .addField(
            "Created At",
            `<t:${parseInt(result.account_info.join_date/1000)}:F> (<t:${parseInt(result.account_info.join_date/1000)}:R>)`
          );
          if(result.account_info.is_char_uncapped === true) embed.setThumbnail(
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}u_icon.png`
        );
        else embed.setThumbnail(
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}_icon.png`
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
            console.log(a)
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
        let b30 = await api.user.best30(a, true).catch(console.error);
        let user = b30.account_info;
        let c = b30.best30_list;
        a = c;
        let embeds = [
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed(),
          new MessageEmbed()
        ];

        if(user.is_char_uncapped=== true) {
          embeds[0]
            .setTitle(`Best 30 List | ${user.name} | Page 1/6`)
            .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}u.png`)
            .setFooter(
              `Played by ${user.name} | React ">" to go to page 2`,
              `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}u_icon.png`
            );
          
          embeds[5]
            .setTitle(`Best 30 List | ${user.name} | Page 6/6`)
             .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}u.png`)
            .setFooter(
              `Played by ${user.name} | React "<" to go back to page 5`,
              `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}u_icon.png`
            );

          for (let x = 1; x < 5; x++) {
            embeds[x]
              .setTitle(`Best 30 List | ${user.name} | Page ${x + 1}/6`)
              .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}u.png`)
              .setFooter(
                `Played by ${user.name} | React ">" to go to page ${x +
                  2} or "<" to go back to page ${x}`,
                `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}u_icon.png`
              );
          }
        }
        else {
          embeds[0]
            .setTitle(`Best 30 List | ${user.name} | Page 1/6`)
            .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}.png`)
            .setFooter(
              `Played by ${user.name} | React ">" to go to page 2`,
              `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}_icon.png`
            );
          
          embeds[5]
            .setTitle(`Best 30 List | ${user.name} | Page 6/6`)
             .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}.png`)
            .setFooter(
              `Played by ${user.name} | React "<" to go back to page 5`,
              `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}_icon.png`
            );

          for (let x = 1; x < 5; x++) {
            embeds[x]
              .setTitle(`Best 30 List | ${user.name} | Page ${x + 1}/6`)
              .setThumbnail(`https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}.png`)
              .setFooter(
                `Played by ${user.name} | React ">" to go to page ${x +
                  2} or "<" to go back to page ${x}`,
                `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${user.character}_icon.png`
              );
          }
        }
        
          let a_song_names=[];
          
           // a_song_names=[]
for(let id_x=0;id_x<30;id_x++){
 let output=await api.song.info(a[id_x].song_id, true)
    console.log(output.difficulties[a[id_x].difficulty].name_en+':a')
 a_song_names.push(output.difficulties[a[id_x].difficulty].name_en)

  console.log(a_song_names[id_x]+':b')
}
        //.setTitle(`${b30.userInfo.name}'s best 30 songs`)
        async function embedcontent(ct, a_song_name) {
          
          page=ct
            
          embeds[ct].addFields(
            {
              name:
                `\`${1 + parseInt(page * 5)}\`` +
                ":" +
                a_song_names[parseInt(page * 5)] +
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
                a_song_names[1 + parseInt(page * 5)] +
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
                a_song_names[2 + parseInt(page * 5)] +
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
                a_song_names[3 + parseInt(page * 5)] +
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
                a_song_names[4 + parseInt(page * 5)] +
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
Best 30 avg: ${b30.best30_avg}
Recent 10 avg: ${b30.recent10_avg}`);
          embedcontent(あ)
        }

        sendmessage.edit(embeds[0]).then(msg => {
          msg.react(
            process.env.EMOTE_LEFT.replace(
              /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
              ""
            )
              .replace(/>/g, "")
              .replace(" ", "") || "884236566837469204"
          );
          msg
            .react(
              process.env.EMOTE_RIGHT.replace(
                /<(a):([^+]*)([A-Za-z0-9]*)([^+]*)([A-Za-z0-9]*):/g,
                ""
              )
                .replace(/>/g, "")
                .replace(" ", "") || "884236566237691916"
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
          ) {
            a = bot.db.get(
              `${args[1]
                .replace("<@!", "")
                .replace("<@", "")
                .replace(">", "")}_arcaea_acc`
            );
            //console.log(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`))
            console.log(a)
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
        title.difficulties[score.difficulty].rating >= 107 &&
        title.difficulties[score.difficulty].rating <= 109
      )
        title.difficulties[score.difficulty].difficulty = "10+";
      if (
        title.difficulties[score.difficulty].rating >= 97 &&
        title.difficulties[score.difficulty].rating <= 99
      ) title.difficulties[score.difficulty].difficulty = "9+";
      else {
        if(!isNaN(title.difficulties[score.difficulty].difficulty)){
title.difficulties[score.difficulty].difficulty = title.difficulties[score.difficulty].difficulty/2
        }
        }
        
      let embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setAuthor("Arcaea | Recent")
          .setTitle(
            title.difficulties[score.difficulty].artist +" - "+ title.difficulties[score.difficulty].name_en
          )
          .addField("Chart Info:", 
`**Song**: ${title.difficulties[score.difficulty].name_en} by ${title.difficulties[score.difficulty].artist}
**Difficulty**: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].difficulty} (${title.difficulties[score.difficulty].rating/10})
**BPM**: ${title.difficulties[score.difficulty].bpm}
**Rating**: ${score.rating}`)
          .addField("Score", 
`**${score.score}** [**${clear}**]
**Pure**: ${score.perfect_count}(+${score.shiny_perfect_count})
**Far**: ${score.near_count}
**Lost**: ${score.miss_count}
**Collection/Recollection Gauge**: ${score.health}%`
)
        if(result.account_info.is_char_uncapped === true) embed.setFooter(
          `Played by ${result.account_info.name}`,
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}u_icon.png`
        );
        else embed.setFooter(
          `Played by ${result.account_info.name}`,
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}_icon.png`
        );

if (score.song_id === "melodyoflove") {
        let night_day = parseInt(moment(new Date()).format("HH"));
        if (night_day >= 20 && night_day < 6)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}night.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}day.jpg`
          );
      } else if (score.difficulty === 3)
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}byd.jpg`
        );
      else
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}.jpg`
        );
        message.noMentionReply(embed);
        score = null;
        return;
      } else if (
        args[0].toLowerCase() === "score"
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
        let title = await api.song.info(score.record.song_id);
        //console.log(title)
        let track = score.record.clear_type;
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
          title.difficulties[score.record.difficulty].rating >= 107 &&
          title.difficulties[score.record.difficulty].rating <= 109
        )
          title.difficulties[score.record.difficulty].difficulty = "10+";
        if (
          title.difficulties[score.record.difficulty].rating >= 97 &&
          title.difficulties[score.record.difficulty].rating <= 99
        )
          title.difficulties[score.record.difficulty].difficulty = "9+";
        if(!isNaN(title.difficulties[score.record.difficulty].difficulty)) title.difficulties[score.record.difficulty].difficulty=title.difficulties[score.record.difficulty].difficulty/2;
        console.log(score)
        console.log(title)
        let embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
         .setAuthor("Arcaea | Best Score")
          .setTitle(
            title.difficulties[score.record.difficulty].artist +" - "+ title.difficulties[score.record.difficulty].name_en
          )
          .addField("Chart Info:", 
`**Song**: ${title.difficulties[score.record.difficulty].name_en} by ${title.difficulties[score.record.difficulty].artist}
**Difficulty**: ${difficulty[score.record.difficulty]} ${title.difficulties[score.record.difficulty].rating} (${title.difficulties[score.record.difficulty].ratingReal})
**BPM**: ${title.difficulties[score.record.difficulty].bpm}
**Rating**: ${score.record.rating}`)
          .addField("Score", 
`**${score.record.score}** [**${clear}**]
**Pure**: ${score.record.perfect_count}(+${score.record.shiny_perfect_count})
**Far**: ${score.record.near_count}
**Lost**: ${score.record.miss_count}
**Collection/Recollection Gauge**: ${score.record.health}%`
)
          if (score.account_info.is_char_uncapped=== true)
          embed.setFooter(
            `Played by ${score.account_info.name}`,
            `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${score.account_info.character}u_icon.png`
          )
          else
          embed.setFooter(
            `Played by ${score.account_info.name}`,
            `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${score.account_info.character}_icon.png`
          )
        if (title.difficulties[score.record.difficulty].id === "melodyoflove") {
          let night_day = parseInt(moment(new Date()).format("HH"));
          if (night_day >= 20 && night_day < 6)
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.record.difficulty].id}night.jpg`
            );
          else
            embed.setThumbnail(
              `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.record.difficulty].id}day.jpg`
            );
        } else if (score.record.difficulty === 3)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.record.difficulty].id}byd.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.record.difficulty].id}.jpg`
          );
        message.noMentionReply(embed);
      } 
      else {
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
        title.difficulties[score.difficulty].rating >= 107 &&
        title.difficulties[score.difficulty].rating <= 109
      )
        title.difficulties[score.difficulty].difficulty = "10+";
      if (
        title.difficulties[score.difficulty].rating >= 97 &&
        title.difficulties[score.difficulty].rating <= 99
      ) title.difficulties[score.difficulty].difficulty = "9+";
      else {if(!isNaN(title.difficulties[score.difficulty].difficulty)){
title.difficulties[score.difficulty].difficulty = title.difficulties[score.difficulty].difficulty/2
        }}
      let embed = new MessageEmbed()
          .setColor(process.env.DISCORD_BOT_EMBED_COLOR || "#0affaf")
          .setAuthor("Arcaea | Recent")
          .setTitle(
            title.difficulties[score.difficulty].artist +" - "+ title.difficulties[score.difficulty].name_en
          )
          .addField("Chart Info:", 
`**Song**: ${title.difficulties[score.difficulty].name_en} by ${title.difficulties[score.difficulty].artist}
**Difficulty**: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].difficulty} (${title.difficulties[score.difficulty].rating/10})
**BPM**: ${title.difficulties[score.difficulty].bpm}
**Rating**: ${score.rating}`)
          .addField("Score", 
`**${score.score}** [**${clear}**]
**Pure**: ${score.perfect_count}(+${score.shiny_perfect_count})
**Far**: ${score.near_count}
**Lost**: ${score.miss_count}
**Collection/Recollection Gauge**: ${score.health}%`
)
        if(result.account_info.is_char_uncapped === true) embed.setFooter(
          `Played by ${result.account_info.name}`,
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}u_icon.png`
        );
        else embed.setFooter(
          `Played by ${result.account_info.name}`,
          `https://cdn.glitch.com/a807634f-7022-4168-b42a-f2974966221b/${result.account_info.character}_icon.png`
        );

if (score.song_id === "melodyoflove") {
        let night_day = parseInt(moment(new Date()).format("HH"));
        if (night_day >= 20 && night_day < 6)
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}night.jpg`
          );
        else
          embed.setThumbnail(
            `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}day.jpg`
          );
      } else if (score.difficulty === 3)
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}byd.jpg`
        );
      else
        embed.setThumbnail(
          `https://cdn.glitch.com/d06daaf0-dbcd-449d-9a2e-c887b887639b/${title.difficulties[score.difficulty].id}.jpg`
        );
      return message.noMentionReply(embed);
      }
        }
      else{
        return
      }
    }
  },
  options: [
    {
      name: "help",
      description: "Get the list of Arcaea commands or informations about the certain Arcaea command",
      type: 1,
      options: [
        {
            "name": "command",
            "description": "Get the information of any command",
            "type": 3,
            "required": false,
            "choices": [
                 {//arcaea is main, help is sub-command, ahhhhh
                 // /arcaea help command?: options
                    "name": "bind",
                    "value": "bind"
                },
                {
                    "name": "best30",
                    "value": "b30"
                },
                {
                    "name": "userinfo",
                    "value": "userinfo"
                },
                {
                    "name": "songinfo",
                    "value": "songinfo"
                },
                {
                    "name": "score",
                    "value": "score"
                },
                {
                    "name": "recent",
                    "value": "recent"
                },
            ]
        },
      ]
    },
    {
      name: "bind",
      description: "Bind your Arcaea account",
      type: 1,
      options:[
        {
          name: "user",
          description: "**Note**: Please type the correct username or friend id!",
          type: 3,
          required: true
        }
      ]
    },
    {
      name: "b30",//lol getting trouble in b30 list soon
      description:"Gets a list of best 30 scores (from a user/from yourself)",
      type: 1,
      options:[
        {
          name: "user",
          description: "**Note**: Please type the correct username or friend id!",
          type: 3,
          required: false
        }
      ]
    },
    {
      name: "userinfo",//lol getting trouble in b30 list soon
      description:" Query for a user/player in Arcaea",
      type: 1,
      options:[
        {
          name: "user",
          description: "**Note**: Please type the correct username or friend id!",
          type: 3,
          required: true
        }
      ]
    },
    {
      name: "songinfo",//lol getting trouble in b30 list soon
      description:"Query for a song/chart in Arcaea",
      type: 1,
      options:[
        {
          name: "song",
          description: "A song (in Arcaea).",
          type: 3,
          required: true
        }
      ]
    },
    {
      name: "score",
      description:"Get the best score of a certain chart/song you played in Arcaea",
      type: 1,
      options:[
        {
          name: "song",
          description: "A song (in Arcaea).",
          type: 3,
          required: true
        },
        {
          name: "user",
          description: "**Note**: Please type the correct username or friend id!",
          type: 3,
          required: false
        },
        {
          name: "difficulty",
          description: "Choose a difficulty you want to see for the score.",
          type: 3,
          required: false,
          choices:[
            {
              name: "Beyond",
              value: "3"
            },
            {
              name: "Future",
              value: "2"
            },
            {
              name: "Present",
              value: "1"
            },{
              name: "Past",
              value: "0"
            },
          ]
        }
      ]
    },
    {
      name: "recent",
      description:"Get the score of the chart/song you(or a specified player) played recently in Arcaea.",
      type: 1,
      options:[
        {
          name: "user",
          description: "**Note**: Please type the correct username or friend id!",
          type: 3,
          required: false
        }
      ]
    },
  ],
  interaction: async (bot, interaction, arg) => {
      // console.log("ok")
    
      /*let args= [];
      if (arg.find(arg => arg.name.toLowerCase() == "help")) args[0]=
      arg.find(arg => arg.name.toLowerCase() == "help")
      else if (arg.find(arg => arg.name.toLowerCase() == "bind")) args[0]=
      arg.find(arg => arg.name.toLowerCase() == "bind")
      else if (arg.find(arg => arg.name.toLowerCase() == "b30")) args[0]=
      arg.find(arg => arg.name.toLowerCase() == "b30")
      else if (arg.find(arg => arg.name.toLowerCase() == "user")) args[0]=
      arg.find(arg => arg.name.toLowerCase() == "user")
      else if (arg.find(arg => arg.name.toLowerCase() == "song")) args[0]=
      arg.find(arg => arg.name.toLowerCase() == "song")
      else if (arg.find(arg => arg.name.toLowerCase() == "score")) args[0]=
      arg.find(arg => arg.name.toLowerCase() == "score")
      else if (arg.find(arg => arg.name.toLowerCase() == "recent")) args[0]=
      arg.find(arg => arg.name.toLowerCase() == "recent")*/

  },
  conf: {
    cooldown: 0,
    dm: "yes"
  }
};
