const schema = require("../../schemas/winners.js");

module.exports = {
  name: "logwinner",
  aliases: ["logw"],
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Config",
  description: "Log a giveaway/event winner!",
  run: async (client, message, args) => {
    const DATA = await client.schemas.winners.findOne({
      id: message.guild.id,
    });
    const winner =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!winner)
      return message.channel.send(
        `Hey! The usage of this command is \`${DATA.prefix}logwinner <member>\``
      );

    if (DATA.list.includes(winner.id))
      return message.channel.send(
        "That user has already been logged as a winner!"
      );

    message.channel.send(`Logged \`${winner.user.tag}\``);

    const DB = await client.schemas.winners.findOne(
      {
        id: message.guild.id,
      },
      async (err, data) => {
        if (err) return console.log(err);
        data.list.push(winner.id);
        data.save();
      }
    );
  },
};
