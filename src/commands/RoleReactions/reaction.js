const { MessageCollector } = require('discord.js');
const MessageModel = require('../../database/models/message');


let msgCollectorFilter = (newMsg, originalMsg) => newMsg.author.id === originalMsg.author.id;

module.exports = {
    run: async(client, message, args) => {  
        console.log("reaction works")
            if(args.split(/\s+/).length !== 1)  {
                let msg = await message.channel.send("Too many arguments. Must only provide 1 message id");
                await msg.delete({timeout: 5000 }).catch(err => console.log(err));
            }
            else {
            try {
                let fetchedMsg = await message.channel.messages.fetch(args);
                    if(fetchedMsg) {
                        await message.channel.send("Please provide all of the emoji names with the role name one by one, separated by a comma\nexample: emoji, role");
                        let collector = new MessageCollector(message.channel, msgCollectorFilter.bind(null, message));
                        let emojiRoleMappings = new Map(); 
                        collector.on('collect', msg => {
                            let { cache } = msg.guild.emojis;
                            if(msg.content.toLowerCase() === '!done') {
                                collector.stop('done command issued');
                                return;
                            }
                            let [ emojiName, roleName ] = msg.content.split(/,\s+/);
                            if(!emojiName && !roleName ) return; 
                            let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase());
                            if(!emoji) {
                                msg.channel.send("Emoji does not exist.")
                                .then(msg => msg.delete({timeout: 5000}))
                                .catch(err => console.log(err));
                                return;
                            }
                            let role = msg.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
                            if(!role) {
                                msg.channel.send("Role does not exist.")
                                .then(msg => msg.delete({timeout: 5000}))
                                .catch(err => console.log(err));
                                return;
                            }
                            fetchedMsg.react(emoji)
                                .then(emoji => console.log("Reacted"))
                                .catch(err => console.log(err));

                            emojiRoleMappings.set(emoji.id, role.id);
                        });
                        collector.on('end', async (collected, reason) => {
                            let findMsgDoc = MessageModel
                                .findOne({ messageId: fetchedMsg.id })
                                    .catch(err => console.log(err));

                            if(findMsgDoc) {
                                console.log("Message exists.. Don't Save..")
                                message.channel.send("Role reaction already exists for this message")
                            }
                            else {
                                let dbMsgModel = new MessageModel({
                                    messageId: fetchedMsg.id,
                                    emojiRoleMappings: emojiRoleMappings
                                })
                                dbMsgModel.save()
                                    .then(m => console.log(m))
                                    .catch(err => console.log(err));
                            }
                        });
                    }
            }
            catch(err) {
                console.log(err);
                let msg = await message.channel.send("Invalid id. Message was not found");
                await msg.delete({timeout: 5000 }).catch(err => console.log(err));
            }
        }
    },
    aliases: [],
    description: 'Enable Reaction role message'
}