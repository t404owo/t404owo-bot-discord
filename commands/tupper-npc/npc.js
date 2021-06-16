let error=require("../../util/error")
let success=require("../../util/success")
exports.conf={
  cooldown: 0,
  dm: "no"
}
module.exports.run = async (bot, message, args) => {
  let channel = message.channel;
    const permissions = channel.permissionsFor(message.client.user);
  if (!permissions.has("MANAGE_WEBHOOKS", "MANAGE_MESSAGES"))
    return message.mentionReply(
            `${process.env.EMOTE_NO ||"<:hikarisorry:801419553892073483>"}`+" | I'm not able to create webhooks or I can't manage messages in this channel, so that means I'm not able to send npcs/tuppers"
    );
  if (!args[0])
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Tupper/npc is not specified."
    );
  let tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)
    
  if (!tupper){ 
      tupper = bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()+" "+args[1].toLowerCase()}`);
   if (!tupper)return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This Tupper/npc is not existing in this server!");
    }
  message.delete();
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks.first();
  let foundHook = webhooks.first();
  let a = args.slice(1).join(" ");
  if (bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase() + " " + args[1].toLowerCase()}`)) {
    if (!args[2])
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Message not specified."
    );
    a = args.slice(2).join(" ");
    if (!foundHook) {
      channel
        .createWebhook(
          "Tairitsu",
          bot.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .then(webhook => {
          webhook
            .send(a, {
              username: bot.db.get(
                `${message.guild.id}npcname_${args[0].toLowerCase() + " " + args[1].toLowerCase()}`
              ),
              avatarURL:
                bot.db.get(
                  `${message.guild.id}npcav_${args[0].toLowerCase() + " " + args[1].toLowerCase()}`
                ) || bot.user.avatarURL({ dynamic: true, size: 1024 })
            })
            .catch(error => {
              // We also want to make sure if an error is found, to report it in chat.
              console.log(error);
              return message.mentionReply(
                `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | **Something went wrong when sending the npc. Please report it to the Developers in my support or core server.**"
              );
            });
        });
    } else {
      foundHook
        .send(a, {
          username: bot.db.get(
            `${message.guild.id}npcname_${args[0].toLowerCase() + " " + args[1].toLowerCase()}`
          ),
          avatarURL:
            bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase() + " " + args[1].toLowerCase()}`) ||
            bot.user.avatarURL({ dynamic: true, size: 1024 })
        })
        .catch(error => {
          // We also want to make sure if an error is found, to report it in chat.
          console.log(error);
          return message.mentionReply(
            `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | **Something went wrong when sending the npc. Please report it to the Developers in my support or core server.**"
          );
        });
    }
  }
  if (bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)) {
    if (!args[1])
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Message not specified."
    );
    if (!foundHook) {
      channel
        .createWebhook(
          "Tairitsu",
          bot.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .then(webhook => {
          webhook
            .send(a, {
              username: bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`),
              avatarURL:
                bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase()}`) ||
                bot.user.avatarURL({ dynamic: true, size: 1024 })
            })
            .catch(error => {
              // We also want to make sure if an error is found, to report it in chat.
              console.log(error);
              return message.mentionReply(
                `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | **Something went wrong when sending the npc. Please report it to the Developers in my support or core server.**"
              );
            });
        });
    } else {
      foundHook
        .send(a, {
          username: bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`),
          avatarURL:
            bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase()}`) ||
            bot.user.avatarURL({ dynamic: true, size: 1024 })
        })
        .catch(error => {
          // We also want to make sure if an error is found, to report it in chat.
          console.log(error);
          return message.mentionReply(
            `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | **Something went wrong when sending the npc. Please report it to the Developers in my support or core server.**"
          );
        });
    }
  }

  };

module.exports.info = {
  name: "npc",
  description: "Sends the message with the mentioned Tupper/npc",
  usage: "<npc_name> <message>",
  aliases: ["tupper", "npcsay", "saynpc", "tuppersay", "saytupper", "npc-say", "say-npc", "tupper-say", "say-tupper", "npc say", "say npc", "tupper say", "say tupper"]
};