const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

module.exports = {
    run: async(client, message, args) => {
        let roleNames = args.split(", ");
            let roleSet = new Set(roleNames);
            let { cache } = message.guild.roles;
            roleSet.forEach(roleName => {
                let role = cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
                if(role) {
                    if(message.member.roles.cache.has(role.id)) {
                        console.log(roleName)
                        message.member.roles.remove(role)
                            .then(member => 
                                message.channel.send("You were removed from this role!"))
                            .catch(err => {
                                console.log(err);
                                message.channel.send("Something went wrong...");
                            });
                        }                     
                }        
                else {
                        message.channel.send("Role not found");
                }
            });
    },
    aliases: ['del', 'roledel', 'rd'],
    description: ['Delete a role']
}