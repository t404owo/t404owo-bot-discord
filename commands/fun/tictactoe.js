const Discord = require("discord.js"); 
const midDuel = new Set();

module.exports = {
  info: {
    name: "TicTacToe",
    description: "Fun game of TicTacToe",
    minArgs: 1,
    maxArgs: 1,
    usage: "<mention>",
    aliases: ["ttt", "tictactoe", "tic-tac-toe"]
  },
  conf: {
    cooldown: 1,
    dm: "no"
  },
  run: async(bot, message, args) => {
    let msg = message;
    const author = message.author.id; 
    let member = await message.guild.members.fetch(args[0].replace("<@!","").replace("<@", "").replace(">","")).catch(err => { return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please Mention a correct user or give a correct id of the user!") })
    const authorName = message.author.username; 
    const memberName = member.user.tag; 

    // All different failures
    if (!member) {
      // No user mentioned
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Incorrect Syntax! Please mention a user!");
    }
    if (member.id === author) {
      // Played tries to duel himself
      return message.mentionReply(
        `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Incorrext Syntax! You cannot duel yourself!"
      );
    }
    if (midDuel.has(author)) {
      // Player tries to create a new TicTacToe match mid-game
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | You're currently in a duel!`);
    } else if (midDuel.has(member.id)) {
      // Player tries to match a player who's mid-game
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | <@${member.id}> is currently in a duel!`);
    }
    if (member.id === message.client.user.id) {
      // User tries to duel the bot
      return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You can't duel me!");
    }

    // Adds both players to a set so all of the above failures take affect
    midDuel.add(author);
    midDuel.add(member.id);

    // First TTT Pallet
    let turnName;
    let a1 = "⬛";
    let a2 = "⬛";
    let a3 = "⬛";
    let b1 = "⬛";
    let b2 = "⬛";
    let b3 = "⬛";
    let c1 = "⬛";
    let c2 = "⬛";
    let c3 = "⬛";
    let xCircle; // Used to determine whether the bot needs to place and x or a circle
    let winner; // Used to determine who won - Used on the current player's turn
let url = member.avatarURL({dynamic:true, size:1024})
    // Creating the actual winner
    const Embed = new Discord.MessageEmbed()
      .setTitle("<:ifyoucan:801419554063384586> | Tic Tac Toe")
      .setThumbnail(url)
      .setDescription(
       //`🎮 **${authorName}** VS ${memberName} 🎮\n\n⬛1️⃣2️⃣3️⃣⬛\n⬛${a1}${a2}${a3}⬛\n⬛${b1}${b2}${b3}⬛\n⬛${c1}${c2}${c3}⬛\n⬛1️⃣2️⃣3️⃣⬛`
      `🎮 **${authorName}** VS **${memberName}** 🎮\n\n⬛1️⃣2️⃣3️⃣⬛\n:regional_indicator_a:${a1}${a2}${a3}:regional_indicator_a:\n:regional_indicator_b:${b1}${b2}${b3}:regional_indicator_b:\n:regional_indicator_c:${c1}${c2}${c3}:regional_indicator_c:\n⬛1️⃣2️⃣3️⃣⬛`
      )
      .setFooter(
        `You have 10 seconds to reply with your next move!
You may type "cancel" at any time to stop the game.
(Upper left=a1, Up=a2, Upper Right=a3, Left=b1, Middle=b2, Right=b3, Bottom Left=c1, Bottom=c2, Bottom Right=c3)`
      )
      .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
    message.channel.send(`<@${author}>`, Embed).then(async message => {
      for (let i = 0; i < 9; i++) {
        if (i % 2 == 0) {
          // The game will always start with the author.
          turnName = author;
          xCircle = "❌";
          winner = `<@${author}>`;
        } else if (i % 2 > 0) {
          turnName = member.id;
          xCircle = "⭕";
          winner = `<@${member.id}>`;
        }
        const filter = m => m.author.id === turnName;
        try {
          msg = await message.channel.awaitMessages(filter, {
            max: 1,
            time: "20000",
            errors: ["time"]
          });
          if (
            msg
              .first()
              .content.toLowerCase()
              .trim() === "end"
          ) {
            // The player who's turn it is always has the chance to end the game
            message.channel.send("Game ended!");
            midDuel.delete(author);
            midDuel.delete(member.id);
            break;

            // User inputs - Declare where the user's icon will be placed next
          } else {
            if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "upper left"||
              msg.first()
                .content.toLowerCase()
                .trim() === "a1"||
              msg.first()
                .content.toLowerCase()
                .trim() === "1a"
            ) {
              if (a1 == "⭕" || a1 == "❌") {
                // User tries to place at an already claimed spot
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                // Sets the spot to the user's icon
                a1 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "up"||
              msg.first()
                .content.toLowerCase()
                .trim() === "a2"||
              msg.first()
                .content.toLowerCase()
                .trim() === "2a"
            ) {
              if (a2 == "⭕" || a2 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                a2 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "upper right"||
              msg.first()
                .content.toLowerCase()
                .trim() === "a3"||
              msg.first()
                .content.toLowerCase()
                .trim() === "3a"
            ) {
              if (a3 == "⭕" || a3 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                a3 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "left"||
              msg.first()
                .content.toLowerCase()
                .trim() === "b1"||
              msg.first()
                .content.toLowerCase()
                .trim() === "1b"
            ) {
              if (b1 == "⭕" || b1 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                b1 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "middle"||
              msg.first()
                .content.toLowerCase()
                .trim() === "b2"||
              msg.first()
                .content.toLowerCase()
                .trim() === "2b"
            ) {
              if (b2 == "⭕" || b2 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                b2 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "right"||
              msg.first()
                .content.toLowerCase()
                .trim() === "b3"||
              msg.first()
                .content.toLowerCase()
                .trim() === "3b"
            ) {
              if (b3 == "⭕" || b3 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                b3 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "bottom left"||
              msg.first()
                .content.toLowerCase()
                .trim() ==="c1"
              ||
              msg.first()
                .content.toLowerCase()
                .trim() === "1c"
            ) {
              if (c1 == "⭕" || c1 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                c1 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "bottom"||
              msg.first()
                .content.toLowerCase()
                .trim() === "c2"||
              msg.first()
                .content.toLowerCase()
                .trim() ==="2c"
            ) {
              if (c2 == "⭕" || c2 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                c2 = xCircle;
              }
            } else if (
              msg
                .first()
                .content.toLowerCase()
                .trim() === "bottom right"||
              msg.first()
                .content.toLowerCase()
                .trim() === "c3"||
              msg.first()
                .content.toLowerCase()
                .trim() === "3c"//xong//ok
            ) {
              if (c3 == "⭕" || c3 == "❌") {
                message.channel.send(
                  "That spot is already occupied.. and now you lost..."
                );
                midDuel.delete(author);
                midDuel.delete(member.id);
                break;
              } else {
                c3 = xCircle;
              }
            } else {
              // User's input does not match any of the above ^
              message.channel.send("Incorrect input, you lost.");
              midDuel.delete(author);
              midDuel.delete(member.id);
              break;
            }
          }
          msg.first().delete(); // Deletes the user's message to keep chat less spammy
        } catch (ex) {
          // Time limit ran out
          message.channel.send(
            `<@${turnName}> You took too long to respond, and now you lost. F`
          );
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        }

        // Update the embed with the newly placed icon - Highlight the user's turn
        if (i % 2 == 0) {
          const updatedEmbed = new Discord.MessageEmbed()
            .setTitle("Tic Tac Toe")
          .setThumbnail(url)
            .setDescription(
//`🎮 **${authorName}** VS ${memberName} 🎮\n\n⬛1️⃣2️⃣3️⃣⬛\n⬛${a1}${a2}${a3}⬛\n⬛${b1}${b2}${b3}⬛\n⬛${c1}${c2}${c3}⬛\n⬛1️⃣2️⃣3️⃣⬛`
             `🎮 **${authorName}** VS ${memberName} 🎮\n\n⬛1️⃣2️⃣3️⃣⬛\n:regional_indicator_a:${a1}${a2}${a3}:regional_indicator_a:\n:regional_indicator_b:${b1}${b2}${b3}:regional_indicator_b:\n:regional_indicator_c:${c1}${c2}${c3}:regional_indicator_c:\n⬛1️⃣2️⃣3️⃣⬛`
             )
            .setFooter(
              'You have 10 seconds to reply with your next move!\nYou may type "cancel" at any time to stop the game.\n(Upper left, Up, Upper Right, Left, Middle, Right, Bottom Left, Bottom, Bottom Right)'
            )
            .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
          message.edit(updatedEmbed);
        } else if (i % 2 > 0) {
          const updatedEmbed = new Discord.MessageEmbed()
            .setTitle("Tic Tac Toe")
            .setDescription(
`🎮 **${authorName}** VS ${memberName} 🎮\n\n⬛1️⃣2️⃣3️⃣⬛\n:regional_indicator_a:${a1}${a2}${a3}:regional_indicator_a:\n:regional_indicator_b:${b1}${b2}${b3}:regional_indicator_b:\n:regional_indicator_c:${c1}${c2}${c3}:regional_indicator_c:\n⬛1️⃣2️⃣3️⃣⬛`
            )
          .setThumbnail(url)
            .setFooter(
              'You have 10 seconds to reply with your next move!\nYou may type "cancel" at any time to stop the game.\n(Upper left, Up, Upper Right, Left, Middle, Right, Bottom Left, Bottom, Bottom Right)'
            )
            .setColor(process.env.DISCORD_BOT_EMBED_COLOR||"#0affaf")
          message.edit(updatedEmbed);
        }

        // All possible winning outcomes
        if (
          (a1 == "❌" && b1 == "❌" && c1 == "❌") ||
          (a1 == "⭕" && b1 == "⭕" && c1 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (
          (a2 == "❌" && b2 == "❌" && c2 == "❌") ||
          (a2 == "⭕" && b2 == "⭕" && c2 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (
          (a3 == "❌" && b3 == "❌" && c3 == "❌") ||
          (a3 == "⭕" && b3 == "⭕" && c3 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (
          (a1 == "❌" && a2 == "❌" && a3 == "❌") ||
          (a1 == "⭕" && a2 == "⭕" && a3 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (
          (b1 == "❌" && b2 == "❌" && b3 == "❌") ||
          (b1 == "⭕" && b2 == "⭕" && b3 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (
          (c1 == "❌" && c2 == "❌" && c3 == "❌") ||
          (c1 == "⭕" && c2 == "⭕" && c3 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (
          (a1 == "❌" && b2 == "❌" && c3 == "❌") ||
          (a1 == "⭕" && b2 == "⭕" && c3 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (
          (a3 == "❌" && b2 == "❌" && c1 == "❌") ||
          (a3 == "⭕" && b2 == "⭕" && c1 == "⭕")
        ) {
          message.channel.send(`${winner} wins!`);
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        } else if (i == 8) {
          // If for loop reaches i = 8 and no winner has yet to be declared, the bot reaches a tie.
          message.channel.send("It's a tie!");

          // Both users get removed from the set, letting them duel again.
          midDuel.delete(author);
          midDuel.delete(member.id);
          break;
        }
      }
    });
  }
};
