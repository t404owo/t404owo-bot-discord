let error = require("../../util/error");
let success = require("../../util/success");
exports.conf = {
  cooldown: 0,
  dm: "no"
};
module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please give a Name to find the character/npc/Tupper"
    );
  let a = args.slice().join(" ");
  let tupper = bot.db.get(`${message.guild.id}npcname_${a.toLowerCase()}`);
  if (!tupper)
    return message.mentionReply(
      `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Tupper/npc is not existing in this server!"
    );
  bot.db.delete(`${message.guild.id}npcname_${a.toLowerCase()}`);
  bot.db.delete(`${message.guild.id}npcav_${a.toLowerCase()}`);
  bot.db.delete(`${message.guild.id}npcdesc_${a.toLowerCase()}`);
  success(`**${tupper}** is removed!`, message);
};
module.exports.info = {
  name: "npcremove",
  description: "Delete a mentioned Tupper/npc",
  usage: "<npc_name>",
  aliases: [
    "npcrm",
    "npc-rm",
    "npc_rm",
    "rmnpc",
    "rm-npc",
    "rm_npc",
    "npc-remove",
    "npc_remove",
    "removenpc",
    "remove-npc",
    "remove_npc",
    "npcdelete",
    "npc-delete",
    "npc_delete",
    "deletenpc",
    "delete-npc",
    "delete_npc",
    "tupperremove",
    "tupperrm",
    "tupper-rm",
    "tupper_rm",
    "rmtupper",
    "rm-tupper",
    "rm_tupper",
    "tupper-remove",
    "tupper_remove",
    "removetupper",
    "remove-tupper",
    "remove_tupper",
    "tupperdelete",
    "tupper-delete",
    "tupper_delete",
    "deletetupper",
    "delete-tupper",
    "delete_tupper"
  ]
};
