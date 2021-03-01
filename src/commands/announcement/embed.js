const discord = require('discord.js');

module.exports.run = async(client, message) => {
    let embedContent = message.content.substring(7);
        let embed = new discord.MessageEmbed();
        embed.addField('Message', embedContent);
        embed.setColor('#73249e');
        embed.setTitle("New Embed Message Created");
        embed.setTimestamp();
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
        embed.setThumbnail("https://lh3.googleusercontent.com/proxy/xBowjtP8ojG6W4NJ5rZXAhjwhYLV-oFY44c9Q0uNwFOfuEGZ3ooAZKkUIi73KlRsV-0-Eh3pi454viZV8pWvZHJpQRV8FR3rdxF1LsXcFIV2UDaOsrt6in9WtUtY25xb4fxQVYW0FDQPAZOg3Hm-CHh4nmj3BJvoG0SJvtYowNNR6NlGIxCkbmWWbrd90ymo7iA0Sy9nV8Rl8xQ");
        embed.setImage("https://cdn.discordapp.com/attachments/708099236171874408/708423454554193960/horntwitchemote.png");
        message.channel.send(embed);
}