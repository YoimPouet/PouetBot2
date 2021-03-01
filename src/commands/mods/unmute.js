const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

module.exports = {
    run: async(client, message) => {
        if(!message.member.hasPermission('KICK_MEMBERS', 'BAN_MEMBERS')) {
            message.channel.send("You don't have permission to do that.");
        }
        else {
            let memberid = message.content.substring(message.content.indexOf(' ') + 1);
            let member = message.guild.members.cache.get(memberid);
            if(member) {
                    let mutedRole = message.guild.roles.cache.get('708379014749880471');
                    if(mutedRole) {
                        member.roles.remove(mutedRole);
                        message.channel.send("User was unmuted");
                    }
                    else {
                        message.channel.send("Something went wrong...");   
                    }                    
            }
            else {
                message.channel.send("User not found");
            }
        } 
    },
    aliases: ['unmute', 'um'],
    description: ["Unmute a user"]
}