const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send("You don't have permission to do that.");
        }
        else {
            let memberid = message.content.substring(message.content.indexOf(' ') + 1);
            let bannedMember = await message.guild.members.ban(memberid);
            if(bannedMember) {
                message.channel.send(bannedMember.tag + " was banned.");
            }
            else {
                message.channel.send("Ban didn't happen");
            }
        }
    },
    aliases: ['ban', 'b'],
    description: ["Ban an user"]
}