const discord = require("discord.js");
require('discord-inline-replys')
const { promisify } = require("util");
const ms = require("ms");
const sleep = promisify(setTimeout);
const path = require("path");
const talkedRecently = new Set();
const bot = new discord.Client();
const { MessageEmbed, MessageAttachment, Permissions } = require("discord.js");

const bet = new discord.Client();
const fs = require("fs");
const moment = require("moment");
const botToken = process.env.DISCORD_BOT_TOKEN;
const util = require("util");

const fetch = require("node-fetch");
setInterval(async () => {
  await fetch(`https://${process.env.PROJECT_DOMAIN}.glitch.me`); //main projects site
}, 60000);
bot.db = require("quick.db");

bot.sleep = promisify(setTimeout);
bot.vote = new Map();

   

bot.createAPIMessage= async(interaction, content)=> {
    const apiMessage = await discord.APIMessage.create(bot.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}
//let serversetting = JSON.parse(fs.readFileSync("./serversetting.json", "utf8"));
console.defaultLog = console.log.bind(console);
console.logs = [];
console.green = function() {
  // default &  console.log()
  console.greenLog.apply(console, arguments);
  // new & array data
  console.logs.push(Array.from(arguments));
};
function parseTime(time) {
  return time
    .split(":") // Split them into array as chunk of [hour, minute, second]
    .map(pad) // Map them with `pad` function below
    .join(":"); // Join them back into 'hh:mm:ss'
}
bot.on("guildMemberAdd", async member => {
  if (
    bot.db.get(`${member.guild.id}_autorole`) &&
    !bot.db.get(`${member.guild.id}_${userm.user.id}mutetime`)
  ) {
    if (bot.db.get(`${member.guild.id}_autorolesys`) === "disabled") return;
    let autorole = bot.db.get(`${member.guild.id}_autorole`);
    member.roles
      .add(member.guild.roles.cache.find(r => r.id === autorole))
      .catch(err => {
        bot.db.delete(`${member.guild.id}_autorole`);
      });
    member.roles
      .add(member.guild.roles.cache.find(r => r.id === autorole).id)
      .catch(err => {
        bot.db.delete(`${member.guild.id}_autorole`);
      });
  }
  let userm = member;
  let targe = member;
  let muterole = bot.db.get(`${member.guild.id}_muterole`);

  if (bot.db.get(`${member.guild.id}_${userm.user.id}mutetime`)) {
    if (!bot.db.get(`${member.guild.id}_muterole`)) {
      let muterale = member.guild.roles.cache.find(r => r.name === "Muted");
      //bot.db.set(`${message.guild.id}_muterole`,message.guild.roles.cache.find(r => r.name === 'Muted').id);
      if (!muterale) {
        try {
          let muterele = await member.guild.roles.create({
            data: {
              name: "Muted",
              color: "#222222",
              permissions: []
            }
          });
          member.guild.channels.cache.forEach(async (channel, id) => {
            await channel.updateOverwrite(
              member.guild.roles.cache.find(r => r.name === "muted"),
              {
                CREATE_INSTANT_INVITE: true,
                ADD_REACTIONS: false,
                STREAM: false,
                SEND_MESSAGES: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: true,
                MENTION_EVERYONE: false,
                USE_EXTERNAL_EMOJIS: true,
                CONNECT: false,
                SPEAK: false,
                USE_VAD: false,
                CHANGE_NICKNAME: true
              }
            );
          });
        } catch (err) {
          console.log(`Error :${err}`);
        }
      }
      muterole = bot.db.set(
        `${member.guild.id}_muterole`,
        member.guild.roles.cache.find(r => r.name === "Muted").id.toString()
      );
    }
    let muteroles = bot.db.set(
      `${member.guild.id}_${userm.user.id}muteroles`,
      userm._roles
    );

    console.log(muterole + "\n" + muteroles);

    setTimeout(function() {
      targe.roles
        .add(member.guild.roles.cache.find(r => r.id === muteroles))
        .catch(() => {
          targe.roles.add(muteroles);
          targe.roles.remove(
            member.guild.roles.cache.find(r => r.id === muterole)
          );
          targe.roles.remove(
            member.guild.roles.cache.find(r => r.id === muterole).id
          );
          bot.db.delete(`${member.guild.id}_${userm.user.id}mutetime`);
          bot.db.delete(`${member.guild.id}_${userm.user.id}muteroles`);
        });

      targe.roles.remove(member.guild.roles.cache.find(r => r.id === muterole));
      targe.roles.remove(
        member.guild.roles.cache.find(r => r.id === muterole).id
      );
      bot.db.delete(`${member.guild.id}_${userm.user.id}muteroles`);
      bot.db.delete(`${member.guild.id}_${userm.user.id}mutetime`);

      if (bot.db.get(`${member.guild.id}_autorole`)) {
        if (bot.db.get(`${member.guild.id}_autorolesys`) === "disabled") return;
        let autorole = bot.db.get(`${member.guild.id}_autorole`);
        member.roles
          .add(member.guild.roles.cache.find(r => r.id === autorole))
          .catch(err => {
            bot.db.delete(`${member.guild.id}_autorole`);
          });
        member.roles
          .add(member.guild.roles.cache.find(r => r.id === autorole).id)
          .catch(err => {
            bot.db.delete(`${member.guild.id}_autorole`);
          });
      }
    }, ms(bot.db.get(`${member.guild.id}_${userm.user.id}mutetime`)));

    targe.roles.remove(targe.roles.cache);
    targe.roles.add(member.guild.roles.cache.find(r => r.id === muterole));
    targe.roles.add(member.guild.roles.cache.find(r => r.id === muterole).id);
  }

  console.log(`${bot.db.get(`${member.guild.id}_welcomechannel`)}
  ${bot.db.get(`${member.guild.id}_welcomemessage`)}
  ${bot.db.get(`${member.guild.id}_welcomeimg`)}
  ${bot.db.get(`${member.guild.id}_welcomeembed`)}
${bot.db.get(`${member.guild.id}_welcomemessagesys`)}`);

  if (
    bot.db.get(`${member.guild.id}_welcomemessagesys`) ||
    bot.db.get(`${member.guild.id}_welcomeimg`) ||
    bot.db.get(`${member.guild.id}_welcomeembed`) ||
    bot.db.get(`${member.guild.id}_welcomemessage`) ||
    bot.db.get(`${member.guild.id}_welcomechannel`)
  ) {
    if (!bot.db.get(`${member.guild.id}_welcomemessagesys`)) {
      bot.db.set(`${member.guild.id}_welcomemessagesys`, "yes");
    }
    if (!bot.db.get(`${member.guild.id}_welcomemessage`)) {
      bot.db.set(
        `${member.guild.id}_welcomemessage`,
        "Welcome to $SERVER$, $MENTION$!"
      );
    }
    if (!bot.db.get(`${member.guild.id}_welcomeimg`)) {
      bot.db.set(`${member.guild.id}_welcomeimg`, "no");
    }
    if (!bot.db.get(`${member.guild.id}_welcomeembed`)) {
      bot.db.set(`${member.guild.id}_welcomeembed`, "no");
    }
    if (!bot.db.get(`${member.guild.id}_welcomechannel`)) return;
    const msg =
      bot.db
        .get(`${member.guild.id}_welcomemessage`)
        .replace(/\$MEMBER\$/g, member.user.username)
        .replace(/\$MENTION\$/g, "<@!" + member.id + ">")
        .replace(/\$SERVER\$/g, member.guild.name) ||
      `Welcome to ${member.guild.id}, <@!${member.id}>!`;

    if (bot.db.get(`${member.guild.id}_welcomemessagesys`) !== "yes") {
      return;
    }

    if (bot.db.get(`${member.guild.id}_welcomeimg`) === "no") {
      if (bot.db.get(`${member.guild.id}_welcomeembed`) === "no") {
        return bot.channels.cache
          .get(bot.db.get(`${member.guild.id}_welcomechannel`))
          .send(msg);
      }
      const Embed = new discord.MessageEmbed()
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setDescription(msg)
        .setColor("RANDOM");
      bot.channels.cache
        .get(bot.db.get(`${member.guild.id}_welcomechannel`))
        .send(Embed);
      return;
    }

    if (bot.db.get(`${member.guild.id}_welcomeimg`) === "yes") {
      var list = [
        "https://i.imgur.com/UcGioIH.gif",
        "https://i.imgur.com/AqK6ipr.gif",
        "https://i.imgur.com/aUwimFa.gif",
        "https://i.imgur.com/TXlp1YT.gif",
        "https://i.imgur.com/5SABV1P.gif",
        "https://i.imgur.com/EpeiJq8.gif",
        "https://i.imgur.com/fFNLyAx.gif",
        "https://i.imgur.com/5s8vsTH.gif"
      ];
      var rand = list[Math.floor(Math.random() * list.length)];
      console.log(rand);
      const image = new discord.MessageAttachment(rand, "welcome.gif");

      if (bot.db.get(`${member.guild.id}_welcomeembed`) === "yes") {
        const Embed = new discord.MessageEmbed()
          .setDescription(msg)
          .setColor("RANDOM")
          .setImage(rand)
          .setThumbnail(member.user.avatarURL({ dynamic: true }));
        console.log(rand);
        bot.channels.cache
          .get(bot.db.get(`${member.guild.id}_welcomechannel`))
          .send(Embed);
        return;
      }

      bot.channels.cache
        .get(bot.db.get(`${member.guild.id}_welcomechannel`))
        .send(msg, image);
      return;
    }
  }
});
bot.on("guildMemberRemove", async member => {
  console.log(`${bot.db.get(`${member.guild.id}_leavechannel`)}
  ${bot.db.get(`${member.guild.id}_leavemessage`)}
${bot.db.get(`${member.guild.id}_goodbyemessagesys`)}`);

  if (
    bot.db.get(`${member.guild.id}_goodbyemessagesys`) ||
    bot.db.get(`${member.guild.id}_leavemessage`) ||
    bot.db.get(`${member.guild.id}_leavechannel`)
  ) {
    if (!bot.db.get(`${member.guild.id}_goodbyemessagesys`)) {
      bot.db.set(`${member.guild.id}_goobyemessagesys`, "yes");
    }
    if (!bot.db.get(`${member.guild.id}_leavemessage`)) {
      bot.db.set(`${member.guild.id}_leavemessage`, "Goodbye, $MEMBER$!");
    }
    if (!bot.db.get(`${member.guild.id}_leavechannel`)) return;
    const msg =
      bot.db
        .get(`${member.guild.id}_leavemessage`)
        .replace(/\$MEMBER\$/g, member.user.username)
        .replace(/\$MENTION\$/g, "<@!" + member.id + ">")
        .replace(/\$SERVER\$/g, member.guild.name) ||
      `Goodbye ${member.guild.id}, <@!${member.id}>!`;

    if (bot.db.get(`${member.guild.id}_goodbyemessagesys`) !== "yes") {
      return;
    }

    return bot.channels.cache
      .get(bot.db.get(`${member.guild.id}_leavechannel`))
      .send(msg);
  }
});

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.songs = new discord.Collection();
bot.packs = new discord.Collection();
bot.packaliases = new discord.Collection();
bot.songaliases = new discord.Collection();
bot.helps = new discord.Collection();
bot.cooldowns = new discord.Collection();
bot.queue = new Map();

fs.readdir("./commands/", (err, categories) => {
  if (err) console.log(err);
  console.log(`Found total ${categories.length} categories.`);

  categories.forEach(category => {
    let moduleConf = require(`./commands/${category}/module.json`);
    moduleConf.path = `./commands/${category}`;
    moduleConf.cmds = [];
    if (!moduleConf) return;
    bot.helps.set(category, moduleConf);

    fs.readdir(`./commands/${category}`, (err, files) => {
      console.log(
        `Found total ${files.length - 1} command(s) from ${category}.`
      );
      if (err) console.log(err);
      let commands = new Array();

      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let prop = require(`./commands/${category}/${file}`);
        let cmdName = file.split(".")[0];

        bot.commands.set(prop.info.name, prop);

        prop.info.aliases.forEach(alias => {
          bot.aliases.set(alias, prop.info.name);
        });

        bot.helps.get(category).cmds.push(prop.info.name);
      });
    });
  });
});

