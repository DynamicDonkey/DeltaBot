//Swear and Bypass detector for VentureBot
//(c) Jared Kozel 2018, MIT.
const Discord = require('discord.js');
const mybot = require('../mybot.js');
const client = new Discord.Client();

//Colors for logging
var colors = require('colors');

//The actual list of swear words, may move to JSON.
const swearWords = ["bitch", "fuck", "nigger", "faggot", "pussy", "hell", "shit", "dick", "cock", "nigga"];
const swearBypass = ["fack", "fuk", "fak", "fuq", "shit", "shiit", "shiet", "sheit", "damn", "dam", "godamn", "goddamn", "azz", "asshole", "azzhole", "niger", "niigger", "niqqer", "niqqa", "bitch", "biatch", "bietch", "f4ggot", "fagg0t", "fag", "fagg", "faqqot"]


//Swear detection routine
function swearRoutine() {
    if(mybot.swear) {
        client.on('message', msg => {
            if( swearWords.some(word => msg.content.includes(word)) ) {
               msg.reply("Let's keep swearing to a minimum. Okay?");
            }  
        });
    } else if(!mybot.swear) {
        client.on('message', msg => {
          if(swearWords.some(word => msg.content.includes(word)) ) {
            console.log("[WARN] User has used a swear word, but module is disabled.".yellow);
          }
        });
        console.log("\n[INFO] Swear module is disabled.".cyan)
    }
}

//Bypass detection routine
function bypassRoutine() {
    if(mybot.bypass) {
        client.on('message', msg => {
            if( swearBypass.some(word => msg.content.includes(word)) ) {
               msg.reply("Really? Trying to bypass? C'mon...");
            }  
        });
    } else if(!mybot.bypass) {
        client.on('message', msg => {
          if(swearBypass.some(word => msg.content.includes(word)) ) {
            console.log("[WARN] User has bypassed swear list, but module is disabled.".yellow);
          }
        });
        console.log("[INFO] Bypass module is disabled.\n\n".cyan)
    }
}