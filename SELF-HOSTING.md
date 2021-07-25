## T404owo's bot Selfhosting
So some of you guys want to selfhost my own bot, and some has already selfhosted the prievous version.
During to Some Problems, I deleted the Arcaea Bot Project bcz it's Arcaea's ToS breaking.
And bcz some guys love spoonfeeding instead of coding their own bot, I refuse to let the selfhost continue existing.

There're some Rules before we start to selfhost my bot.
1. Code Fixing are not allowed, do it at your own risk.
2. Asking me for fixing any bugs are tolerated, but please don't ask me for give you more extend codes or ask me about how to fix the bug for your selfhosted bot.
3. I'm **not** responsible for the bad things what you did by your own with your self-hosted bot.(breaking any game's/app's ToS(Terms of Service), rules or guidelines e.g.)
4. Pushing Branch/codes are not tolerated, it will even being deleted or removed after you upload.
5. Do **not** use my codes for selling or misusing
6. You also have to Follow the [Code Of Conduct](https://github.com/t404owo/t404owo-bot-discord/blob/main/CODE_OF_CONDUCT.md).

If you agree with the rules, then we are going to the topic, please scroll under...




With this project, you can Host it 24/7 on `glitch.com` or just use it normal with `node.js` on your PC.
For PC users, make sure you install all the packages im package.json using `npm i` in terminal(shell, cmd)


for glitch and VS code:
copy the code:
```env
DISCORD_BOT_EMBED_COLOR="color in hex, or as word(#1f1e94, blue, white etc)"
DISCORD_BOT_TOKEN=token here
GENIUS=
DISCORD_BOT_USERNAME=
DISCORD_BOT_OWNER_ID="user id here"
DISCORD_BOT_OWNER='your username and tag'
DISCORD_BOT_PREFIX=prefix here(+, -,...)
DISCORD_BOT_INVITE=the invite code to your server without discord.gg/ or discord.com/invite(like hAFdT3s)
VERSION=''
PROJECT_DOMAIN=the project's name if you use it on glitch
EMOTE_NO='a custom :x: (make sure the custom emote has to be: <a:emote_name:emote_id> if this is an animated or <:emote_name:emote_id> if this is normal (<:tairitsuno:69383859583> e.g))'
EMOTE_YES='a custom tick (make sure the custom emote has to be: <a:emote_name:emote_id> if this is an animated or <:emote_name:emote_id> if this is normal (<:hikariok:39382847282> e.g))'
EMOTE_RIGHT='a custom right arrow'
EMOTE_LEFT='a custom left arrow'
```
Then create ir go to a `.env` file and put the code in it
after that fill the token, genius lyrics token, ... in the variables(after "="), make sure you delete the examples
(For guys who hosts it on PC:start the bot with `npm start` in the console(terminal, shell what ever you call)
The bot is now set up finished! If you want to change the bot's status, use `<prefix>setstatus <stream/watch/play/listening> <twitch username if you use stream> <game, status>`
for repl:

 copy the code:
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
  "EMOTE_LEFT":"a custom left arrow emote"
}
```
Then click the button with the lock, then click the Open raw editor and put the code in it
after that fill the token, genius lyrics token, ... in the variables(after "="), make sure you delete the examples
The bot is now set up finished! If you want to change the bot's status, use `<prefix>setstatus <stream/watch/play/listening> <twitch username if you use stream> <game, status>`