bot.on('ready', () =>{
  
  bot.guilds.cache.forEach(guild=>{
  fs.readdir("./commands/", (err, categories) => {
	if (err) console.log(err);
  categories.forEach(category => {
    let moduleConf = require(`./commands/${category}/module.json`);
    moduleConf.path = `./commands/${category}`;
    moduleConf.cmds = [];
    if (!moduleConf) return;
    bot.helps.set(category, moduleConf);

    fs.readdir(`./commands/${category}`, (err, files) => {
      if (err) console.log(err);

      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let prop = require(`./commands/${category}/${file}`);
        let cmdName = file.split(".")[0];
        if(!prop.options||!prop.interaction)return
        
      

        bot.helps.get(category).cmds.push(prop.info.name);

bot.api.applications(bot.user.id).guilds(guild.id.toString()).commands.post({
        data: {
            name: prop.info.name,
            description: prop.info.description,
	     options:prop.options
        }
    });//command for slash
//console.log('Finished expoerted slash command!')
 })
})
})
}) 
    
  })
  console.log('Finished exported slash command!')
bot.ws.on('INTERACTION_CREATE', async interaction => {
  
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

bot.config={
  prefix:bot.db.get(`${interaction.guild_id}_prefix`) || process.env.DISCORD_BOT_PREFIX
}
        if(bot.commands.get(command.toLowerCase())){
          
          bot.commands.get(command).interaction(bot, interaction, args);
          
        }
    });
});

