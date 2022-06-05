let error = require("../../util/error");
let success = require("../../util/success");
exports.conf = {
  cooldown: 0,
  dm: "no",
};
module.exports.run = async (bot, message, args) => {
  let channel = message.channel;
  const {Permissions}=require("discord.js")
  const permissions = channel.permissionsFor(message.client.user);
  if (!permissions.has([Permissions.FLAGS.MANAGE_WEBHOOKS, Permissions.FLAGS.MANAGE_MESSAGES]))
    return message.mentionReply(
      `${process.env.EMOTE_NO || "<:hikarisorry:801419553892073483>"}` +
        " | I'm not able to create webhooks or I can't manage messages in this channel, so that means I'm not able to send npcs/tuppers"
    );
  if (!args[0])
    return message.mentionReply(
      `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
        " | Tupper/npc is not specified."
    );
  let tupper = bot.db.get(
    `${message.guild.id}npcname_${args[0].toLowerCase()}`
  );

  if (!tupper) {
    try{
    tupper = bot.db.get(
      `${message.guild.id}npcname_${
        args[0].toLowerCase() + " " + args[1].toLowerCase()
      }`
    );
  } catch (e){
    return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | This Tupper/npc is not existing in this server!"
      );
  }
    if (!tupper)
      return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | This Tupper/npc is not existing in this server!"
      );
  }
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks.first();
  let foundHook = webhooks.first();
  let a = args.slice(1).join(" ");
  let decide
  try{
    if(bot.db.get(
      `${message.guild.id}npcname_${
        args[0].toLowerCase() + " " + args[1].toLowerCase()
      }`
    ))decide="a"
  } catch(e) {
    decide="b"
  }
  if (
    decide==="a"
  ) {
    if (!args[2]){
      return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | Message not specified."
      );
    }
    message.delete();
    a = args.slice(2).join(" ");
    if(!foundHook){
          {
      channel
        .createWebhook(
          "Tairitsu",
          bot.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .then((webhook) => {
          webhook
            .send({
            content:a, 
              username: bot.db.get(
                `${message.guild.id}npcname_${
                  args[0].toLowerCase() + " " + args[1].toLowerCase()
                }`
              ),
              avatarURL:
                bot.db.get(
                  `${message.guild.id}npcav_${
                    args[0].toLowerCase() + " " + args[1].toLowerCase()
                  }`
                ) || bot.user.avatarURL({ dynamic: true, size: 1024 }),
            })
            .catch((error) => {
            console.log(error)
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            });
        });
    }
        }
    else
      {
        foundHook
        .send({
        content:a, 
          username: bot.db.get(
            `${message.guild.id}npcname_${
              args[0].toLowerCase() + " " + args[1].toLowerCase()
            }`
          ),
          avatarURL:
            bot.db.get(
              `${message.guild.id}npcav_${
                args[0].toLowerCase() + " " + args[1].toLowerCase()
              }`
            ) || bot.user.avatarURL({ dynamic: true, size: 1024 }),
        })
          .catch((error) => {
          console.log(error)
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            
            });
    
      
      }
    
  } else
  if (bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)) {
    if (!args[1])return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | Message not specified."
      );
    
    message.delete();
    if(!foundHook){
          {
      channel
        .createWebhook(
          "Tairitsu",
          bot.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .then((webhook) => {
          webhook
            .send({
            content:a, 
              username: bot.db.get(
                `${message.guild.id}npcname_${args[0].toLowerCase()}`
              ),
              avatarURL:
                bot.db.get(
                  `${message.guild.id}npcav_${args[0].toLowerCase()}`
                ) || bot.user.avatarURL({ dynamic: true, size: 1024 }),
            })
            .catch((error) => {
            console.log(error)
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            
            });
        });
    }
        }
    else{
      foundHook
        .send({
        content:a, 
          username: bot.db.get(
            `${message.guild.id}npcname_${args[0].toLowerCase()}`
          ),
          avatarURL:
            bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase()}`) ||
            bot.user.avatarURL({ dynamic: true, size: 1024 }),
        })        
          .catch((error) => {
        console.log(error)
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            
            });    

    }
    
  }
};
module.exports.interaction = async (bot, message, arg) => {
  let args=[]
  return console.log(arg)
  try{
    args=[arg._hoistedOptions[0].value]
  } catch(e){
    args=[]
  }
  let channel = message.channel;
  const {Permissions}=require("discord.js")
  const permissions = channel.permissionsFor(message.client.user);
  if (!permissions.has([Permissions.FLAGS.MANAGE_WEBHOOKS, Permissions.FLAGS.MANAGE_MESSAGES]))
    return message.mentionReply(
      `${process.env.EMOTE_NO || "<:hikarisorry:801419553892073483>"}` +
        " | I'm not able to create webhooks or I can't manage messages in this channel, so that means I'm not able to send npcs/tuppers"
    );
  if (!args[0])
    return message.mentionReply(
      `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
        " | Tupper/npc is not specified."
    );
  let tupper = bot.db.get(
    `${message.guild.id}npcname_${args[0].toLowerCase()}`
  );

  if (!tupper) {
    try{
    tupper = bot.db.get(
      `${message.guild.id}npcname_${
        args[0].toLowerCase() + " " + args[1].toLowerCase()
      }`
    );
  } catch (e){
    return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | This Tupper/npc is not existing in this server!"
      );
  }
    if (!tupper)
      return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | This Tupper/npc is not existing in this server!"
      );
  }
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks.first();
  let foundHook = webhooks.first();
  let a = args.slice(1).join(" ");
  let decide
  try{
    if(bot.db.get(
      `${message.guild.id}npcname_${
        args[0].toLowerCase() + " " + args[1].toLowerCase()
      }`
    ))decide="a"
  } catch(e) {
    decide="b"
  }
  if (
    decide==="a"
  ) {
    if (!args[2]){
      return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | Message not specified."
      );
    }
    a = args.slice(2).join(" ");
    if(!foundHook){
          {
      channel
        .createWebhook(
          "Tairitsu",
          bot.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .then((webhook) => {
          webhook
            .send({
            content:a, 
              username: bot.db.get(
                `${message.guild.id}npcname_${
                  args[0].toLowerCase() + " " + args[1].toLowerCase()
                }`
              ),
              avatarURL:
                bot.db.get(
                  `${message.guild.id}npcav_${
                    args[0].toLowerCase() + " " + args[1].toLowerCase()
                  }`
                ) || bot.user.avatarURL({ dynamic: true, size: 1024 }),
            })
            .catch((error) => {
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            console.log(error);
            });
        message.reply({content:process.env.EMOTE_OK || '<:hikariok:801419553841741904>'+" | NPC message sent successfully!", ephemeral: true })
        });
    }
        }
    else
      {
        foundHook
        .send({
        content:a, 
          username: bot.db.get(
            `${message.guild.id}npcname_${
              args[0].toLowerCase() + " " + args[1].toLowerCase()
            }`
          ),
          avatarURL:
            bot.db.get(
              `${message.guild.id}npcav_${
                args[0].toLowerCase() + " " + args[1].toLowerCase()
              }`
            ) || bot.user.avatarURL({ dynamic: true, size: 1024 }),
        })
          .catch((error) => {
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            console.log(error);
            });
    message.reply({content:process.env.EMOTE_OK || '<:hikariok:801419553841741904>'+" | NPC message sent successfully!", ephemeral: true })
      
      }
    
  } else
  if (bot.db.get(`${message.guild.id}npcname_${args[0].toLowerCase()}`)) {
    if (!args[1])return message.mentionReply(
        `${process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"}` +
          " | Message not specified."
      );
    
    message.delete();
    if(!foundHook){
          {
      channel
        .createWebhook(
          "Tairitsu",
          bot.user.avatarURL({ dynamic: true, size: 1024 })
        )
        .then((webhook) => {
          webhook
            .send({
            content:a, 
              username: bot.db.get(
                `${message.guild.id}npcname_${args[0].toLowerCase()}`
              ),
              avatarURL:
                bot.db.get(
                  `${message.guild.id}npcav_${args[0].toLowerCase()}`
                ) || bot.user.avatarURL({ dynamic: true, size: 1024 }),
            })
            .catch((error) => {
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            console.log(error);
            });
        message.reply({content:process.env.EMOTE_OK || '<:hikariok:801419553841741904>'+" | NPC message sent successfully!", ephemeral: true })
        });
    }
        }
    else{
      foundHook
        .send({
        content:a, 
          username: bot.db.get(
            `${message.guild.id}npcname_${args[0].toLowerCase()}`
          ),
          avatarURL:
            bot.db.get(`${message.guild.id}npcav_${args[0].toLowerCase()}`) ||
            bot.user.avatarURL({ dynamic: true, size: 1024 }),
        })        
          .catch((error) => {
              // We also want to make sure if an error is found, to report it in chat.
              return message.channel.send(
                {content:`${
                  process.env.EMOTE_NO || "<:tairitsuno:801419553933492245>"
                }` +
                  " | **Something went wrong when sending the npc. Please report it to the Developers in my support server.**"
                });
            console.log(error);
            });    
message.reply({content:process.env.EMOTE_OK || '<:hikariok:801419553841741904>'+" | NPC message sent successfully!", ephemeral: true })
    }
    
  }
}
module.exports.options= [
    {
      name: "message",
      description: "Which npc message do you want to send?",
      type: 3,
      required: true,
    },
  {
      name: "npc",
      description: "Which npc do you want to use to send?",
      type: 3,
      required: true,
    },
  ]
module.exports.info = {
  name: "npc",
  description: "Sends the message with the mentioned Tupper/npc",
  usage: "<npc_name> <message>",
  aliases: [
    "tupper",
    "npcsay",
    "saynpc",
    "tuppersay",
    "saytupper",
    "npc-say",
    "say-npc",
    "tupper-say",
    "say-tupper",
    "npc say",
    "say npc",
    "tupper say",
    "say tupper",
  ],
};
