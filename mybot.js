const config  = require("./config/config.json");
const token   = require("./config/token.json");
const Discord = require('discord.js');
var fs = require('fs');
const delay = require('delay');

//const swearModule = require("./modules/swear.js");

const client  = new Discord.Client();
const kiwiDetector = ["kiwi", "aussie"]
const ilyDelta = ["ily Delta"]
const WebLinks = ["https://", "www.", "http://", ".net", ".com", ".org"]

const ver = "1.0.2-DL";
const eventTime = "6:00 PM CST";


var invite = "https://discord.gg/ZUZH4nj";

const StaffRole = "506910737575444480";

//Functions

function getDate(cb) {
  let date = new Date();
  let str = date.toString();
  str = str.replace(" GMT+0800", " | GMT+0800");
  str = str.replace(" ", " | ").slice(0, -32);
  cb(str);
}

//var bypass = false;
//var swear = false;

client.on('ready', () => {
  client.user.setActivity('DL | /dl help', { type: 'PLAYING' });
  let guild = client.guilds.find("id", `505564220377661441`);
  let channel = guild.channels.find("name", "bot-diagnostics");
  getDate(function(time) {
    channel.send (`[INFO ${time}] Success! Bot is online.`);
  });
  //swearModule.bypassRoutine();
  //swearModule.swearRoutine();
});

client.on('message', msg => {
  msg.content = msg.content.toLowerCase();
  if(msg.author.bot)
    return;
  if (msg.content.startsWith('/dl help')) {
    let help = msg.content.slice(9, msg.content.length);
    if (help == "general") {
      msg.author.send({embed: {
                 color: 5592575,
                 author: {
                   name: msg.author.username,
                   icon_url: msg.author.avatarURL
                 },
                 title: "Here is a list of commands.",
                 description: "Need some help? Here you go!",
                 fields: [{
                     "name": "/dl help",
                     "value": "Displays help list",
                     "color": "16098851"
                   },
                   {
                     "name": "/dl staff",
                     "value": "Gives you a list of the staff members Minecraft and Discord names."
                   },
                   {
                     "name": "/dl ip",
                     "value": "Gives the server address."
                   },
                   {
                     "name": "/dl discord",
                     "value": "Creates a shareable Discord server link."
                   },
                   {
                     "name": "/dl sub",
                     "value": "Gives you a link to the subreddit."
                   },
                   {
                     "name": "/dl rules",
                     "value": "Shows the rules for Delta Lounge."
                   },
                   {
                     "name": "/dl donate",
                     "value": "Prints a link to the Buycraft."
                   },
                   {
                     "name": "/dl info",
                     "value": "Prints information about the bot."
                   },
                   {
                     "name": "/dl source",
                     "value": "Prints a link to our source code repositories."
                   },
                   {
                     "name": "/dl members",
                     "value": "Displays the amount of members in the Delta Lounge Discord Server."
                   },
                   {
                     "name": "/dl changelog <version>",
                     "value": "Displays the changelog for the latest version of the bot if \`<version>\` is left blank."
                   },
                   {
                     "name": "/dl versions",
                     "value": "Displays all version numbers of the bot, current and prior.",
                   },
                 ],
                 timestamp: new Date(),
                 footer: {
                   icon_url: client.user.avatarURL,
                   text: "I am a bot, this action was performed automatically."
                 }
               }
             });
          }
    else if (help == "fun") {
      msg.author.send({embed: {
            color: 6423272,
            author: {
              name: msg.author.username,
              icon_url: msg.author.avatarURL
            },
            title: "Here is the list of commands",
            fields: [{
                name: "/dice <Number>",
                value: "Lets you roll a random number",
                color: "6423272"
              },
              {
                name: "/flipcoin",
                value: "Flips a coin",
              },
             ]
          }
      });
    } else if (help == "admin") {
      if (msg.member.roles.find("id", StaffRole)) {
        msg.author.send({embed: {
              color: 5592575,
              author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
              },
              title: "Here is the list of admin commands",
              fields: [{
                  name: "/dl config",
                  value: "Displays what you can do with /dl config",
                  color: "16098851"
                },
                {
                  name: "/dl welcome",
                  value: "Displays what you can do with /dl welcome <set/enable/disable>"
                },
                {
                  name: "/say <channel name> <message>",
                  value: "The most fun command for admins to date as of 19/7/2018",
                },
              ]
            }
        });
      }
    } else {
      msg.author.send({embed: {
            color: 5592575,
            author: {
              name: msg.author.username,
              icon_url: msg.author.avatarURL
            },
            title: "Here are some modules",
            fields: [{
                name: "/dl help general",
                value: "Displays a list of general commands",
                color: "16098851"
              },
              {
                name: "/dl help fun",
                value: "Displays a list of fun commands."
              },
              {
                name: "/dl help admin",
                value: "Displays a list of admin commands. (Only usable by users with the \"Staff\" role.)"
              },
            ]
          }
      });
    }
  }
});

