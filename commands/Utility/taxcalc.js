const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "taxcalculator",
  aliases: ["taxcalc", "tc"],
  category: "Utility",
  description: "It's simple, a tax calculator for Dank Memer!",
  run: async (client, message, args) => {
    let amount = args[0];
    const formula = 1000000/920000;
    const result = Math.round(formula * amount);

    message.channel.send(`To send someone \`${amount}\` after tax, you should pay \`${result}\``);
  },
};
