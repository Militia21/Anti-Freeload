const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "winners",
  aliases: ["w"],
  description: "See all the giveaway and event winners",
  run: async (client, message, args) => {
    const DB = client.schemas.winners.findOne({
      id: message.guild.id,
    }).list;

    const Map = DB.map((x) => `<@${x}>`).join("\n");

    const listEmbed = new MessageEmbed()
      .setTitle(`List`)
      .setFooter(`Winners for ${message.guild.name}`)
      .setDescription(Map)
      .setColor("#800000");

    message.channel.send(listEmbed);
  },
};
