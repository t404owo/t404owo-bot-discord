import express from 'express';
const server = express();
 
server.all('/', (req: any, res: any) => {
  res.sendStatus(200)
})
 
server.listen(3000, () => { console.log("Server is Ready!!" + Date.now()) });
server.listen(8000, () => { console.log("Server is Ready!!" + Date.now()) });
import fetch from "node-fetch"
/*setInterval(async () => {

  await fetch(`https://${process.env.PROJECT_DOMAIN}.repl.co`)//main glitch projects site
}, 60000)*/
import { ShardingManager } from "discord.js";
const manager = new ShardingManager("./src/main.jsx", {
  token: process.env.DISCORD_BOT_TOKEN,
});

manager.on("shardCreate", (shard) => {
  console.log(`Launched shard #${shard.id + 1}`);
});

manager.spawn({amount:"auto"});