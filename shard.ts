
import fetch from "node-fetch"
setInterval(async () => {

  await fetch(`https://${process.env.PROJECT_DOMAIN}.glitch.me`)//main projects site
  await fetch("https://404-bot-discord.glitch.me")
  await fetch("https://hikari-bot-discord.glitch.me")
}, 60000)
import {ShardingManager} from "discord.js"
export const token = process.env.DISCORD_BOT_TOKEN;


if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}





export const shards= new ShardingManager("./main.js", {
  token,
  totalShards: "auto"
});

shards.on("shardCreate", shard=>{
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #1`)
})
shards.spawn(shards.totalShards, 10000)

