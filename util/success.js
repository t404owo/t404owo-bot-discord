const { MessageEmbed } = require("discord.js")

/**
 * @param {String} text - Message which is need to send
 * @param {var} message - A Channel to send it
 * @param {image} img - Image
 */
module.exports = async (text, message, img) => {
    let embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(text)
    if(img)embed.setImage(img)
    await message.noMentionReply(embed)
}