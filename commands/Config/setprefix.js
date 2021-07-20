const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "setprefix",
  aliases: ["sp"],
  description: "Set a prefix for your server!",
  cooldown: 10000,
  category: "Config",
  userPermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    const DB = await client.schemas.winners.findOne({
      id: message.guild.id,
    });
    const prefix = args[0];
    if (!prefix)
      return message.channel.send(
        `The correct usage for this command is: \`${DB.prefix}setprefix <prefix>\`\nThe current prefix is: \`${DB.prefix}\``
      );

    if (prefix.length > 4)
      return message.channel.send(
        "The prefix should be less than 4 characters."
      );

    message.channel.send(`Updated Prefix: \`${DB.prefix}\` => \`${prefix}\``);

    DB.prefix = prefix;
    DB.save();
  },
};
