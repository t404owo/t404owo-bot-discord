const { MessageEmbed } = require("discord.js")

/**
 * @param {String} text - Message which is need to send
 * @param {var} channel - A Channel to send it
 * @param {String} img - Image
 */
module.exports = async (text, channel, img) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    if(img)embed.setImage(img)
    await channel.send({embeds:[embed]})
}