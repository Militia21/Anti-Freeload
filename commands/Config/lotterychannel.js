const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "lotterychannel",
  aliases: ["lotterych", "lch"],
  category: "Config",
  description:
    "Set a lottery-channel so users can only enter in a certain channel.",
  userPermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    const lotteryChannel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);

    if (!lotteryChannel)
      return message.channel.send(
        "Please provide a valid channel or channel ID."
      );

    const DB = await client.schemas.winners.findOne({
      id: message.guild.id,
    });
    DB.lottery.channel = lotteryChannel.id;
    DB.save();

    message.channel.send(`Done! The lottery-channel is now ${lotteryChannel}`);
  },
};
