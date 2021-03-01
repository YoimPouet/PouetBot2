const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

module.exports = {
    run: async(client, message) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send("You don't have permission to do that.");
        }
        else {
            let memberid = message.content.substring(message.content.indexOf(' ') + 1);
            let bannedMember = await message.guild.members.unban(memberid);
            if(bannedMember) {
                message.channel.send(bannedMember.tag + " was unbanned.");
            }
            else {
                message.channel.send("Unban didn't happen");
            }
        
        }
    },
    aliases: ['unban', 'ub'],
    description:['Unban a user']
}