let discord = require('discord.js')
const { MessageEmbed } = require('discord.js');


const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};
const moment = require("moment");
exports.run = async (bot, message, args) => {
  
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
    message.guild.owner= await message.guild.fetchOwner()
		const embed = new MessageEmbed()
			.setTitle(`**Server information for __${message.guild.name}__**`)
			.setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setDescription([
				`**Name**\n${message.guild.name}`,
				`**Server ID**\n${message.guild.id}`,
				`**Owner**\n${message.guild.owner.user.tag} (${message.guild.owner.user.id})`,
				`**Boost Level**\n${message.guild.premiumTier ? `${message.guild.premiumTier}` : 'None'}`,
        `**Server Boosts**\n${message.guild.premiumSubscriptionCount || '0'}`,
				//`**Explicit Filter**\n${filterLevels[message.guild.explicitContentFilter]}`,
        `**Members**\n${message.guild.memberCount}`,
        `**Roles**\n${roles.length}`,
				`**Verification**\n${verificationLevels[message.guild.verificationLevel]}`,
				`**Created At**\n${"<t:"+Math.round(moment(message.guild.createdTimestamp).format("unix").replace("uni", "")/1000)+":F>"} (${"<t:"+Math.round(moment(message.guild.createdTimestamp).format("unix").replace("uni", "")/1000)+":R>"})`,
				'\u200b'
			].join('\n'))
			/*.setDescription('**Statistics**', [
				`**Roles**\n${roles.length}`,
				`**Emotes**\n${emojis.size}`,
				`**Normal Emotes**\n${emojis.filter(emoji => !emoji.animated).size}`,
				`**Gif Emotes**\n${emojis.filter(emoji => emoji.animated).size}`,
				`**Members**\n${message.guild.memberCount}`,
				`**Human Users**\n${members.filter(member => !member.user.bot).size}`,
				`**Bot Users**\n${members.filter(member => member.user.bot).size}`,
				`**Text Channels**\n${channels.filter(channel => channel.type === 'GUILD_TEXT').size}`,
				`**Voice Channels**\n${channels.filter(channel => channel.type === 'GUILD_VOICe').size}`,
				`**Server Boosts**\n${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])*/
			.addField('**Statuses**', [
				`**Online**\n${members.filter(member => member.presence?.status === 'online').size}`,
				`**Idle**\n${members.filter(member => member.presence?.status === 'idle').size}`,
				`**Do Not Disturb**\n${members.filter(member => member.presence?.status === 'dnd').size}`,
				`**Offline**\n${members.filter(member => member.presence?.status === undefined).size}`,
				'\u200b'
			].join("\n"))
			//.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
			.setTimestamp();
		message.reply({embeds:[embed], allowedMentions: { repliedUser: false }})
}
exports.interaction = async (bot, message, args) => {
const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
    message.guild.owner= await message.guild.fetchOwner()
		const embed = new MessageEmbed()
			.setTitle(`**Server information for __${message.guild.name}__**`)
			.setColor(process.env.DISCORD_BOT_EMBED_COLOR||0x0affaf)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setDescription([
				`**Name**\n${message.guild.name}`,
				`**Server ID**\n${message.guild.id}`,
				`**Owner**\n${message.guild.owner.user.tag} (${message.guild.owner.user.id})`,
				`**Boost Level**\n${message.guild.premiumTier ? `${message.guild.premiumTier}` : 'None'}`,
        `**Server Boosts**\n${message.guild.premiumSubscriptionCount || '0'}`,
				//`**Explicit Filter**\n${filterLevels[message.guild.explicitContentFilter]}`,
        `**Members**\n${message.guild.memberCount}`,
        `**Roles**\n${roles.length}`,
				`**Verification**\n${verificationLevels[message.guild.verificationLevel]}`,
				`**Created At**\n${"<t:"+Math.round(moment(message.guild.createdTimestamp).format("unix").replace("uni", "")/1000)+":F>"} (${"<t:"+Math.round(moment(message.guild.createdTimestamp).format("unix").replace("uni", "")/1000)+":R>"})`,
				'\u200b'
			].join('\n'))
			/*.setDescription('**Statistics**', [
				`**Roles**\n${roles.length}`,
				`**Emotes**\n${emojis.size}`,
				`**Normal Emotes**\n${emojis.filter(emoji => !emoji.animated).size}`,
				`**Gif Emotes**\n${emojis.filter(emoji => emoji.animated).size}`,
				`**Members**\n${message.guild.memberCount}`,
				`**Human Users**\n${members.filter(member => !member.user.bot).size}`,
				`**Bot Users**\n${members.filter(member => member.user.bot).size}`,
				`**Text Channels**\n${channels.filter(channel => channel.type === 'GUILD_TEXT').size}`,
				`**Voice Channels**\n${channels.filter(channel => channel.type === 'GUILD_VOICe').size}`,
				`**Server Boosts**\n${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])*/
			.addField('**Statuses**', [
				`**Online**\n${members.filter(member => member.presence?.status === 'online').size}`,
				`**Idle**\n${members.filter(member => member.presence?.status === 'idle').size}`,
				`**Do Not Disturb**\n${members.filter(member => member.presence?.status === 'dnd').size}`,
				`**Offline**\n${members.filter(member => member.presence?.status === undefined).size}`,
				'\u200b'
			].join("\n"))
			//.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
			.setTimestamp()
		message.reply({embeds:[embed]})
}
exports.options=[]
exports.info = {
  name: 'serverinfo',
  aliases:['guildinfo'],
  usage: "(<user_id_or_mention>)",
  description: "Get the information of the server",
}
exports.conf={
  cooldown: 0,
  dm: "no"
}