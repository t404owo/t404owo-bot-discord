const util = require("util")
exports.run = async (client,message,args)=>{
  


    if(client.config.owners.includes(message.author.id)) {//make sure u replace your id here
      const discord = require("discord.js")
const bot = client
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.noMentionReply(clean(evaled), {code:"xl"});
    } catch (err) {
      message.mentionReply(`\`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    }
}
exports.info = {
  name: 'evaluate',
  aliases: ["ev", "eval"],
  description: "eval a code(Owner or trusted person only)",
  usage : "<code>",
  example: "message.channel.send(\"Hi lmao\")",
}
exports.conf={
  cooldown: 0,
  dm: "yes"
}