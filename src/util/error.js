const { MessageEmbed } = require("discord.js")

/**
 * @param {String} text - Message which is need to send
 * @param {var} channel - A Channel to send it
 * @param {String} img - Image
 */
module.exports = async (text, message, img) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    if(img)embed.setImage(img)
    try {await message.reply({embeds:[embed], allowedMentions: { repliedUser: false }})}
    catch(e) {await message.reply({embeds:[embed]})}
}