bot.on("message", async message => {
  if (message.author.bot || message.author === bot.user) return;
  
  
  if (!message.guild) {
    bot.config = {
      owners: process.env.DISCORD_BOT_OWNER_ID,
      prefix: process.env.DISCORD_BOT_PREFIX
    };
    const prefixMention = new RegExp(`^<@!?${bot.user.id}> `);
    const prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0]
      : bot.config.prefix;

    bot.emit("experience", message);

    // If the user doesn't doing any to the bot, return it.
    if (
      !message.content.toLowerCase().startsWith(prefix.toLowerCase()) &&
      !message.content.toLowerCase().startsWith("/")
    )
      return;

    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let msg = message.content.toLowerCase();
    let cmd = args.shift().toLowerCase();
    let sender = message.author;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    let commandFile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (!commandFile) return;

    const member = message.member,
      now = Date.now(),
      timestamps = bot.cooldowns.get(commandFile.info.name),
      cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

    try {
      if (!commandFile) return;
      if (commandFile.conf.dm === "no") return;
      commandFile.run(bot, message, args);
    } catch (error) {
      console.log(error.message);
    } finally {
      // If you want to really know, who is typing or using your bot right now.
      console.log(`${sender.tag} (${sender.id}) ran a command: ${cmd}`);
    }
    return;
  }

  //message.guild
  else {
    bot.config = {
      owners: process.env.DISCORD_BOT_OWNER_ID,
      prefix: bot.db.get(`${message.guild.id}_prefix`) || process.env.DISCORD_BOT_PREFIX
    };
   // bot.music = {
   //   vote: bot.db.get(`${message.guild.id}_vote`) || false
   // };
    const prefixMention = new RegExp(`^<@!?${bot.user.id}> `);
    const prefix = message.content.match(prefixMention)
      ? message.content.match(prefixMention)[0]
      : bot.config.prefix;

    bot.emit("experience", message);

    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let msg = message.content.toLowerCase();
    let cmd = args.shift().toLowerCase();
    let sender = message.author;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }

    let commandFile =
      bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (!commandFile) return;

    if (!bot.cooldowns.has(commandFile.info.name))
      bot.cooldowns.set(commandFile.info.name, new discord.Collection());

    const member = message.member,
      now = Date.now(),
      timestamps = bot.cooldowns.get(commandFile.info.name),
      cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

    if (!timestamps.has(member.id)) {
      if (!bot.config.owners.includes(message.author.id)) {
        timestamps.set(member.id, now);
      }
    } else {
      const expirationTime = timestamps.get(member.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.mentionReply(
          `${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | <@!${
            message.member.id
          }>, please wait **${timeLeft.toFixed(
            1
          )}** seconds to try the command again.`
        );
      }

      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }

    try {
      if (!commandFile) return;
      commandFile.run(bot, message, args);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log(`${sender.tag} (${sender.id}) ran a command: ${cmd}`);
    }
  }
});

