const schema = require("../../schemas/winners.js");

module.exports = {
  name: "logwinner",
  aliases: ["logw"],
  description: "Log a giveaway/event winner!",
  run: async (client, message, args) => {
    const winner =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!winner)
      return message.channel.send(
        `Hey! The usage of this command is \`${client.prefix}logwinner <member>\``
      );

    message.channel.send(`Logged \`${winner.user.tag}\``);

    const DB = schema.findOne({
      id: message.guild.id,
    }, async(err, data) => {
      if(err) return console.log(err);
      data.list.push(winner.id);
      data.save();
    });
  },
};
