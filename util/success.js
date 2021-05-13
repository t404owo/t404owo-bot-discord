const { MessageEmbed } = require("discord.js")

/**
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send it
 * @param {image} img - Image
 */
module.exports = async (text, channel, img) => {
    let embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(text)
    if(img)embed.setImage(img)
    await channel.send(embed)
}