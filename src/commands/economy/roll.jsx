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
    .setDescription( "🎲 | You got rolled a "+diceresult)
    .setThumbnail(message.author.displayAvatarURL({size: 4096, dynamic: true}))
    .setFooter(`You lost $${money}, sadly...`)
    client.db.add(`account.${message.author.id}.balance`, moneyadd)
    
  } else {
    result
    .setColor("#0affaf")
    .setTitle("Dice | Lucky!")
    .setDescription("``🎲`` | You got rolled a "+roll)
    .setThumbnail(message.author.displayAvatarURL({size: 4096, dynamic: true}))
    .setFooter(`You win $${money}, smile yay!`)
    client.db.add(`account.${message.author.id}.balance`, money)
    
  }
  message.reply({ embeds:[result], allowedMentions: { repliedUser: false } });
  console.log(lucky + roll + "\n" + lucky + money);
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