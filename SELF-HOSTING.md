## T404owo's bot (for Repl with arcaea commands) Selfhosting
There're some Rules before we start to selfhost my bot.
1. Code Fixing are not allowed, do it at your own risk.
2. Asking me for fixing any bugs are tolerated, but please don't ask me for give you more extend codes or ask me about how to fix the bug for your selfhosted bot.
3. I'm **not** responsible for the bad things what you did by your own with your self-hosted bot.(breaking any game's/app's ToS(Terms of Service), rules or guidelines e.g.)
4. Pushing Branch/codes are not tolerated, it will even being deleted or removed after you upload.
5. Do **not** use my codes for selling or misusing
6. You also have to Follow the [Code Of Conduct](https://github.com/t404owo/t404owo-bot-discord/blob/main/CODE_OF_CONDUCT.md).

If you agree with the rules, then we are going to the topic, please scroll under...






First, create a repl using "nodejs 16 with canvas" template.

Then git clone this branch.

After that copy the files in the "t404owo-bot-discord" folder outside of the folder (or to the project).

Once done, copy the code:
```json


{
  "DISCORD_BOT_EMBED_COLOR":"color in hex, or as word(#1f1e94, blue, white etc)",
  "DISCORD_BOT_PREFIX": "prefix here(+, -,...)",
  "VERSION": "1.0.0",
  "DISCORD_BOT_OWNER": "your username and tag",
  "DISCORD_BOT_OWNER_ID": "",
  "DISCORD_BOT_USERNAME": "Bot's name here",
  "GENIUS": "",
  "DISCORD_BOT_TOKEN": "",
  "DISCORD_BOT_INVITE":"the invite code to your server without discord.gg/ or discord.com/invite(like hAFdT3s)",
  "PROJECT_DOMAIN":"project domain here(name-of-the-project.project-owner(t404owo-bot.t404owo e.g))",
  "EMOTE_OK":"a custom tick emote( has to be: <a:emote_name:emote_id> if this is an animated or <:emote_name:emote_id> if this is normal (<:hikariok:39382847282> e.g))",
  "EMOTE_NO":"a custom emote(make sure the custom emote has to be: <a:emote_name:emote_id> if this is an animated or <:emote_name:emote_id> if this is normal (<:tairitsuno:69383859583> e.g))",
  "EMOTE_RIGHT":"a custom right arrow emote",
  "EMOTE_LEFT":"a custom left arrow emote",
  "ARCAPI_USERAGENT":"api useragent code/name",
  "ARCAPI_URL":"https://replace.arcapi_link.here/"
}
```
Then click the button with the lock, then click the "Open raw editor" button and put the code in it
after that fill the token, genius lyrics token, ... in the variables(after "="), make sure you delete the examples
The bot is now set up finished! If you want to change the bot's status, use `<prefix>setstatus <stream/watch/play/listening> <twitch username if you use stream> <game, status>`.
If you didn't use 24/7 host tools (like using hacker plan (repl's premium play) etc.) and want to host the bot 24/7, go to the hosting sections in `main.js` and `shard.ts`, remove the `/*` and `*/`, and paste the bot website url (repl-project.username.repl.co) in uptimerobot and let it ping per 5 mins