const promises = [
  bot.shard.fetchClientValues("guilds.cache.size"),
  bot.shard.broadcastEval(
    "this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)"
  )
];

let status;
var actions = ["WATCHING", "PLAYING", "LISTENING"];
let guildssize = [],
  memberssize = [];
let totalGuilds, totalMembers;
Promise.all(promises)
  .then(results => {
    totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
    totalMembers = results[1].reduce(
      (acc, memberCount) => acc + memberCount,
      0
    );
    console.log(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);

    status = [
      `${process.env.DISCORD_BOT_PREFIX}h for help | ${process.env.DISCORD_BOT_USERNAME}`,
      `${process.env.DISCORD_BOT_PREFIX}help for help | ${process.env.DISCORD_BOT_USERNAME}`
    ];
  })
  .catch(console.error);
//bot.shard.fetchClientValues('guilds.cache.size')

bot.on("ready", () => {
  console.log("Ok it works!!!");
  var randt = actions[Math.floor(Math.random() * actions.length)];
  var randstatus = status[Math.floor(Math.random() * status.length)];
  //console.log(randstatus)
  bot.user
    .setActivity(randstatus, {
      type: randt
    })
    .catch(console.error);
});

function pad(n) {
  return parseInt(n) < 10 // If number less than 10
    ? "0" + n // Add '0' in front
    : n; // Else, return the original string.
}
function seconds(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " date, " : " date, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hour, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minutes, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " seconds" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

bot.on("message", async message => {
  if (message.author.bot || message.guild === null) return;
  //xp(message);

  //serverxp(message);

  const prefixMention = new RegExp(`^<@!?${bot.user.id}> `);
  const prefix = message.content.match(prefixMention)
    ? message.content.match(prefixMention)[0]
    : bot.config.prefix;

  if (message.content.indexOf(prefix) !== 0 || message.author.bot) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
});

function xp(message) {
  let xp = bot.db.add(
    `xp_${message.author.id}`,
    Math.floor(Math.random() * 5) + 3
  );
  let level = Math.floor(0.3 * Math.sqrt(xp));

  let lvl =
    bot.db.get(`level_${message.author.id}`) ||
    bot.db.set(`level_xp_${message.author.id}`, 1);
  if (level > lvl) {
    let newLevel = bot.db.set(`level_${message.author.id}`, level);
    if (
      message.guild.id === "264445053596991498" ||
      message.guild.id === "808770886718193705" ||
      message.guild.id === "264445053596991498" ||
      
      bot.db.get(`${message.guild.id}_lvlupmsg`) === "no"
    )
      return;
    message.channel
      .send(`${message.author.toString()} is now on level ${newLevel}!`)
      .then(ms => {
        ms.delete({ timeout: "5000" });
      });
  }
}

function serverxp(message) {
  let a = message.guild.id;
  let xp = bot.db.add(
    `${a}xp_${message.author.id}`,
    Math.floor(Math.random() * 5) + 3
  );
  let level = Math.floor(0.3 * Math.sqrt(xp));
  let lvl =
    bot.db.get(`${a}level_${message.author.id}`) ||
    bot.db.set(`${a}level_${a}xp_${message.author.id}`, 1);
  if (level > lvl) {
    let newLevel = bot.db.set(`${a}level_${message.author.id}`, level);
    if (
      message.guild.id === "264445053596991498" ||
      message.guild.id === "808770886718193705" ||
      message.guild.id === "264445053596991498" ||
      bot.db.get(`${message.guild.id}_lvlupmsg`) === "no"
    )
      return;
    message.channel
      .send(
        `${message.author.toString()} is now on level ${newLevel} in this server!`
      )
      .then(ms => {
        ms.delete({ timeout: "5000" });
      });
  }
}

bot.login(process.env.DISCORD_BOT_TOKEN);
