const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "freeloaders",
  aliases: ["freeloadercount"],
  cooldown: 5000,
  category: "Utility",
  description: "View how many freeloaders there are in your server!",
  run: async (client, message, args) => {
    const DB = await client.schemas.winners.findOne({
      id: message.guild.id,
    });

    const embed = new MessageEmbed()
      .setTitle("Freeloader Count")
      .setColor("#800000")
      .addField(
        "Number",
        `There are \`${DB.freeloaders}\` freeloader(s) in this server`
      );

    message.channel.send(embed);
  },
};