client.on('guildMemberAdd', member => {
  fs.readFile("./config/config.json", 'utf8', function(err, data) {
    let configs = JSON.parse(data);
    let welcomestatus = configs.welcomestatus;
    if (welcomestatus == 1) {
      // Send the message to a designated channel on a server:
      const channel = member.guild.channels.find('name', 'welcome');
      // Do nothing if the channel wasn't found on this server
      if (!channel)
      return;
      fs.readFile("./config/config.json", 'utf8', function(err, data) {
        let configs = JSON.parse(data);
        let config = configs.welcometext;
        let message = config.replace("${member}", `<@${member.id}>`);
        channel.send(message);
        let role = member.guild.roles.find("name", "Player");
        message.guild.members.get(member).addRole(role);
      });
    } else {
      return;
    }
  });
});

client.on('message', msg => {
  let normalMessage = msg.content;
  if (msg.content === '/dl ip') {
    msg.channel.send({embed: {
        color: 5592575,
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        title: "Delta Lounge Minecraft Server IP",
        description: "Share this with your friends so they can join!",
        fields: [{
            name: "Server Address",
            value: "`mc.venturenetwork.us`"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "I am a bot, this action was performed automatically."
        }
      }
    });
    }

  if (msg.content === '/dl discord') {
    msg.channel.send(invite);
  }

  if (msg.content === '/dl sub') {
    msg.channel.send('https://www.reddit.com/r/VentureNetwork/');
  }

//if(swear) {
//  client.on('message', msg => {
//      if( swearWords.some(word => msg.content.includes(word)) ) {
//         msg.reply("Let's keep swearing to a minimum. Okay?");
//      }
//  });
//} else if(!swear) {
//  client.on('message', msg => {
//    if(swearWords.some(word => msg.content.includes(word)) ) {
//      console.log("[WARN] User has used a swear word, but module is disabled.".yellow);
//    }
//  });
//  console.log("\n[INFO] Swear module is disabled.".cyan)
//}

//if(bypass) {
//  client.on('message', msg => {
//      if( swearBypass.some(word => msg.content.includes(word)) ) {
//         msg.reply("Really? Trying to bypass? C'mon...");
//      }
//  });
//} else if(!bypass) {
//  client.on('message', msg => {
//    if(swearBypass.some(word => msg.content.includes(word)) ) {
//      console.log("[WARN] User has bypassed swear list, but module is disabled.".yellow);
//    }
//  });
//  console.log("[INFO] Bypass module is disabled.\n\n".cyan)
//}

    if (msg.content === '/dl rules') {
       msg.channel.send({embed: {
              color: 5592575,
              author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
              },
              title: "Delta Lounge Rules",
              fields: [{
                  name: "Rules for the Delta Lounge Server",
                  value: `<#452204762490732564>`,
                  color: "16098851"
                },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "I am a bot, this action was performed automatically."
              }
            }
          });
      }



  if (msg.content === '/dl donate') {
    msg.channel.send({embed: {
        color: 5592575,
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        title: "Delta Lounge Donation",
        description: "Want to help us out? Click the link below to donate!",
        fields: [{
            name: "Donation link",
            value: "http://venturenet.buycraft.net/"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "I am a bot, this action was performed automatically."
        }
      }
    });
    }

    if (msg.content === '/dl info') {
      msg.channel.send({embed: {
          color: 5592575,
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          title: "VentureBot Info",
          description: "Got the details here for ya, boss!",
          fields: [{
              name: "Developer",
              value: "Developed by DynamicDonkey#6339 & Garlicvideos#5659"
            },
            {
              "name": "Version",
              "value": ver
            },
            {
              "name": "Dev info",
              "value": "Developed using `discord.js`"
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
          }
        }
      });
      }

  if (msg.content === '/dl source') {
    msg.channel.send({embed: {
        color: 5592575,
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        title: "Source code/projects",
        description: "https://github.com/DynamicDonkey/DeltaBot",
        fields: [{
            name: "Projects",
            value: "[VentureNetwork/VentureWebsite](https://gitlab.com/VentureNetwork/VentureWebsite)\n[VentureNetwork/VentureBot](https://gitlab.com/VentureNetwork/VentureBot)\n[DynamicDonkey/VentureBot-Node](https://gitlab.com/DynamicDonkey/VentureBot-Node)"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "I am a bot, this action was performed automatically."
        }
      }
    });
    }

  if (msg.content.startsWith('/dice')) {
    let number = msg.content.slice(6, msg.content.length)
    var randomNumberBetween0and1 = Math.floor(Math.random() *number);
    let dice = randomNumberBetween0and1
    if (dice >= 0 ) {
      msg.channel.send (`<@${msg.author.id}>, you rolled ${dice}!`);
    } else {
      msg.channel.send (`<@${msg.author.id}>, Negative numbers just aren\'t as fun`);
    }
  }

  if (msg.content == "/flipcoin") {
    side = Math.floor((Math.random() * 2) + 1);
    if (side == 1){
      coin = "heads";
      msg.channel.send (`<@${msg.author.id}>, you flipped ${coin}.`);
    } else {
      coin = "tails";
      msg.channel.send (`<@${msg.author.id}>, you flipped ${coin}.`);
    }
  }

  if (msg.content.startsWith("/dl changelog")) {
    let verNo = normalMessage.slice(14, normalMessage.length);
    if (verNo == "") {
      verNo = ver;
    }
    fs.readFile(`./changelogs/${verNo}/changelog.json`, 'utf8', function(err, data) {
      if (err) {
        msg.channel.send (`<@${msg.author.id}>, version number ${verNo} is invalid. For a list of version numbers, do /dl versions`);
        return;
      }
      let changelog = JSON.parse(data);
      let added = changelog.added;
      let tweaked = changelog.tweaked;
      let verNoUp = verNo.toUpperCase();
      msg.channel.send({embed: {
              color: 11370241,
              author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
              },
              title: `Changelog of bot`,
              fields: [{
                  name: `Version ${verNoUp}`,
                  value: "For a list of all versions of this bot, do /dl versions",
                },
                {
                  name: "Added Features",
                  value: `${added}`,
                },
                {
                  name: "Changed Features",
                  value: `${tweaked}`,
                },
               ],
            timestamp: new Date(),
            footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
          }
            }
        });
    });
  }

  if (msg.content == "/dl versions") {
    fs.readFile(`./changelogs/versions.txt`, 'utf8', function(err, versions) {
      msg.channel.send({embed: {
              color: 11370241,
              author: {
                name: msg.author.username,
                icon_url: msg.author.avatarURL
              },
              title: `Changelog of bot`,
              fields: [{
                  name: "Version 1.0.2-DL",
                  value: "To get changelog of a version, do /dl changelog <version>",
                },
                {
                  name: "Version numbers",
                  value: `${versions}`,
                },
               ],
            timestamp: new Date(),
            footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
          }
            }
        });
    });
  }

  if (msg.content == "/dl members") {
    if (msg.channel.type == "dm") {
      msg.channel.send (`<@${msg.author.id}>, you may only use this command in a Discord Server.`);
      return;
    }
    msg.channel.send({embed: {
        color: 5592575,
        author: {
          name: msg.author.username,
          icon_url: msg.author.avatarURL
        },
        title: "Delta Lounge Discord",
        fields: [{
            name: "Members",
            value: `${msg.guild.memberCount}`,
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "I am a bot, this action was performed automatically."
        }
      }
    });
  }


// Moderation commands

  //This doesn't work yet
  if (msg.content.startsWith("/mute")) {
    let id = msg.mentions.members.first()
    if (!id) {
      msg.channel.send (`<@${msg.author.id}>, that member is not in this server.`);
    } else {
      id.setMute();
      msg.channel.send("Member muted.");
    }
  }

  if (msg.content.startsWith("/dl config")) {
    if (msg.channel.type == "dm") {
      msg.channel.send ("You can only use \"/dl config\" commands in the Delta Lounge Discord Server.");
      return;
    } else if (msg.member.roles.find("id", StaffRole) || msg.author.id == "263615689854681090" || msg.member.roles.find("id", TesterRole)) {
      let slice = msg.content.slice(11, msg.content.length);
      let split = slice.split(" ");
      if (split[0] == "set") {
        let option = split[1];
        fs.readFile("./config/config.json", 'utf8', function(err, data) {
        let configs = JSON.parse(data);
        let config = configs[option];
        if (config == undefined) {
          msg.channel.send({embed: {
          color: 15860226,
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          title: "Delta Lounge Discord",
          fields: [{
              name: "Configurations",
              value: `Please specify a valid config. Do /dl config list to see all options.`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
              }
            }
          });
        return;
      } else if (split[2] == undefined) {
        msg.channel.send({embed: {
          color: 11370241,
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          title: "Delta Lounge Discord",
          fields: [{
              name: "Configurations",
              value: `Please specify what you want to do with the config \"${split[1]}\".`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
              }
            }
          });
        return;
      } else {
        if (!((split[2] == 'true') || (split[2] == 'false'))) {
          msg.channel.send({embed: {
          color: 15860226,
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          title: "Delta Lounge Discord",
          fields: [{
              name: "Configurations",
              value: `Config "${option}" can only be set as "true" or "false"`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
              }
            }
          });
          return;
        } else {
          configs[option] = split[2];
          fs.writeFile('./config/config.json', JSON.stringify(configs), function (err) {
            msg.channel.send({embed: {
            color: 237613,
            author: {
              name: msg.author.username,
              icon_url: msg.author.avatarURL
            },
            title: "Delta Lounge Discord",
            fields: [{
                name: "Configurations",
                value: `Config "${option}" set as "${split[2]}"`,
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "I am a bot, this action was performed automatically."
                }
              }
            });
          });
        }
      }

        });
      }

      if (split[0] == "") {
        msg.channel.send({embed: {
          color: 15860226,
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          title: "Delta Lounge Discord Configurations",
          description: "List of config commands",
          fields: [{
              name: "/dl config set",
              value: `Sets a config.`,
            },
            {
              name: "/dl config list",
              value: `Lists all available configurations and their state.`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
              }
            }
        });
      }

      if (split[0] == "list" && split[1] == undefined) {
        fs.readFile("./config/config.json", 'utf8', function(err, data) {
        let configs = JSON.parse(data);
        msg.channel.send({embed: {
          color: 15860226,
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          title: "Delta Lounge Discord Configurations",
          description: "All configurations are true by default",
          fields: [{
              name: `Config "links" [${configs.links}]`,
              value: `"false" = No Web links allowed \n"true" = Web links are allowed`,
            },
            /*{
              name: `Config "links" whitelists (Links)`,
              value: `\`/dl config add/remove links link <whitelist>\` to modify this`,
            },
            {
              name: `Config "links" whitelists (Users)`,
              value: `\`/dl config add/remove links user <whitelist>\` to modify this`,
            },*/
            {
              name: `Config "invites" [${configs.invites}]`,
              value: `"false" = No Discord invites allowed \n"true" = Discord invites are allowed`,
            },
            /*{
              name: `Config "invites" whitelists (Invites)`,
              value: `\`/dl config add/remove invites invite <whitelist>\` to modify this`,
            },
            {
              name: `Config "invites" whitelists (Users)`,
              value: `\`/dl config add/remove invites user <whitelist>\` to modify this`,
            },*/
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
              }
            }
          });
        });
      } /*else if (split[0] == "add" || split[0] == "remove") {
        if (split[1] == undefined) {
          msg.channel.send(`<@${msg.author.id}>, please specify which config's whitelist to edit.`);
          return;
        } else if (split[2] == undefined) {
          msg.channel.send (`<@${msg.author.id}>, please specify which subconfig of the config "${split[1]}"'s whitelist you want to edit.`);
        } else if (split[3] == undefined) {
          msg.channel.send (`<@${msg.author.id}>, please specify what you want to "${split[0]}" from "${split[1]}"'s "${split[2]}" subconfig.`)
        }
        fs.readFile("./config/config.json", 'utf8', function(err, data) {
          let option = split[1];
          let selectedSubject = split[2];
          let configs = JSON.parse(data);
          
        });
      }*/
    } else {
      msg.channel.send (`<@${msg.author.id}>, you do not have permissions to use that command`);
    }
  }

  if (msg.content == "/dl staff") {
  	msg.channel.send({embed: {
          color: 15860226,
          author: {
            name: msg.author.username,
            icon_url: msg.author.avatarURL
          },
          title: "Delta Lounge Staff",
          description: "Use these to get in contact with us!",
          fields: [{
             	name: `UnknownDirectory#2408`,
              	value: `Our beloved owner and founder of the server. Be sure to thank him!`,
            },
            {
              	name: `DynamicDonkey#6339`,
              	value: `Developer of this bot, manager of the subreddit, and misc. tech work for the server.`,
            },
            {
            	name: `McWolf#9844`,
            	value: `OG Moderator, been here since the beginning.`,
            },
            {
            	name: `Garlicvideos#5659`,
            	value: `Co-developer of this bot, also just a pretty neat guy. Ask him about Tuxcoin!`,
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "I am a bot, this action was performed automatically."
              }
            }
          });

  }

  if (msg.content.startsWith("/dl welcome")) {
    if (msg.channel.type == "dm") {
      msg.channel.send ("You can only use \"/dl config\" commands in the Delta Lounge Discord Server.");
      return;
    } else if (msg.member.roles.find("id", StaffRole) || msg.author.id == "263615689854681090" || msg.member.roles.find("id", TesterRole)) {
      fs.readFile("./config/config.json", 'utf8', function(err, data) {
        let configs = JSON.parse(data);
        let config = configs.welcometext;
        let welcomestatus = configs.welcomestatus;
        let output = config.replace("${member}", "@user");
        msg.content = msg.content.slice(12, msg.content.length);
        if (msg.content.startsWith("set")) {
          let message = msg.content.slice(4, msg.content.length);
          let input = message.replace("<user>", "${member}");
          configs.welcometext = input;
          fs.writeFile('./config/config.json', JSON.stringify(configs), function (err) {
            msg.channel.send(`Welcome message has been set to "${message}"`);
          });

        } else if (msg.content == "enable" || msg.content == "disable") {
          let setting = msg.content;
          setting = setting.replace("enable", "1");
          setting = setting.replace("disable", "0");
          if (welcomestatus == setting) {
            msg.channel.send (`Welcome messages are already "${msg.content}d"`);
            return;
          }
          configs.welcomestatus = setting;
          fs.writeFile('./config/config.json', JSON.stringify(configs), function (err) {
            msg.channel.send (`Welcome messages are now ${msg.content}d`);
          });

        } else {
          msg.channel.send({embed: {
            color: 15860226,
            author: {
              name: msg.author.username,
              icon_url: msg.author.avatarURL
            },
            title: "Delta Lounge Discord Welcome Messages Command List",
            description: "List of commands for Welcome Messages",
            fields: [{
                name: `/dl welcome enable/disable`,
                value: `Enables/Disables welcome messages`,
              },
              {
                name: `/dl welcome set <message>`,
                value: `The ability to customise welcome messages. To mention the new user, type <user>\nE.g. \`/dl welcome set Welcome to the server, <user>\``,
              },
              {
                name: `Currently, the welcome message is set to`,
                value: `${output}`,
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "I am a bot, this action was performed automatically."
                }
              }
            });
        }
      });
    }
  }

  if (msg.content.startsWith("/say")) {
    if (msg.member.roles.find("id", StaffRole) || msg.author.id == "263615689854681090" || msg.member.roles.find("id", TesterRole)) {
      let command = msg.channel.lastMessage;
      let cmd = normalMessage.slice(5, normalMessage.length);
      let split = cmd.split(" ");
      let channel = split[0];
      let message = cmd.slice(split[0].length, cmd.length);
      try {
        msg.guild.channels.find("name", `${channel}`).send(message);
        let guild = client.guilds.find("id", `451830795070603264`);
        let msgChannel = guild.channels.find("name", "bot-console");
        getDate(function(time) {
          msgChannel.send (`[INFO ${time}] \`${msg.author.username}\` has used the bot to say \`${message}\` to the channel \`${channel}\`.`);
          msg.delete(`${command}`);
        });
      } catch (e) {
        msg.author.send (`Invalid Channel name given.`);
        }
    }
  }

//Message filters (/dl config)

  //dl config invites
  if (msg.content.includes("https://discord.gg/")) {
    let messageID = msg.channel.lastMessage;
    fs.readFile("./config/config.json", 'utf8', function(err, data) {
        let configs = JSON.parse(data);
        let status = configs.invites;
        if (status == "false") {
          msg.delete(messageID);
          msg.author.send(`Discord invites are not allowed on the Delta Lounge Discord Server.\nIf you think this is an error, please contact any of their staff members.`);
          let guild = client.guilds.find("id", `451830795070603264`);
          let channel = guild.channels.find("name", "bot-console");
          channel.send (`[INFO] User ${msg.author.tag} has sent an invite link.`);
          return;
        }
    });
  }

  //dl config links
  if (WebLinks.some(word => msg.content.includes(word))) {
    if (msg.content.includes("discord.gg"))
      return;
    let messageID = msg.channel.lastMessage;
    fs.readFile("./config/config.json", 'utf8', function(err, data) {
        let configs = JSON.parse(data);
        let status = configs.links;
        if (status == "false") {
          msg.delete(messageID);
          msg.author.send(`Links are not allowed on the Delta Lounge Discord Server.\nIf you think this is an error, please contact any of their staff members.`);
          let guild = client.guilds.find("id", `451830795070603264`);
          let channel = guild.channels.find("name", "bot-console");
          channel.send (`[INFO] User ${msg.author.tag} has sent a Web link.`);
          return;
        }
    });
  }


// Easter eggs

  if (msg.content.includes("thonk")) {
    msg.channel.send("**Room shakes**", {
    file: "./assets/thonking.gif"
    });
  }

  if(kiwiDetector.some(word => msg.content.includes(word))){
        msg.channel.send("G'day mate!");
  }

  if(ilyDelta.some(word => msg.content.includes(word))){
      msg.reply("awww ily too <3");
  }
});

//Extra

if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function () {
  //graceful shutdown
  let guild = client.guilds.find("id", `451830795070603264`);
  let channel = guild.channels.find("name", "bot-console");
  getDate(function(time) {
    channel.send (`[INFO ${time}] Shutting down`);
    delay(400).then(() => {
      process.exit();
    });
  });
});

client.login(token.token);
