const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send("You don't have permission to do that.");
        }
        else {
            let memberid = message.content.substring(message.content.indexOf(' ') + 1);
            let member = message.guild.members.cache.get(memberid);
            if(member) {
                await member.kick();
                message.channel.send("User was kicked.");
            }
            else {
                message.channel.send("kick didn't happen");
                console.log("kick")
            }
        
        }
    },
    aliases: ['kick', 'k'],
    description: ["Kick a user"]
}