import { ShardingManager } from "discord.js";
const manager = new ShardingManager("./src/main.jsx", {
  token: process.env.DISCORD_BOT_TOKEN,
});

manager.on("shardCreate", (shard) => {
  console.log(`Launched shard #${shard.id + 1}`);
});

manager.spawn({amount:"auto"});