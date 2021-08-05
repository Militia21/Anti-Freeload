const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "lottery",
  aliases: ["lottery"],
  category: "Utility",
  description: "Start, end or enter a lottery!",
  run: async (client, message, args) => {
    const subCommands = ["start", "end", "enter"];
    const DB = await client.schemas.winners.findOne({
      id: message.guild.id,
    });
    const lotteryChannel = message.guild.channels.cache.get(DB.lottery.channel);

    if (!args[0] || !subCommands.includes(args[0].toLowerCase()))
      return message.channel.send(
        `Invalid SubCommand.\nPossibile SubCommands: \`start, end, enter\``
      );

    switch (args[0].toLowerCase()) {
      case "start":
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.channel.send(`You cannot use this command!`);

        if (DB.lottery.status)
          return message.channel.send(
            "You can't start a lottery as there is one currently ongoing."
          );

        DB.lottery.status = true;
        DB.save();

        message.channel.send(`Started a lottery!`);
        break;
      case "end":
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.channel.send(`You cannot use this command!`);

        if (!DB.lottery.status)
          return message.channel.send(
            "I couldn't find a lottery that is currently ongoing."
          );

        const winner =
          DB.lottery.entries[
            Math.floor(Math.random() * DB.lottery.entries.length)
          ];

        const winnerUser = await message.guild.members.cache.get(winner);

        DB.lottery.status = false;
        DB.lottery.entries = null;
        DB.save();

        if (!winner)
          return message.channel.send(
            `A winner could not be determined. This may be because there are not enough entries.`
          );

        if (winner) message.channel.send(`The winner is ${winnerUser} 🎉`);
        break;
      case "enter":
        if (!message.member.hasPermission("ADMINISTRATOR"))
          return message.channel.send(`You cannot use this command!`);

        if (!lotteryChannel)
          return message.channel.send(
            `There is no lottery-channel set in this server!\nUse \`${DB.prefix}lotterychannel\` to set one!`
          );

        if (message.channel.id !== lotteryChannel.id)
          return message.channel.send(
            `This is not the server's lottery channel.\nPlease use ${lotteryChannel} to enter!`
          );

        const user =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[1]);

        if (!user) return message.channel.send(`Please enter a valid user.`);

        let entries = 1;
        const obj = DB.lottery.entries[user.id];
        if (obj) {
          let number = obj.entries;
          number++;
          entries = number;
          DB.lottery.entries = number;
        }

        if (!obj)
          DB.lottery.entries[user.id] = {
            entries: entries,
          };
        DB.save();

        message.channel.send(`Entered \`${user.user.tag}\``);

        if (!DB.lottery.status)
          return message.channel.send(
            `There is no ongoing lottery in this server.`
          );
        break;
    }
  },
};
