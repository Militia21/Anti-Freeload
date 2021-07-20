module.exports = {
  name: "logchannel",
  aliases: ["logch"],
  category: "Config",
  userPermissions: ["ADMINISTRATOR"],
  description:
    "Set the logchannel for your server to send freeloader ban logs!",
  run: async (client, message, args) => {
    const DB = await client.schemas.winners.findOne({
      id: message.guild.id,
    });

    const logChannel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);

    if (!logChannel)
      return message.channel.send(
        `Hey! The usage of this command is \`${DB.prefix}logchannel <channel/ID>\``
      );

    message.channel.send(
      `The server freeloader log-channel was updated to => ${logChannel}`
    );
    DB.logChannel = logChannel.id;
    DB.save();
  },
};
