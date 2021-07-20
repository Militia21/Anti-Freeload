const { MessageEmbed } = require("discord.js");
const schema = require("../../schemas/winners.js");

module.exports = {
  name: "winners",
  aliases: ["w"],
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Config",
  description: "See all the giveaway and event winners",
  run: async (client, message, args) => {
    const data = await client.schemas.winners.findOne({
      id: message.guild.id,
    });
    const winnerList = data.list;

    let Map = winnerList.map((x) => `<@${x}>`).join("\n");

    const embed = new MessageEmbed()
      .setAuthor("Logged Winners", message.guild.iconURL)
      .setDescription(Map)
      .setColor("#800000");

    message.channel.send(embed);
  },
};
