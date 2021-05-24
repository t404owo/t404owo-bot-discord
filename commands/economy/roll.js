const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
  if(!client.db.get(`account.${message.author.id}.balance`))client.db.set(`account.${message.author.id}.balance`, 0)
  let dice = [1, 2, 3, 4, 5, 6],
    luck = ["+", "-"],
    roll = dice[Math.floor(Math.random() * dice.length)],
    lucky = luck[Math.floor(Math.random() * luck.length)],
    money = Math.floor(Math.random() * (client.db.get(`account.${message.author.id}.balance`) - client.db.get(`account.${message.author.id}.balance`) / 8)),
    result= new MessageEmbed(),
      diceresult= lucky + roll,
      moneyadd = lucky + money
  if (lucky === "-") {
    result
    .setColor("#f54c76") 
    .setTitle("Dice | Bad luck, man...")
    .setDescription( "🎲 | You got rolled a "+diceresult)//má sao lại edit tui đang test?
    .setThumbnail(message.author.displayAvatarURL({size: 4096, dynamic: true}))
    .setFooter(`You lost $${money}, sadly...`)//thôi đc r
    client.db.add(`account.${message.author.id}.balance`, moneyadd)
    
  } else {
    result
    .setColor("#0affaf")//xanh là thắng lol 0affaf cx là xanh lá thôi
    .setTitle("Dice | Lucky!")//Ok đỏ r
    .setDescription("``🎲`` | You got rolled a "+roll)
    .setThumbnail(message.author.displayAvatarURL({size: 4096, dynamic: true}))
    .setFooter(`You win $${money}, smile yay!`)// có $ r ko cần coins
    client.db.add(`account.${message.author.id}.balance`, money)
    
  }
  message.noMentionReply(result) 
  console.log(lucky + roll + "\n" + lucky + money);//Ok bro
};

exports.info = {
  name: "dice",
  usage: "",
  aliases: ["d", "roll"],
  description: "Collect the dice rolling credits."
};

exports.conf = {
  cooldown: 5,
  dm: "yes"
};