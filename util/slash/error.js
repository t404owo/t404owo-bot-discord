const { MessageEmbed } = require("discord.js")

module.exports = async (text, message, bot, img) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    if(img)embed.setImage(img)
    await bot.api.interactions(message.id, message.token).callback.post({
                data: {
                    type: 4,
                    data: await bot.createAPIMessage(message, embed)
                }
            });
}