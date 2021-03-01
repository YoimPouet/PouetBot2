module.exports.run = async(client, message) => {
    let { cache } = message.guild.roles;
        let announcement = message.content.substring(5);
        let announcementsChannel = client.channels.cache.get('708424750069973083');
            if(message.member.roles.cache.has('708378737720164454')) {
                if(announcementsChannel) 
                    announcementsChannel.send(announcement);
            }
            else {
                message.channel.send("You are not allowed to do this"); 
            }
}