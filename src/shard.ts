import express from 'express';
const server = express();
 
server.all('/', (req: any, res: any) => {
  res.sendStatus(200)
})
server.listen(process.env.PORT||8000, () => { console.log("Server is Ready!!" + Date.now()) });
import { ShardingManager } from "discord.js";
const manager = new ShardingManager("./src/main.jsx", {
  token: process.env.DISCORD_BOT_TOKEN,
});

manager.on("shardCreate", (shard) => {
  console.log(`Launched shard #${shard.id + 1}`);
});

manager.spawn({amount:"auto"});
