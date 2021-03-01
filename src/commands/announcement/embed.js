const discord = require('discord.js');

module.exports.run = async(client, message) => {
    let embedContent = message.content.substring(7);
        let embed = new discord.MessageEmbed();
        embed.addField('Message', embedContent);
        embed.setColor('#73249e');
        embed.setTitle("New Embed Message Created");
        embed.setTimestamp();
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        embed.setThumbnail("https://nookplaza.net/images/logo_multi.png");
        embed.setImage("https://cdn.discordapp.com/attachments/708099236171874408/708423454554193960/horntwitchemote.png");
        message.channel.send(embed);
}