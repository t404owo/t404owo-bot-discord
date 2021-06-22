const BotArcApi= require("botarcapi_lib")
const { MessageEmbed } = require("discord.js")
const {BotArcApiV4} = BotArcApi.default;
let timestamp=require('unix-timestamp'), moment = require("moment");
let ta=require("ms")
function dx(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
  
const api = new BotArcApiV4({
    baseURL: process.env.ARCAPI_URL,
    timeout: 120000,
    headers: {
        "User-Agent": process.env.ARCAPI_USERAGENT
    }
})
module.exports={
  info: {
    name: 'arcaea',
  aliases: ["arc"],
  description: "Arcaea commands",
  usage : "<command>/\"help\"",
  example: "arcaea b30",
},
  run: async (bot, message, args)=>{
    let a, userinfocmd=/user(_|-)?(info)?|player(_|-)?(info)?/, songinfocmd=/user(_|-)?(info)?|player(_|-)?(info)?/
    
    if(args[0]==='bind')
    {
      if(!args[1])return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")
      let u=await api.user.info(args[1], true).catch(e=>{ return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")});
      if(u.name){
        bot.db.set(`${message.author.id}_arcaea_acc`, args[1])
        message.noMentionReply(`${process.env.EMOTE_OK || '<:hikariok:801419553841741904>'} | Arcaea User ID/Username binded successfully!`)             
                return                
                                }
      else return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | Please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")
      
    }
    else if(args[0]==="song"||args[0]==="chart"||args[0]==="song-info"||args[0]==="chart-info"||args[0]==="song_info"||args[0]==="chart_info"||args[0]==="song_"||args[0]==="chart_"||args[0]==="song-"||args[0]==="chart-")
{
  let side=[
   'Light 🔆',
    'Conflict 🌙'
  ]
  let result= await api.song.info(args.slice(1).join(" "), true).catch(e=>{return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Song is not found in Arcaea, please give a correct song name`)})
  let embed= new MessageEmbed()
  .setTitle(result.title_localized.en)
  .setDescription(`Name:${result.title_localized.en}
Name(Japanese):${result.title_localized.jp||result.title_localized.en}

Artist: ${result.artist}

BPM: ${result.bpm}

Side: ${side[result.side]}

Version: ${result.version}(${moment(timestamp.toDate(result.date/1000)).format("LLLL")+` (${dx(new Date(), result.date)})`})
`)
  message.noMentionReply(embed)
}
else if(args[0]==="user"||args[0]==="player"||args[0]==="user-info"||args[0]==="player-info"||args[0]==="user_info"||args[0]==="player_info"||args[0]==="user_"||args[0]==="player_"||args[0]==="user-"||args[0]==="player-")
    { 
    //console.log('userinfo:')
   if(args[1]){
      if(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`))a=bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`)
        
else {
  
    let b= await api.user.info(args[1], true).catch(e=>{return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")});
    if(b){a=args[1]} else {return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")}
     
}
      }
     else if(!args[1]&&bot.db.get(`${message.author.id}_arcaea_acc`)){
        a = bot.db.get(`${message.author.id}_arcaea_acc`)
      } else return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't binded your Arcaea account, please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")

    let result= await api.user.info(a, true,).catch(console.error)
     console.log(result)
      
    let embed= new MessageEmbed()
    .setTitle(`Information from ${result.name}`)
    .addField("Name", result.name)
    .addField("Potential", result.rating/100)
    .addField("Friend ID", result.code)
    .addField("Created At", moment(timestamp.toDate(result.join_date/1000)).format("LLLL")+` (${dx(new Date(), result.join_date)})`)
    message.noMentionReply(embed)
      return
  }
    else if(args[0]==='b30'||args[0]==='best30')
    {
      if(args[1]){
      if(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`)){
        a= bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`)
        //console.log(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`))
           //console.log(a)                                                                                      
      }
        
else {
  
   let b = await api.user.info(args[1], true).catch(e=>{return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")});
    if(b){a=args[1]} else {return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")}

 
      }
      }
     else if(!args[1]&&bot.db.get(`${message.author.id}_arcaea_acc`)){
        a = bot.db.get(`${message.author.id}_arcaea_acc`)
      } else return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't binded your Arcaea account, please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")
  
let b30 = await api.util.userBest30(a, true).catch(console.error)
//console.log(b30)
//      console.log(b30.userBest30.best30_list)
  } 
    else if(args[0]==="recent"||args[0]==="recent_score"||args[0]==="recent-score") 
    {
   if(args[1]){
      if(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`))a=bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`)
        
else {
  
    let b= await api.user.info(args[1], true).catch(e=>{return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")});
    if(b){a=args[1]} else {return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")}
     
}
      }
     else if(!args[1]&&bot.db.get(`${message.author.id}_arcaea_acc`)){
        a = bot.db.get(`${message.author.id}_arcaea_acc`)
      } else return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't binded your Arcaea account, please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")

    let result= await api.user.info(a, true, 1).catch(console.error)
     let score = result.recent_score[0]
    //console.log(score)
    let title = await api.song.info(score.song_id)
    //console.log(title)
    let track=score.clear_type
    let clear_type=[
      "Track Lost[L]",
      "Normal Clear[C]",
      "Full Recall[FR]",
      "Pure Memory[PM]",
      "Easy Clear[C]",
      "Hard Clear[C]"
    ], clear=clear_type[track]
    let difficulty=[
      "Past(pst)",
      "Present(prs)",                                              
      "Future(ftr)",                                          
      "Beyond(byn/byd/bynd)",
]
    if(title.difficulties[score.difficulty].ratingReal>=10.7&&title.difficulties[score.difficulty].ratingReal<=10.9)title.difficulties[score.difficulty].rating="10+"
      if(title.difficulties[score.difficulty].ratingReal>=9.7&&title.difficulties[score.difficulty].ratingReal<=9.9)title.difficulties[score.difficulty].rating="9+"

    let embed= new MessageEmbed()
    .setTitle(title.title_localized.en+` [${difficulty[score.difficulty]}]`)
    .setDescription(`**${clear}**
Song: ${title.title_localized.en} by ${title.artist}
Difficulty: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].rating}(${title.difficulties[score.difficulty].ratingReal})
BPM: ${title.bpm}
Rating: ${score.rating}

Score: ${score.score}

Collection/Recollection Gauge: ${score.health}%

Pure: ${score.perfect_count}(+${score.shiny_perfect_count})
Far: ${score.near_count}
Lost: ${score.miss_count}`)
.setFooter(`Played by ${result.name}`)
    message.noMentionReply(embed)
    score=null
      return
  }
    
   else if(args[0]==="score"||args[0]==="result") 
   {
     let diff = /([Ff]tr|[Pp]rs|[Pp]st|[Ff]uture|[Pp]resent|[Pp]ast|[Bb]eyond|[Bb]yd|[Bb]yn|[Bb]ynd)/g, diffic=args.slice(1).join(" ").match(diff),
     diffi;
     if(diffic)diffi=diffic[0].replace(/([Bb]eyond|[Bb]yd|[Bb]yn|[Bb]ynd)/, 3).replace(/([Ff]uture|[Ff]tr)/, 2).replace(/([Pp]resent|[Pp]rs)/, 1).replace(/([Pp]st|[Pp]ast)/, 0)
//     console.log(diffi)
     let user_is_defined=true, song_is_defined=true
     let detect_user= await api.user.info(args[1], true).catch(()=>user_is_defined=false)
     let detect_song= await api.song.info(args[1], true).catch(()=>song_is_defined=false)
     if(user_is_defined===true&&args[2]){
       try{
       let a;
       if(diffic)
         {
//           console.log(diffi)
       a= await api.user.best(args[1], true, args.slice(2).join(" ").replace(/([Ff]tr|[Pp]rs|[Pp]st|[Ff]uture|[Pp]resent|[Pp]ast|[Bb]eyond|[Bb]yd|[Bb]yn|[Bb]ynd)/g, ""), parseInt(diffi))
           .catch(e=>{
          if(e==='user not found')return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | User is not found in Arcaea, please give the correct username or user's friend ID!`);
          if(e==='invalid songname') return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Song is not found in Arcaea, please give a correct song name`)
       })
         }
       else{
//         console.log('no')
         a= await api.user.best(args[1], true, args.slice(2).join(" "))
         .catch(e=>{
          if(e==='user not found')return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | User is not found in Arcaea, please give the correct username or user's friend ID!`);
          if(e==='invalid songname') return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Song is not found in Arcaea, please give a correct song name`)
       })
       
     let score = a
    //console.log(score)
    let title = await api.song.info(score.song_id)
    let result= await api.user.info(args[1], true)
    console.log(result)
    let track=score.clear_type
    let clear_type=[
      "Track Lost[L]",
      "Normal Clear[C]",
      "Full Recall[FR]",
      "Pure Memory[PM]",
      "Easy Clear[C]",
      "Hard Clear[C]"
    ], clear=clear_type[track]
    let difficulty=[
      "Past(pst)",
      "Present(prs)",                                              
      "Future(ftr)",                                          
      "Beyond(byn/byd/bynd)",
    ]
      if(title.difficulties[score.difficulty].ratingReal>=10.7&&title.difficulties[score.difficulty].ratingReal<=10.9)title.difficulties[score.difficulty].rating="10+"
      if(title.difficulties[score.difficulty].ratingReal>=9.7&&title.difficulties[score.difficulty].ratingReal<=9.9)title.difficulties[score.difficulty].rating="9+"
    let embed= new MessageEmbed()
    .setTitle(title.title_localized.en+` [${difficulty[score.difficulty]}]`)
    .setDescription(`**${clear}**
Song: ${title.title_localized.en} by ${title.artist}
Difficulty: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].rating}(${title.difficulties[score.difficulty].ratingReal})
BPM: ${title.bpm}
Rating: ${score.rating}

Score: ${score.score}

Collection/Recollection Gauge: ${score.health}%

Pure: ${score.perfect_count}(+${score.shiny_perfect_count})
Far: ${score.near_count}
Lost: ${score.miss_count}`)
.setFooter(`Played by ${result.name}`)
    message.noMentionReply(embed)
     }
        }catch(err){
       message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} |  Something went wrong:\n${err}`)
      }
   }
     else if(song_is_defined===true) {
     try{
           
             if(diffic){
//               console.log(diffi)
               a= await api.user.best(bot.db.get(`${message.author.id}_arcaea_acc`), true, args.slice(1).join(" ").replace(/([Ff]tr|[Pp]rs|[Pp]st|[Ff]uture|[Pp]resent|[Pp]ast|[Bb]eyond|[Bb]yd|[Bb]yn|[Bb]ynd)/g, ""), parseInt(diffi)) 
       .catch(e=>{
          if(e==='user not found')return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | User is not found in Arcaea, please give the correct username or user's friend ID!`);
          if(e==='invalid songname') return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't binded your Arcaea account, please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")
       })
           }
       else {
//         console.log('no')
         a= await api.user.best(bot.db.get(`${message.author.id}_arcaea_acc`), true, args.slice(1).join(" ")) 
         .catch(e=>{
          if(e==='user not found')return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | User is not found in Arcaea, please give the correct username or user's friend ID!`);
          if(e==='invalid songname') return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't binded your Arcaea account, please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")
       })
       }
         let score = a
    //console.log(score)
    let title = await api.song.info(score.song_id)
    let result= await api.user.info(bot.db.get(`${message.author.id}_arcaea_acc`), true)
    //console.log(title)
    let track=score.clear_type
    let clear_type=[
      "Track Lost[L]",
      "Normal Clear[C]",
      "Full Recall[FR]",
      "Pure Memory[PM]",
      "Easy Clear[C]",
      "Hard Clear[C]"
    ], clear=clear_type[track]
    let difficulty=[
      "Past(pst)",
      "Present(prs)",                                              
      "Future(ftr)",                                          
      "Beyond(byn/byd/bynd)",
]
    if(title.difficulties[score.difficulty].ratingReal>=10.7&&title.difficulties[score.difficulty].ratingReal<=10.9)title.difficulties[score.difficulty].rating="10+"
      if(title.difficulties[score.difficulty].ratingReal>=9.7&&title.difficulties[score.difficulty].ratingReal<=9.9)title.difficulties[score.difficulty].rating="9+"
    let embed= new MessageEmbed()
    .setTitle(title.title_localized.en+` [${difficulty[score.difficulty]}]`)
    .setDescription(`**${clear}**
Song: ${title.title_localized.en} by ${title.artist}
Difficulty: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].rating}(${title.difficulties[score.difficulty].ratingReal})
BPM: ${title.bpm}
Rating: ${score.rating}

Score: ${score.score}

Collection/Recollection Gauge: ${score.health}%

Pure: ${score.perfect_count}(+${score.shiny_perfect_count})
Far: ${score.near_count}
Lost: ${score.miss_count}`)
.setFooter(`Played by ${result.name}`)
    message.noMentionReply(embed)
       }
         catch(err){
         }
   }
     else{
       try{
         let a;
      if(diffic){a= await api.user.best(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`), true, args.slice(2).join(" ").replace(/([Ff]tr|[Pp]rs|[Pp]st|[Ff]uture|[Pp]resent|[Pp]ast|[Bb]eyond|[Bb]yd|[Bb]yn|[Bb]ynd)/g, ""), parseInt(diffi)).catch(e=>{
          if(e==='user not found')return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | User is not found in Arcaea, please give the correct username or user's friend ID!`);
          if(e==='invalid songname') return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Song is not found in Arcaea, please give a correct song name`)
       })
//               console.log(diffi) 
                }
       else {
//         console.log('no')
         a= await api.user.best(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`), true, args.slice(2).join(" "))
           .catch(e=>{
          if(e==='user not found')return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | User is not found in Arcaea, please give the correct username or user's friend ID!`);
          if(e==='invalid songname') return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'} | Song is not found in Arcaea, please give a correct song name`)
       })
            }
         let score = a
    //console.log(score)
    let title = await api.song.info(score.song_id)
    let result= await api.user.info(bot.db.get(`${args[1].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`), true)
    //console.log(title)
    let track=score.clear_type
    let clear_type=[
      "Track Lost[L]",
      "Normal Clear[C]",
      "Full Recall[FR]",
      "Pure Memory[PM]",
      "Easy Clear[C]",
      "Hard Clear[C]"
    ], clear=clear_type[track]
    let difficulty=[
      "Past(pst)",
      "Present(prs)",                                              
      "Future(ftr)",                                          
      "Beyond(byn/byd/bynd)",
]
    if(title.difficulties[score.difficulty].ratingReal>=10.7&&title.difficulties[score.difficulty].ratingReal<=10.9)title.difficulties[score.difficulty].rating="10+"
      if(title.difficulties[score.difficulty].ratingReal>=9.7&&title.difficulties[score.difficulty].ratingReal<=9.9)title.difficulties[score.difficulty].rating="9+"
    let embed= new MessageEmbed()
    .setTitle(title.title_localized.en+` [${difficulty[score.difficulty]}]`)
    .setDescription(`**${clear}**
Song: ${title.title_localized.en} by ${title.artist}
Difficulty: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].rating}(${title.difficulties[score.difficulty].ratingReal})
BPM: ${title.bpm}
Rating: ${score.rating}

Score: ${score.score}

Collection/Recollection Gauge: ${score.health}%

Pure: ${score.perfect_count}(+${score.shiny_perfect_count})
Far: ${score.near_count}
Lost: ${score.miss_count}`)
.setFooter(`Played by ${result.name}`)
    message.noMentionReply(embed)
       } catch(err1){
     }
     }
} 
  else {
   if(args[0]){
      if(bot.db.get(`${args[0].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`))a=bot.db.get(`${args[0].replace("<@!","").replace("<@", "").replace(">","")}_arcaea_acc`)
        
else {
  
    let b= await api.user.info(args[0], true).catch(e=>{return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")});
    if(b){a=args[0]} else {return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | This user doesn't exist!")}
     
}
      }
     else if(!args[0]&&bot.db.get(`${message.author.id}_arcaea_acc`)){
        a = bot.db.get(`${message.author.id}_arcaea_acc`)
      } else return message.mentionReply(`${process.env.EMOTE_NO || '<:tairitsuno:801419553933492245>'}`+" | You didn't binded your Arcaea account, please bind your Arcaea account like this: `"+bot.config.prefix+"arcaea bind <userid or username>` or `"+bot.config.prefix+"arcaeabind <userid or username>`")

    let result= await api.user.info(a, true, 1).catch(console.error)
     let score = result.recent_score[0]
    //console.log(score)
    let title = await api.song.info(score.song_id)
    //console.log(title)
    let track=score.clear_type
    let clear_type=[
      "Track Lost[L]",
      "Normal Clear[C]",
      "Full Recall[FR]",
      "Pure Memory[PM]",
      "Easy Clear[C]",
      "Hard Clear[C]"
    ], clear=clear_type[track]
    let difficulty=[
      "Past(pst)",
      "Present(prs)",                                              
      "Future(ftr)",                                          
      "Beyond(byn/byd/bynd)",
]
    if(title.difficulties[score.difficulty].ratingReal>=10.7&&title.difficulties[score.difficulty].ratingReal<=10.9)title.difficulties[score.difficulty].rating="10+"
      if(title.difficulties[score.difficulty].ratingReal>=9.7&&title.difficulties[score.difficulty].ratingReal<=9.9)title.difficulties[score.difficulty].rating="9+"
    let embed= new MessageEmbed()
    .setTitle(title.title_localized.en+` [${difficulty[score.difficulty]}]`)
    .setDescription(`**${clear}**
Song: ${title.title_localized.en} by ${title.artist}
Difficulty: ${difficulty[score.difficulty]} ${title.difficulties[score.difficulty].rating}(${title.difficulties[score.difficulty].ratingReal})
BPM: ${title.bpm}
Rating: ${score.rating}

Score: ${score.score}

Collection/Recollection Gauge: ${score.health}%

Pure: ${score.perfect_count}(+${score.shiny_perfect_count})
Far: ${score.near_count}
Lost: ${score.miss_count}`)
.setFooter(`Played by ${result.name}`)
    message.noMentionReply(embed)
    score=null
  }
  },
  interaction: (bot, interaction, arg)=>{
    
  },
  conf:{
    cooldown: 0,
    dm: "yes"
  }
}
