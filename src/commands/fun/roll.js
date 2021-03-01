const rollDice = () => Math.floor(Math.random() * 6) + 1;

module.exports = {
    run: async(client, message) => {
        message.reply("rolled a " + rollDice());
    },
    aliases: ['dice', 'rolldice', 'r'],
    description: 'Rolls the dice'
}