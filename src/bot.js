require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
const fs = require('fs').promises;
const path = require('path');
const MessageModel = require('./database/models/message');
const cachedMessageReactions = new Map();
// const database = require('./database/database');
const PREFIX = process.env.PREFIX;

//TOKEN
client.login(process.env.BOT_TOKEN);
client.commands = new Map();

// Login
client.on('ready', () => {
    console.log("Our bot has logged in");
    // database.then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));
    let Msg = new MessageModel({
        messageId: '123456',
        emojiRoleMappings: { 'emojiId': 'hello'}
    // }).save().then(m => console.log(m)).catch(err => console.log(err));
    })

});
//Message
client.on('message', async function(message) {
    if(message.author.bot) return;
    if(!message.content.startsWith(PREFIX)) return;
    let cmdName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift();
    let argsToParse = message.content.substring(message.content.indexOf(" ")+1);
        if(client.commands.get(cmdName)) {
            client.commands.get(cmdName)(client, message, argsToParse);   
         }
        else {
            console.log("No")
        }

});

//Reaction event
client.on('messageReactionAdd', async (reaction, user) => {
    let addMemberRole = (emojiRoleMappings) => {
        if(emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
            let roleId = emojiRoleMappings[reaction.emoji.id];
            let role = reaction.message.guild.roles.cache.get(roleId);
            let member = reaction.message.guild.members.cache.get(user.id);
            if(role && member) {
                member.roles.add(role);
            }
        }
    }
    if(reaction.message.partial) {
        await reaction.message.fetch();
        let { id } = reaction.message;
        try {
            let msgDoc = await MessageModel.findOne({ messageId: id });
                if(msgDoc) {
                    cachedMessageReactions.set(id, msgDoc.emojiRoleMappings);
                    let { emojiRoleMappings } = msgDoc;
                    addMemberRole(emojiRoleMappings);
                }
        }
        catch(err) {
            console.log(err);
        }
    }
    else {
        let emojiRoleMappings = cachedMessageReactions.get(reaction.message.id);
        addMemberRole(emojiRoleMappings);
    }
});

client.on('messageReactionRemove', async(reaction, user) => {
    let removeMemberRole = (emojiRoleMappings) => {
        if(emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
            let roleId = emojiRoleMappings[reaction.emoji.id];
            let role = reaction.message.guild.roles.cache.get(roleId);
            let member = reaction.message.guild.members.cache.get(user.id);
            if(role && member) {
                member.roles.remove(role);
            }
        }
    }
    if(reaction.message.partial) {
        await reaction.message.fetch();
        let { id } = reaction.message;
        try {
            let msgDoc = await MessageModel.findOne({ messageId: id });
                if(msgDoc) {
                    cachedMessageReactions.set(id, msgDoc.emojiRoleMappings);
                    let { emojiRoleMappings } = msgDoc;
                    removeMemberRole(emojiRoleMappings);
                }
        }
        catch(err) {
            console.log(err);
        }
    }

    else {
        let emojiRoleMappings = cachedMessageReactions.get(reaction.message.id);
        removeMemberRole(emojiRoleMappings);
    }
});

//Handler
(async function registerCommands(dir = 'commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir,file));
        if(stat.isDirectory()) {
            registerCommands(path.join(dir, file));
            console.log("ça marche")
        }
        if(file.endsWith(".js")) {
            let cmdName = file.substring(0, file.indexOf(".js"));
            let cmdModule = require(path.join(__dirname, dir, file));
            let { aliases } = cmdModule;
            client.commands.set(cmdName, cmdModule.run);
            // if(aliases.length !== 0) {
            //     aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
            // }
        }
    }
})()
