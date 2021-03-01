module.exports.run = async(client, message, args) => {
    
    console.log("Our bot has logged out")
    client.destroy();
}
